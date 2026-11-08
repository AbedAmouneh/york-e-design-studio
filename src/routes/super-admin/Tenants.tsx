import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import { schoolName, schoolSearchText } from '@/lib/names'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'
import { classesForSchool, schools, studentsForSchool, teachersForSchool } from '@/data/seed'
import type { GradingScale, School } from '@/types'

/**
 * Status and grading scale arrive as data, not as display text, so they are
 * mapped to keys here rather than printed raw. Printing them raw is how an
 * Arabic screen ends up saying "provisioning".
 */
const statusKey: Record<School['status'], StringKey> = {
  active: 'saStatusActive',
  provisioning: 'saStatusProvisioning',
  suspended: 'saStatusSuspended',
}

const scaleKey: Record<GradingScale, StringKey> = {
  percentage: 'saScalePercentage',
  letter: 'saScaleLetter',
  band: 'saScaleBand',
}

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
  const { t, locale } = useLocale()
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
        ? schoolSearchText(row.school).toLowerCase().includes(query.toLowerCase())
        : true,
    )

  const totalSeats = schools.reduce((sum, school) => sum + school.seats, 0)
  const usedSeats = schools.reduce((sum, school) => sum + school.seatsUsed, 0)

  return (
    <Page>
      <PageHeader
        title={t('navTenants')}
        subtitle={t('saTenantsSubtitle')}
        actions={
          <Button variant="accent" size="sm" asChild>
            <Link to="/super-admin/provision">
              <Plus className="h-3.5 w-3.5" aria-hidden />
              {t('saProvisionSchool')}
            </Link>
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t('saStatSchools')} value={String(schools.length)} />
        <StatCard
          label={t('saStatActive')}
          value={String(schools.filter((s) => s.status === 'active').length)}
        />
        <StatCard
          label={t('saSeatsUsed')}
          value={`${Math.round((usedSeats / totalSeats) * 100)}%`}
          hint={`${usedSeats} ${t('ofTotal')} ${totalSeats}`}
        />
        <StatCard
          label={t('saStatCountries')}
          value={String(new Set(schools.map((s) => s.country)).size)}
        />
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
                  <TableHead>{t('saColSchool')}</TableHead>
                  <TableHead>{t('saColCountry')}</TableHead>
                  <TableHead>{t('saColLanguage')}</TableHead>
                  <TableHead>{t('saColScale')}</TableHead>
                  <TableHead className="text-end">{t('learners')}</TableHead>
                  <TableHead className="w-44">{t('saColSeats')}</TableHead>
                  <TableHead>{t('colStatus')}</TableHead>
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
                          {schoolName(row.school, locale)}
                        </Link>
                        <span className="block text-caption text-muted-foreground">
                          {locale === 'ar' ? row.school.cityAr : row.school.city}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {locale === 'ar' ? row.school.countryAr : row.school.country}
                      </TableCell>
                      <TableCell>
                        <Badge variant={row.school.locale === 'ar' ? 'accent' : 'outline'}>
                          {t(row.school.locale === 'ar' ? 'saLangArabic' : 'saLangEnglish')}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {t(scaleKey[row.school.gradingScale])}
                      </TableCell>
                      <TableCell className="tabular text-end">{row.learners}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2.5">
                          <Progress
                            value={used}
                            label={`${schoolName(row.school, locale)} · ${t('saColSeats')}`}
                            tone={used > 90 ? 'warning' : 'default'}
                            className="max-w-[84px]"
                          />
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
                          {t(statusKey[row.school.status])}
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

      <p className="text-caption text-muted-foreground">{t('saTenantsNote')}</p>
    </Page>
  )
}
