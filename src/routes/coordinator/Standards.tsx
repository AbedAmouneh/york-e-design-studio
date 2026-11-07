import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { groupName } from '@/lib/names'
import { cn } from '@/lib/utils'
import { classes } from '@/data/seed'
import type { StringKey } from '@/i18n'

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

/**
 * The four classes are held as ids, not as names.
 *
 * Writing the names here would mean a second place where a class is called
 * something, and the column headers would stay English on an Arabic page. Ids
 * resolve against the seed, so a class renamed in one place is renamed
 * everywhere and arrives in whichever language is on screen.
 *
 * The order matters: each row's `levels` array is positional against this list.
 */
const classIdsShown = ['cls-3', 'cls-4', 'cls-5', 'cls-6']

const rows: Array<{ code: string; labelKey: StringKey; levels: Level[] }> = [
  { code: '6.NS.1', labelKey: 'coStdPlaceValueMillions', levels: ['covered', 'covered', 'covered', 'covered'] },
  { code: '6.NS.2', labelKey: 'coStdRounding', levels: ['covered', 'covered', 'covered', 'partial'] },
  { code: '6.NF.1', labelKey: 'coStdEquivalentFractions', levels: ['covered', 'covered', 'partial', 'covered'] },
  { code: '6.NF.2', labelKey: 'coStdAddSubtractFractions', levels: ['covered', 'partial', 'partial', 'covered'] },
  { code: '6.NF.3', labelKey: 'coStdMultiplyingFractions', levels: ['partial', 'none', 'none', 'partial'] },
  { code: '6.RP.1', labelKey: 'coStdRatioLanguage', levels: ['none', 'none', 'covered', 'covered'] },
  { code: '6.RP.3', labelKey: 'coStdPercentagesContext', levels: ['none', 'none', 'partial', 'none'] },
]

const tone: Record<Level, string> = {
  covered: 'bg-success-tint text-success',
  partial: 'bg-warning-tint text-warning',
  none: 'bg-muted text-muted-foreground',
}

const markKey: Record<Level, StringKey> = {
  covered: 'coMarkCovered',
  partial: 'coMarkPartly',
  none: 'coMarkNotYet',
}

export function CoordinatorStandards() {
  const { t, locale } = useLocale()

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
        subtitle={t('coStandardsSubtitle')}
        actions={
          <Button variant="outline" size="sm">
            {t('export')}
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <span className="text-small text-muted-foreground">{t('coMarkCovered')}</span>
          <p className="tabular mt-2 text-display font-semibold leading-none text-success">
            {Math.round((counts.covered / total) * 100)}%
          </p>
        </Card>
        <Card className="p-4">
          <span className="text-small text-muted-foreground">{t('coPartlyCovered')}</span>
          <p className="tabular mt-2 text-display font-semibold leading-none text-warning">
            {Math.round((counts.partial / total) * 100)}%
          </p>
        </Card>
        <Card className="p-4">
          <span className="text-small text-muted-foreground">{t('coNotYetTaught')}</span>
          <p className="tabular mt-2 text-display font-semibold leading-none text-foreground">
            {Math.round((counts.none / total) * 100)}%
          </p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('coStandardByClass')}</CardTitle>
          <Badge variant="outline">
            {t('coNStandards').replace('{n}', String(rows.length))}
          </Badge>
        </CardHeader>
        <CardContent className="overflow-x-auto px-0 pb-0">
          <table className="w-full border-collapse text-small">
            <thead>
              <tr className="border-y border-border bg-surface">
                <th className="min-w-[220px] px-4 py-2.5 text-start font-medium text-muted-foreground">
                  {t('coColStandard')}
                </th>
                {classIdsShown.map((classId) => (
                  <th
                    key={classId}
                    className="min-w-[120px] px-3 py-2.5 text-center font-medium text-muted-foreground"
                  >
                    {groupName(
                      classes.find((group) => group.id === classId),
                      locale,
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.code} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5">
                    <span className="block font-medium text-foreground">{row.code}</span>
                    <span className="block text-caption text-muted-foreground">
                      {t(row.labelKey)}
                    </span>
                  </td>
                  {row.levels.map((level, index) => (
                    <td key={`${row.code}-${index}`} className="px-3 py-2.5 text-center">
                      <span
                        className={cn(
                          'inline-block rounded-full px-2.5 py-0.5 text-caption font-semibold',
                          tone[level],
                        )}
                      >
                        {t(markKey[level])}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">{t('coStandardsNote')}</p>
    </Page>
  )
}
