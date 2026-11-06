import { useState } from 'react'
import { Check, GripVertical, Lock, Plus } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

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
  title: string
  weeks: string
  standards: string[]
  locked: boolean
  status: 'done' | 'current' | 'planned'
}

const initialUnits: Unit[] = [
  {
    id: 'u1',
    title: 'Place value and rounding',
    weeks: '7 Sept to 9 Oct',
    standards: ['6.NS.1', '6.NS.2'],
    locked: true,
    status: 'done',
  },
  {
    id: 'u2',
    title: 'Fractions',
    weeks: '25 Jan to 19 Feb',
    standards: ['6.NF.1', '6.NF.2', '6.NF.3'],
    locked: true,
    status: 'current',
  },
  {
    id: 'u3',
    title: 'Decimals and percentages',
    weeks: '22 Feb to 19 Mar',
    standards: ['6.NS.3', '6.RP.3'],
    locked: false,
    status: 'planned',
  },
  {
    id: 'u4',
    title: 'Ratio and proportion',
    weeks: '19 Apr to 21 May',
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
        subtitle="Mathematics, Grade 6 · applies to all four classes"
        actions={
          <Button variant="accent" size="sm">
            <Plus className="h-3.5 w-3.5" aria-hidden />
            Add a unit
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
                {unit.title}
              </CardTitle>
              {unit.status === 'current' ? (
                <Badge variant="accent">Running now</Badge>
              ) : unit.status === 'done' ? (
                <Badge variant="success">
                  <Check className="me-1 h-3 w-3" aria-hidden />
                  Finished
                </Badge>
              ) : (
                <Badge variant="outline">Planned</Badge>
              )}
              <span className="ms-auto text-caption text-muted-foreground">{unit.weeks}</span>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-caption text-muted-foreground">Standards</span>
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
                    Lock the sequence and the assessment date
                  </span>
                  <span className="mt-0.5 block text-caption text-muted-foreground">
                    {unit.locked
                      ? 'Every class covers this in the same order and sits the check on the same day.'
                      : 'Each teacher orders this unit themselves. The assessment date is still yours.'}
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
          Publish to all classes
        </Button>
        {saved ? (
          <span className="text-small text-success">
            Published. Four teachers have been notified.
          </span>
        ) : (
          <span className="text-caption text-muted-foreground">
            Teachers see changes to a published plan on their planner immediately.
          </span>
        )}
      </div>
    </Page>
  )
}
