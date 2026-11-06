import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { teacherClasses } from '@/data/teacher'

/**
 * Calendar.
 *
 * Patrick Prendergast, 26 June: "if a teacher has 5 classes, all events appear
 * together". That is the whole reason this screen exists in the studio. The
 * class filter is at the top, selected classes keep their colour, and
 * everything else dims rather than disappears so the teacher can still see
 * what else is happening that day.
 */

const classTone: Record<string, string> = {
  'cls-1': 'bg-learner-primary/15 text-foreground border-learner-primary/40',
  'cls-3': 'bg-muted text-foreground border-border-strong',
  'cls-4': 'bg-warning-tint text-warning border-warning/40',
  'cls-5': 'bg-success-tint text-success border-success/40',
}

interface Event {
  day: number
  classId: string
  label: string
  kind: 'lesson' | 'due' | 'assessment'
}

const events: Event[] = [
  { day: 2, classId: 'cls-3', label: 'Equivalent fractions', kind: 'lesson' },
  { day: 2, classId: 'cls-1', label: 'Counting in tens', kind: 'lesson' },
  { day: 3, classId: 'cls-4', label: 'Common denominators', kind: 'lesson' },
  { day: 4, classId: 'cls-3', label: 'Check 2.3 due', kind: 'due' },
  { day: 4, classId: 'cls-5', label: 'Ratio, introduction', kind: 'lesson' },
  { day: 5, classId: 'cls-3', label: 'Apply 1.5 due', kind: 'due' },
  { day: 5, classId: 'cls-4', label: 'Apply 1.5 due', kind: 'due' },
  { day: 9, classId: 'cls-1', label: 'Number line to 100', kind: 'lesson' },
  { day: 10, classId: 'cls-3', label: 'Adding fractions practice', kind: 'lesson' },
  { day: 10, classId: 'cls-5', label: 'Ratio practice', kind: 'lesson' },
  { day: 12, classId: 'cls-3', label: 'End of unit check', kind: 'assessment' },
  { day: 12, classId: 'cls-4', label: 'End of unit check', kind: 'assessment' },
  { day: 17, classId: 'cls-5', label: 'Ratio assessment', kind: 'assessment' },
  { day: 19, classId: 'cls-4', label: 'Practise 2.4 due', kind: 'due' },
  { day: 19, classId: 'cls-5', label: 'Practise 2.4 due', kind: 'due' },
  { day: 24, classId: 'cls-1', label: 'Shape and space', kind: 'lesson' },
]

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export function TeacherCalendar() {
  const { t } = useLocale()
  const [active, setActive] = useState<Set<string>>(new Set(teacherClasses.map((item) => item.id)))

  const toggle = (id: string) => {
    setActive((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // February 2027 starts on a Monday, so the grid needs no leading blanks.
  const cells = Array.from({ length: 28 }, (_, index) => index + 1)

  return (
    <Page>
      <PageHeader
        title={t('navCalendar')}
        subtitle="February 2027 · Term 2"
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
        <CardHeader>
          <CardTitle>Show</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setActive(
                active.size === teacherClasses.length
                  ? new Set()
                  : new Set(teacherClasses.map((item) => item.id)),
              )
            }
          >
            {active.size === teacherClasses.length ? 'Clear all' : 'Select all'}
          </Button>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {teacherClasses.map((item) => {
            const on = active.has(item.id)
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3 py-1.5 text-caption font-medium transition-colors',
                  on ? classTone[item.id] : 'border-border text-muted-foreground',
                )}
              >
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    on ? 'bg-current' : 'bg-border-strong',
                  )}
                  aria-hidden
                />
                {item.name}
              </button>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <div className="grid grid-cols-7 gap-1.5">
            {weekdays.map((day) => (
              <div
                key={day}
                className="px-2 py-1.5 text-caption font-medium text-muted-foreground"
              >
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
                    'min-h-[108px] rounded border p-1.5',
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
                    {dayEvents.map((event, index) => {
                      const on = active.has(event.classId)
                      return (
                        <div
                          key={`${day}-${index}`}
                          className={cn(
                            'truncate rounded border px-1.5 py-1 text-caption leading-tight transition-opacity',
                            on
                              ? classTone[event.classId]
                              : 'border-border text-muted-foreground opacity-35',
                          )}
                          title={event.label}
                        >
                          {event.kind === 'due' ? 'Due: ' : ''}
                          {event.label}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-4 text-caption text-muted-foreground">
        <Badge variant="outline">Dimmed</Badge>
        <span>
          Unselected classes stay on the grid rather than vanishing, so you can still see the day is
          full before you agree to cover someone.
        </span>
      </div>
    </Page>
  )
}
