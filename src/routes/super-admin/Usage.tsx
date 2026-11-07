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
import type { StringKey } from '@/i18n'
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
  { n: 1, cedar: 780, noor: 410, rawabi: 0 },
  { n: 2, cedar: 910, noor: 440, rawabi: 0 },
  { n: 3, cedar: 1040, noor: 460, rawabi: 20 },
  { n: 4, cedar: 1105, noor: 430, rawabi: 30 },
  { n: 5, cedar: 1180, noor: 455, rawabi: 38 },
  { n: 6, cedar: 1210, noor: 448, rawabi: 41 },
]

const devices: Array<{ labelKey: StringKey; share: number }> = [
  { labelKey: 'saDeviceSchoolDesktop', share: 46 },
  { labelKey: 'saDeviceSchoolTablet', share: 28 },
  { labelKey: 'saDeviceHomeLaptop', share: 18 },
  { labelKey: 'saDevicePhone', share: 8 },
]

const features: Array<{ labelKey: StringKey; share: number }> = [
  { labelKey: 'saFeatQuizzes', share: 92 },
  { labelKey: 'saFeatInteractiveBooks', share: 74 },
  { labelKey: 'saFeatGradebook', share: 68 },
  { labelKey: 'saFeatManipulatives', share: 41 },
  { labelKey: 'saFeatAnnouncements', share: 37 },
  { labelKey: 'saFeatParentSignIn', share: 29 },
]

export function SuperAdminUsage() {
  const { t, dir } = useLocale()

  const weeklyData = weekly.map((row) => ({
    ...row,
    week: t('saWeekLabel').replace('{n}', String(row.n)),
  }))

  return (
    <Page>
      <PageHeader title={t('navUsage')} subtitle={t('saUsageSubtitle')} />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={t('saWeeklyActiveLearners')}
          value="1,700"
          hint={t('saAcrossThreeSchools')}
        />
        <StatCard label={t('saWeeklyActiveTeachers')} value="140" />
        <StatCard
          label={t('saParentSignIns')}
          value="29%"
          hint={t('saOfLinkedParents')}
          emphasis
        />
        <StatCard
          label={t('saSchoolsLive')}
          value={String(schools.filter((s) => s.status === 'active').length)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('saWeeklyBySchool')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
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
            <CardTitle>{t('saWhatTheyUseItOn')}</CardTitle>
            <Badge variant="outline">{t('saDevices')}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {devices.map((row) => (
              <div key={row.labelKey} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3 text-small">
                  <span className="text-foreground">{t(row.labelKey)}</span>
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
            <p className="pt-1 text-caption text-muted-foreground">{t('saDevicesNote')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('saFeatureAdoption')}</CardTitle>
            <Badge variant="outline">{t('saOfActiveSchools')}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {features.map((row) => (
              <div key={row.labelKey} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3 text-small">
                  <span className="text-foreground">{t(row.labelKey)}</span>
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
