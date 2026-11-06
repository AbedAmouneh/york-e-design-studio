import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  Check,
  FileQuestion,
  Lock,
  PenLine,
  Play,
  Shapes,
} from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { courses } from '@/data/seed'
import { upperStudent, workFor } from '@/data/student'

/**
 * Course player, student view.
 *
 * The same content the teacher browses, read very differently. A teacher is
 * scanning to choose something to assign. A student is looking for the next
 * thing to do, so the course reads as a sequence with one clear next step and
 * everything else subordinate to it.
 *
 * Locked items are shown rather than hidden. A student who can see that unit
 * three exists but is not open yet understands the shape of the term. A
 * student who sees nothing assumes the course is finished.
 */

const kindIcon = {
  lesson: Play,
  'interactive-book': BookOpen,
  quiz: FileQuestion,
  manipulative: Shapes,
  assignment: PenLine,
} as const

export function StudentCoursePlayer() {
  const { courseId = '' } = useParams()
  const { t, locale } = useLocale()
  const course = courses.find((item) => item.id === courseId)
  const [openUnit, setOpenUnit] = useState(course?.units[0]?.id ?? null)

  const myWork = workFor(upperStudent)

  if (!course) {
    return (
      <Page>
        <PageHeader title="Course not found" subtitle="It may not be open for your class." />
        <Button variant="outline" size="sm" asChild>
          <Link to="/student/courses">{t('navMyCourses')}</Link>
        </Button>
      </Page>
    )
  }

  const stateFor = (activityId: string) => {
    const match = myWork.find((item) => item.assignment.activityId === activityId)
    if (!match) return 'open' as const
    if (!match.submission || match.submission.state === 'not-started') return 'todo' as const
    if (match.submission.state === 'needs-grading') return 'submitted' as const
    return match.submission.released ? ('done' as const) : ('submitted' as const)
  }

  const nextUp = course.units
    .flatMap((unit) => unit.activities)
    .find((activity) => stateFor(activity.id) === 'todo')

  return (
    <Page>
      <PageHeader
        title={locale === 'ar' ? course.titleAr : course.title}
        subtitle={`${course.units.length} units`}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/student/courses">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('navMyCourses')}
            </Link>
          </Button>
        }
      />

      {nextUp ? (
        <Card className="border-accent/50">
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-caption uppercase tracking-wide text-muted-foreground">
                Next up
              </span>
              <span className="mt-0.5 block text-small font-medium text-foreground">
                {locale === 'ar' ? nextUp.titleAr : nextUp.title}
              </span>
            </span>
            <Button variant="accent" size="sm" asChild>
              <Link to="/student/assignments">Start</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="space-y-2">
        {course.units.map((unit, unitIndex) => {
          const open = openUnit === unit.id
          const locked = unitIndex > 2
          return (
            <Card key={unit.id} className={cn(locked && 'opacity-70')}>
              <button
                type="button"
                onClick={() => setOpenUnit(open ? null : unit.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-start"
              >
                <span className="min-w-0 flex-1 text-small font-semibold text-foreground">
                  {locale === 'ar' ? unit.titleAr : unit.title}
                </span>
                {locked ? (
                  <Badge variant="outline" className="flex-none">
                    <Lock className="me-1 h-3 w-3" aria-hidden />
                    Opens later
                  </Badge>
                ) : (
                  <Badge variant="outline" className="flex-none">
                    {unit.activities.length} activities
                  </Badge>
                )}
              </button>

              {open ? (
                <CardContent className="space-y-1 pt-0">
                  {unit.activities.map((activity) => {
                    const Icon = kindIcon[activity.kind]
                    const state = locked ? 'locked' : stateFor(activity.id)
                    return (
                      <div
                        key={activity.id}
                        className={cn(
                          'flex items-center gap-3 rounded border px-3 py-2.5',
                          state === 'todo'
                            ? 'border-foreground bg-surface'
                            : 'border-transparent',
                        )}
                      >
                        <span
                          className={cn(
                            'grid h-7 w-7 flex-none place-items-center rounded-full',
                            state === 'done'
                              ? 'bg-success-tint text-success'
                              : 'bg-muted text-muted-foreground',
                          )}
                        >
                          {state === 'done' ? (
                            <Check className="h-3.5 w-3.5" aria-hidden />
                          ) : state === 'locked' ? (
                            <Lock className="h-3.5 w-3.5" aria-hidden />
                          ) : (
                            <Icon className="h-3.5 w-3.5" aria-hidden />
                          )}
                        </span>

                        <span className="min-w-0 flex-1 truncate text-small text-foreground">
                          {locale === 'ar' ? activity.titleAr : activity.title}
                        </span>

                        {state === 'submitted' ? (
                          <Badge variant="outline" className="flex-none">
                            Handed in
                          </Badge>
                        ) : null}

                        {state === 'todo' ? (
                          <Button variant="accent" size="sm" className="flex-none" asChild>
                            <Link to="/student/assignments">Start</Link>
                          </Button>
                        ) : null}
                      </div>
                    )
                  })}
                </CardContent>
              ) : null}
            </Card>
          )
        })}
      </div>

      <p className="text-caption text-muted-foreground">
        Handed in means your teacher has it. A mark appears only once they release it to the class.
      </p>
    </Page>
  )
}
