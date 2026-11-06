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
  const { t } = useLocale()

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
      <PageHeader title={t('navSeats')} subtitle="Across every school" />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Seats sold" value={String(totalSeats)} />
        <StatCard
          label="Seats assigned"
          value={`${Math.round((totalUsed / totalSeats) * 100)}%`}
          hint={`${totalUsed} learners`}
        />
        <StatCard label="Near capacity" value={String(tight.length)} emphasis={tight.length > 0} />
        <StatCard label="Barely used" value={String(idle.length)} emphasis={idle.length > 0} />
      </div>

      {tight.length > 0 ? (
        <Card className="border-accent/50">
          <CardContent className="flex flex-wrap items-center gap-3 p-4">
            <Badge variant="accent">Sales</Badge>
            <span className="min-w-0 flex-1 text-small text-foreground">
              {tight.map((row) => row.school.name).join(', ')} is above 90% of its seats with two
              terms left on the contract.
            </span>
            <Button variant="outline" size="sm">
              Flag to the account team
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {idle.length > 0 ? (
        <Card className="border-warning/40">
          <CardContent className="flex flex-wrap items-center gap-3 p-4">
            <Badge variant="warning">Renewal risk</Badge>
            <span className="min-w-0 flex-1 text-small text-foreground">
              {idle.map((row) => row.school.name).join(', ')} is paying for seats that almost
              nobody is signing in to use. That is a renewal conversation, not a support ticket.
            </span>
            <Button variant="outline" size="sm">
              Open a check in
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>By school</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>School</TableHead>
                <TableHead className="text-end">Seats</TableHead>
                <TableHead className="text-end">Assigned</TableHead>
                <TableHead className="w-44">Assigned</TableHead>
                <TableHead className="w-44">Active weekly</TableHead>
                <TableHead>Flag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.school.id}>
                  <TableCell className="font-medium text-foreground">{row.school.name}</TableCell>
                  <TableCell className="tabular text-end">{row.school.seats}</TableCell>
                  <TableCell className="tabular text-end">{row.school.seatsUsed}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2.5">
                      <span className="h-1.5 w-full max-w-[84px] overflow-hidden rounded-full bg-muted">
                        <span
                          className={cn(
                            'block h-full rounded-full',
                            row.used > 90 ? 'bg-warning' : 'bg-foreground',
                          )}
                          style={{ width: `${Math.min(row.used, 100)}%` }}
                        />
                      </span>
                      <span className="tabular text-caption text-muted-foreground">
                        {row.used}%
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2.5">
                      <span className="h-1.5 w-full max-w-[84px] overflow-hidden rounded-full bg-muted">
                        <span
                          className={cn(
                            'block h-full rounded-full',
                            row.active < 40 ? 'bg-danger' : 'bg-success',
                          )}
                          style={{ width: `${row.active}%` }}
                        />
                      </span>
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
                      <Badge variant="accent">Near capacity</Badge>
                    ) : row.state === 'idle' ? (
                      <Badge variant="danger">Barely used</Badge>
                    ) : (
                      <Badge variant="success">Healthy</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">
        Assigned means a learner holds the seat. Active weekly means they signed in and did
        something. A school can be at 100% assigned and 10% active, and that is the number that
        predicts a renewal.
      </p>
    </Page>
  )
}
