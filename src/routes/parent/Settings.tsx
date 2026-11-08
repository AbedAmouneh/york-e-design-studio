import { useState } from 'react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { SavedIndicator } from '@/components/ui/toast'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'
import { children, fullNameOf, parentName } from '@/data/parent'

/**
 * Notification settings.
 *
 * Per child, not per account. A parent with a Grade 2 child and a Grade 6
 * child wants daily absence alerts for the little one and nothing like it for
 * the older one, and a single global toggle forces them to choose.
 *
 * Absence alerts cannot be switched off. Everything else here is a preference;
 * that one is how a school tells a family their child is not in the building.
 */

interface Setting {
  id: string
  labelKey: StringKey
  hintKey: StringKey
  locked?: boolean
}

const settings: Setting[] = [
  {
    id: 'absence',
    labelKey: 'parNotifAbsence',
    hintKey: 'parNotifAbsenceHint',
    locked: true,
  },
  { id: 'marks', labelKey: 'parNotifMarks', hintKey: 'parNotifMarksHint' },
  { id: 'due', labelKey: 'parNotifDue', hintKey: 'parNotifDueHint' },
  { id: 'messages', labelKey: 'parNotifMessages', hintKey: 'parNotifMessagesHint' },
  { id: 'announcements', labelKey: 'parNotifAnnouncements', hintKey: 'parNotifAnnouncementsHint' },
  { id: 'weekly', labelKey: 'parNotifWeekly', hintKey: 'parNotifWeeklyHint' },
]

const channels = [
  { key: 'email', labelKey: 'parChannelEmail' },
  { key: 'app', labelKey: 'parChannelApp' },
  { key: 'both', labelKey: 'parChannelBoth' },
] as const

export function ParentSettings() {
  const { t } = useLocale()
  const [prefs, setPrefs] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    children.forEach((child) => {
      settings.forEach((setting) => {
        initial[`${child.id}-${setting.id}`] = setting.id !== 'weekly'
      })
    })
    return initial
  })
  const [channel, setChannel] = useState<'email' | 'app' | 'both'>('both')
  const [saved, setSaved] = useState(false)

  const toggle = (key: string) => {
    setPrefs((current) => ({ ...current, [key]: !current[key] }))
    setSaved(false)
  }

  return (
    <Page>
      <PageHeader
        title={t('navNotifications')}
        subtitle={t('parSignedInAs').replace('{n}', parentName)}
      />

      <Card>
        <CardHeader>
          <CardTitle>{t('parHowToReachYou')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {channels.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => {
                setChannel(option.key)
                setSaved(false)
              }}
              className={cn(
                'rounded border px-4 py-2.5 text-small transition-colors',
                channel === option.key
                  ? 'border-foreground bg-surface text-foreground'
                  : 'border-border text-muted-foreground hover:bg-surface',
              )}
            >
              {t(option.labelKey)}
            </button>
          ))}
        </CardContent>
      </Card>

      {children.map((child) => (
        <Card key={child.id}>
          <CardHeader>
            <CardTitle>{fullNameOf(child)}</CardTitle>
            <Badge variant="outline">
              {child.ageTier === 'early' ? t('parGrade2') : t('parGrade6')}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            {settings.map((setting) => {
              const key = `${child.id}-${setting.id}`
              return (
                <label
                  key={key}
                  className="flex items-center justify-between gap-4 rounded border border-border px-4 py-3"
                >
                  <span className="min-w-0 text-small text-foreground">
                    {t(setting.labelKey)}
                    <span className="mt-0.5 block text-caption text-muted-foreground">
                      {t(setting.hintKey)}
                    </span>
                  </span>
                  {setting.locked ? (
                    <Badge variant="neutral" className="flex-none">
                      {t('parAlwaysOn')}
                    </Badge>
                  ) : (
                    <Switch checked={prefs[key] ?? false} onCheckedChange={() => toggle(key)} />
                  )}
                </label>
              )
            })}
          </CardContent>
        </Card>
      ))}

      <div className="flex items-center gap-3">
        <Button variant="accent" size="sm" onClick={() => setSaved(true)}>
          {t('save')}
        </Button>
        <SavedIndicator saved={saved} label={t('saved')} />
        {saved ? null : (
          <span className="text-caption text-muted-foreground">{t('parSettingsNote')}</span>
        )}
      </div>
    </Page>
  )
}
