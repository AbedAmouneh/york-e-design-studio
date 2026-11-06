import { useState } from 'react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

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
  label: string
  hint: string
  on: boolean
  rollout?: string
}

const featureFlags: Flag[] = [
  {
    id: 'ai-teacher',
    label: 'AI teacher tools',
    hint: 'Teacher facing only. No student facing AI in this release.',
    on: true,
    rollout: 'Cedar Valley only',
  },
  {
    id: 'adaptive',
    label: 'Rule based adaptive practice',
    hint: 'Tier 1. Needs skill tagging on the course to do anything.',
    on: true,
    rollout: 'All schools',
  },
  {
    id: 'parent-portal',
    label: 'Parent sign in',
    hint: 'Families see released marks and attendance.',
    on: true,
    rollout: 'All schools',
  },
  {
    id: 'offline',
    label: 'Offline desktop app',
    hint: 'Not built. Phase 3 or later.',
    on: false,
    rollout: 'Not available',
  },
]

const compliance: Flag[] = [
  {
    id: 'wcag',
    label: 'WCAG 2.2 AA enforcement',
    hint: 'Blocks publishing content that fails the automated checks.',
    on: true,
  },
  {
    id: 'residency',
    label: 'Data residency by region',
    hint: 'Tenant data stays in the region set at provisioning.',
    on: true,
  },
  {
    id: 'audit',
    label: 'Permanent audit trail',
    hint: 'Grade changes and impersonation cannot be deleted by anyone.',
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
      <PageHeader title={t('navSettings')} subtitle="Applies to every school on the platform" />

      <Card>
        <CardHeader>
          <CardTitle>Feature flags</CardTitle>
          <Badge variant="outline">Reversible</Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          {featureFlags.map((flag) => (
            <label
              key={flag.id}
              className={cn(
                'flex items-center justify-between gap-4 rounded border border-border px-4 py-3',
                flag.rollout === 'Not available' && 'opacity-60',
              )}
            >
              <span className="min-w-0 flex-1 text-small text-foreground">
                {flag.label}
                <span className="mt-0.5 block text-caption text-muted-foreground">
                  {flag.hint}
                </span>
              </span>
              {flag.rollout ? (
                <Badge variant="outline" className="flex-none">
                  {flag.rollout}
                </Badge>
              ) : null}
              <Switch
                checked={flags[flag.id] ?? false}
                disabled={flag.rollout === 'Not available'}
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
          <CardTitle>Compliance</CardTitle>
          <Badge variant="danger">Not ordinary settings</Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          {compliance.map((flag) => (
            <div
              key={flag.id}
              className="flex items-center justify-between gap-4 rounded border border-border bg-surface px-4 py-3"
            >
              <span className="min-w-0 flex-1 text-small text-foreground">
                {flag.label}
                <span className="mt-0.5 block text-caption text-muted-foreground">
                  {flag.hint}
                </span>
              </span>
              <Badge variant="neutral" className="flex-none">
                Locked on
              </Badge>
            </div>
          ))}
          <p className="pt-1 text-caption text-muted-foreground">
            These are shown rather than hidden so an operator can see what is guaranteed. Changing
            any of them is a contractual decision and happens outside the product.
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button variant="accent" size="sm" onClick={() => setSaved(true)}>
          Save
        </Button>
        {saved ? (
          <span className="text-small text-success">Saved. Flags apply within a minute.</span>
        ) : (
          <span className="text-caption text-muted-foreground">
            Flag changes are logged against your account.
          </span>
        )}
      </div>
    </Page>
  )
}
