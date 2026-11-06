import { useState } from 'react'
import { Megaphone, Pin, Send } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLocale } from '@/lib/i18n'
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
  title: string
  body: string
  audience: string
  postedOn: string
  pinned: boolean
  readBy: number
  total: number
}

const posts: Post[] = [
  {
    id: 'p1',
    title: 'End of unit check on Friday',
    body: 'We finish fractions this week. Friday is a short check on everything from Unit 2, in class, no revision needed beyond the practice we have already done.',
    audience: 'Grade 6 Cedar, Grade 6 Maple',
    postedOn: '9 February',
    pinned: true,
    readBy: 44,
    total: 51,
  },
  {
    id: 'p2',
    title: 'Bring a ruler on Tuesday',
    body: 'We start measuring next week. A ruler with centimetres is enough.',
    audience: 'Grade 2 Olive',
    postedOn: '6 February',
    pinned: false,
    readBy: 19,
    total: 22,
  },
  {
    id: 'p3',
    title: 'Extra practice is open until Sunday',
    body: 'The practice set on common denominators stays open until Sunday night for anyone who wants another go.',
    audience: 'Grade 6 Cedar',
    postedOn: '4 February',
    pinned: false,
    readBy: 24,
    total: 26,
  },
]

export function TeacherAnnouncements() {
  const { t } = useLocale()
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
      last: [
        'Thank you, that explains the mark.',
        'Will she need the textbook at home?',
        'Noted, we will practise over the weekend.',
        'Can we talk at pickup on Thursday?',
        'Thank you for letting us know.',
      ][index],
      unread: index < 2,
      at: ['09:40', 'Yesterday', 'Yesterday', '6 Feb', '4 Feb'][index],
    }
  })

  return (
    <Page>
      <PageHeader
        title={t('navAnnouncements')}
        subtitle="One message to a class, or a private thread with a parent"
      />

      <Tabs defaultValue="announcements">
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="messages">
            Messages
            <Badge variant="warning" className="ms-2">
              2
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Write an announcement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value)
                  setSent(false)
                }}
                placeholder="Title"
              />
              <textarea
                value={body}
                rows={4}
                onChange={(event) => {
                  setBody(event.target.value)
                  setSent(false)
                }}
                placeholder="What do they need to know?"
                className="w-full rounded border border-border bg-background px-3 py-2 text-small text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />

              <div className="space-y-2">
                <span className="text-small font-medium text-foreground">Who sees it</span>
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
                      {item.name}
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
                  <span className="text-small text-foreground">
                    Send to parents as well as students
                  </span>
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
                  Post to {reach} students
                </Button>
                {sent ? (
                  <span className="text-small text-success">
                    Posted. {reach} students{toParents ? ' and their parents' : ''} have been
                    notified.
                  </span>
                ) : (
                  <span className="text-caption text-muted-foreground">
                    Students see it on their dashboard. Parents get it by email as well.
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
                      {post.title}
                    </span>
                  </CardTitle>
                  <span className="ms-auto text-caption text-muted-foreground">
                    {post.postedOn}
                  </span>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-small text-muted-foreground">{post.body}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="outline">{post.audience}</Badge>
                    <span className="flex items-center gap-2 text-caption text-muted-foreground">
                      <span className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                        <span
                          className="block h-full rounded-full bg-foreground"
                          style={{ width: `${(post.readBy / post.total) * 100}%` }}
                        />
                      </span>
                      read by {post.readBy} of {post.total}
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
                        about {thread.about}
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

          <p className="mt-3 text-caption text-muted-foreground">
            Messages are one to one with a parent and always attached to a child, so there is a
            record and nothing happens off the platform.
          </p>
        </TabsContent>
      </Tabs>
    </Page>
  )
}
