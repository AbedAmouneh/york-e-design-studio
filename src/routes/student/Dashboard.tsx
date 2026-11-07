import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CalendarClock, Megaphone } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { groupName } from '@/lib/names'
import { useStudentDue, useStudentReleased } from '@/lib/liveData'
import { cn } from '@/lib/utils'
import {
  classOf,
  coursesOf,
  standingOf,
  upperStudent,
} from '@/data/student'
import { studentAnnouncements } from '@/data/student'

/**
 * Student home, Grade 3 and above.
 *
 * Opens on what is due rather than on a score. A dashboard that greets a
 * fourteen year old with their average is telling them something they cannot
 * act on before telling them something they can.
 *
 * There is no at risk label anywhere on the student side at any age. The
 * teacher sees that flag and decides what to do about it. Telling a child they
 * are at risk is a teacher's job, in person, with a plan.
 */
export function StudentDashboard() {
  const { t, locale } = useLocale()
  const group = classOf(upperStudent)
  const standing = standingOf(upperStudent)
  const due = useStudentDue(upperStudent)
  const done = useStudentReleased(upperStudent)
  const myCourses = coursesOf(upperStudent)

  const recent = done.slice(0, 3)

  return (
    <Page>
      <PageHeader
        title={t('stuHello').replace('{n}', upperStudent.firstName)}
        subtitle={`${groupName(group, locale)} · ${t('stuTermWeek')}`}
      />

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Card className="border-accent/40">
          <CardHeader>
            <CardTitle>{t('stuDueThisWeek')}</CardTitle>
            <Badge variant={due.length > 0 ? 'accent' : 'neutral'}>{due.length}</Badge>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {due.slice(0, 4).map((item) => (
              <Link
                key={item.assignment.id}
                to={`/student/quiz/${item.assignment.id}`}
                className="flex items-center gap-3 rounded border border-border px-4 py-3 transition-colors hover:bg-surface"
              >
                <CalendarClock className="h-4 w-4 flex-none text-muted-foreground" aria-hidden />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-small font-medium text-foreground">
                    {item.activity
                      ? locale === 'ar'
                        ? item.activity.titleAr
                        : item.activity.title
                      : t('stuActivity')}
                  </span>
                  <span className="block truncate text-caption text-muted-foreground">
                    {item.course
                      ? locale === 'ar'
                        ? item.course.titleAr
                        : item.course.title
                      : ''}{' '}
                    · {t('stuDueOn').replace('{d}', item.assignment.dueOn)}
                  </span>
                </span>
                <Button variant="outline" size="sm" className="flex-none" asChild>
                  <span>{t('start')}</span>
                </Button>
              </Link>
            ))}
            {due.length === 0 ? (
              <p className="py-8 text-center text-small text-muted-foreground">
                {t('stuNothingDue')}
              </p>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('stuHowYouAreDoing')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="tabular text-display font-semibold leading-none text-foreground">
                {standing?.average}%
              </span>
              <span className="text-small text-muted-foreground">{t('stuAverageThisTerm')}</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-3 text-small">
                <span className="text-muted-foreground">{t('stuWorkCompleted')}</span>
                <span className="tabular text-foreground">{standing?.completion}%</span>
              </div>
              <span className="block h-2 w-full overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-accent"
                  style={{ width: `${standing?.completion ?? 0}%` }}
                />
              </span>
            </div>

            <p className="text-caption text-muted-foreground">{t('stuAverageNote')}</p>

            <Button variant="outline" size="sm" asChild className="w-full">
              <Link to="/student/progress">
                {t('navProgress')}
                <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{t('navMyCourses')}</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/courses">{t('viewAll')}</Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {myCourses.map((course) => (
              <Link
                key={course.id}
                to={`/student/courses/${course.id}`}
                className="flex items-start gap-3 rounded border border-border p-3 transition-colors hover:bg-surface"
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded bg-muted">
                  <BookOpen className="h-4 w-4 text-foreground" aria-hidden />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-small font-medium text-foreground">
                    {locale === 'ar' ? course.titleAr : course.title}
                  </span>
                  <span className="block text-caption text-muted-foreground">
                    {t('stuNUnits').replace('{n}', String(course.units.length))}
                  </span>
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('stuMarksBack')}</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/student/grades">{t('navMyGrades')}</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {recent.map((item) => {
              const score = item.submission?.score ?? 0
              return (
                <Link
                  key={item.assignment.id}
                  to={`/student/quiz/${item.assignment.id}/results`}
                  className="flex items-center gap-3 rounded border border-border px-4 py-2.5 transition-colors hover:bg-surface"
                >
                  <span className="min-w-0 flex-1 truncate text-small text-foreground">
                    {item.activity
                      ? locale === 'ar'
                        ? item.activity.titleAr
                        : item.activity.title
                      : t('stuActivity')}
                  </span>
                  {item.submission?.feedback ? (
                    <Badge variant="outline" className="flex-none">
                      {t('stuFeedback')}
                    </Badge>
                  ) : null}
                  <span
                    className={cn(
                      'tabular flex-none text-small font-semibold',
                      score >= 75 ? 'text-success' : score >= 60 ? 'text-foreground' : 'text-danger',
                    )}
                  >
                    {score}%
                  </span>
                </Link>
              )
            })}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{t('navAnnouncements')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5">
          {studentAnnouncements
            .filter((item) => item.audience !== 'parents')
            .map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded border border-border px-4 py-3"
              >
                <Megaphone className="mt-0.5 h-4 w-4 flex-none text-muted-foreground" aria-hidden />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block text-small font-medium text-foreground">{item.title}</span>
                  <span className="mt-0.5 block text-caption text-muted-foreground">
                    {item.body}
                  </span>
                </span>
                <span className="flex-none text-caption text-muted-foreground">
                  {item.postedOn}
                </span>
              </div>
            ))}
        </CardContent>
      </Card>
    </Page>
  )
}
