import { useState } from 'react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'

/**
 * Platform settings.
 *
 * Operator level switches that apply to every tenant. Two kinds, and the
 * screen keeps them apart on purpose.
 *
 *   Feature flags, which are reversible and exist so a capability can be
 *   turned on for one school at a time rather than for everyone at once.
 *
 *   Compliance settings, which are not casual switches. Those are marked and
 *   state what turning them off actually means, because the honest answer is
 *   usually that you cannot sell into that market any more.
 */

interface Flag {
  id: string
  labelKey: StringKey
  hintKey: StringKey
  on: boolean
  rolloutKey?: StringKey
}

const featureFlags: Flag[] = [
  {
    id: 'ai-teacher',
    labelKey: 'saFlagAiTeacher',
    hintKey: 'saFlagAiTeacherHint',
    on: true,
    rolloutKey: 'saRolloutCedarOnly',
  },
  {
    id: 'adaptive',
    labelKey: 'saFlagAdaptive',
    hintKey: 'saFlagAdaptiveHint',
    on: true,
    rolloutKey: 'saRolloutAll',
  },
  {
    id: 'parent-portal',
    labelKey: 'saFlagParentPortal',
    hintKey: 'saFlagParentPortalHint',
    on: true,
    rolloutKey: 'saRolloutAll',
  },
  {
    id: 'offline',
    labelKey: 'saFlagOffline',
    hintKey: 'saFlagOfflineHint',
    on: false,
    rolloutKey: 'saRolloutNotAvailable',
  },
]

const compliance: Flag[] = [
  {
    id: 'wcag',
    labelKey: 'saCompWcag',
    hintKey: 'saCompWcagHint',
    on: true,
  },
  {
    id: 'residency',
    labelKey: 'saCompResidency',
    hintKey: 'saCompResidencyHint',
    on: true,
  },
  {
    id: 'audit',
    labelKey: 'saCompAudit',
    hintKey: 'saCompAuditHint',
    on: true,
  },
]

export function SuperAdminSettings() {
  const { t } = useLocale()
  const [flags, setFlags] = useState(
    Object.fromEntries(featureFlags.map((flag) => [flag.id, flag.on])),
  )
  const [saved, setSaved] = useState(false)

  return (
    <Page>
      <PageHeader title={t('navSettings')} subtitle={t('saSettingsSubtitle')} />

      <Card>
        <CardHeader>
          <CardTitle>{t('saFeatureFlags')}</CardTitle>
          <Badge variant="outline">{t('saReversible')}</Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          {featureFlags.map((flag) => (
            <label
              key={flag.id}
              className={cn(
                'flex items-center justify-between gap-4 rounded border border-border px-4 py-3',
                flag.rolloutKey === 'saRolloutNotAvailable' && 'opacity-60',
              )}
            >
              <span className="min-w-0 flex-1 text-small text-foreground">
                {t(flag.labelKey)}
                <span className="mt-0.5 block text-caption text-muted-foreground">
                  {t(flag.hintKey)}
                </span>
              </span>
              {flag.rolloutKey ? (
                <Badge variant="outline" className="flex-none">
                  {t(flag.rolloutKey)}
                </Badge>
              ) : null}
              <Switch
                checked={flags[flag.id] ?? false}
                disabled={flag.rolloutKey === 'saRolloutNotAvailable'}
                onCheckedChange={() => {
                  setFlags((current) => ({ ...current, [flag.id]: !current[flag.id] }))
                  setSaved(false)
                }}
              />
            </label>
          ))}
        </CardContent>
      </Card>

      <Card className="border-danger/30">
        <CardHeader>
          <CardTitle>{t('saCompliance')}</CardTitle>
          <Badge variant="danger">{t('saNotOrdinarySettings')}</Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          {compliance.map((flag) => (
            <div
              key={flag.id}
              className="flex items-center justify-between gap-4 rounded border border-border bg-surface px-4 py-3"
            >
              <span className="min-w-0 flex-1 text-small text-foreground">
                {t(flag.labelKey)}
                <span className="mt-0.5 block text-caption text-muted-foreground">
                  {t(flag.hintKey)}
                </span>
              </span>
              <Badge variant="neutral" className="flex-none">
                {t('saLockedOn')}
              </Badge>
            </div>
          ))}
          <p className="pt-1 text-caption text-muted-foreground">{t('saComplianceNote')}</p>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button variant="accent" size="sm" onClick={() => setSaved(true)}>
          {t('save')}
        </Button>
        {saved ? (
          <span className="text-small text-success">{t('saSavedFlags')}</span>
        ) : (
          <span className="text-caption text-muted-foreground">{t('saFlagChangesLogged')}</span>
        )}
      </div>
    </Page>
  )
}
