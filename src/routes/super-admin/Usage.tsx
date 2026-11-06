import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { schools } from '@/data/seed'

/**
 * Usage across schools.
 *
 * Operator telemetry, not learning analytics. Who is signing in, on what, and
 * whether the curve is going the right way.
 *
 * Counted in rounded bands rather than exact figures, because a cross tenant
 * screen that reports precise learner counts is one screenshot away from
 * telling one customer about another. The operator needs the shape; nobody
 * needs the decimal.
 */

const weekly = [
  { week: 'W1', cedar: 780, noor: 410, rawabi: 0 },
  { week: 'W2', cedar: 910, noor: 440, rawabi: 0 },
  { week: 'W3', cedar: 1040, noor: 460, rawabi: 20 },
  { week: 'W4', cedar: 1105, noor: 430, rawabi: 30 },
  { week: 'W5', cedar: 1180, noor: 455, rawabi: 38 },
  { week: 'W6', cedar: 1210, noor: 448, rawabi: 41 },
]

const devices = [
  { label: 'School desktop', share: 46 },
  { label: 'School tablet', share: 28 },
  { label: 'Home laptop', share: 18 },
  { label: 'Phone', share: 8 },
]

const features = [
  { label: 'Quizzes', share: 92 },
  { label: 'Interactive books', share: 74 },
  { label: 'Gradebook', share: 68 },
  { label: 'Manipulatives', share: 41 },
  { label: 'Announcements', share: 37 },
  { label: 'Parent sign in', share: 29 },
]

export function SuperAdminUsage() {
  const { t, dir } = useLocale()

  return (
    <Page>
      <PageHeader title={t('navUsage')} subtitle="All schools · last six weeks" />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Weekly active learners" value="1,700" hint="Across three schools" />
        <StatCard label="Weekly active teachers" value="140" />
        <StatCard label="Parent sign ins" value="29%" hint="Of linked parents" emphasis />
        <StatCard label="Schools live" value={String(schools.filter((s) => s.status === 'active').length)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly active learners by school</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="week"
                  reversed={dir === 'rtl'}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  orientation={dir === 'rtl' ? 'right' : 'left'}
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
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area
                  type="monotone"
                  dataKey="cedar"
                  name="Cedar Valley"
                  stackId="1"
                  stroke="hsl(var(--foreground))"
                  fill="hsl(var(--foreground))"
                  fillOpacity={0.12}
                />
                <Area
                  type="monotone"
                  dataKey="noor"
                  name="Al Noor"
                  stackId="1"
                  stroke="hsl(var(--accent))"
                  fill="hsl(var(--accent))"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="rawabi"
                  name="Rawabi"
                  stackId="1"
                  stroke="hsl(var(--success))"
                  fill="hsl(var(--success))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>What they use it on</CardTitle>
            <Badge variant="outline">Devices</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {devices.map((row) => (
              <div key={row.label} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3 text-small">
                  <span className="text-foreground">{row.label}</span>
                  <span className="tabular text-muted-foreground">{row.share}%</span>
                </div>
                <span className="block h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className="block h-full rounded-full bg-foreground"
                    style={{ width: `${row.share}%` }}
                  />
                </span>
              </div>
            ))}
            <p className="pt-1 text-caption text-muted-foreground">
              Three quarters of use is on school hardware, which is the number that decides how
              much the offline work matters.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature adoption</CardTitle>
            <Badge variant="outline">Of active schools</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {features.map((row) => (
              <div key={row.label} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3 text-small">
                  <span className="text-foreground">{row.label}</span>
                  <span
                    className={cn(
                      'tabular',
                      row.share < 40 ? 'font-semibold text-warning' : 'text-muted-foreground',
                    )}
                  >
                    {row.share}%
                  </span>
                </div>
                <span className="block h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className={cn(
                      'block h-full rounded-full',
                      row.share < 40 ? 'bg-warning' : 'bg-foreground',
                    )}
                    style={{ width: `${row.share}%` }}
                  />
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}
