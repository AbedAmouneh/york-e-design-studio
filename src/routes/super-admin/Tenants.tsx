import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/input'
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
import { classesForSchool, schools, studentsForSchool, teachersForSchool } from '@/data/seed'

/**
 * Tenants.
 *
 * Every school on the platform. Three here, deliberately in three countries
 * and on three grading scales, because a tenant list where every row is
 * identical proves nothing about isolation.
 *
 * Rawabi Academy is mid provisioning and runs in Arabic. It is the row that
 * makes the RTL work visible from the operator's side.
 */
export function SuperAdminTenants() {
  const { t } = useLocale()
  const [query, setQuery] = useState('')

  const rows = schools
    .map((school) => ({
      school,
      learners: studentsForSchool(school.id).length,
      staff: teachersForSchool(school.id).length,
      groups: classesForSchool(school.id).length,
    }))
    .filter((row) =>
      query
        ? `${row.school.name} ${row.school.city} ${row.school.country}`
            .toLowerCase()
            .includes(query.toLowerCase())
        : true,
    )

  const totalSeats = schools.reduce((sum, school) => sum + school.seats, 0)
  const usedSeats = schools.reduce((sum, school) => sum + school.seatsUsed, 0)

  return (
    <Page>
      <PageHeader
        title={t('navTenants')}
        subtitle="Every school on the platform"
        actions={
          <Button variant="accent" size="sm" asChild>
            <Link to="/super-admin/provision">
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Provision a school
            </Link>
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Schools" value={String(schools.length)} />
        <StatCard
          label="Active"
          value={String(schools.filter((s) => s.status === 'active').length)}
        />
        <StatCard
          label="Seats used"
          value={`${Math.round((usedSeats / totalSeats) * 100)}%`}
          hint={`${usedSeats} of ${totalSeats}`}
        />
        <StatCard label="Countries" value={String(new Set(schools.map((s) => s.country)).size)} />
      </div>

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="max-w-xs">
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('search')}
            />
          </div>

          <div className="-mx-4 -mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Scale</TableHead>
                  <TableHead className="text-end">Learners</TableHead>
                  <TableHead className="w-44">Seats</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => {
                  const used = Math.round((row.school.seatsUsed / row.school.seats) * 100)
                  return (
                    <TableRow key={row.school.id}>
                      <TableCell>
                        <Link
                          to={`/super-admin/tenant/${row.school.id}`}
                          className="font-medium text-foreground underline-offset-4 hover:underline"
                        >
                          {row.school.name}
                        </Link>
                        <span className="block text-caption text-muted-foreground">
                          {row.school.city}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{row.school.country}</TableCell>
                      <TableCell>
                        <Badge variant={row.school.locale === 'ar' ? 'accent' : 'outline'}>
                          {row.school.locale === 'ar' ? 'Arabic' : 'English'}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize text-muted-foreground">
                        {row.school.gradingScale}
                      </TableCell>
                      <TableCell className="tabular text-end">{row.learners}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2.5">
                          <span className="h-1.5 w-full max-w-[84px] overflow-hidden rounded-full bg-muted">
                            <span
                              className={cn(
                                'block h-full rounded-full',
                                used > 90 ? 'bg-warning' : 'bg-foreground',
                              )}
                              style={{ width: `${Math.min(used, 100)}%` }}
                            />
                          </span>
                          <span
                            className={cn(
                              'tabular whitespace-nowrap text-caption',
                              used > 90 ? 'font-semibold text-warning' : 'text-muted-foreground',
                            )}
                          >
                            {row.school.seatsUsed} / {row.school.seats}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={row.school.status === 'active' ? 'success' : 'warning'}
                        >
                          {row.school.status === 'active' ? 'Active' : 'Provisioning'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">
        Each school is a separate tenant. No query on this screen can reach another school's
        learner data, which is the multi-tenancy requirement rather than a display choice.
      </p>
    </Page>
  )
}
