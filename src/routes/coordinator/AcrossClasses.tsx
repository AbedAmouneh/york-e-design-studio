import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'

/**
 * Across my classes.
 *
 * The comparison screen, and the one that needs the most care. Four classes on
 * the same assessment, same questions, same week. Where they diverge, either
 * the teaching diverged or the question was bad, and the coordinator is the
 * only person positioned to tell which.
 *
 * Classes are labelled by class, not by teacher. The teacher's name is one
 * click away on the class itself. That is a small thing that changes how the
 * screen reads in a staff meeting.
 */

const byQuestion: Array<{
  questionKey: StringKey
  cedar: number
  maple: number
  jasmine: number
  laurel: number
}> = [
  { questionKey: 'coQ1Equivalent', cedar: 88, maple: 84, jasmine: 79, laurel: 86 },
  { questionKey: 'coQ2CommonDenom', cedar: 71, maple: 44, jasmine: 68, laurel: 74 },
  { questionKey: 'coQ3Adding', cedar: 66, maple: 41, jasmine: 63, laurel: 70 },
  { questionKey: 'coQ4Explain', cedar: 58, maple: 52, jasmine: 55, laurel: 61 },
  { questionKey: 'coQ5WordProblem', cedar: 74, maple: 69, jasmine: 72, laurel: 77 },
]

const series = [
  { key: 'cedar', label: 'Grade 6 Cedar', colour: 'hsl(var(--foreground))' },
  { key: 'maple', label: 'Grade 6 Maple', colour: 'hsl(var(--warning))' },
  { key: 'jasmine', label: 'Grade 7 Jasmine', colour: 'hsl(var(--muted-foreground))' },
  { key: 'laurel', label: 'Grade 7 Laurel', colour: 'hsl(var(--accent))' },
]

export function CoordinatorAcrossClasses() {
  const { t, dir } = useLocale()

  // Recharts reads its axis labels off the data, so the question names have to
  // be resolved here rather than held translated in the module scope array.
  const chartData = byQuestion.map((row) => ({ ...row, question: t(row.questionKey) }))

  const gaps = byQuestion
    .map((row) => {
      const values = series.map((item) => row[item.key as keyof typeof row] as number)
      return { questionKey: row.questionKey, spread: Math.max(...values) - Math.min(...values) }
    })
    .sort((a, b) => b.spread - a.spread)

  return (
    <Page>
      <PageHeader title={t('navAcrossClasses')} subtitle={t('coAcrossSubtitle')} />

      <Card>
        <CardHeader>
          <CardTitle>{t('coCorrectByQuestion')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={16} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="question"
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
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {series.map((item) => (
                  <Bar key={item.key} dataKey={item.key} name={item.label} fill={item.colour} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('coBiggestGaps')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {gaps.map((row) => (
            <div
              key={row.questionKey}
              className="flex flex-wrap items-center gap-4 rounded border border-border px-4 py-3"
            >
              <span className="min-w-[140px] flex-1 text-small font-medium text-foreground">
                {t(row.questionKey)}
              </span>
              <span className="h-1.5 w-32 flex-none overflow-hidden rounded-full bg-muted">
                <span
                  className={cn(
                    'block h-full rounded-full',
                    row.spread >= 20 ? 'bg-warning' : 'bg-foreground',
                  )}
                  style={{ width: `${Math.min(row.spread * 2.5, 100)}%` }}
                />
              </span>
              <span
                className={cn(
                  'tabular w-28 flex-none text-end text-caption',
                  row.spread >= 20 ? 'font-semibold text-warning' : 'text-muted-foreground',
                )}
              >
                {t('coPointSpread').replace('{n}', String(row.spread))}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-warning/40">
        <CardContent className="flex flex-wrap items-start gap-3 p-4">
          <Badge variant="warning" className="flex-none">
            {t('coWorthALook')}
          </Badge>
          <p className="min-w-0 flex-1 text-small text-foreground">
            {t('coAcrossInsight').replace('{c}', series[1].label)}
          </p>
        </CardContent>
      </Card>
    </Page>
  )
}
