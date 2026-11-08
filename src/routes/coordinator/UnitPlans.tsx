import { useState } from 'react'
import { Check, GripVertical, Lock, Plus } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { SavedIndicator } from '@/components/ui/toast'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'

/**
 * Unit plans.
 *
 * The coordinator sets the unit, the teacher builds the days inside it. That
 * split comes straight from Questions for Developer and it is the reason this
 * screen exists at all.
 *
 * The lock is the interesting control. Locking a unit fixes the sequence and
 * the assessment date for every class; leaving it open lets each teacher order
 * it themselves. Most schools want the assessment locked and the path open,
 * which is why that is the default here.
 */

interface Unit {
  id: string
  titleKey: StringKey
  weeksKey: StringKey
  standards: string[]
  locked: boolean
  status: 'done' | 'current' | 'planned'
}

const initialUnits: Unit[] = [
  {
    id: 'u1',
    titleKey: 'coUnitPlaceValue',
    weeksKey: 'coWeeksU1',
    standards: ['6.NS.1', '6.NS.2'],
    locked: true,
    status: 'done',
  },
  {
    id: 'u2',
    titleKey: 'coUnitFractions',
    weeksKey: 'coWeeksU2',
    standards: ['6.NF.1', '6.NF.2', '6.NF.3'],
    locked: true,
    status: 'current',
  },
  {
    id: 'u3',
    titleKey: 'coUnitDecimals',
    weeksKey: 'coWeeksU3',
    standards: ['6.NS.3', '6.RP.3'],
    locked: false,
    status: 'planned',
  },
  {
    id: 'u4',
    titleKey: 'coUnitRatio',
    weeksKey: 'coWeeksU4',
    standards: ['6.RP.1', '6.RP.2'],
    locked: false,
    status: 'planned',
  },
]

export function CoordinatorUnitPlans() {
  const { t } = useLocale()
  const [units, setUnits] = useState(initialUnits)
  const [saved, setSaved] = useState(false)

  const toggleLock = (id: string) => {
    setUnits((current) =>
      current.map((unit) => (unit.id === id ? { ...unit, locked: !unit.locked } : unit)),
    )
    setSaved(false)
  }

  return (
    <Page>
      <PageHeader
        title={t('navUnitPlans')}
        subtitle={t('coUnitPlansSubtitle')}
        actions={
          <Button variant="accent" size="sm">
            <Plus className="h-3.5 w-3.5" aria-hidden />
            {t('coAddUnit')}
          </Button>
        }
      />

      <div className="space-y-2">
        {units.map((unit, index) => (
          <Card
            key={unit.id}
            className={cn(unit.status === 'current' && 'border-accent/50')}
          >
            <CardHeader>
              <GripVertical
                className="h-4 w-4 flex-none cursor-grab text-muted-foreground"
                aria-hidden
              />
              <CardTitle>
                <span className="tabular me-2 text-muted-foreground">{index + 1}</span>
                {t(unit.titleKey)}
              </CardTitle>
              {unit.status === 'current' ? (
                <Badge variant="accent">{t('coRunningNow')}</Badge>
              ) : unit.status === 'done' ? (
                <Badge variant="success">
                  <Check className="me-1 h-3 w-3" aria-hidden />
                  {t('coFinished')}
                </Badge>
              ) : (
                <Badge variant="outline">{t('coPlanned')}</Badge>
              )}
              <span className="ms-auto text-caption text-muted-foreground">
                {t(unit.weeksKey)}
              </span>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-caption text-muted-foreground">{t('navStandards')}</span>
                {unit.standards.map((standard) => (
                  <Badge key={standard} variant="neutral">
                    {standard}
                  </Badge>
                ))}
              </div>

              <label className="flex items-center justify-between gap-4 rounded border border-border px-4 py-3">
                <span className="min-w-0 text-small text-foreground">
                  <span className="flex items-center gap-1.5">
                    {unit.locked ? (
                      <Lock className="h-3.5 w-3.5 text-foreground" aria-hidden />
                    ) : null}
                    {t('coLockSequence')}
                  </span>
                  <span className="mt-0.5 block text-caption text-muted-foreground">
                    {unit.locked ? t('coLockedHint') : t('coUnlockedHint')}
                  </span>
                </span>
                <Switch checked={unit.locked} onCheckedChange={() => toggleLock(unit.id)} />
              </label>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="accent" size="sm" onClick={() => setSaved(true)}>
          {t('coPublishToAllClasses')}
        </Button>
        <SavedIndicator saved={saved} label={t('coPublishedNotified')} />
        {saved ? null : (
          <span className="text-caption text-muted-foreground">{t('coPublishHint')}</span>
        )}
      </div>
    </Page>
  )
}
