import { useState } from 'react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DatePicker } from '@/components/ui/date-picker'
import {
  CalendarGrid,
  CalendarNotes,
  MonthHeader,
  startOfMonth,
  toISO,
  type CalendarContext,
} from '@/components/ui/calendar'
import { useLocale } from '@/lib/i18n'
// The demo teacher's own classes, so the warning in the aware version fires on
// the real seeded workload rather than a number invented for the comparison.
import { teacherClassIds } from '@/data/teacher'
import { DEFAULT_SCHOOL_ID } from '@/data/seed'
import type { StringKey } from '@/i18n'

/**
 * The calendar, and how it got quiet.
 *
 * The first pass offered three variants that differed in how much the grid
 * knew, and showed that knowledge inside the cells: a tint across Ramadan,
 * strikethrough on closures, dots for workload. The verdict was that the plain
 * one looked right and the clever ones looked cluttered, but that the
 * knowledge was the point. Both halves of that were correct, and together they
 * describe a better component than any of the three.
 *
 * So there are two now. Both grids look the same. One knows nothing, and the
 * other knows everything and keeps it out of the cells: a closed day is
 * dimmed, the month names what it contains in one line underneath, and the
 * field says something only when the date actually chosen is a problem.
 *
 * Try 10 March in the aware one. The grid barely moves and the message is
 * unmissable.
 */

const variants: Array<{
  context: CalendarContext
  titleKey: StringKey
  blurbKey: StringKey
}> = [
  { context: 'plain', titleKey: 'calVariantPlainTitle', blurbKey: 'calVariantPlainBlurb' },
  { context: 'aware', titleKey: 'calVariantAwareTitle', blurbKey: 'calVariantAwareBlurb' },
]

const FEBRUARY_2027 = new Date(2027, 1, 1)

export function DesignCalendar() {
  const { t } = useLocale()
  const [dates, setDates] = useState<Record<string, string>>({
    plain: '2027-02-26',
    aware: '2027-03-10',
  })
  const [month, setMonth] = useState(() => startOfMonth(FEBRUARY_2027))

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

      <div className="grid gap-4 lg:grid-cols-2">
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
                <MonthHeader month={month} onShift={shift} schoolId={DEFAULT_SCHOOL_ID} className="mb-2" />
                <CalendarGrid
                  month={month}
                  selected={new Date(dates[variant.context])}
                  onSelect={(day) =>
                    setDates((current) => ({ ...current, [variant.context]: toISO(day) }))
                  }
                  schoolId={DEFAULT_SCHOOL_ID}
                  classIds={teacherClassIds}
                  context={variant.context}
                />
                <CalendarNotes
                  month={month}
                  schoolId={DEFAULT_SCHOOL_ID}
                  context={variant.context}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('calMonthViewTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-small text-muted-foreground">{t('calMonthViewBlurb')}</p>
          <MonthHeader month={month} onShift={shift} schoolId={DEFAULT_SCHOOL_ID} className="mb-2 max-w-xs" />
          <CalendarGrid
            month={month}
            selected={new Date(dates.aware)}
            onSelect={(day) => setDates((current) => ({ ...current, aware: toISO(day) }))}
            schoolId={DEFAULT_SCHOOL_ID}
            classIds={teacherClassIds}
            context="aware"
            size="full"
          />
        </CardContent>
      </Card>

      {/*
        The reach, and what it paid for.

        Three bugs that two separate hand written grids were both carrying.
        Each of them looked finished: every date was correct, every weekday was
        correct Arabic, and the month navigation looked like month navigation.
        They are listed here because this is the only place anyone meets the
        case for a shared component instead of the assertion.
      */}
      <Card>
        <CardHeader>
          <CardTitle>{t('calAppliedTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          <p className="text-small text-muted-foreground">{t('calAppliedBlurb')}</p>
          <ul className="space-y-2 text-small text-foreground">
            {(['calAppliedBug1', 'calAppliedBug2', 'calAppliedBug3'] as StringKey[]).map((key) => (
              <li key={key} className="flex gap-2">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-border-strong" aria-hidden />
                <span className="min-w-0">{t(key)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-warning/40">
        <CardContent className="flex flex-wrap items-start gap-3 p-4">
          <Badge variant="warning">{t('calLunarTitle')}</Badge>
          <div className="min-w-0 flex-1 space-y-2 text-small text-foreground">
            <p>{t('calLunarBody')}</p>
            <p>{t('calRegionBody')}</p>
          </div>
        </CardContent>
      </Card>
    </Page>
  )
}
