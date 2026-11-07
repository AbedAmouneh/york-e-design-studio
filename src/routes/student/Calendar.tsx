import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'

/**
 * Student calendar.
 *
 * One class, so none of the filtering the teacher needs. What a student needs
 * instead is the difference between a lesson and a deadline, which is why due
 * dates carry the accent and lessons do not.
 */

interface Event {
  day: number
  labelKey: StringKey
  kind: 'lesson' | 'due' | 'assessment'
  subjectKey: StringKey
}

const events: Event[] = [
  { day: 2, labelKey: 'stuEvtEquivalentFractions', kind: 'lesson', subjectKey: 'stuSubjMathematics' },
  { day: 3, labelKey: 'stuEvtReadingComprehension', kind: 'lesson', subjectKey: 'stuSubjEnglish' },
  { day: 4, labelKey: 'stuEvtCheck23', kind: 'due', subjectKey: 'stuSubjMathematics' },
  { day: 5, labelKey: 'stuEvtApply15', kind: 'due', subjectKey: 'stuSubjMathematics' },
  { day: 9, labelKey: 'stuEvtWaterCycle', kind: 'lesson', subjectKey: 'stuSubjScience' },
  { day: 10, labelKey: 'stuEvtAddingFractions', kind: 'lesson', subjectKey: 'stuSubjMathematics' },
  { day: 12, labelKey: 'stuEvtEndOfUnitCheck', kind: 'assessment', subjectKey: 'stuSubjMathematics' },
  { day: 17, labelKey: 'stuEvtPhotosynthesis', kind: 'lesson', subjectKey: 'stuSubjScience' },
  { day: 19, labelKey: 'stuEvtPractise24', kind: 'due', subjectKey: 'stuSubjMathematics' },
  { day: 24, labelKey: 'stuEvtParagraphStructure', kind: 'lesson', subjectKey: 'stuSubjEnglish' },
]

const weekdayKeys: StringKey[] = [
  'stuMonShort',
  'stuTueShort',
  'stuWedShort',
  'stuThuShort',
  'stuFriShort',
  'stuSatShort',
  'stuSunShort',
]

export function StudentCalendar() {
  const { t } = useLocale()
  const cells = Array.from({ length: 28 }, (_, index) => index + 1)

  return (
    <Page>
      <PageHeader
        title={t('navCalendar')}
        // The class name is data and stays as it is in both languages.
        subtitle={`${t('stuCalendarMonth')} · Grade 6 Cedar`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label={t('stuPreviousMonth')}>
              <ChevronLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Button>
            <Button variant="ghost" size="icon" aria-label={t('stuNextMonth')}>
              <ChevronRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="p-3">
          <div className="grid grid-cols-7 gap-1.5">
            {weekdayKeys.map((key) => (
              <div key={key} className="px-2 py-1.5 text-caption font-medium text-muted-foreground">
                {t(key)}
              </div>
            ))}

            {cells.map((day) => {
              const dayEvents = events.filter((event) => event.day === day)
              const weekend = day % 7 === 6 || day % 7 === 0
              const today = day === 10
              return (
                <div
                  key={day}
                  className={cn(
                    'min-h-[104px] rounded border p-1.5',
                    today ? 'border-foreground' : 'border-border',
                    weekend ? 'bg-surface' : 'bg-background',
                  )}
                >
                  <span
                    className={cn(
                      'tabular mb-1 inline-flex h-5 min-w-5 items-center justify-center rounded px-1 text-caption',
                      today
                        ? 'bg-foreground font-semibold text-background'
                        : 'text-muted-foreground',
                    )}
                  >
                    {day}
                  </span>

                  <div className="space-y-1">
                    {dayEvents.map((event, index) => (
                      <div
                        key={`${day}-${index}`}
                        title={`${t(event.subjectKey)}: ${t(event.labelKey)}`}
                        className={cn(
                          'truncate rounded border px-1.5 py-1 text-caption leading-tight',
                          event.kind === 'lesson'
                            ? 'border-border text-muted-foreground'
                            : event.kind === 'due'
                              ? 'border-accent/50 bg-accent/15 font-medium text-foreground'
                              : 'border-foreground bg-foreground text-background',
                        )}
                      >
                        {event.kind === 'due' ? t('stuDuePrefix') : ''}
                        {t(event.labelKey)}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
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
