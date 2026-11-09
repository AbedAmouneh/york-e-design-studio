import { useState } from 'react'
import { Megaphone, Pin, Send } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLocale } from '@/lib/i18n'
import { groupName } from '@/lib/names'
import type { StringKey } from '@/i18n'
import { cn, initials } from '@/lib/utils'
import { fullName, teacherClasses } from '@/data/teacher'
import { guardians, students } from '@/data/seed'

/**
 * Announcements and messages.
 *
 * Two different things on purpose. An announcement is one to many and it is
 * what a teacher does most, so it comes first. A message is one to one with a
 * parent, which is rarer and more sensitive.
 *
 * Messaging was deprioritised in Questions for Developer in favour of
 * announcements plus notifications. That is reflected here: the announcement
 * composer is the whole first tab, and messages are a simple thread list
 * rather than a chat product.
 */

interface Post {
  id: string
  titleKey: StringKey
  bodyKey: StringKey
  audience: string
  postedOnKey: StringKey
  pinned: boolean
  readBy: number
  total: number
}

const posts: Post[] = [
  {
    id: 'p1',
    titleKey: 'tchPost1Title',
    bodyKey: 'tchPost1Body',
    audience: 'Grade 6 Cedar, Grade 6 Maple',
    postedOnKey: 'tchPost1Date',
    pinned: true,
    readBy: 44,
    total: 51,
  },
  {
    id: 'p2',
    titleKey: 'tchPost2Title',
    bodyKey: 'tchPost2Body',
    audience: 'Grade 2 Olive',
    postedOnKey: 'tchPost2Date',
    pinned: false,
    readBy: 19,
    total: 22,
  },
  {
    id: 'p3',
    titleKey: 'tchPost3Title',
    bodyKey: 'tchPost3Body',
    audience: 'Grade 6 Cedar',
    postedOnKey: 'tchPost3Date',
    pinned: false,
    readBy: 24,
    total: 26,
  },
]

const threadMessageKeys = [
  'tchThread1',
  'tchThread2',
  'tchThread3',
  'tchThread4',
  'tchThread5',
] as const

const threadTimeKeys = [
  null,
  'tchYesterday',
  'tchYesterday',
  'tchFeb6Short',
  'tchFeb4Short',
] as const

export function TeacherAnnouncements() {
  const { t, locale } = useLocale()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [audience, setAudience] = useState<Set<string>>(new Set([teacherClasses[1].id]))
  const [toParents, setToParents] = useState(false)
  const [sent, setSent] = useState(false)

  const toggle = (id: string) => {
    setSent(false)
    setAudience((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const reach = teacherClasses
    .filter((item) => audience.has(item.id))
    .reduce((total, item) => total + item.studentIds.length, 0)

  const threads = students.slice(0, 5).map((student, index) => {
    const guardian = guardians.find((item) => item.childIds.includes(student.id))
    return {
      id: student.id,
      parent: fullName(guardian),
      about: fullName(student),
      last: t(threadMessageKeys[index]),
      unread: index < 2,
      // The first thread is from this morning, so it keeps a clock time.
      at: threadTimeKeys[index] ? t(threadTimeKeys[index]) : '09:40',
    }
  })

  return (
    <Page>
      <PageHeader
        title={t('navAnnouncements')}
        subtitle={t('tchAnnouncementsSubtitle')}
      />

      <Tabs defaultValue="announcements">
        <TabsList>
          <TabsTrigger value="announcements">{t('navAnnouncements')}</TabsTrigger>
          <TabsTrigger value="messages">
            {t('tchMessages')}
            <Badge variant="warning" className="ms-2">
              2
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('tchWriteAnnouncement')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value)
                  setSent(false)
                }}
                placeholder={t('tchTitle')}
              />
              <Textarea
                value={body}
                rows={4}
                onChange={(event) => {
                  setBody(event.target.value)
                  setSent(false)
                }}
                placeholder={t('tchAnnouncementPlaceholder')}
                aria-label={t('tchAnnouncementPlaceholder')}
              />

              <div className="space-y-2">
                <span className="text-small font-medium text-foreground">{t('tchWhoSeesIt')}</span>
                <div className="flex flex-wrap gap-2">
                  {teacherClasses.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggle(item.id)}
                      className={cn(
                        'rounded-full border px-3 py-1.5 text-caption font-medium transition-colors',
                        audience.has(item.id)
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border text-muted-foreground hover:bg-surface',
                      )}
                    >
                      {groupName(item, locale)}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2.5 pt-1">
                  <Checkbox
                    checked={toParents}
                    onCheckedChange={(checked) => {
                      setToParents(Boolean(checked))
                      setSent(false)
                    }}
                  />
                  <span className="text-small text-foreground">{t('tchSendToParentsToo')}</span>
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
                <Button
                  variant="accent"
                  size="sm"
                  disabled={!title.trim() || audience.size === 0}
                  onClick={() => setSent(true)}
                >
                  <Send className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                  {t('tchPostToNStudents').replace('{n}', String(reach))}
                </Button>
                {sent ? (
                  <span className="text-small text-success">
                    {t(toParents ? 'tchPostedStudentsParents' : 'tchPostedStudents').replace(
                      '{n}',
                      String(reach),
                    )}
                  </span>
                ) : (
                  <span className="text-caption text-muted-foreground">
                    {t('tchAnnouncementHint')}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {posts.map((post) => (
              <Card key={post.id} className={cn(post.pinned && 'border-accent/50')}>
                <CardHeader>
                  <CardTitle>
                    <span className="flex items-center gap-2">
                      {post.pinned ? (
                        <Pin className="h-3.5 w-3.5 text-foreground" aria-hidden />
                      ) : (
                        <Megaphone className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                      )}
                      {t(post.titleKey)}
                    </span>
                  </CardTitle>
                  <span className="ms-auto text-caption text-muted-foreground">
                    {t(post.postedOnKey)}
                  </span>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-small text-muted-foreground">{t(post.bodyKey)}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline">{post.audience}</Badge>
                    <span className="flex items-center gap-2 text-caption text-muted-foreground">
                      <Progress
                        value={(post.readBy / post.total) * 100}
                        label={t('tchReadByOf')
                          .replace('{n}', String(post.readBy))
                          .replace('{m}', String(post.total))}
                        className="w-20 flex-none"
                      />
                      {t('tchReadByOf')
                        .replace('{n}', String(post.readBy))
                        .replace('{m}', String(post.total))}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages" className="pt-4">
          <Card>
            <CardContent className="space-y-1 p-3">
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  type="button"
                  className="flex w-full items-center gap-3 rounded px-3 py-2.5 text-start transition-colors hover:bg-surface"
                >
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-muted text-caption font-semibold text-foreground">
                    {initials(thread.parent)}
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-small font-medium text-foreground">
                        {thread.parent}
                      </span>
                      <span className="flex-none text-caption text-muted-foreground">
                        {t('tchAboutStudent').replace('{n}', thread.about)}
                      </span>
                    </span>
                    <span className="block truncate text-caption text-muted-foreground">
                      {thread.last}
                    </span>
                  </span>
                  {thread.unread ? (
                    <span className="h-2 w-2 flex-none rounded-full bg-accent" aria-hidden />
                  ) : null}
                  <span className="flex-none text-caption text-muted-foreground">{thread.at}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          <p className="mt-3 text-caption text-muted-foreground">{t('tchMessagesNote')}</p>
        </TabsContent>
      </Tabs>
    </Page>
  )
}
