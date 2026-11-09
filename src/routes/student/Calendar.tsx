import { useState } from 'react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CalendarGrid,
  CalendarNotes,
  MonthHeader,
  startOfMonth,
  toISO,
} from '@/components/ui/calendar'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'
import { DEFAULT_SCHOOL_ID } from '@/data/seed'

/**
 * Student calendar.
 *
 * One class, so none of the filtering the teacher needs. What a student needs
 * instead is the difference between a lesson and a deadline, which is why due
 * dates carry the accent and lessons do not.
 *
 * On the same grid as the teacher screen and the date picker, which it had to
 * be: this one carried the same hardcoded Monday week, the same 28 cells with
 * no leading offset, and the same decorative month chevrons. Three copies of a
 * month grid meant three copies of every bug in it.
 *
 * A student sees the school calendar for the same reason a teacher does. Eid
 * and the end of term are not staff information.
 */

interface Event {
  /** Real ISO date. The old version held a day number and could not change month. */
  on: string
  labelKey: StringKey
  kind: 'lesson' | 'due' | 'assessment'
  subjectKey: StringKey
}

const events: Event[] = [
  {
    on: '2027-02-02',
    labelKey: 'stuEvtEquivalentFractions',
    kind: 'lesson',
    subjectKey: 'stuSubjMathematics',
  },
  {
    on: '2027-02-03',
    labelKey: 'stuEvtReadingComprehension',
    kind: 'lesson',
    subjectKey: 'stuSubjEnglish',
  },
  { on: '2027-02-04', labelKey: 'stuEvtCheck23', kind: 'due', subjectKey: 'stuSubjMathematics' },
  { on: '2027-02-05', labelKey: 'stuEvtApply15', kind: 'due', subjectKey: 'stuSubjMathematics' },
  { on: '2027-02-09', labelKey: 'stuEvtWaterCycle', kind: 'lesson', subjectKey: 'stuSubjScience' },
  {
    on: '2027-02-10',
    labelKey: 'stuEvtAddingFractions',
    kind: 'lesson',
    subjectKey: 'stuSubjMathematics',
  },
  {
    on: '2027-02-12',
    labelKey: 'stuEvtEndOfUnitCheck',
    kind: 'assessment',
    subjectKey: 'stuSubjMathematics',
  },
  {
    on: '2027-02-17',
    labelKey: 'stuEvtPhotosynthesis',
    kind: 'lesson',
    subjectKey: 'stuSubjScience',
  },
  { on: '2027-02-19', labelKey: 'stuEvtPractise24', kind: 'due', subjectKey: 'stuSubjMathematics' },
  {
    on: '2027-02-24',
    labelKey: 'stuEvtParagraphStructure',
    kind: 'lesson',
    subjectKey: 'stuSubjEnglish',
  },
]

const FEBRUARY_2027 = new Date(2027, 1, 1)

export function StudentCalendar() {
  const { t } = useLocale()
  const [month, setMonth] = useState(() => startOfMonth(FEBRUARY_2027))
  const [selected, setSelected] = useState<Date | null>(null)

  const shift = (by: number) =>
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + by, 1))

  return (
    <Page>
      <PageHeader
        title={t('navCalendar')}
        // The class name is data and stays as it is in both languages. The
        // month moved into the grid header, which now says the month actually
        // on screen rather than the one this screen opened on.
        subtitle={`${t('term2')} · Grade 6 Cedar`}
      />

      <Card>
        <CardContent className="p-3">
          <MonthHeader month={month} onShift={shift} schoolId={DEFAULT_SCHOOL_ID} className="mb-2" />
          <CalendarGrid
            month={month}
            selected={selected}
            onSelect={setSelected}
            schoolId={DEFAULT_SCHOOL_ID}
            context="aware"
            size="full"
            renderDay={(date) => {
              const key = toISO(date)
              const dayEvents = events.filter((event) => event.on === key)
              if (dayEvents.length === 0) return null
              return (
                <span className="flex flex-col gap-1">
                  {dayEvents.map((event, index) => (
                    <span
                      key={`${key}-${index}`}
                      title={`${t(event.subjectKey)}: ${t(event.labelKey)}`}
                      className={cn(
                        'block truncate rounded border px-1.5 py-1 text-caption leading-tight',
                        event.kind === 'lesson'
                          ? 'border-border text-muted-foreground'
                          : event.kind === 'due'
                            ? 'border-accent/50 bg-accent/15 font-medium text-foreground'
                            : 'border-foreground bg-foreground text-background',
                      )}
                    >
                      {event.kind === 'due' ? t('stuDuePrefix') : ''}
                      {t(event.labelKey)}
                    </span>
                  ))}
                </span>
              )
            }}
          />
          <CalendarNotes month={month} schoolId={DEFAULT_SCHOOL_ID} context="aware" />
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-4 text-caption text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded border border-border" aria-hidden />
          {t('stuLegendLesson')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded border border-accent/50 bg-accent/30" aria-hidden />
          {t('stuLegendDue')}
        </span>
        <span className="flex items-center gap-1.5">
          <Badge variant="neutral">{t('stuLegendTest')}</Badge>
          {t('stuLegendAssessment')}
        </span>
      </div>
    </Page>
  )
}
