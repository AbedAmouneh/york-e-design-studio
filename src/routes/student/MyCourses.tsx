import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/lib/i18n'
import { classOf, coursesOf, upperStudent, visibleWork } from '@/data/student'

/**
 * My courses.
 *
 * Only the courses this student's class has been given. There is no browse,
 * no search across the school and no catalogue, because the teacher decides
 * what is visible and when. That is a product position, not an omission, and
 * it is the one place where the student experience is deliberately narrower
 * than the teacher's.
 */
export function StudentMyCourses() {
  const { t, locale } = useLocale()
  const group = classOf(upperStudent)
  const myCourses = coursesOf(upperStudent)
  const done = visibleWork(upperStudent)

  return (
    <Page>
      <PageHeader
        title={t('navMyCourses')}
        subtitle={`${group?.name} · ${t('stuCoursesThisTerm').replace('{n}', String(myCourses.length))}`}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {myCourses.map((course) => {
          const activityCount = course.units.reduce(
            (sum, unit) => sum + unit.activities.length,
            0,
          )
          const finished = done.filter((item) =>
            item.assignment.activityId.startsWith(course.id),
          ).length
          const percent = Math.min(100, Math.round((finished / Math.max(activityCount, 1)) * 100))

          return (
            <Link
              key={course.id}
              to={`/student/courses/${course.id}`}
              className="flex flex-col gap-3 rounded border border-border bg-background p-4 transition-colors hover:bg-surface"
            >
              <span className="flex items-start gap-3">
                <span className="grid h-10 w-10 flex-none place-items-center rounded bg-muted">
                  <BookOpen className="h-4 w-4 text-foreground" aria-hidden />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block text-small font-medium text-foreground">
                    {locale === 'ar' ? course.titleAr : course.title}
                  </span>
                  <span className="block text-caption text-muted-foreground">
                    {t('stuUnitsActivities')
                      .replace('{n}', String(course.units.length))
                      .replace('{m}', String(activityCount))}
                  </span>
                </span>
              </span>

              <span className="mt-auto space-y-1.5">
                <span className="flex items-center justify-between text-caption">
                  <span className="text-muted-foreground">{t('stuYourProgress')}</span>
                  <span className="tabular text-foreground">{percent}%</span>
                </span>
                <span className="block h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-accent"
                    style={{ width: `${percent}%` }}
                  />
                </span>
              </span>
            </Link>
          )
        })}
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Badge variant="outline">{t('stuWhyShort')}</Badge>
          <p className="min-w-0 flex-1 text-small text-muted-foreground">{t('stuWhyShortBody')}</p>
        </CardContent>
      </Card>
    </Page>
  )
}
