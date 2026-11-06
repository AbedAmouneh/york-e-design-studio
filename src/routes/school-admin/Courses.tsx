import { useMemo } from 'react'
import { BookOpen, Plus } from 'lucide-react'
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
import { classesForSchool, courses, DEFAULT_SCHOOL_ID, schools, subjects } from '@/data/seed'

/**
 * Courses and licences in one screen.
 *
 * The features sheet asks for course licences to be managed at school level
 * (2.3.1.6). Licence count and how many are consumed sits next to the course
 * rather than on a separate page, because the decision a school admin makes is
 * always "can I assign this to another class".
 */
export function SchoolAdminCourses() {
  const { t, locale } = useLocale()
  const school = schools.find((item) => item.id === DEFAULT_SCHOOL_ID)!
  const schoolClasses = useMemo(() => classesForSchool(school.id), [school.id])

  const rows = useMemo(
    () =>
      courses.map((course) => {
        const assigned = schoolClasses.filter((item) => item.courseIds.includes(course.id))
        const learners = assigned.reduce((sum, item) => sum + item.studentIds.length, 0)
        const seats = course.grade <= 3 ? 60 : 120
        const subject = subjects.find((item) => item.id === course.subjectId)
        const activities = course.units.reduce((sum, unit) => sum + unit.activities.length, 0)
        return { course, subject, assigned, learners, seats, activities }
      }),
    [schoolClasses],
  )

  return (
    <Page>
      <PageHeader
        title={t('navCourses')}
        subtitle="Imported from the authoring platform. Licences are counted per learner."
        actions={
          <Button variant="accent" size="sm">
            <Plus className="h-3.5 w-3.5" aria-hidden />
            Import a course
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Course catalogue</CardTitle>
          <Badge variant="outline">{courses.length} courses</Badge>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-end">Grade</TableHead>
                <TableHead className="text-end">Activities</TableHead>
                <TableHead>Assigned to</TableHead>
                <TableHead className="w-48">Licences</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => {
                const used = Math.round((row.learners / row.seats) * 100)
                const tight = used > 85
                return (
                  <TableRow key={row.course.id}>
                    <TableCell>
                      <span className="flex items-center gap-2.5">
                        <BookOpen className="h-4 w-4 flex-none text-muted-foreground" aria-hidden />
                        <span className="font-medium text-foreground">
                          {locale === 'ar' ? row.course.titleAr : row.course.title}
                        </span>
                      </span>
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
                    <TableCell className="text-muted-foreground">
                      {row.assigned.length
                        ? row.assigned.map((item) => item.name).join(', ')
                        : 'Not assigned'}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2.5">
                        <span className="h-1.5 w-full max-w-[96px] overflow-hidden rounded-full bg-muted">
                          <span
                            className={cn(
                              'block h-full rounded-full',
                              tight ? 'bg-warning' : 'bg-foreground',
                            )}
                            style={{ width: `${Math.min(used, 100)}%` }}
                          />
                        </span>
                        <span
                          className={cn(
                            'tabular whitespace-nowrap text-caption',
                            tight ? 'font-semibold text-warning' : 'text-muted-foreground',
                          )}
                        >
                          {row.learners} / {row.seats}
                        </span>
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">
        A course cannot be assigned to another class once its licences are used. Buying more goes
        through York Press, which is why the super admin owns the seat count.
      </p>
    </Page>
  )
}
