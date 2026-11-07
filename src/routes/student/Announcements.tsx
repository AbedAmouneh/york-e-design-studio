import { Megaphone, Pin } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { studentAnnouncements } from '@/data/student'

/**
 * Announcements, student view.
 *
 * Read only, and parent-only posts are filtered out. A student should never
 * see a message their teacher addressed to the family about them.
 *
 * There is no reply. Questions for Developer put messaging below announcements
 * in priority, and student initiated messaging to a teacher raises
 * safeguarding questions that belong in a later phase with the policy work
 * done first.
 */
export function StudentAnnouncements() {
  const { t } = useLocale()
  const visible = studentAnnouncements.filter((item) => item.audience !== 'parents')

  return (
    <Page>
      <PageHeader title={t('navAnnouncements')} subtitle={t('stuAnnSubtitle')} />

      <div className="space-y-2">
        {visible.map((item) => (
          <Card key={item.id} className={cn(item.pinned && 'border-accent/50')}>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  {item.pinned ? (
                    <Pin className="h-3.5 w-3.5 text-foreground" aria-hidden />
                  ) : (
                    <Megaphone className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                  )}
                  {item.title}
                </span>
              </CardTitle>
              <span className="ms-auto text-caption text-muted-foreground">{item.postedOn}</span>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-small text-muted-foreground">{item.body}</p>
              <Badge variant="outline">{item.authorName}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-caption text-muted-foreground">{t('stuAnnFamilyNote')}</p>
    </Page>
  )
}
