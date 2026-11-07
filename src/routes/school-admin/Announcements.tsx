import { useState } from 'react'
import { Pin, Plus, Send } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { announcements } from '@/data/seed'
import type { Announcement } from '@/types'
import type { StringKey } from '@/i18n'

const audienceKey: Record<Announcement['audience'], StringKey> = {
  school: 'admAudienceSchool',
  class: 'admAudienceClass',
  parents: 'admAudienceParents',
}

export function SchoolAdminAnnouncements() {
  const { t } = useLocale()
  const [composing, setComposing] = useState(false)
  const [posted, setPosted] = useState<Announcement[]>(announcements)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [audience, setAudience] = useState<Announcement['audience']>('school')

  function post() {
    if (!title.trim()) return
    setPosted((current) => [
      {
        id: `ann-${current.length + 1}`,
        schoolId: 'sch-cedar',
        authorId: 'adm-1',
        authorName: 'Nadine Khoury',
        title: title.trim(),
        body: body.trim(),
        audience,
        postedOn: '2027-02-10',
        pinned: false,
      },
      ...current,
    ])
    setTitle('')
    setBody('')
    setComposing(false)
  }

  return (
    <Page>
      <PageHeader
        title={t('navAnnouncements')}
        subtitle={t('admAnnouncementsSubtitle')}
        actions={
          <Button variant="accent" size="sm" onClick={() => setComposing((value) => !value)}>
            <Plus className="h-3.5 w-3.5" aria-hidden />
            {t('admNewAnnouncement')}
          </Button>
        }
      />

      {composing ? (
        <Card>
          <CardHeader>
            <CardTitle>{t('admNewAnnouncement')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={t('admAnnouncementTitle')}
            />
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder={t('admAnnouncementBody')}
              rows={3}
              className="w-full rounded border border-border bg-background px-3 py-2 text-small text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1">
                {(Object.keys(audienceKey) as Announcement['audience'][]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAudience(key)}
                    className={cn(
                      'rounded px-3 py-1.5 text-small font-medium transition-colors',
                      audience === key
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {t(audienceKey[key])}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setComposing(false)}>
                  {t('cancel')}
                </Button>
                <Button variant="accent" size="sm" onClick={post} disabled={!title.trim()}>
                  <Send className="h-3.5 w-3.5" aria-hidden />
                  {t('admPost')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="space-y-3">
        {posted.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {item.pinned ? (
                      <Pin className="h-3.5 w-3.5 text-accent-foreground" aria-hidden />
                    ) : null}
                    <h3 className="text-body font-semibold text-foreground">{item.title}</h3>
                    <Badge variant="outline">{t(audienceKey[item.audience])}</Badge>
                  </div>
                  <p className="mt-1.5 text-small text-muted-foreground">{item.body}</p>
                  <p className="mt-2 text-caption text-muted-foreground">
                    {item.authorName} · {item.postedOn}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="flex-none text-muted-foreground">
                  {t('admEdit')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Page>
  )
}
