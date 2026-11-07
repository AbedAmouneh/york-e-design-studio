import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'
import { cn } from '@/lib/utils'
import { teacherClasses } from '@/data/teacher'

/**
 * Weekly planner.
 *
 * A coordinator sets the unit plan, a teacher builds the week inside it. That
 * split is the design position already agreed in Questions for Developer, so
 * the coordinator's unit sits across the top as a fixed band and the teacher
 * plans underneath it rather than against it.
 *
 * Standards coverage is shown per day because the question a coordinator asks
 * at the end of a unit is which standards were actually taught, and nobody can
 * answer it from memory.
 */

/*
 * Typed explicitly rather than inferred. With `as const` alone, `today` only
 * exists on the one member that sets it, so reading it on any other day is a
 * type error.
 */
const days: Array<{
  key: string
  labelKey: StringKey
  dateKey: StringKey
  today?: boolean
}> = [
  { key: 'mon', labelKey: 'tchMonday', dateKey: 'tchFeb8' },
  { key: 'tue', labelKey: 'tchTuesday', dateKey: 'tchFeb9' },
  { key: 'wed', labelKey: 'tchWednesday', dateKey: 'tchFeb10', today: true },
  { key: 'thu', labelKey: 'tchThursday', dateKey: 'tchFeb11' },
  { key: 'fri', labelKey: 'tchFriday', dateKey: 'tchFeb12' },
]

interface PlanCard {
  day: string
  classId: string
  titleKey: StringKey
  kind: 'lesson' | 'practice' | 'assessment'
  standard: string
}

const plan: PlanCard[] = [
  { day: 'mon', classId: 'cls-3', titleKey: 'tchPlanEquivalentFractions', kind: 'lesson', standard: '6.NF.1' },
  { day: 'mon', classId: 'cls-1', titleKey: 'tchPlanCountingInTens', kind: 'lesson', standard: '2.NBT.2' },
  { day: 'tue', classId: 'cls-3', titleKey: 'tchPlanCommonDenominators', kind: 'lesson', standard: '6.NF.1' },
  { day: 'tue', classId: 'cls-4', titleKey: 'tchPlanCommonDenominators', kind: 'lesson', standard: '6.NF.1' },
  { day: 'wed', classId: 'cls-3', titleKey: 'tchPlanAddingFractions', kind: 'practice', standard: '6.NF.2' },
  { day: 'wed', classId: 'cls-1', titleKey: 'tchPlanNumberLine100', kind: 'practice', standard: '2.NBT.2' },
  { day: 'wed', classId: 'cls-5', titleKey: 'tchPlanRatioIntro', kind: 'lesson', standard: '7.RP.1' },
  { day: 'thu', classId: 'cls-4', titleKey: 'tchPlanAddingFractions', kind: 'practice', standard: '6.NF.2' },
  { day: 'fri', classId: 'cls-3', titleKey: 'tchPlanEndOfUnitCheck', kind: 'assessment', standard: '6.NF.2' },
  { day: 'fri', classId: 'cls-4', titleKey: 'tchPlanEndOfUnitCheck', kind: 'assessment', standard: '6.NF.2' },
]

const kindTone = {
  lesson: 'border-border bg-background',
  practice: 'border-border bg-surface',
  assessment: 'border-accent/50 bg-background',
} as const

export function TeacherPlanner() {
  const { t } = useLocale()
  const [classFilter, setClassFilter] = useState('all')

  const visible = plan.filter((card) =>
    classFilter === 'all' ? true : card.classId === classFilter,
  )
  const coveredStandards = Array.from(new Set(visible.map((card) => card.standard)))

  return (
    <Page>
      <PageHeader
        title={t('navPlanner')}
        subtitle={t('tchPlannerSubtitle')}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label={t('tchPreviousWeek')}>
              <ChevronLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Button>
            <Button variant="ghost" size="icon" aria-label={t('tchNextWeek')}>
              <ChevronRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Button>
            <Button variant="accent" size="sm">
              <Plus className="h-3.5 w-3.5" aria-hidden />
              {t('tchAddToWeek')}
            </Button>
          </div>
        }
      />

      <Card className="border-accent/40">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Badge variant="accent">{t('tchUnitPlan')}</Badge>
          <span className="min-w-0 flex-1 text-small text-foreground">{t('tchUnitPlanBand')}</span>
          <span className="text-caption text-muted-foreground">{t('tchWeek3Of4')}</span>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-1 rounded border border-border p-0.5">
        <Button
          variant={classFilter === 'all' ? 'outline' : 'ghost'}
          size="sm"
          onClick={() => setClassFilter('all')}
        >
          {t('allClasses')}
        </Button>
        {teacherClasses.map((item) => (
          <Button
            key={item.id}
            variant={classFilter === item.id ? 'outline' : 'ghost'}
            size="sm"
            onClick={() => setClassFilter(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-5">
        {days.map((day) => {
          const cards = visible.filter((card) => card.day === day.key)
          return (
            <div key={day.key} className="space-y-2">
              <div
                className={cn(
                  'flex items-baseline justify-between gap-2 rounded px-3 py-2',
                  day.today ? 'bg-foreground text-background' : 'bg-surface',
                )}
              >
                <span className="text-small font-medium">{t(day.labelKey)}</span>
                <span
                  className={cn(
                    'text-caption',
                    day.today ? 'text-background/70' : 'text-muted-foreground',
                  )}
                >
                  {t(day.dateKey)}
                </span>
              </div>

              <div className="space-y-2">
                {cards.map((card, index) => {
                  const classGroup = teacherClasses.find((item) => item.id === card.classId)
                  return (
                    <div
                      key={`${card.day}-${index}`}
                      className={cn('rounded border p-3', kindTone[card.kind])}
                    >
                      <p className="text-small font-medium leading-tight text-foreground">
                        {t(card.titleKey)}
                      </p>
                      <p className="mt-1 text-caption text-muted-foreground">{classGroup?.name}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <Badge variant="outline">{card.standard}</Badge>
                        {card.kind === 'assessment' ? (
                          <Badge variant="accent">{t('tchAssessed')}</Badge>
                        ) : null}
                      </div>
                    </div>
                  )
                })}

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-1.5 rounded border border-dashed border-border py-2.5 text-caption text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden />
                  {t('tchAdd')}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{t('tchStandardsCovered')}</CardTitle>
            <Badge variant="outline">{coveredStandards.length}</Badge>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-1.5">
            {coveredStandards.map((standard) => (
              <Badge key={standard} variant="neutral">
                {standard}
              </Badge>
            ))}
            <Badge variant="outline">{t('tchNotYetCovered').replace('{n}', '6.NF.3')}</Badge>
          </CardContent>
        </Card>

        <Card className="border-accent/40">
          <CardContent className="flex flex-wrap items-center gap-3 p-4">
            <Sparkles className="h-4 w-4 flex-none text-foreground" aria-hidden />
            <span className="min-w-0 flex-1 text-small text-foreground">
              {t('tchPlannerAiHint')}
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/teacher/ai">{t('tchBuildTheLesson')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}
