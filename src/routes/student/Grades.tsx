import { Link } from 'react-router-dom'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import { useStudentReleased, useStudentWork } from '@/lib/liveData'
import { cn } from '@/lib/utils'
import { coursesOf, standingOf, upperStudent } from '@/data/student'

/**
 * My grades.
 *
 * The teacher's gradebook and the student's gradebook are the same data and
 * two different products, which is the position already recorded in Questions
 * for Developer. A teacher needs a grid of thirty children to scan. A student
 * needs their own marks with the context that explains them.
 *
 * Nothing held appears here. A student seeing a greyed cell with a lock on it
 * learns only that a number exists and they are not allowed to know it, which
 * is worse than not knowing.
 */
export function StudentGrades() {
  const { t, locale } = useLocale()
  const standing = standingOf(upperStudent)
  const released = useStudentReleased(upperStudent)
  const all = useStudentWork(upperStudent)
  const waiting = all.filter(
    (item) => item.submission && !item.submission.released && item.submission.state !== 'not-started',
  ).length

  const bySubject = coursesOf(upperStudent).map((course) => {
    const rows = released.filter((item) => item.assignment.activityId.startsWith(course.id))
    const average = rows.length
      ? Math.round(
          rows.reduce((sum, row) => sum + (row.submission?.score ?? 0), 0) / rows.length,
        )
      : null
    return { course, rows, average }
  })

  return (
    <Page>
      <PageHeader
        title={t('navMyGrades')}
        subtitle={t('stuGradesSubtitle').replace('{n}', String(released.length))}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <span className="text-small text-muted-foreground">{t('stuAverageLabel')}</span>
          <p className="tabular mt-2 text-display font-semibold leading-none text-foreground">
            {standing?.average}%
          </p>
        </Card>
        <Card className="p-4">
          <span className="text-small text-muted-foreground">{t('stuMarksReleased')}</span>
          <p className="tabular mt-2 text-display font-semibold leading-none text-foreground">
            {released.length}
          </p>
        </Card>
        <Card className="p-4">
          <span className="text-small text-muted-foreground">{t('stuWithYourTeacher')}</span>
          <p className="tabular mt-2 text-display font-semibold leading-none text-foreground">
            {waiting}
          </p>
          <p className="mt-1.5 text-caption text-muted-foreground">{t('stuReleasedNote')}</p>
        </Card>
      </div>

      {bySubject.map(({ course, rows, average }) => (
        <Card key={course.id}>
          <CardHeader>
            <CardTitle>{locale === 'ar' ? course.titleAr : course.title}</CardTitle>
            {average !== null ? (
              <Badge
                variant={average >= 75 ? 'success' : average >= 60 ? 'neutral' : 'danger'}
              >
                {t('stuPercentAverage').replace('{n}', String(average))}
              </Badge>
            ) : (
              <Badge variant="outline">{t('stuNoMarksYet')}</Badge>
            )}
          </CardHeader>
          <CardContent className="px-0 pb-0">
            {rows.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('colActivity')}</TableHead>
                    <TableHead>{t('stuColReturned')}</TableHead>
                    <TableHead className="text-end">{t('stuColMark')}</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => {
                    const score = row.submission?.score ?? 0
                    return (
                      <TableRow key={row.assignment.id}>
                        <TableCell className="font-medium text-foreground">
                          {row.activity
                            ? locale === 'ar'
                              ? row.activity.titleAr
                              : row.activity.title
                            : t('stuActivity')}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {row.submission?.submittedOn}
                        </TableCell>
                        <TableCell
                          className={cn(
                            'tabular text-end font-semibold',
                            score >= 75
                              ? 'text-success'
                              : score >= 60
                                ? 'text-foreground'
                                : 'text-danger',
                          )}
                        >
                          {score}%
                        </TableCell>
                        <TableCell className="text-end">
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/student/quiz/${row.assignment.id}/results`}>
                              {t('stuSeeFeedback')}
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            ) : (
              <p className="px-4 py-8 text-center text-small text-muted-foreground">
                {t('stuNothingMarkedYet')}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </Page>
  )
}
