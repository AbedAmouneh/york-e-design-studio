import { useState } from 'react'
import { Send } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, initials } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'
import { useFamilyMessages } from '@/lib/liveData'
import type { StringKey } from '@/i18n'
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

/*
  The staff name on a thread is data and stays as written. Everything the
  school says is copy, so it is held as a key and resolved at render time.
*/
interface Message {
  id: string
  from: 'school' | 'me'
  author: string
  bodyKey: StringKey
  atKey: StringKey
}

const thread: Message[] = [
  {
    id: 'm1',
    from: 'school',
    author: 'Ziad Mansour',
    bodyKey: 'parMsg1Body',
    atKey: 'parMsgAt1',
  },
  {
    id: 'm2',
    from: 'me',
    author: parentName,
    bodyKey: 'parMsg2Body',
    atKey: 'parMsgAt2',
  },
  {
    id: 'm3',
    from: 'school',
    author: 'Ziad Mansour',
    bodyKey: 'parMsg3Body',
    atKey: 'parMsgAt3',
  },
]

interface Thread {
  id: string
  staff: string | null
  staffKey: StringKey | null
  roleKey: StringKey
  about: (typeof children)[number]
  unread: boolean
}

const threads: Thread[] = [
  {
    id: 't1',
    staff: 'Ziad Mansour',
    staffKey: null,
    roleKey: 'parRoleClassTeacher',
    about: children[0],
    unread: true,
  },
  {
    id: 't2',
    staff: null,
    staffKey: 'parSchoolOffice',
    roleKey: 'parRoleAdministration',
    about: children[1],
    unread: false,
  },
]

export function ParentMessages() {
  const { t } = useLocale()
  const [active, setActive] = useState(threads[0].id)
  const [draft, setDraft] = useState('')
  const [sent, setSent] = useState(false)

  const current = threads.find((item) => item.id === active) ?? threads[0]

  /*
   * Anything the teacher sent from the at risk bulk bar, newest first and
   * above the sample thread. This is the third of the three propagations: the
   * message exists here because it was sent two screens ago, not because it
   * was seeded.
   */
  const live = useFamilyMessages(children.map((child) => child.id))
  const staffNameOf = (item: Thread) => item.staff ?? t(item.staffKey as StringKey)

  return (
    <Page>
      <PageHeader title={t('parMessages')} subtitle={t('parMessagesSubtitle')} />

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
                  {initials(staffNameOf(item))}
                </span>
                <span className="flex min-w-0 flex-1 flex-col leading-tight">
                  <span className="truncate text-small font-medium text-foreground">
                    {staffNameOf(item)}
                  </span>
                  <span className="truncate text-caption text-muted-foreground">
                    {t('parAboutChild').replace('{n}', item.about.firstName)}
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
                  {staffNameOf(current)}
                </span>
                <span className="block text-caption text-muted-foreground">
                  {t('parRoleAboutChild')
                    .replace('{t}', t(current.roleKey))
                    .replace('{n}', current.about.firstName)}
                </span>
              </span>
              <Badge variant="outline">{t('parKeptOnRecord')}</Badge>
            </div>

            <div className="space-y-3">
              {live.map((message) => (
                <div
                  key={message.id}
                  className="max-w-[80%] rounded border border-accent/50 bg-background p-3.5"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-caption font-semibold text-foreground">
                      {message.from}
                    </span>
                    <span className="text-caption text-muted-foreground">{t('parJustNow')}</span>
                  </div>
                  <p className="mt-1.5 text-small text-foreground">
                    {t(message.bodyKey as StringKey)}
                  </p>
                </div>
              ))}
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
                    <span className="text-caption text-muted-foreground">{t(message.atKey)}</span>
                  </div>
                  <p className="mt-1.5 text-small text-foreground">
                    {t(message.bodyKey).replace('{n}', children[0].firstName)}
                  </p>
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
                placeholder={t('parReplyTo').replace('{n}', staffNameOf(current))}
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
                  {t('parSend')}
                </Button>
                {sent ? (
                  <span className="text-small text-success">{t('parSentNote')}</span>
                ) : (
                  <span className="text-caption text-muted-foreground">{t('parReplyHours')}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}
