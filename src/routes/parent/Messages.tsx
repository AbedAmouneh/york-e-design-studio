import { useState } from 'react'
import { Send } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, initials } from '@/lib/utils'
import { children, parentName } from '@/data/parent'

/**
 * Messages from school.
 *
 * Every thread is attached to a child and to a member of staff. There is no
 * open compose, so a parent cannot start an unattached conversation with
 * anyone in the school, and every message sits on a record the school can see.
 *
 * That constraint is a safeguarding position rather than a feature decision,
 * and it is why this screen is a thread list and not an inbox.
 */

interface Message {
  id: string
  from: 'school' | 'me'
  author: string
  body: string
  at: string
}

const thread: Message[] = [
  {
    id: 'm1',
    from: 'school',
    author: 'Ziad Mansour',
    body: 'Good afternoon. Just to let you know we are starting fractions this week. Ibrahim found the first lesson tricky, which is completely normal at this point. Ten minutes of practice at home would make a real difference.',
    at: 'Yesterday, 15:40',
  },
  {
    id: 'm2',
    from: 'me',
    author: parentName,
    body: 'Thank you for letting us know. We will go over it this weekend.',
    at: 'Yesterday, 19:02',
  },
  {
    id: 'm3',
    from: 'school',
    author: 'Ziad Mansour',
    body: 'That is great, thank you. There are three short practice questions set in the app if it helps.',
    at: 'Today, 09:12',
  },
]

const threads = [
  { id: 't1', staff: 'Ziad Mansour', role: 'Class teacher', about: children[0], unread: true },
  { id: 't2', staff: 'School office', role: 'Administration', about: children[1], unread: false },
]

export function ParentMessages() {
  const [active, setActive] = useState(threads[0].id)
  const [draft, setDraft] = useState('')
  const [sent, setSent] = useState(false)

  const current = threads.find((item) => item.id === active) ?? threads[0]

  return (
    <Page>
      <PageHeader title="Messages" subtitle="From your children's teachers and the school office" />

      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <Card className="h-fit">
          <CardContent className="space-y-1 p-3">
            {threads.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item.id)}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded px-2.5 py-2.5 text-start transition-colors',
                  item.id === active ? 'bg-muted' : 'hover:bg-surface',
                )}
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-surface text-caption font-semibold text-foreground">
                  {initials(item.staff)}
                </span>
                <span className="flex min-w-0 flex-1 flex-col leading-tight">
                  <span className="truncate text-small font-medium text-foreground">
                    {item.staff}
                  </span>
                  <span className="truncate text-caption text-muted-foreground">
                    about {item.about.firstName}
                  </span>
                </span>
                {item.unread ? (
                  <span className="h-2 w-2 flex-none rounded-full bg-accent" aria-hidden />
                ) : null}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-small font-semibold text-foreground">
                  {current.staff}
                </span>
                <span className="block text-caption text-muted-foreground">
                  {current.role} · about {current.about.firstName}
                </span>
              </span>
              <Badge variant="outline">Kept on record</Badge>
            </div>

            <div className="space-y-3">
              {thread.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'max-w-[80%] rounded border p-3.5',
                    message.from === 'me'
                      ? 'ms-auto border-border bg-surface'
                      : 'border-border bg-background',
                  )}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-caption font-semibold text-foreground">
                      {message.author}
                    </span>
                    <span className="text-caption text-muted-foreground">{message.at}</span>
                  </div>
                  <p className="mt-1.5 text-small text-foreground">{message.body}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-border pt-4">
              <textarea
                value={draft}
                rows={3}
                onChange={(event) => {
                  setDraft(event.target.value)
                  setSent(false)
                }}
                placeholder={`Reply to ${current.staff}`}
                className="w-full rounded border border-border bg-background px-3 py-2 text-small text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <div className="flex items-center gap-3">
                <Button
                  variant="accent"
                  size="sm"
                  disabled={!draft.trim()}
                  onClick={() => {
                    setSent(true)
                    setDraft('')
                  }}
                >
                  <Send className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                  Send
                </Button>
                {sent ? (
                  <span className="text-small text-success">Sent. Teachers reply in school hours.</span>
                ) : (
                  <span className="text-caption text-muted-foreground">
                    Teachers reply during school hours, Monday to Friday.
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}
