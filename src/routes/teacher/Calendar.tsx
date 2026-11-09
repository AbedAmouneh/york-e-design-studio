import { useState } from 'react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  CalendarGrid,
  CalendarNotes,
  MonthHeader,
  startOfMonth,
  toISO,
} from '@/components/ui/calendar'
import { useLocale } from '@/lib/i18n'
import { groupName } from '@/lib/names'
import type { StringKey } from '@/i18n'
import { cn } from '@/lib/utils'
import { teacherClasses, teacherClassIds } from '@/data/teacher'
import { DEFAULT_SCHOOL_ID } from '@/data/seed'

/**
 * Teacher calendar.
 *
 * Patrick Prendergast, 26 June: "if a teacher has 5 classes, all events appear
 * together". That is why this screen exists in the studio. The class filter is
 * at the top, selected classes keep their colour, and everything else dims
 * rather than disappears so the teacher can still see what else is happening.
 *
 * Rebuilt on the shared grid, which fixed three things the hand rolled version
 * got wrong and nobody had noticed:
 *
 *   The weekday row was a hardcoded Monday to Sunday, so the Arabic build
 *   showed a British week. Beirut starts on Monday but Amman and Dubai do not,
 *   and the grid now reads that from the locale and the school.
 *
 *   The month was 28 cells with no leading offset, under a comment explaining
 *   that February 2027 happens to start on a Monday. True for exactly that
 *   month in exactly that week convention.
 *
 *   The previous and next chevrons had no onClick. They were decoration.
 *
 * It also inherits the school calendar for free: Saint Maron, the Hariri
 * memorial and Ramadan now appear without this file knowing they exist.
 */

const classTone: Record<string, string> = {
  'cls-1': 'bg-learner-primary/15 text-foreground border-learner-primary/40',
  'cls-3': 'bg-muted text-foreground border-border-strong',
  'cls-4': 'bg-warning-tint text-warning border-warning/40',
  'cls-5': 'bg-success-tint text-success border-success/40',
}

interface Event {
  /** Real ISO date, not a day number. The old version could not change month. */
  on: string
  classId: string
  labelKey: StringKey
  kind: 'lesson' | 'due' | 'assessment'
}

const events: Event[] = [
  { on: '2027-02-02', classId: 'cls-3', labelKey: 'tchPlanEquivalentFractions', kind: 'lesson' },
  { on: '2027-02-02', classId: 'cls-1', labelKey: 'tchPlanCountingInTens', kind: 'lesson' },
  { on: '2027-02-03', classId: 'cls-4', labelKey: 'tchPlanCommonDenominators', kind: 'lesson' },
  { on: '2027-02-04', classId: 'cls-3', labelKey: 'tchEvtCheck23Due', kind: 'due' },
  { on: '2027-02-04', classId: 'cls-5', labelKey: 'tchPlanRatioIntro', kind: 'lesson' },
  { on: '2027-02-05', classId: 'cls-3', labelKey: 'tchEvtApply15Due', kind: 'due' },
  { on: '2027-02-05', classId: 'cls-4', labelKey: 'tchEvtApply15Due', kind: 'due' },
  { on: '2027-02-09', classId: 'cls-1', labelKey: 'tchPlanNumberLine100', kind: 'lesson' },
  { on: '2027-02-10', classId: 'cls-3', labelKey: 'tchEvtAddingFractions', kind: 'lesson' },
  { on: '2027-02-10', classId: 'cls-5', labelKey: 'tchEvtRatioPractice', kind: 'lesson' },
  { on: '2027-02-12', classId: 'cls-3', labelKey: 'tchPlanEndOfUnitCheck', kind: 'assessment' },
  { on: '2027-02-12', classId: 'cls-4', labelKey: 'tchPlanEndOfUnitCheck', kind: 'assessment' },
  { on: '2027-02-17', classId: 'cls-5', labelKey: 'tchEvtRatioAssessment', kind: 'assessment' },
  { on: '2027-02-19', classId: 'cls-4', labelKey: 'tchEvtPractise24Due', kind: 'due' },
  { on: '2027-02-19', classId: 'cls-5', labelKey: 'tchEvtPractise24Due', kind: 'due' },
  { on: '2027-02-24', classId: 'cls-1', labelKey: 'tchEvtShapeAndSpace', kind: 'lesson' },
]

const FEBRUARY_2027 = new Date(2027, 1, 1)

export function TeacherCalendar() {
  const { t, locale } = useLocale()
  const [active, setActive] = useState<Set<string>>(new Set(teacherClassIds))
  const [month, setMonth] = useState(() => startOfMonth(FEBRUARY_2027))
  const [selected, setSelected] = useState<Date | null>(null)

  const toggle = (id: string) => {
    setActive((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const shift = (by: number) =>
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + by, 1))

  return (
    <Page>
      {/*
        The subtitle says the term, not the month. It used to read "February
        2027 · Term 2", which was true for as long as the chevrons did nothing.
        Now that they work, the month lives in the header above the grid and
        says whatever month is actually on screen.
      */}
      <PageHeader title={t('navCalendar')} subtitle={t('term2')} />

      <Card>
        <CardHeader>
          <CardTitle>{t('tchShow')}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setActive(active.size === teacherClasses.length ? new Set() : new Set(teacherClassIds))
            }
          >
            {active.size === teacherClasses.length ? t('tchClearAll') : t('tchSelectAll')}
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
                aria-pressed={on}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3 py-1.5 text-caption font-medium transition-colors',
                  on ? classTone[item.id] : 'border-border text-muted-foreground',
                )}
              >
                <span
                  className={cn('h-2 w-2 rounded-full', on ? 'bg-current' : 'bg-border-strong')}
                  aria-hidden
                />
                {groupName(item, locale)}
              </button>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3">
          <MonthHeader month={month} onShift={shift} schoolId={DEFAULT_SCHOOL_ID} className="mb-2" />
          <CalendarGrid
            month={month}
            selected={selected}
            onSelect={setSelected}
            schoolId={DEFAULT_SCHOOL_ID}
            classIds={teacherClassIds}
            context="aware"
            size="full"
            renderDay={(date) => {
              const key = toISO(date)
              const dayEvents = events.filter((event) => event.on === key)
              if (dayEvents.length === 0) return null
              return (
                <span className="flex flex-col gap-1">
                  {dayEvents.map((event, index) => {
                    const on = active.has(event.classId)
                    return (
                      <span
                        key={`${key}-${index}`}
                        className={cn(
                          'block truncate rounded border px-1.5 py-1 text-caption leading-tight transition-opacity',
                          on
                            ? classTone[event.classId]
                            : 'border-border text-muted-foreground opacity-35',
                        )}
                      >
                        {event.kind === 'due' ? t('tchDuePrefix') : ''}
                        {t(event.labelKey)}
                      </span>
                    )
                  })}
                </span>
              )
            }}
          />
          <CalendarNotes month={month} schoolId={DEFAULT_SCHOOL_ID} context="aware" />
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-4 text-caption text-muted-foreground">
        <Badge variant="outline">{t('tchDimmed')}</Badge>
        <span>{t('tchCalendarNote')}</span>
      </div>
    </Page>
  )
}
