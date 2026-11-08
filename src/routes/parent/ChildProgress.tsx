import { useParams } from 'react-router-dom'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Star } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useLocale } from '@/lib/i18n'
import { masteryFor } from '@/data/student'
import {
  childById,
  children,
  fullNameOf,
  isEarly,
  releasedWorkFor,
  standingOfChild,
} from '@/data/parent'

/**
 * Progress over time, parent view.
 *
 * For a Grade 6 child this is a line, the same shape the teacher sees.
 *
 * For a Grade 2 child there is no line at all. A trend chart on a seven year
 * old invites a parent to read a slope that is mostly noise, and the honest
 * answer at that age is a short sentence about what they can do now that they
 * could not do in September.
 */
export function ParentChildProgress() {
  const { childId = '' } = useParams()
  const { locale, dir, t } = useLocale()
  const child = childById(childId) ?? children[0]
  const early = isEarly(child)
  const standing = standingOfChild(child)
  const marks = releasedWorkFor(child)

  const series = marks.slice(0, 8).map((item, index) => ({
    label:
      (locale === 'ar' ? item.activity?.titleAr : item.activity?.title) ??
      t('parTaskN').replace('{n}', String(index + 1)),
    score: item.submission?.score ?? 0,
  }))

  const skills = masteryFor(child).sort((a, b) => b.record.mastery - a.record.mastery)

  return (
    <Page>
      <PageHeader
        title={t('parNameProgress').replace('{n}', child.firstName)}
        subtitle={t(early ? 'parProgressSubtitleEarly' : 'parProgressSubtitleUpper')}
      />

      {early ? (
        <Card>
          <CardHeader>
            <CardTitle>{t('parWhatChildCanDoNow').replace('{n}', child.firstName)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(['parCanDo1', 'parCanDo2', 'parCanDo3', 'parCanDo4'] as const).map((key) => (
              <div
                key={key}
                className="flex items-start gap-3 rounded border border-border px-4 py-3"
              >
                <Star className="mt-0.5 h-4 w-4 flex-none fill-accent text-accent" aria-hidden />
                <span className="text-small text-foreground">{t(key)}</span>
              </div>
            ))}
            <p className="pt-1 text-caption text-muted-foreground">{t('parNoChartNote')}</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{t('parMarksOverTime')}</CardTitle>
            <Badge
              variant={
                standing?.trend === 'rising'
                  ? 'success'
                  : standing?.trend === 'falling'
                    ? 'warning'
                    : 'neutral'
              }
            >
              {t(
                standing?.trend === 'rising'
                  ? 'parTrendImproving'
                  : standing?.trend === 'falling'
                    ? 'parTrendSlipping'
                    : 'parTrendSteady',
              )}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={series} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    vertical={false}
                  />
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
              {t('parOwnWorkNote').replace('{n}', fullNameOf(child))}
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t('parByTopic')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {skills.slice(0, 6).map(({ record, skill }) => {
            const label = t(
              record.mastery >= 75
                ? 'parTopicSecure'
                : record.mastery >= 55
                  ? 'parTopicGettingThere'
                  : 'parTopicNeedsWork',
            )
            return (
              <div key={record.skillId} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-small text-foreground">
                    {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : t('parTopic')}
                  </span>
                  <Badge
                    variant={
                      record.mastery >= 75
                        ? 'success'
                        : record.mastery >= 55
                          ? 'warning'
                          : 'neutral'
                    }
                  >
                    {label}
                  </Badge>
                </div>
                <Progress
                  value={record.mastery}
                  label={`${skill ? (locale === 'ar' ? skill.nameAr : skill.name) : t('parTopic')} · ${label}`}
                  // `muted` rather than `default` at the bottom, and never
                  // `danger`. This is a parent reading about their own child:
                  // red is forbidden on this screen and a solid black bar
                  // reads as an accusation, so the lowest band goes quiet
                  // instead of loud.
                  tone={
                    record.mastery >= 75 ? 'success' : record.mastery >= 55 ? 'warning' : 'muted'
                  }
                />
              </div>
            )
          })}
        </CardContent>
      </Card>
    </Page>
  )
}
