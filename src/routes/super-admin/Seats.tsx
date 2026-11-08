import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import { schoolName } from '@/lib/names'
import { cn } from '@/lib/utils'
import { schools, studentsForSchool } from '@/data/seed'

/**
 * Seats and licences.
 *
 * Two different problems on one screen, which is correct because they are the
 * same conversation with a customer. A school running out of seats is a sale.
 * A school paying for seats nobody uses is a renewal at risk.
 *
 * Both are flagged. Only one of them is good news, and the screen does not
 * pretend otherwise.
 */
export function SuperAdminSeats() {
  const { t, locale } = useLocale()

  const rows = schools.map((school) => {
    const used = Math.round((school.seatsUsed / school.seats) * 100)
    const active = school.id === 'sch-cedar' ? 86 : school.id === 'sch-noor' ? 61 : 12
    const state = used > 90 ? 'tight' : active < 40 ? 'idle' : 'healthy'
    return { school, used, active, state, learners: studentsForSchool(school.id).length }
  })

  const tight = rows.filter((row) => row.state === 'tight')
  const idle = rows.filter((row) => row.state === 'idle')
  const totalSeats = schools.reduce((sum, school) => sum + school.seats, 0)
  const totalUsed = schools.reduce((sum, school) => sum + school.seatsUsed, 0)

  return (
    <Page>
      <PageHeader title={t('navSeats')} subtitle={t('saAcrossEverySchool')} />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t('saSeatsSold')} value={String(totalSeats)} />
        <StatCard
          label={t('saSeatsAssigned')}
          value={`${Math.round((totalUsed / totalSeats) * 100)}%`}
          hint={t('saNLearners').replace('{n}', String(totalUsed))}
        />
        <StatCard
          label={t('saNearCapacity')}
          value={String(tight.length)}
          emphasis={tight.length > 0}
        />
        <StatCard
          label={t('saBarelyUsed')}
          value={String(idle.length)}
          emphasis={idle.length > 0}
        />
      </div>

      {tight.length > 0 ? (
        <Card className="border-accent/50">
          <CardContent className="flex flex-wrap items-center gap-3 p-4">
            <Badge variant="accent">{t('saBadgeSales')}</Badge>
            <span className="min-w-0 flex-1 text-small text-foreground">
              {t('saTightNote').replace(
                '{n}',
                tight.map((row) => schoolName(row.school, locale)).join(', '),
              )}
            </span>
            <Button variant="outline" size="sm">
              {t('saFlagAccountTeam')}
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {idle.length > 0 ? (
        <Card className="border-warning/40">
          <CardContent className="flex flex-wrap items-center gap-3 p-4">
            <Badge variant="warning">{t('saRenewalRisk')}</Badge>
            <span className="min-w-0 flex-1 text-small text-foreground">
              {t('saIdleNote').replace(
                '{n}',
                idle.map((row) => schoolName(row.school, locale)).join(', '),
              )}
            </span>
            <Button variant="outline" size="sm">
              {t('saOpenCheckIn')}
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{t('saBySchool')}</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('saColSchool')}</TableHead>
                <TableHead className="text-end">{t('saColSeats')}</TableHead>
                <TableHead className="text-end">{t('saColAssigned')}</TableHead>
                <TableHead className="w-44">{t('saColAssigned')}</TableHead>
                <TableHead className="w-44">{t('saColActiveWeekly')}</TableHead>
                <TableHead>{t('saColFlag')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.school.id}>
                  <TableCell className="font-medium text-foreground">
                    {schoolName(row.school, locale)}
                  </TableCell>
                  <TableCell className="tabular text-end">{row.school.seats}</TableCell>
                  <TableCell className="tabular text-end">{row.school.seatsUsed}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2.5">
                      <Progress
                        value={row.used}
                        label={`${schoolName(row.school, locale)} · ${t('saColAssigned')}`}
                        tone={row.used > 90 ? 'warning' : 'default'}
                        className="max-w-[84px]"
                      />
                      <span className="tabular text-caption text-muted-foreground">
                        {row.used}%
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2.5">
                      <Progress
                        value={row.active}
                        label={`${schoolName(row.school, locale)} · ${t('saColActiveWeekly')}`}
                        tone={row.active < 40 ? 'danger' : 'success'}
                        className="max-w-[84px]"
                      />
                      <span
                        className={cn(
                          'tabular text-caption',
                          row.active < 40 ? 'font-semibold text-danger' : 'text-muted-foreground',
                        )}
                      >
                        {row.active}%
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>
                    {row.state === 'tight' ? (
                      <Badge variant="accent">{t('saNearCapacity')}</Badge>
                    ) : row.state === 'idle' ? (
                      <Badge variant="danger">{t('saBarelyUsed')}</Badge>
                    ) : (
                      <Badge variant="success">{t('saHealthy')}</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">{t('saSeatsNote')}</p>
    </Page>
  )
}
