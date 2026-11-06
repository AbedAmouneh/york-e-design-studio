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
import { cn } from '@/lib/utils'
import { classes, courses, schools, subjects } from '@/data/seed'

/**
 * Course catalogue.
 *
 * What York Press publishes, and the only screen in the platform where the
 * authoring side and the delivery side meet. A course is authored once and
 * licensed to many tenants, so the number that matters is how many schools
 * took it and how many classes actually opened it.
 *
 * The tagging column is uncomfortable on purpose. A course that is published
 * but not tagged cannot feed the skill drill down or adaptive practice, and
 * the operator should be able to see that before a school complains.
 */
export function SuperAdminCatalogue() {
  const { t, locale } = useLocale()

  const rows = courses.map((course) => {
    const schoolsUsing = schools.filter((school) =>
      classes.some(
        (group) => group.schoolId === school.id && group.courseIds.includes(course.id),
      ),
    ).length
    const classesUsing = classes.filter((group) => group.courseIds.includes(course.id)).length
    const activities = course.units.reduce((sum, unit) => sum + unit.activities.length, 0)
    const tagged = course.units
      .flatMap((unit) => unit.activities)
      .filter((activity) => activity.skillIds.length > 0).length
    const subject = subjects.find((item) => item.id === course.subjectId)
    return { course, subject, schoolsUsing, classesUsing, activities, tagged }
  })

  const untagged = rows.filter((row) => row.tagged < row.activities)

  return (
    <Page>
      <PageHeader
        title={t('navCourses')}
        subtitle={`${courses.length} published courses`}
        actions={
          <Button variant="outline" size="sm">
            Open the authoring platform
          </Button>
        }
      />

      {untagged.length > 0 ? (
        <Card className="border-warning/40">
          <CardContent className="flex flex-wrap items-center gap-3 p-4">
            <Badge variant="warning">Metadata</Badge>
            <span className="min-w-0 flex-1 text-small text-foreground">
              {untagged.length} published courses have activities with no skill tags. Those
              activities cannot feed the skill drill down or adaptive practice in any school that
              licenses them.
            </span>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Published</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-end">Grade</TableHead>
                <TableHead className="text-end">Activities</TableHead>
                <TableHead className="w-40">Tagged</TableHead>
                <TableHead className="text-end">Schools</TableHead>
                <TableHead className="text-end">Classes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => {
                const percent = Math.round((row.tagged / Math.max(row.activities, 1)) * 100)
                return (
                  <TableRow key={row.course.id}>
                    <TableCell className="font-medium text-foreground">
                      {locale === 'ar' ? row.course.titleAr : row.course.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.subject
                        ? locale === 'ar'
                          ? row.subject.nameAr
                          : row.subject.name
                        : '—'}
                    </TableCell>
                    <TableCell className="tabular text-end">{row.course.grade}</TableCell>
                    <TableCell className="tabular text-end">{row.activities}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2.5">
                        <span className="h-1.5 w-full max-w-[72px] overflow-hidden rounded-full bg-muted">
                          <span
                            className={cn(
                              'block h-full rounded-full',
                              percent === 100 ? 'bg-success' : 'bg-warning',
                            )}
                            style={{ width: `${percent}%` }}
                          />
                        </span>
                        <span
                          className={cn(
                            'tabular text-caption',
                            percent === 100 ? 'text-muted-foreground' : 'font-semibold text-warning',
                          )}
                        >
                          {percent}%
                        </span>
                      </span>
                    </TableCell>
                    <TableCell className="tabular text-end">{row.schoolsUsing}</TableCell>
                    <TableCell
                      className={cn(
                        'tabular text-end',
                        row.classesUsing === 0 ? 'text-warning' : 'text-muted-foreground',
                      )}
                    >
                      {row.classesUsing}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">
        Schools counts licences. Classes counts actual use. A course licensed by three schools and
        opened by nobody is a content problem, not a sales one.
      </p>
    </Page>
  )
}
