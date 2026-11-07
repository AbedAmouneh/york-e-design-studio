import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, CalendarClock, Check, Megaphone, MessageSquare, PenLine } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'
import { cn } from '@/lib/utils'

/**
 * Notifications.
 *
 * Questions for Developer put notifications above messaging in priority, and
 * this is what that decision looks like built.
 *
 * Every notification goes somewhere. A notification that announces something
 * and leaves the reader to go and find it has made more work, not less, so
 * each row here is a link to the exact screen that resolves it.
 */

/**
 * The copy is held as keys rather than sentences, because this array is at
 * module scope and the locale is only known inside the component. The strings
 * are resolved at render, so flipping to Arabic reaches these rows too.
 */
interface Item {
  id: string
  icon: typeof Bell
  titleKey: StringKey
  detailKey: StringKey
  atKey: StringKey
  to: string
  unread: boolean
  kind: 'grading' | 'due' | 'message' | 'announcement'
}

const items: Item[] = [
  {
    id: 'n1',
    icon: PenLine,
    titleKey: 'shNotif1Title',
    detailKey: 'shNotif1Detail',
    atKey: 'shNotif1At',
    to: '/teacher/grading',
    unread: true,
    kind: 'grading',
  },
  {
    id: 'n2',
    icon: MessageSquare,
    titleKey: 'shNotif2Title',
    detailKey: 'shNotif2Detail',
    atKey: 'shYesterday',
    to: '/teacher/announcements',
    unread: true,
    kind: 'message',
  },
  {
    id: 'n3',
    icon: CalendarClock,
    titleKey: 'shNotif3Title',
    detailKey: 'shNotif3Detail',
    atKey: 'shYesterday',
    to: '/teacher/calendar',
    unread: false,
    kind: 'due',
  },
  {
    id: 'n4',
    icon: Megaphone,
    titleKey: 'shNotif4Title',
    detailKey: 'shNotif4Detail',
    atKey: 'shNotif4At',
    to: '/teacher/announcements',
    unread: false,
    kind: 'announcement',
  },
  {
    id: 'n5',
    icon: PenLine,
    titleKey: 'shNotif5Title',
    detailKey: 'shNotif5Detail',
    atKey: 'shNotif5At',
    to: '/teacher/planner',
    unread: false,
    kind: 'announcement',
  },
]

type Filter = 'all' | 'unread'

export function SharedNotifications() {
  const { t } = useLocale()
  const [filter, setFilter] = useState<Filter>('all')
  const [read, setRead] = useState<Set<string>>(new Set())

  const isUnread = (item: Item) => item.unread && !read.has(item.id)
  const rows = items.filter((item) => (filter === 'unread' ? isUnread(item) : true))
  const unreadCount = items.filter(isUnread).length

  return (
    <Page>
      <PageHeader
        title={t('navNotifications')}
        subtitle={
          unreadCount > 0
            ? t('shNUnread').replace('{n}', String(unreadCount))
            : t('shNothingUnread')
        }
        actions={
          <Button
            variant="ghost"
            size="sm"
            disabled={unreadCount === 0}
            onClick={() => setRead(new Set(items.map((item) => item.id)))}
          >
            <Check className="h-3.5 w-3.5" aria-hidden />
            {t('shMarkAllRead')}
          </Button>
        }
      />

      <div className="flex items-center gap-1 rounded border border-border p-0.5">
        {(
          [
            { key: 'all', labelKey: 'shFilterAll' },
            { key: 'unread', labelKey: 'shFilterUnread' },
          ] as const
        ).map((option) => (
          <Button
            key={option.key}
            variant={filter === option.key ? 'outline' : 'ghost'}
            size="sm"
            onClick={() => setFilter(option.key)}
          >
            {t(option.labelKey)}
            {option.key === 'unread' && unreadCount > 0 ? (
              <Badge variant="accent" className="ms-1.5">
                {unreadCount}
              </Badge>
            ) : null}
          </Button>
        ))}
      </div>

      <div className="space-y-1.5">
        {rows.map((item) => {
          const Icon = item.icon
          const unread = isUnread(item)
          return (
            <Link
              key={item.id}
              to={item.to}
              onClick={() => setRead((current) => new Set(current).add(item.id))}
              className={cn(
                'flex items-start gap-3 rounded border px-4 py-3.5 transition-colors',
                unread ? 'border-border bg-background' : 'border-border bg-surface',
              )}
            >
              <span
                className={cn(
                  'grid h-9 w-9 flex-none place-items-center rounded-full',
                  unread ? 'bg-muted text-foreground' : 'bg-background text-muted-foreground',
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </span>

              <span className="min-w-0 flex-1 leading-tight">
                <span
                  className={cn(
                    'block text-small',
                    unread ? 'font-medium text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {t(item.titleKey)}
                </span>
                <span className="mt-0.5 block truncate text-caption text-muted-foreground">
                  {t(item.detailKey)}
                </span>
              </span>

              {unread ? (
                <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-accent" aria-hidden />
              ) : null}

              <span className="flex-none text-caption text-muted-foreground">{t(item.atKey)}</span>
            </Link>
          )
        })}

        {rows.length === 0 ? (
          <p className="py-12 text-center text-small text-muted-foreground">
            {t('shAllCaughtUp')}
          </p>
        ) : null}
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Bell className="h-4 w-4 flex-none text-muted-foreground" aria-hidden />
          <span className="min-w-0 flex-1 text-small text-muted-foreground">
            {t('shNotificationsNote')}
          </span>
        </CardContent>
      </Card>
    </Page>
  )
}
