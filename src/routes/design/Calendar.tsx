import { useState } from 'react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DatePicker } from '@/components/ui/date-picker'
import {
  CalendarGrid,
  CalendarLegend,
  MonthHeader,
  startOfMonth,
  type CalendarContext,
} from '@/components/ui/calendar'
import { useLocale } from '@/lib/i18n'
// The demo teacher's own classes, so the due counts in variant C are the real
// seeded workload rather than a number invented for the comparison.
import { teacherClassIds } from '@/data/teacher'
import { DEFAULT_SCHOOL_ID } from '@/data/seed'
import type { StringKey } from '@/i18n'

/**
 * Three calendars, one decision.
 *
 * The variants differ in exactly one way: how much the grid is allowed to know
 * about the school. That was the axis chosen deliberately, because a choice
 * between three skins teaches nothing, while a choice between three levels of
 * intelligence is a product decision with a cost attached to each step.
 *
 * All three share a component. Picking a winner is changing one prop, not
 * deleting two files, which is also why there is no prize for guessing right
 * the first time.
 *
 * The month below each picker is February 2027, chosen because it is the one
 * month in the studio's term where everything collides: Saint Maron, the
 * Hariri memorial, the start of Ramadan and a genuinely busy fortnight of
 * deadlines. A quiet month would have made all three look identical.
 */

const variants: Array<{
  context: CalendarContext
  titleKey: StringKey
  blurbKey: StringKey
  costKey: StringKey
}> = [
  {
    context: 'plain',
    titleKey: 'calVariantPlainTitle',
    blurbKey: 'calVariantPlainBlurb',
    costKey: 'calVariantPlainCost',
  },
  {
    context: 'term',
    titleKey: 'calVariantTermTitle',
    blurbKey: 'calVariantTermBlurb',
    costKey: 'calVariantTermCost',
  },
  {
    context: 'load',
    titleKey: 'calVariantLoadTitle',
    blurbKey: 'calVariantLoadBlurb',
    costKey: 'calVariantLoadCost',
  },
]

const FEBRUARY_2027 = new Date(2027, 1, 1)

export function DesignCalendar() {
  const { t } = useLocale()
  const [dates, setDates] = useState<Record<string, string>>({
    plain: '2027-02-26',
    term: '2027-02-26',
    load: '2027-02-26',
  })
  const [month, setMonth] = useState(() => startOfMonth(FEBRUARY_2027))
  const [monthContext, setMonthContext] = useState<CalendarContext>('load')

  const shift = (by: number) =>
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + by, 1))

  return (
    <Page>
      <PageHeader title={t('calCompareTitle')} subtitle={t('calCompareSubtitle')} />

      <Card className="border-accent/50">
        <CardContent className="flex flex-wrap items-start gap-3 p-4">
          <Badge variant="accent">{t('calWhyTitle')}</Badge>
          <span className="min-w-0 flex-1 text-small text-foreground">{t('calWhyBody')}</span>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        {variants.map((variant) => (
          <Card key={variant.context}>
            <CardHeader>
              <CardTitle>{t(variant.titleKey)}</CardTitle>
              <code className="font-mono text-caption text-muted-foreground">
                context=&quot;{variant.context}&quot;
              </code>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-small text-muted-foreground">{t(variant.blurbKey)}</p>

              <DatePicker
                value={dates[variant.context]}
                onChange={(iso) =>
                  setDates((current) => ({ ...current, [variant.context]: iso }))
                }
                label={t('dsDueDate')}
                placeholder={t('dsPickDate')}
                context={variant.context}
                classIds={teacherClassIds}
              />

              <div className="rounded border border-border p-2.5">
                <MonthHeader month={month} onShift={shift} className="mb-2" />
                <CalendarGrid
                  month={month}
                  selected={new Date(dates[variant.context])}
                  onSelect={(day) =>
                    setDates((current) => ({
                      ...current,
                      [variant.context]: `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`,
                    }))
                  }
                  schoolId={DEFAULT_SCHOOL_ID}
                  classIds={teacherClassIds}
                  context={variant.context}
                />
                <CalendarLegend context={variant.context} />
              </div>

              <p className="flex gap-2 border-t border-border pt-2.5 text-caption text-muted-foreground">
                <span className="flex-none font-semibold uppercase tracking-wide">
                  {t('calCost')}
                </span>
                <span className="min-w-0">{t(variant.costKey)}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('calMonthViewTitle')}</CardTitle>
          <div className="flex items-center gap-1 rounded border border-border-strong p-0.5">
            {variants.map((variant) => (
              <button
                key={variant.context}
                type="button"
                onClick={() => setMonthContext(variant.context)}
                className={
                  monthContext === variant.context
                    ? 'rounded-sm bg-foreground px-2 py-1 text-caption font-medium text-background'
                    : 'rounded-sm px-2 py-1 text-caption font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
                }
              >
                {variant.context}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-small text-muted-foreground">{t('calMonthViewBlurb')}</p>
          <MonthHeader month={month} onShift={shift} className="mb-2 max-w-xs" />
          <CalendarGrid
            month={month}
            selected={new Date(dates[monthContext])}
            onSelect={(day) =>
              setDates((current) => ({
                ...current,
                [monthContext]: `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`,
              }))
            }
            schoolId={DEFAULT_SCHOOL_ID}
            classIds={teacherClassIds}
            context={monthContext}
            size="full"
          />
          <CalendarLegend context={monthContext} />
        </CardContent>
      </Card>

      <Card className="border-warning/40">
        <CardContent className="flex flex-wrap items-start gap-3 p-4">
          <Badge variant="warning">{t('calLunarTitle')}</Badge>
          <span className="min-w-0 flex-1 text-small text-foreground">{t('calLunarBody')}</span>
        </CardContent>
      </Card>
    </Page>
  )
}
