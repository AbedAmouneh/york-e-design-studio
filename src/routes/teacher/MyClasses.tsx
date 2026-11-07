import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, LayoutGrid, Rows3 } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { groupName } from '@/lib/names'
import { cn } from '@/lib/utils'
import {
  atRiskInClass,
  classAverage,
  coursesForClass,
  teacherClasses,
} from '@/data/teacher'

/**
 * My classes.
 *
 * Patrick Prendergast's finding, on 26 June and again on 4 July: a teacher
 * with five classes sees five flat lists of courses and cannot tell which
 * belongs where. He asked for grouping by class and preferred a toggle over a
 * restructured page, so grouping is the default and the flat view is one click
 * away rather than the other way round.
 */

type View = 'by-class' | 'all-courses'

export function TeacherMyClasses() {
  const { t, locale } = useLocale()
  const [view, setView] = useState<View>('by-class')

  const flatCourses = teacherClasses.flatMap((classGroup) =>
    coursesForClass(classGroup.id).map((course) => ({ course, classGroup })),
  )

  return (
    <Page>
      <PageHeader
        title={t('navMyClasses')}
        subtitle={t('tchClassesTerm').replace('{n}', String(teacherClasses.length))}
        actions={
          <div className="flex items-center gap-1 rounded border border-border p-0.5">
            <Button
              variant={view === 'by-class' ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => setView('by-class')}
            >
              <Rows3 className="h-3.5 w-3.5" aria-hidden />
              {t('tchGroupByClass')}
            </Button>
            <Button
              variant={view === 'all-courses' ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => setView('all-courses')}
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
              {t('tchAllCourses')}
            </Button>
          </div>
        }
      />

      {view === 'by-class' ? (
        <div className="space-y-4">
          {teacherClasses.map((classGroup) => {
            const average = classAverage(classGroup.id)
            const atRisk = atRiskInClass(classGroup.id).length
            const classCourses = coursesForClass(classGroup.id)
            const early = classGroup.ageTier === 'early'

            return (
              <Card key={classGroup.id}>
                <CardHeader>
                  <CardTitle>
                    <Link
                      to={`/teacher/classes/${classGroup.id}`}
                      className="underline-offset-4 hover:underline"
                    >
                      {groupName(classGroup, locale)}
                    </Link>
                  </CardTitle>
                  {early ? <Badge variant="outline">{t('tchK1ToG3')}</Badge> : null}
                  <span className="ms-auto flex items-center gap-3 text-caption text-muted-foreground">
                    <span>
                      {t('tchNStudents').replace('{n}', String(classGroup.studentIds.length))}
                    </span>
                    <span className="tabular">
                      {t('tchPercentAverage').replace('{n}', String(average))}
                    </span>
                    {atRisk > 0 ? (
                      <span className="font-semibold text-danger">
                        {atRisk} {t('atRisk').toLowerCase()}
                      </span>
                    ) : null}
                  </span>
                </CardHeader>
                <CardContent className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {classCourses.map((course) => (
                    <Link
                      key={course.id}
                      to={`/teacher/classes/${classGroup.id}/course/${course.id}`}
                      className="flex items-start gap-3 rounded border border-border p-3 transition-colors hover:bg-surface"
                    >
                      <span
                        className={cn(
                          'grid h-9 w-9 flex-none place-items-center rounded',
                          early ? 'bg-learner-surface' : 'bg-muted',
                        )}
                      >
                        <BookOpen className="h-4 w-4 text-foreground" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1 leading-tight">
                        <span className="block truncate text-small font-medium text-foreground">
                          {locale === 'ar' ? course.titleAr : course.title}
                        </span>
                        <span className="block text-caption text-muted-foreground">
                          {t('tchUnitsActivities')
                            .replace('{n}', String(course.units.length))
                            .replace(
                              '{m}',
                              String(
                                course.units.reduce(
                                  (sum, unit) => sum + unit.activities.length,
                                  0,
                                ),
                              ),
                            )}
                        </span>
                      </span>
                    </Link>
                  ))}
                  {classCourses.length === 0 ? (
                    <p className="text-small text-muted-foreground">
                      {t('tchNoCoursesForClass')}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t('tchAllCourses')}</CardTitle>
            <Badge variant="outline">{flatCourses.length}</Badge>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {flatCourses.map(({ course, classGroup }) => (
              <Link
                key={`${classGroup.id}-${course.id}`}
                to={`/teacher/classes/${classGroup.id}/course/${course.id}`}
                className="flex items-start gap-3 rounded border border-border p-3 transition-colors hover:bg-surface"
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded bg-muted">
                  <BookOpen className="h-4 w-4 text-foreground" aria-hidden />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-small font-medium text-foreground">
                    {locale === 'ar' ? course.titleAr : course.title}
                  </span>
                  <span className="block truncate text-caption text-muted-foreground">
                    {groupName(classGroup, locale)}
                  </span>
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>
      )}

      <p className="text-caption text-muted-foreground">{t('tchMyClassesNote')}</p>
    </Page>
  )
}
