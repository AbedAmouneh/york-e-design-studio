import { useState } from 'react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
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
  label: string
  hint: string
  locked?: boolean
}

const settings: Setting[] = [
  {
    id: 'absence',
    label: 'My child is marked absent',
    hint: 'Sent the same morning. This cannot be turned off.',
    locked: true,
  },
  { id: 'marks', label: 'Work is marked and returned', hint: 'Sent when the teacher releases it.' },
  { id: 'due', label: 'Something is due tomorrow', hint: 'One reminder the evening before.' },
  { id: 'messages', label: 'A teacher messages me', hint: 'Sent straight away.' },
  { id: 'announcements', label: 'School announcements', hint: 'Sent when posted.' },
  { id: 'weekly', label: 'Weekly summary', hint: 'One email on Friday afternoon.' },
]

export function ParentSettings() {
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
      <PageHeader title="Notifications" subtitle={`Signed in as ${parentName}`} />

      <Card>
        <CardHeader>
          <CardTitle>How to reach you</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {(
            [
              { key: 'email', label: 'Email only' },
              { key: 'app', label: 'In the app only' },
              { key: 'both', label: 'Both' },
            ] as const
          ).map((option) => (
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
              {option.label}
            </button>
          ))}
        </CardContent>
      </Card>

      {children.map((child) => (
        <Card key={child.id}>
          <CardHeader>
            <CardTitle>{fullNameOf(child)}</CardTitle>
            <Badge variant="outline">{child.ageTier === 'early' ? 'Grade 2' : 'Grade 6'}</Badge>
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
                    {setting.label}
                    <span className="mt-0.5 block text-caption text-muted-foreground">
                      {setting.hint}
                    </span>
                  </span>
                  {setting.locked ? (
                    <Badge variant="neutral" className="flex-none">
                      Always on
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
          Save
        </Button>
        {saved ? (
          <span className="text-small text-success">Saved.</span>
        ) : (
          <span className="text-caption text-muted-foreground">
            Settings apply per child, not to your whole account.
          </span>
        )}
      </div>
    </Page>
  )
}
