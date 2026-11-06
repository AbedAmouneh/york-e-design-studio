import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

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

const byQuestion = [
  { question: 'Q1 equivalent', cedar: 88, maple: 84, jasmine: 79, laurel: 86 },
  { question: 'Q2 common denom', cedar: 71, maple: 44, jasmine: 68, laurel: 74 },
  { question: 'Q3 adding', cedar: 66, maple: 41, jasmine: 63, laurel: 70 },
  { question: 'Q4 explain', cedar: 58, maple: 52, jasmine: 55, laurel: 61 },
  { question: 'Q5 word problem', cedar: 74, maple: 69, jasmine: 72, laurel: 77 },
]

const series = [
  { key: 'cedar', label: 'Grade 6 Cedar', colour: 'hsl(var(--foreground))' },
  { key: 'maple', label: 'Grade 6 Maple', colour: 'hsl(var(--warning))' },
  { key: 'jasmine', label: 'Grade 7 Jasmine', colour: 'hsl(var(--muted-foreground))' },
  { key: 'laurel', label: 'Grade 7 Laurel', colour: 'hsl(var(--accent))' },
]

export function CoordinatorAcrossClasses() {
  const { t, dir } = useLocale()

  const gaps = byQuestion
    .map((row) => {
      const values = series.map((item) => row[item.key as keyof typeof row] as number)
      return { question: row.question, spread: Math.max(...values) - Math.min(...values) }
    })
    .sort((a, b) => b.spread - a.spread)

  return (
    <Page>
      <PageHeader
        title={t('navAcrossClasses')}
        subtitle="End of unit check, fractions · sat by all four classes on 12 February"
      />

      <Card>
        <CardHeader>
          <CardTitle>Correct answers by question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byQuestion} barSize={16} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
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
          <CardTitle>Biggest gaps between classes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {gaps.map((row) => (
            <div
              key={row.question}
              className="flex flex-wrap items-center gap-4 rounded border border-border px-4 py-3"
            >
              <span className="min-w-[140px] flex-1 text-small font-medium text-foreground">
                {row.question}
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
                {row.spread} point spread
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-warning/40">
        <CardContent className="flex flex-wrap items-start gap-3 p-4">
          <Badge variant="warning" className="flex-none">
            Worth a look
          </Badge>
          <p className="min-w-0 flex-1 text-small text-foreground">
            Questions 2 and 3 both sit around 30 points below the other classes in Grade 6 Maple,
            and both depend on common denominators. That class is also behind the unit plan, so the
            likely explanation is sequence rather than teaching.
          </p>
        </CardContent>
      </Card>
    </Page>
  )
}
