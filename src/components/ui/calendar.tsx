import { useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { dayContext, type DayContext } from '@/data/schoolCalendar'
import type { Locale } from '@/types'

/**
 * The month grid, shared by the date picker and the calendar screens.
 *
 * One component rather than three variants, because the three things we are
 * choosing between differ only in how much the grid is allowed to know. That
 * is a prop, not a rewrite, and it means picking a winner later is a one word
 * change rather than deleting two files.
 *
 *   plain  a date picker. Nothing but dates.
 *   term   knows the school year: weekends, closures, the end of term.
 *   load   also knows what is already due, so a teacher can see Tuesday is
 *          carrying three deadlines before adding a fourth.
 *
 * Everything locale-sensitive is read from Intl rather than assumed. The
 * weekday order, the first day of the week and the month name all come from
 * the locale; the weekend is read from the school, because Beirut and Amman do
 * not share one and hardcoding Saturday and Sunday would put a deadline on a
 * Friday in Jordan.
 */

const MS_DAY = 86400000

export type CalendarContext = 'plain' | 'term' | 'load'

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function toISO(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** Latin digits in both languages, matching `formatDate` in `lib/utils`. */
export function intlLocale(locale: Locale) {
  return locale === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB'
}

/**
 * Which weekday the locale starts on.
 *
 * Three spellings because this API changed under us: the original proposal
 * exposed a `weekInfo` getter, the accepted one renamed it `getWeekInfo()`,
 * and older engines have neither. Reading only `weekInfo` returns undefined in
 * current Chrome and silently falls through to Monday, which put the Arabic
 * calendar on a British week. Every date was correct and only the columns were
 * wrong, which is why it survived the first pass.
 */
export function firstWeekday(locale: Locale) {
  const tag = intlLocale(locale)
  type WithWeekInfo = Intl.Locale & {
    getWeekInfo?: () => { firstDay: number }
    weekInfo?: { firstDay: number }
  }
  const resolved = new Intl.Locale(tag) as WithWeekInfo
  const info = resolved.getWeekInfo?.() ?? resolved.weekInfo
  const firstDay = info?.firstDay ?? (locale === 'ar' ? 6 : 1)
  return firstDay % 7
}

export function useMonthGrid(month: Date, locale: Locale) {
  const weekStart = firstWeekday(locale)
  const tag = intlLocale(locale)

  const weekdays = useMemo(() => {
    const format = new Intl.DateTimeFormat(tag, { weekday: 'narrow' })
    // 4 January 1970 was a Sunday, a stable base for day zero.
    return Array.from({ length: 7 }, (_, i) =>
      format.format(new Date(Date.UTC(1970, 0, 4 + ((weekStart + i) % 7)))),
    )
  }, [tag, weekStart])

  const days = useMemo(() => {
    const first = startOfMonth(month)
    const lead = (first.getDay() - weekStart + 7) % 7
    const start = new Date(first.getTime() - lead * MS_DAY)
    return Array.from({ length: 42 }, (_, i) => new Date(start.getTime() + i * MS_DAY))
  }, [month, weekStart])

  return { weekdays, days }
}

export function MonthHeader({
  month,
  onShift,
  className,
}: {
  month: Date
  onShift: (by: number) => void
  className?: string
}) {
  const { locale, dir, t } = useLocale()
  const label = useMemo(
    () =>
      new Intl.DateTimeFormat(intlLocale(locale), { month: 'long', year: 'numeric' }).format(
        month,
      ),
    [locale, month],
  )

  // Previous and next, not left and right, so they swap in Arabic. One of the
  // few icons in the studio that genuinely must mirror.
  const Previous = dir === 'rtl' ? ChevronRight : ChevronLeft
  const Next = dir === 'rtl' ? ChevronLeft : ChevronRight

  return (
    <div className={cn('flex items-center justify-between gap-2', className)}>
      <button
        type="button"
        onClick={() => onShift(-1)}
        aria-label={t('dpPreviousMonth')}
        className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Previous className="h-4 w-4" aria-hidden />
      </button>
      <span className="text-small font-semibold text-foreground">{label}</span>
      <button
        type="button"
        onClick={() => onShift(1)}
        aria-label={t('dpNextMonth')}
        className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Next className="h-4 w-4" aria-hidden />
      </button>
    </div>
  )
}

/**
 * One day cell's accessible name.
 *
 * Built as a sentence rather than a pile of icons, because everything the
 * colour and the dots convey has to reach somebody who gets none of it. A cell
 * that looks informative and announces "14" is worse than a plain one.
 */
function dayLabel(
  date: Date,
  info: DayContext,
  context: CalendarContext,
  locale: Locale,
  t: (key: Parameters<ReturnType<typeof useLocale>['t']>[0]) => string,
) {
  const parts = [
    new Intl.DateTimeFormat(intlLocale(locale), {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(date),
  ]
  if (context === 'plain') return parts.join(', ')

  if (info.holiday) {
    parts.push(locale === 'ar' ? info.holiday.nameAr : info.holiday.name)
    if (info.holiday.approximate) parts.push(t('calApproximate'))
  }
  if (info.closed) parts.push(t('calClosed'))
  else if (info.weekend) parts.push(t('calWeekend'))
  if (info.termEnd) parts.push(t('calTermEnds'))
  if (!info.inTerm) parts.push(t('calOutOfTerm'))
  if (context === 'load' && info.dueCount > 0) {
    parts.push(t('calNDue').replace('{n}', String(info.dueCount)))
  }
  return parts.join(', ')
}

export function CalendarGrid({
  month,
  selected,
  onSelect,
  schoolId,
  classIds = [],
  context = 'plain',
  min,
  max,
  size = 'compact',
  className,
}: {
  month: Date
  selected: Date | null
  onSelect: (date: Date) => void
  schoolId: string
  classIds?: string[]
  context?: CalendarContext
  min?: string
  max?: string
  size?: 'compact' | 'full'
  className?: string
}) {
  const { locale, t } = useLocale()
  const { weekdays, days } = useMonthGrid(month, locale)
  const tag = intlLocale(locale)
  const today = new Date()
  const minDate = min ? new Date(min) : null
  const maxDate = max ? new Date(max) : null

  const cell = size === 'full' ? 'h-16 w-full' : 'h-8 w-8'

  return (
    <div className={cn('grid grid-cols-7 gap-0.5', className)}>
      {weekdays.map((day, i) => (
        <span
          key={`${day}-${i}`}
          className={cn(
            'grid place-items-center text-caption font-medium text-muted-foreground',
            size === 'full' ? 'h-7 w-full' : 'h-7 w-8',
          )}
        >
          {day}
        </span>
      ))}

      {days.map((day) => {
        const info = dayContext(day, schoolId, classIds)
        const outside = day.getMonth() !== month.getMonth()
        const isSelected = selected ? sameDay(day, selected) : false
        const isToday = sameDay(day, today)
        const blocked = (minDate ? day < minDate : false) || (maxDate ? day > maxDate : false)

        // In the aware variants a closed day is still clickable. Blocking it
        // would be the computer refusing a thing a teacher may have a reason
        // to do; marking it lets them see the cost and decide.
        const muted = context !== 'plain' && (info.closed || info.weekend || !info.inTerm)

        return (
          <button
            key={day.toISOString()}
            type="button"
            disabled={blocked}
            aria-current={isToday ? 'date' : undefined}
            aria-label={dayLabel(day, info, context, locale, t)}
            onClick={() => onSelect(day)}
            className={cn(
              'relative grid place-items-start justify-items-center rounded transition-colors',
              cell,
              size === 'full' ? 'content-start p-1.5' : 'place-items-center',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:pointer-events-none disabled:opacity-30',
              isSelected
                ? 'bg-primary text-primary-foreground'
                : outside
                  ? 'text-muted-foreground/60 hover:bg-muted'
                  : muted
                    ? 'text-muted-foreground hover:bg-muted'
                    : 'text-foreground hover:bg-muted',
              isToday && !isSelected && 'ring-1 ring-inset ring-border-strong',
              // A closed day reads as struck through rather than greyed, so it
              // is distinguishable from a day that is merely outside the month.
              context !== 'plain' && info.closed && !isSelected && 'line-through decoration-1',
              /*
                A shortened day, which in practice means Ramadan, gets a wash
                rather than a glyph.

                This took two attempts. The data always distinguished closed
                from shortened, but the grid only drew closures, so a February
                containing the whole of Ramadan looked like any other month:
                the thing a teacher in Beirut or Dubai most needs the calendar
                to know was the one thing it said nothing about. Marking each
                day then overcorrected, because twenty eight dashed underlines
                read as damage rather than information.

                A tint across the span says "this period is different", which
                is what a month long observance actually is. Never a
                strikethrough: school is open and the day is real.
              */
              context !== 'plain' &&
                info.holiday &&
                !info.closed &&
                !isSelected &&
                'bg-warning-tint/60',
            )}
          >
            <span className="tabular text-small leading-none">
              {new Intl.NumberFormat(tag).format(day.getDate())}
            </span>

            {/* Term end gets a rule rather than a dot: it is a boundary, not an event. */}
            {context !== 'plain' && info.termEnd && !isSelected ? (
              <span
                aria-hidden
                className="absolute inset-x-1 bottom-0.5 h-px bg-warning"
              />
            ) : null}


            {context === 'load' && info.dueCount > 0 && !isSelected ? (
              <span
                aria-hidden
                className={cn(
                  'mt-0.5 flex items-center gap-[2px]',
                  size === 'full' && 'mt-1',
                )}
              >
                {Array.from({ length: Math.min(info.dueCount, 3) }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'block h-1 w-1 rounded-full',
                      info.dueCount >= 3 ? 'bg-warning' : 'bg-muted-foreground',
                    )}
                  />
                ))}
              </span>
            ) : null}

            {size === 'full' && context !== 'plain' && info.holiday && !outside ? (
              <span className="mt-1 line-clamp-2 w-full text-start text-caption leading-tight text-muted-foreground">
                {locale === 'ar' ? info.holiday.nameAr : info.holiday.name}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

/**
 * The legend.
 *
 * Shown only in the aware variants, because a legend on a plain grid is an
 * apology for a thing that needed no explaining.
 */
export function CalendarLegend({ context }: { context: CalendarContext }) {
  const { t } = useLocale()
  if (context === 'plain') return null

  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-2">
      <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
        <span aria-hidden className="h-px w-3 bg-warning" />
        {t('calTermEnds')}
      </span>
      <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
        <span aria-hidden className="text-foreground line-through decoration-1">
          00
        </span>
        {t('calClosed')}
      </span>
      <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
        <span aria-hidden className="rounded bg-warning-tint/60 px-1 text-foreground">
          00
        </span>
        {t('calShortDay')}
      </span>
      {context === 'load' ? (
        <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
          <span aria-hidden className="flex gap-[2px]">
            <span className="block h-1 w-1 rounded-full bg-muted-foreground" />
            <span className="block h-1 w-1 rounded-full bg-muted-foreground" />
          </span>
          {t('calAlreadyDue')}
        </span>
      ) : null}
    </div>
  )
}
