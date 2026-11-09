import { useMemo, type ReactNode } from 'react'
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

/**
 * Two levels, not three.
 *
 * The first pass offered plain, term-aware and load-aware, and the aware ones
 * carried their knowledge inside the cells: a tint across Ramadan, a strike
 * through closures, dots for workload. Shown side by side the verdict was that
 * the plain one looked right and the clever ones looked cluttered, but that
 * the knowledge was the point. Both halves of that are correct.
 *
 * So `aware` now knows everything the old `load` knew and says almost none of
 * it in the grid. A closed day is dimmed, the same weight as a day outside the
 * month, so it adds no new visual language. Everything else moves to prose:
 * one quiet line under the grid for what is in this month, and a warning under
 * the field only when the date actually chosen is a problem.
 *
 * The grid stays quiet. The product still knows.
 */
export type CalendarContext = 'plain' | 'aware'

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
  /*
    The workload reaches the label even though no cell draws it.

    This is the one place the quiet version is deliberately louder than the
    visible grid. A sighted teacher scans the month and sees the shape of it;
    somebody using a screen reader is already hearing each day one at a time,
    so naming the load costs them nothing extra and is the only way they get it
    at all. Hiding it to match the pixels would be matching the wrong thing.
  */
  if (info.dueCount > 0) {
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
  renderDay,
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
  /**
   * Extra content inside a day cell, for the calendar screens.
   *
   * A render prop rather than a baked-in events array, because the two screens
   * that need it want different things: a teacher sees lessons from five
   * classes colour coded by class, a student sees their own work split by
   * whether it is a deadline. Pushing both into the grid would make it a
   * calendar screen with a date picker hidden inside it.
   *
   * Only called for days inside the displayed month. Days from the previous
   * and next month are shown for shape, not for content.
   */
  renderDay?: (date: Date, info: DayContext) => ReactNode
  className?: string
}) {
  const { locale, t } = useLocale()
  const { weekdays, days } = useMonthGrid(month, locale)
  const tag = intlLocale(locale)
  const today = new Date()
  const minDate = min ? new Date(min) : null
  const maxDate = max ? new Date(max) : null

  // `min-h` rather than `h` at full size: a day with four things on it should
  // grow rather than clip, and a fixed height is how a month view quietly
  // hides the exact day a teacher most needed to see.
  const cell = size === 'full' ? 'min-h-[6rem] w-full' : 'h-8 w-8'

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

        // A closed day stays clickable. Blocking it would be the computer
        // refusing something a teacher may have a reason to do; dimming lets
        // them see it and decide, and the warning under the field says what
        // they chose.
        //
        // Weekends are deliberately NOT dimmed. Dimming five of every seven
        // cells is what made the first attempt look busy, and a Saturday is
        // not a surprise to anyone who works at a school.
        const muted = context === 'aware' && (info.closed || !info.inTerm)

        // The first day of the holiday, or the first of the month when the
        // holiday started earlier. Everything after it is the same holiday
        // and does not need telling again.
        const key = toISO(day)
        const namesHoliday =
          info.holiday !== null &&
          (info.holiday.startsOn === key || day.getDate() === 1)

        return (
          <button
            key={day.toISOString()}
            type="button"
            disabled={blocked}
            aria-current={isToday ? 'date' : undefined}
            aria-label={dayLabel(day, info, context, locale, t)}
            onClick={() => onSelect(day)}
            className={cn(
              'relative grid rounded transition-colors',
              cell,
              size === 'full'
                ? 'content-start justify-items-start border border-border p-1.5 text-start'
                : 'place-items-center',
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
            )}
          >
            <span className="tabular text-small leading-none">
              {new Intl.NumberFormat(tag).format(day.getDate())}
            </span>

            {/*
              The month view is the one place the grid may speak, because a
              cell 64px tall has room for a word and a person looking at a
              month view came to read it. In the small picker the same
              information goes under the grid instead.

              Named once per range, not once per day. Ramadan runs 8 February
              to 9 March, so the first version printed "Ramadan" into twenty
              one consecutive cells, which is the exact noise that got the
              clever variants rejected. It now appears on the day the range
              starts, or on the first of the month when the range began in the
              month before, which is what a wall calendar does.
            */}
            {size === 'full' && context === 'aware' && info.holiday && !outside && namesHoliday ? (
              <span className="mt-1 line-clamp-2 w-full text-start text-caption leading-tight text-muted-foreground">
                {locale === 'ar' ? info.holiday.nameAr : info.holiday.name}
              </span>
            ) : null}

            {renderDay && !outside ? (
              <span className="mt-1 w-full min-w-0">{renderDay(day, info)}</span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

/**
 * What is in this month, as one line of prose.
 *
 * This replaced the legend, and the swap is the whole idea. A legend is a
 * glossary for marks the grid is making; remove the marks and the glossary
 * goes with them. What is left is the thing the marks were trying to say,
 * said plainly: "Ramadan 8 Feb to 9 Mar, shortened days."
 *
 * It names at most two things. A line that lists six is a legend again.
 */
export function CalendarNotes({
  month,
  schoolId,
  context,
  className,
}: {
  month: Date
  schoolId: string
  context: CalendarContext
  className?: string
}) {
  const { locale, t } = useLocale()

  const notes = useMemo(() => {
    if (context === 'plain') return []
    const seen = new Set<string>()
    const found: string[] = []

    const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    for (let day = 1; day <= days; day += 1) {
      const date = new Date(month.getFullYear(), month.getMonth(), day)
      const info = dayContext(date, schoolId)

      if (info.holiday && !seen.has(info.holiday.name)) {
        seen.add(info.holiday.name)
        const name = locale === 'ar' ? info.holiday.nameAr : info.holiday.name

        // Qualifiers go in brackets and the notes are joined by a middle dot,
        // so the two separators never mean the same thing. The first version
        // used the dot for both and produced "Ramadan, shortened day · date
        // not yet confirmed · Saint Maron", where only a reader who already
        // knew the answer could tell where one note ended.
        const quals: string[] = []
        if (!info.closed) quals.push(t('calShortDay'))
        if (info.holiday.approximate) quals.push(t('calApproximate'))
        found.push(quals.length > 0 ? `${name} (${quals.join(', ')})` : name)
      }
      if (info.termEnd && !seen.has('term-end')) {
        seen.add('term-end')
        found.push(t('calTermEnds'))
      }
    }
    return found.slice(0, 2)
  }, [month, schoolId, context, locale, t])

  if (notes.length === 0) return null

  return (
    <p
      className={cn(
        'mt-2 border-t border-border pt-2 text-caption text-muted-foreground',
        className,
      )}
    >
      {notes.join(' · ')}
    </p>
  )
}
