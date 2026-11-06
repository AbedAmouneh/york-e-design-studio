import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * Student calendar.
 *
 * One class, so none of the filtering the teacher needs. What a student needs
 * instead is the difference between a lesson and a deadline, which is why due
 * dates carry the accent and lessons do not.
 */

interface Event {
  day: number
  label: string
  kind: 'lesson' | 'due' | 'assessment'
  subject: string
}

const events: Event[] = [
  { day: 2, label: 'Equivalent fractions', kind: 'lesson', subject: 'Mathematics' },
  { day: 3, label: 'Reading comprehension', kind: 'lesson', subject: 'English' },
  { day: 4, label: 'Check 2.3', kind: 'due', subject: 'Mathematics' },
  { day: 5, label: 'Apply 1.5', kind: 'due', subject: 'Mathematics' },
  { day: 9, label: 'The water cycle', kind: 'lesson', subject: 'Science' },
  { day: 10, label: 'Adding fractions practice', kind: 'lesson', subject: 'Mathematics' },
  { day: 12, label: 'End of unit check', kind: 'assessment', subject: 'Mathematics' },
  { day: 17, label: 'Photosynthesis', kind: 'lesson', subject: 'Science' },
  { day: 19, label: 'Practise 2.4', kind: 'due', subject: 'Mathematics' },
  { day: 24, label: 'Paragraph structure', kind: 'lesson', subject: 'English' },
]

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function StudentCalendar() {
  const { t } = useLocale()
  const cells = Array.from({ length: 28 }, (_, index) => index + 1)

  return (
    <Page>
      <PageHeader
        title={t('navCalendar')}
        subtitle="February 2027 · Grade 6 Cedar"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Previous month">
              <ChevronLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Next month">
              <ChevronRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="p-3">
          <div className="grid grid-cols-7 gap-1.5">
            {weekdays.map((day) => (
              <div key={day} className="px-2 py-1.5 text-caption font-medium text-muted-foreground">
                {day}
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
                        title={`${event.subject}: ${event.label}`}
                        className={cn(
                          'truncate rounded border px-1.5 py-1 text-caption leading-tight',
                          event.kind === 'lesson'
                            ? 'border-border text-muted-foreground'
                            : event.kind === 'due'
                              ? 'border-accent/50 bg-accent/15 font-medium text-foreground'
                              : 'border-foreground bg-foreground text-background',
                        )}
                      >
                        {event.kind === 'due' ? 'Due: ' : ''}
                        {event.label}
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
          Lesson
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded border border-accent/50 bg-accent/30" aria-hidden />
          Something is due
        </span>
        <span className="flex items-center gap-1.5">
          <Badge variant="neutral">Test</Badge>
          An assessment
        </span>
      </div>
    </Page>
  )
}
