import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { Locale } from '@/types'

/**
 * Date picker.
 *
 * Two things had to be decided before this could be written, and only one of
 * them was open.
 *
 * Numerals were already settled. `formatDate` in `src/lib/utils.ts` has used
 * `ar-EG-u-nu-latn` since the Arabic pass: Arabic language, Latin digits. That
 * is the right call for a school platform in Lebanon, the Gulf and Jordan,
 * where timetables, term dates and exam papers are printed with 1 2 3 even in
 * Arabic, and it would be strange for one control to disagree with every date
 * already rendered elsewhere in the studio.
 *
 * The calendar system is the part that is genuinely still open, and this
 * component takes the narrow answer rather than pretending to have the wide
 * one. It is Gregorian only, because every academic calendar in the three
 * markets runs on Gregorian months: a due date, a term boundary and a report
 * deadline are all Gregorian facts. What is not handled is the Hijri side,
 * which matters for holidays, Ramadan timetables and the shortened school day
 * that comes with them. That is a product decision about what the LMS shows a
 * parent, not a question about this control, and it needs an answer from
 * editorial before anyone builds a dual calendar. Documented on the component
 * states screen so it is not rediscovered.
 *
 * The month grid is built from `Intl` rather than from a table of names, so
 * the weekday order and the first day of the week follow the locale instead of
 * an assumption. Saturday starts the week in much of the region and Monday
 * does in the UK, and hardcoding either would have been wrong half the time.
 */

const MS_DAY = 86400000

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function toISO(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/**
 * Latin digits in both languages, matching `formatDate`.
 *
 * `ar-EG-u-nu-latn` rather than plain `ar`: the plain tag gives Eastern Arabic
 * numerals, which would make this one control disagree with every other date
 * in the studio.
 */
function intlLocale(locale: Locale) {
  return locale === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB'
}

/**
 * Which weekday the locale starts on, without hardcoding a region.
 *
 * Three spellings, because this API changed under us. The original proposal
 * exposed a `weekInfo` getter, the accepted one renamed it to `getWeekInfo()`,
 * and older engines have neither. Reading only `weekInfo` silently returned
 * undefined in current Chrome and fell through to Monday, which put the Arabic
 * calendar on a British week. It looked plausible, which is why it survived
 * the first pass: every date in the grid was still correct, only in the wrong
 * columns.
 *
 * The fallback is Saturday for Arabic and Monday otherwise, so a browser with
 * no week info at all still gets the regional answer rather than the English
 * one.
 */
function firstWeekday(locale: Locale) {
  const tag = intlLocale(locale)
  type WithWeekInfo = Intl.Locale & {
    getWeekInfo?: () => { firstDay: number }
    weekInfo?: { firstDay: number }
  }
  const resolved = new Intl.Locale(tag) as WithWeekInfo
  const info = resolved.getWeekInfo?.() ?? resolved.weekInfo
  const firstDay = info?.firstDay ?? (locale === 'ar' ? 6 : 1)
  // Intl counts Monday as 1 through Sunday as 7. JS counts Sunday as 0.
  return firstDay % 7
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder,
  min,
  max,
  invalid = false,
  disabled = false,
  className,
}: {
  /** ISO `YYYY-MM-DD`, or empty for no date. */
  value: string
  onChange: (iso: string) => void
  /** The control's accessible name. Required for the same reason Progress requires one. */
  label: string
  placeholder: string
  min?: string
  max?: string
  invalid?: boolean
  disabled?: boolean
  className?: string
}) {
  const { locale, dir, t } = useLocale()
  const selected = value ? new Date(value) : null
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(() => startOfMonth(selected ?? new Date()))

  const tag = intlLocale(locale)
  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(tag, { month: 'long', year: 'numeric' }).format(month),
    [tag, month],
  )
  const valueLabel = useMemo(
    () =>
      selected
        ? new Intl.DateTimeFormat(tag, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(selected)
        : '',
    [tag, selected],
  )

  const weekStart = firstWeekday(locale)

  const weekdays = useMemo(() => {
    const format = new Intl.DateTimeFormat(tag, { weekday: 'narrow' })
    // 4 January 1970 was a Sunday, which gives a stable base for day 0.
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

  const today = new Date()
  const minDate = min ? new Date(min) : null
  const maxDate = max ? new Date(max) : null

  const shift = (by: number) =>
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + by, 1))

  // The chevrons mean previous and next, not left and right, so they swap in
  // Arabic. One of the few icons in the studio that genuinely must mirror.
  const Previous = dir === 'rtl' ? ChevronRight : ChevronLeft
  const Next = dir === 'rtl' ? ChevronLeft : ChevronRight

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          aria-label={label}
          aria-invalid={invalid || undefined}
          className={cn(
            'flex h-10 w-full items-center justify-between gap-2 rounded border border-border bg-background px-3 text-small',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
            invalid && 'border-danger focus-visible:ring-danger',
            className,
          )}
        >
          <span className={cn('truncate', value ? 'text-foreground' : 'text-muted-foreground')}>
            {valueLabel || placeholder}
          </span>
          <CalendarDays className="h-4 w-4 flex-none text-muted-foreground" aria-hidden />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label={t('dpPreviousMonth')}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Previous className="h-4 w-4" aria-hidden />
          </button>
          <span className="text-small font-semibold text-foreground">{monthLabel}</span>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label={t('dpNextMonth')}
            className="rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Next className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-0.5">
          {weekdays.map((day, i) => (
            <span
              key={`${day}-${i}`}
              className="grid h-7 w-8 place-items-center text-caption font-medium text-muted-foreground"
            >
              {day}
            </span>
          ))}

          {days.map((day) => {
            const outside = day.getMonth() !== month.getMonth()
            const isSelected = selected ? sameDay(day, selected) : false
            const isToday = sameDay(day, today)
            const blocked =
              (minDate ? day < minDate : false) || (maxDate ? day > maxDate : false)

            return (
              <button
                key={day.toISOString()}
                type="button"
                disabled={blocked}
                aria-current={isToday ? 'date' : undefined}
                onClick={() => {
                  onChange(toISO(day))
                  setOpen(false)
                }}
                className={cn(
                  'tabular grid h-8 w-8 place-items-center rounded text-small transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'disabled:pointer-events-none disabled:opacity-30',
                  isSelected
                    ? 'bg-primary text-primary-foreground'
                    : outside
                      ? 'text-muted-foreground/60 hover:bg-muted'
                      : 'text-foreground hover:bg-muted',
                  // Today is a ring rather than a fill, so it cannot be
                  // mistaken for the selected day.
                  isToday && !isSelected && 'ring-1 ring-inset ring-border-strong',
                )}
              >
                {new Intl.NumberFormat(tag).format(day.getDate())}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
