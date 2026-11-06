import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * Standards coverage.
 *
 * A grid of standard against class, which is the artefact a coordinator is
 * asked for when the ministry or the head of school comes looking. Covered,
 * partly covered, not covered. Nothing finer, because finer than that is a
 * claim the data cannot support.
 *
 * Covered means taught and assessed, not merely mentioned. That distinction is
 * the whole value of the screen, so it is stated on it rather than left to a
 * training session.
 */

type Level = 'covered' | 'partial' | 'none'

const classesShown = ['Grade 6 Cedar', 'Grade 6 Maple', 'Grade 7 Jasmine', 'Grade 7 Laurel']

const rows: Array<{ code: string; label: string; levels: Level[] }> = [
  { code: '6.NS.1', label: 'Place value to millions', levels: ['covered', 'covered', 'covered', 'covered'] },
  { code: '6.NS.2', label: 'Rounding and estimation', levels: ['covered', 'covered', 'covered', 'partial'] },
  { code: '6.NF.1', label: 'Equivalent fractions', levels: ['covered', 'covered', 'partial', 'covered'] },
  { code: '6.NF.2', label: 'Adding and subtracting fractions', levels: ['covered', 'partial', 'partial', 'covered'] },
  { code: '6.NF.3', label: 'Multiplying fractions', levels: ['partial', 'none', 'none', 'partial'] },
  { code: '6.RP.1', label: 'Ratio language', levels: ['none', 'none', 'covered', 'covered'] },
  { code: '6.RP.3', label: 'Percentages in context', levels: ['none', 'none', 'partial', 'none'] },
]

const tone: Record<Level, string> = {
  covered: 'bg-success-tint text-success',
  partial: 'bg-warning-tint text-warning',
  none: 'bg-muted text-muted-foreground',
}

const mark: Record<Level, string> = {
  covered: 'Covered',
  partial: 'Partly',
  none: 'Not yet',
}

export function CoordinatorStandards() {
  const { t } = useLocale()

  const counts = rows.reduce(
    (totals, row) => {
      row.levels.forEach((level) => {
        totals[level] += 1
      })
      return totals
    },
    { covered: 0, partial: 0, none: 0 } as Record<Level, number>,
  )
  const total = counts.covered + counts.partial + counts.none

  return (
    <Page>
      <PageHeader
        title={t('navStandards')}
        subtitle="Mathematics · Term 2 to date"
        actions={
          <Button variant="outline" size="sm">
            {t('export')}
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <span className="text-small text-muted-foreground">Covered</span>
          <p className="tabular mt-2 text-display font-semibold leading-none text-success">
            {Math.round((counts.covered / total) * 100)}%
          </p>
        </Card>
        <Card className="p-4">
          <span className="text-small text-muted-foreground">Partly covered</span>
          <p className="tabular mt-2 text-display font-semibold leading-none text-warning">
            {Math.round((counts.partial / total) * 100)}%
          </p>
        </Card>
        <Card className="p-4">
          <span className="text-small text-muted-foreground">Not yet taught</span>
          <p className="tabular mt-2 text-display font-semibold leading-none text-foreground">
            {Math.round((counts.none / total) * 100)}%
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Standard by class</CardTitle>
          <Badge variant="outline">{rows.length} standards</Badge>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0 pb-0">
          <table className="w-full border-collapse text-small">
            <thead>
              <tr className="border-y border-border bg-surface">
                <th className="min-w-[220px] px-4 py-2.5 text-start font-medium text-muted-foreground">
                  Standard
                </th>
                {classesShown.map((name) => (
                  <th
                    key={name}
                    className="min-w-[120px] px-3 py-2.5 text-center font-medium text-muted-foreground"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.code} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5">
                    <span className="block font-medium text-foreground">{row.code}</span>
                    <span className="block text-caption text-muted-foreground">{row.label}</span>
                  </td>
                  {row.levels.map((level, index) => (
                    <td key={`${row.code}-${index}`} className="px-3 py-2.5 text-center">
                      <span
                        className={cn(
                          'inline-block rounded-full px-2.5 py-0.5 text-caption font-semibold',
                          tone[level],
                        )}
                      >
                        {mark[level]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">
        Covered means taught and assessed. Partly means taught but not yet assessed. A standard
        that was mentioned in a lesson and never tested does not count as covered.
      </p>
    </Page>
  )
}
