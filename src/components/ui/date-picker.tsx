import { useMemo, useState } from 'react'
import { CalendarDays, TriangleAlert } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  CalendarGrid,
  CalendarLegend,
  MonthHeader,
  intlLocale,
  startOfMonth,
  toISO,
  type CalendarContext,
} from '@/components/ui/calendar'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { dayContext } from '@/data/schoolCalendar'
import { DEFAULT_SCHOOL_ID } from '@/data/seed'

/**
 * Date picker.
 *
 * Two decisions were settled before this could be written, and only one was
 * open.
 *
 * Numerals were already settled. `formatDate` has used `ar-EG-u-nu-latn` since
 * the Arabic pass: Arabic language, Latin digits. That matches how timetables
 * and exam papers print across Lebanon, the Gulf and Jordan, and it would be
 * strange for one control to disagree with every date already on screen.
 *
 * The calendar system is the part still open, and this takes the narrow answer
 * rather than pretending to the wide one. Gregorian only, because every
 * academic date in the three markets is Gregorian. What is missing is the
 * Hijri side, which is what holidays and Ramadan timetables run on. That is a
 * product decision for editorial, not a question about this control, and the
 * approximate lunar dates in `schoolCalendar.ts` say so in the data.
 *
 * `context` is the thing to choose between. See `calendar.tsx`.
 */
export function DatePicker({
  value,
  onChange,
  label,
  placeholder,
  context = 'plain',
  schoolId = DEFAULT_SCHOOL_ID,
  classIds = [],
  min,
  max,
  invalid = false,
  disabled = false,
  className,
}: {
  /** ISO `YYYY-MM-DD`, or empty for no date. */
  value: string
  onChange: (iso: string) => void
  /** The control's accessible name. Required, like Progress. */
  label: string
  placeholder: string
  context?: CalendarContext
  schoolId?: string
  /** Only read when `context` is `load`. */
  classIds?: string[]
  min?: string
  max?: string
  invalid?: boolean
  disabled?: boolean
  className?: string
}) {
  const { locale, t } = useLocale()
  const selected = value ? new Date(value) : null
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(() => startOfMonth(selected ?? new Date()))

  const valueLabel = useMemo(
    () =>
      selected
        ? new Intl.DateTimeFormat(intlLocale(locale), {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(selected)
        : '',
    [locale, selected],
  )

  /**
   * The warning under the field, not inside the grid.
   *
   * It appears after a choice rather than before, because the grid already
   * showed the cost and a teacher may have a reason. This tells them what they
   * just did; it does not argue with them.
   */
  const warning = useMemo(() => {
    if (!selected || context === 'plain') return null
    const info = dayContext(selected, schoolId, classIds)
    if (info.closed) {
      const name = info.holiday
        ? locale === 'ar'
          ? info.holiday.nameAr
          : info.holiday.name
        : t('calClosed')
      return info.holiday?.approximate
        ? `${name} · ${t('calApproximate')}`
        : `${name} · ${t('calClosed')}`
    }
    if (context === 'load' && info.dueCount >= 3) {
      return t('calNDue').replace('{n}', String(info.dueCount))
    }
    if (!info.inTerm) return t('calOutOfTerm')
    return null
  }, [selected, context, schoolId, classIds, locale, t])

  const shift = (by: number) =>
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + by, 1))

  return (
    <div className={cn('min-w-0 space-y-1.5', className)}>
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
            )}
          >
            <span className={cn('truncate', value ? 'text-foreground' : 'text-muted-foreground')}>
              {valueLabel || placeholder}
            </span>
            <CalendarDays className="h-4 w-4 flex-none text-muted-foreground" aria-hidden />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-3">
          <MonthHeader month={month} onShift={shift} className="mb-2" />
          <CalendarGrid
            month={month}
            selected={selected}
            onSelect={(day) => {
              onChange(toISO(day))
              setOpen(false)
            }}
            schoolId={schoolId}
            classIds={classIds}
            context={context}
            min={min}
            max={max}
          />
          <CalendarLegend context={context} />
        </PopoverContent>
      </Popover>

      {warning ? (
        <p className="flex items-start gap-1.5 text-caption text-warning">
          <TriangleAlert className="mt-0.5 h-3 w-3 flex-none" aria-hidden />
          <span className="min-w-0">{warning}</span>
        </p>
      ) : null}
    </div>
  )
}
