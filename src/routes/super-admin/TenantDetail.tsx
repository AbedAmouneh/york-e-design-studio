import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, LifeBuoy } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
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
import {
  classesForSchool,
  courses,
  schools,
  studentsForSchool,
  teachersForSchool,
} from '@/data/seed'

/**
 * One tenant.
 *
 * The operator's view of a customer. Contract, seats, what they have licensed
 * and whether anyone is using it.
 *
 * Adoption is the number York Press actually cares about and the one a seat
 * count hides: a school can be fully provisioned, fully paid, and empty. The
 * two figures sit next to each other here for that reason.
 */
export function SuperAdminTenantDetail() {
  const { tenantId = '' } = useParams()
  const { t, locale } = useLocale()

  const school = schools.find((item) => item.id === tenantId) ?? schools[0]
  const learners = studentsForSchool(school.id)
  const staff = teachersForSchool(school.id)
  const groups = classesForSchool(school.id)

  const licensed = courses.slice(0, school.id === 'sch-cedar' ? 6 : 3)
  const seatUse = Math.round((school.seatsUsed / school.seats) * 100)
  const adoption = school.id === 'sch-cedar' ? 86 : school.id === 'sch-noor' ? 61 : 12

  return (
    <Page>
      <PageHeader
        title={school.name}
        subtitle={`${school.city}, ${school.country} · ${school.academicYear}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/super-admin">
                <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                {t('navTenants')}
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/super-admin/support">
                <LifeBuoy className="h-3.5 w-3.5" aria-hidden />
                Support
              </Link>
            </Button>
          </div>
        }
      />

      {school.status !== 'active' ? (
        <Card className="border-warning/40">
          <CardContent className="flex flex-wrap items-center gap-3 p-4">
            <Badge variant="warning">Provisioning</Badge>
            <span className="min-w-0 flex-1 text-small text-foreground">
              Users imported, courses assigned, teachers not yet trained. Nothing here is live to
              learners until the school opens it.
            </span>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Seats used"
          value={`${seatUse}%`}
          hint={`${school.seatsUsed} of ${school.seats}`}
          emphasis={seatUse > 90}
        />
        <StatCard
          label="Weekly adoption"
          value={`${adoption}%`}
          hint="Learners active in the last 7 days"
          emphasis={adoption < 40}
        />
        <StatCard label="Teachers" value={String(staff.length)} />
        <StatCard label="Classes" value={String(groups.length)} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Contract</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-small">
            {[
              ['Plan', 'School licence, annual'],
              ['Seats', `${school.seats}`],
              ['Renews', '1 September 2027'],
              ['Grading scale', school.gradingScale],
              ['Default language', school.locale === 'ar' ? 'Arabic' : 'English'],
              ['Data region', school.country === 'Lebanon' ? 'EU' : 'Gulf'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-border py-2 last:border-0">
                <span className="text-muted-foreground">{label}</span>
                <span className="capitalize text-foreground">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Licensed courses</CardTitle>
            <Badge variant="outline">{licensed.length}</Badge>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-end">Grade</TableHead>
                  <TableHead className="text-end">In use</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {licensed.map((course) => {
                  const inUse = groups.filter((group) => group.courseIds.includes(course.id)).length
                  return (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium text-foreground">
                        {locale === 'ar' ? course.titleAr : course.title}
                      </TableCell>
                      <TableCell className="tabular text-end">{course.grade}</TableCell>
                      <TableCell
                        className={cn(
                          'tabular text-end',
                          inUse === 0 ? 'text-warning' : 'text-muted-foreground',
                        )}
                      >
                        {inUse === 0 ? 'No classes' : `${inUse} classes`}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>People</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="rounded border border-border p-4">
            <span className="text-small text-muted-foreground">Learners</span>
            <p className="tabular mt-1.5 text-subheading font-semibold text-foreground">
              {learners.length}
            </p>
          </div>
          <div className="rounded border border-border p-4">
            <span className="text-small text-muted-foreground">Teachers</span>
            <p className="tabular mt-1.5 text-subheading font-semibold text-foreground">
              {staff.length}
            </p>
          </div>
          <div className="rounded border border-border p-4">
            <span className="text-small text-muted-foreground">Parents linked</span>
            <p className="tabular mt-1.5 text-subheading font-semibold text-foreground">
              {Math.round(learners.length * 0.82)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Page>
  )
}
