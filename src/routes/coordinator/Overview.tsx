import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { classes, standings, teachers } from '@/data/seed'

/**
 * Coordinator overview.
 *
 * Answers the one question a coordinator is accountable for: is my subject
 * being taught at the same standard in every class, and if not, which class
 * and which teacher.
 *
 * The comparison between classes is the point of this role, and it is the one
 * place in the whole studio where comparing teachers to each other is
 * legitimate. It is still shown as coverage and averages rather than a
 * ranking, because the useful follow up is a conversation, not a league table.
 */
export function CoordinatorOverview() {
  const { t } = useLocale()

  const myClasses = classes.filter((item) => item.schoolId === 'sch-cedar' && item.grade >= 6)

  const rows = myClasses.map((group) => {
    const members = group.studentIds
      .map((id) => standings.find((standing) => standing.studentId === id))
      .filter(Boolean)
    const average = members.length
      ? Math.round(members.reduce((sum, item) => sum + (item?.average ?? 0), 0) / members.length)
      : 0
    const atRisk = members.filter((item) => item?.status === 'at-risk').length
    const teacher = teachers.find((item) => group.teacherIds.includes(item.id))
    const coverage = group.id === 'cls-4' ? 62 : group.id === 'cls-5' ? 88 : 81
    return { group, average, atRisk, teacher, coverage, size: members.length }
  })

  const totalLearners = rows.reduce((sum, row) => sum + row.size, 0)
  const totalAtRisk = rows.reduce((sum, row) => sum + row.atRisk, 0)
  const behind = rows.filter((row) => row.coverage < 70)

  return (
    <Page>
      <PageHeader
        title="Mathematics"
        subtitle={`${myClasses.length} classes · ${rows.length} teachers · Term 2, week 5`}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Classes" value={String(myClasses.length)} />
        <StatCard label="Learners" value={String(totalLearners)} />
        <StatCard
          label={t('atRisk')}
          value={String(totalAtRisk)}
          emphasis={totalAtRisk > 0}
          hint="Across all my classes"
        />
        <StatCard
          label="Classes behind plan"
          value={String(behind.length)}
          emphasis={behind.length > 0}
        />
      </div>

      {behind.length > 0 ? (
        <Card className="border-warning/40">
          <CardContent className="flex flex-wrap items-center gap-3 p-4">
            <AlertTriangle className="h-4 w-4 flex-none text-warning" aria-hidden />
            <span className="min-w-0 flex-1 text-small text-foreground">
              {behind.map((row) => row.group.name).join(' and ')} is behind the unit plan with two
              weeks of term left. The end of unit check is set for 12 February in every class.
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/coordinator/unit-plans">Open the unit plan</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>My classes</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/coordinator/classes">
              Compare
              <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {rows.map((row) => (
            <div
              key={row.group.id}
              className="flex flex-wrap items-center gap-4 rounded border border-border px-4 py-3"
            >
              <span className="min-w-[160px] flex-1 leading-tight">
                <span className="block text-small font-medium text-foreground">
                  {row.group.name}
                </span>
                <span className="block text-caption text-muted-foreground">
                  {row.teacher ? `${row.teacher.firstName} ${row.teacher.lastName}` : 'Unassigned'}{' '}
                  · {row.size} learners
                </span>
              </span>

              <span className="flex flex-none items-center gap-2.5">
                <span className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                  <span
                    className={cn(
                      'block h-full rounded-full',
                      row.coverage < 70 ? 'bg-warning' : 'bg-foreground',
                    )}
                    style={{ width: `${row.coverage}%` }}
                  />
                </span>
                <span
                  className={cn(
                    'tabular w-24 text-caption',
                    row.coverage < 70 ? 'font-semibold text-warning' : 'text-muted-foreground',
                  )}
                >
                  {row.coverage}% of plan
                </span>
              </span>

              <span className="tabular w-16 flex-none text-end text-small text-foreground">
                {row.average}%
              </span>

              <span className="flex-none">
                {row.atRisk > 0 ? (
                  <StatusBadge status="at-risk" label={`${row.atRisk} ${t('atRisk').toLowerCase()}`} />
                ) : (
                  <Badge variant="success">On track</Badge>
                )}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">
        Coverage is measured against the unit plan you set, not against what other coordinators are
        doing. Teachers are not ranked against each other anywhere in this role.
      </p>
    </Page>
  )
}
