import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Link } from 'react-router-dom'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { masteryFor, standingOf, upperStudent, visibleWork } from '@/data/student'

/**
 * My progress.
 *
 * The student's own trend, which is the same chart the teacher sees on the
 * student detail screen with one difference: there is no threshold line. A
 * teacher needs to know a child has crossed below the line the school set. The
 * child needs to know whether they are climbing.
 *
 * Skills are shown as practised, getting there and solid rather than as
 * percentages, because a thirteen year old told they are at 42 percent on
 * fractions hears a verdict, not a next step.
 */

const bands = [
  { key: 'solid', label: 'Solid', min: 75, tone: 'bg-success' },
  { key: 'getting', label: 'Getting there', min: 55, tone: 'bg-warning' },
  { key: 'practise', label: 'Worth practising', min: 0, tone: 'bg-danger' },
] as const

function bandFor(value: number) {
  return bands.find((band) => value >= band.min) ?? bands[bands.length - 1]
}

export function StudentProgress() {
  const { t, locale, dir } = useLocale()
  const standing = standingOf(upperStudent)
  const released = visibleWork(upperStudent)
  const skillRows = masteryFor(upperStudent).sort((a, b) => a.record.mastery - b.record.mastery)

  const series = released.slice(0, 8).map((item, index) => ({
    label: item.activity?.title ?? `Task ${index + 1}`,
    score: item.submission?.score ?? 0,
  }))

  const trendLabel =
    standing?.trend === 'rising'
      ? 'You are improving'
      : standing?.trend === 'falling'
        ? 'Slipping a little lately'
        : 'Holding steady'

  return (
    <Page>
      <PageHeader title={t('navProgress')} subtitle="Term 2, how your work has gone" />

      <Card>
        <CardHeader>
          <CardTitle>Your marks over time</CardTitle>
          <Badge
            variant={
              standing?.trend === 'rising'
                ? 'success'
                : standing?.trend === 'falling'
                  ? 'warning'
                  : 'neutral'
            }
          >
            {trendLabel}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="label"
                  reversed={dir === 'rtl'}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  orientation={dir === 'rtl' ? 'right' : 'left'}
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 6,
                    border: '1px solid hsl(var(--border))',
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--foreground))"
                  strokeWidth={2}
                  dot={{ r: 3, fill: 'hsl(var(--accent))', stroke: 'hsl(var(--foreground))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-caption text-muted-foreground">
            Only marks your teacher has released appear here.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What you are good at, and what to practise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {skillRows.map(({ record, skill }) => {
            const band = bandFor(record.mastery)
            return (
              <div key={record.skillId} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-small text-foreground">
                    {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : 'Skill'}
                  </span>
                  <Badge
                    variant={
                      band.key === 'solid'
                        ? 'success'
                        : band.key === 'getting'
                          ? 'warning'
                          : 'danger'
                    }
                  >
                    {band.label}
                  </Badge>
                </div>
                <span className="block h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className={cn('block h-full rounded-full', band.tone)}
                    style={{ width: `${record.mastery}%` }}
                  />
                </span>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card className="border-accent/40">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <span className="min-w-0 flex-1 text-small text-foreground">
            Adding fractions is the one worth practising. Unit 2 has three short questions on it.
          </span>
          <Button variant="outline" size="sm" asChild>
            <Link to="/student/courses">Open Unit 2</Link>
          </Button>
        </CardContent>
      </Card>
    </Page>
  )
}
