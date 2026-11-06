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
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
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
  const { locale, dir } = useLocale()
  const child = childById(childId) ?? children[0]
  const early = isEarly(child)
  const standing = standingOfChild(child)
  const marks = releasedWorkFor(child)

  const series = marks.slice(0, 8).map((item, index) => ({
    label: item.activity?.title ?? `Task ${index + 1}`,
    score: item.submission?.score ?? 0,
  }))

  const skills = masteryFor(child).sort((a, b) => b.record.mastery - a.record.mastery)

  return (
    <Page>
      <PageHeader
        title={`${child.firstName}'s progress`}
        subtitle={early ? 'Term 2, what they can do now' : 'Term 2, marks over time'}
      />

      {early ? (
        <Card>
          <CardHeader>
            <CardTitle>What {child.firstName} can do now</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Counts in tens to 100 without help',
              'Reads a short story aloud and tells you what happened',
              'Names circles, squares and triangles',
              'Writes numbers to 50 the right way round',
            ].map((line) => (
              <div
                key={line}
                className="flex items-start gap-3 rounded border border-border px-4 py-3"
              >
                <Star className="mt-0.5 h-4 w-4 flex-none fill-accent text-accent" aria-hidden />
                <span className="text-small text-foreground">{line}</span>
              </div>
            ))}
            <p className="pt-1 text-caption text-muted-foreground">
              At this age the school reports what a child can do rather than a score. There is no
              chart here on purpose.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Marks over time</CardTitle>
            <Badge
              variant={
                standing?.trend === 'rising'
                  ? 'success'
                  : standing?.trend === 'falling'
                    ? 'warning'
                    : 'neutral'
              }
            >
              {standing?.trend === 'rising'
                ? 'Improving'
                : standing?.trend === 'falling'
                  ? 'Slipping a little'
                  : 'Steady'}
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
              This is {fullNameOf(child)}'s own work over time. It is not compared with anyone else
              in the class.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>By topic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {skills.slice(0, 6).map(({ record, skill }) => {
            const label =
              record.mastery >= 75 ? 'Secure' : record.mastery >= 55 ? 'Getting there' : 'Needs work'
            return (
              <div key={record.skillId} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-small text-foreground">
                    {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : 'Topic'}
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
                <span className="block h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className={cn(
                      'block h-full rounded-full',
                      record.mastery >= 75
                        ? 'bg-success'
                        : record.mastery >= 55
                          ? 'bg-warning'
                          : 'bg-border-strong',
                    )}
                    style={{ width: `${record.mastery}%` }}
                  />
                </span>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </Page>
  )
}
