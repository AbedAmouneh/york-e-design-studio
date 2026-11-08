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
import { Progress } from '@/components/ui/progress'
import { useLocale } from '@/lib/i18n'
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
  { key: 'solid', labelKey: 'stuBandSolid', min: 75, tone: 'success' },
  { key: 'getting', labelKey: 'stuBandGetting', min: 55, tone: 'warning' },
  { key: 'practise', labelKey: 'stuBandPractise', min: 0, tone: 'danger' },
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
    label:
      (locale === 'ar' ? item.activity?.titleAr : item.activity?.title) ??
      t('stuTaskN').replace('{n}', String(index + 1)),
    score: item.submission?.score ?? 0,
  }))

  const trendLabel =
    standing?.trend === 'rising'
      ? t('stuTrendRising')
      : standing?.trend === 'falling'
        ? t('stuTrendFalling')
        : t('stuTrendSteady')

  return (
    <Page>
      <PageHeader title={t('navProgress')} subtitle={t('stuProgressSubtitle')} />

      <Card>
        <CardHeader>
          <CardTitle>{t('stuMarksOverTime')}</CardTitle>
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
          <p className="mt-2 text-caption text-muted-foreground">{t('stuOnlyReleasedNote')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('stuGoodAtTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {skillRows.map(({ record, skill }) => {
            const band = bandFor(record.mastery)
            return (
              <div key={record.skillId} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-small text-foreground">
                    {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : t('stuSkill')}
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
                    {t(band.labelKey)}
                  </Badge>
                </div>
                <Progress
                  value={record.mastery}
                  label={`${skill ? (locale === 'ar' ? skill.nameAr : skill.name) : t('stuSkill')} · ${t(band.labelKey)}`}
                  tone={band.tone}
                />
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card className="border-accent/40">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <span className="min-w-0 flex-1 text-small text-foreground">{t('stuPractiseHint2')}</span>
          <Button variant="outline" size="sm" asChild>
            <Link to="/student/courses">{t('stuOpenUnit2')}</Link>
          </Button>
        </CardContent>
      </Card>
    </Page>
  )
}
