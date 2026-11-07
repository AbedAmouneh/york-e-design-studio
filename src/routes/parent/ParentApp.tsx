import { NavLink, Outlet, useParams } from 'react-router-dom'
import {
  CalendarCheck,
  FileText,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Settings,
  TrendingUp,
} from 'lucide-react'
import { cn, initials } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'
import { schoolName } from '@/lib/names'
import { children, fullNameOf, isEarly, parentName } from '@/data/parent'
import { DEFAULT_SCHOOL_ID, schools } from '@/data/seed'
import { Badge } from '@/components/ui/badge'

/**
 * Parent shell.
 *
 * The child switcher is the navigation. A parent does not think in features,
 * they think in children, so who they are looking at sits above everything
 * else and the section links are scoped underneath it.
 *
 * With one child the switcher would be noise, so it only appears when there is
 * more than one. The demo parent has two for exactly that reason.
 */
export function ParentApp() {
  const { childId } = useParams()
  const { t, locale } = useLocale()
  const active = children.find((child) => child.id === childId) ?? children[0]

  /*
    Read from the seed rather than written in place. The sidebar used to carry
    the literal "Cedar Valley School", which stayed English on an Arabic page.
    Resolved the same way the staff shells resolve theirs, so the parent view
    and the teacher view can never drift apart on the name of the same school.
  */
  const school = schools.find((item) => item.id === DEFAULT_SCHOOL_ID)!

  /*
    Labelled with the child's name rather than "My progress". A parent is
    looking at somebody else, so the possessive belongs to the child. Arabic
    builds that possessive the other way round, so the whole label is one
    phrase with the name interpolated rather than a name plus a suffix.
  */
  const sections = [
    { to: `/parent/child/${active.id}`, label: t('navOverview'), icon: LayoutDashboard, end: true },
    {
      to: `/parent/child/${active.id}/progress`,
      label: t('parNameProgress').replace('{n}', active.firstName),
      icon: TrendingUp,
    },
    {
      to: `/parent/child/${active.id}/work`,
      label: t('parNameWork').replace('{n}', active.firstName),
      icon: FileText,
    },
    { to: `/parent/child/${active.id}/attendance`, label: t('navAttendance'), icon: CalendarCheck },
  ]

  const general = [
    { to: '/parent/messages', label: t('parMessages'), icon: MessageSquare },
    { to: '/parent/announcements', label: t('navAnnouncements'), icon: Megaphone },
    { to: '/parent/settings', label: t('navNotifications'), icon: Settings },
  ]

  return (
    <div className="flex h-full bg-surface">
      <aside className="flex w-sidebar flex-none flex-col border-e border-border bg-background">
        <div className="flex h-14 flex-none items-center border-b border-border px-4">
          <span className="truncate text-small font-semibold text-foreground">
            {schoolName(school, locale)}
          </span>
        </div>

        <div className="flex-none space-y-1 border-b border-border p-3">
          <p className="px-1 pb-1 text-caption font-medium uppercase tracking-wide text-muted-foreground">
            {t('parMyChildren')}
          </p>
          {children.map((child) => (
            <NavLink
              key={child.id}
              to={`/parent/child/${child.id}`}
              className={cn(
                'flex items-center gap-2.5 rounded px-2.5 py-2 transition-colors',
                child.id === active.id ? 'bg-muted' : 'hover:bg-muted',
              )}
            >
              <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-surface text-caption font-semibold text-foreground">
                {initials(fullNameOf(child))}
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-small font-medium text-foreground">
                  {child.firstName}
                </span>
                <span className="truncate text-caption text-muted-foreground">
                  {isEarly(child) ? t('parGrade2') : t('parGrade6')}
                </span>
              </span>
            </NavLink>
          ))}
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {sections.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 rounded px-3 py-2 text-small font-medium transition-colors',
                    isActive
                      ? 'bg-muted text-foreground shadow-[inset_2px_0_0_0_hsl(var(--accent))] rtl:shadow-[inset_-2px_0_0_0_hsl(var(--accent))]'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )
                }
              >
                <Icon className="h-4 w-4 flex-none" aria-hidden />
                <span className="truncate">{item.label}</span>
              </NavLink>
            )
          })}

          <div className="my-2 h-px bg-border" aria-hidden />

          {general.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 rounded px-3 py-2 text-small font-medium transition-colors',
                    isActive
                      ? 'bg-muted text-foreground shadow-[inset_2px_0_0_0_hsl(var(--accent))] rtl:shadow-[inset_-2px_0_0_0_hsl(var(--accent))]'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )
                }
              >
                <Icon className="h-4 w-4 flex-none" aria-hidden />
                <span className="truncate">{item.label}</span>
                {item.to === '/parent/messages' ? (
                  <Badge variant="accent" className="ms-auto">
                    1
                  </Badge>
                ) : null}
              </NavLink>
            )
          })}
        </nav>

        <div className="flex flex-none items-center gap-2.5 border-t border-border p-3">
          <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-muted text-caption font-semibold text-foreground">
            {initials(parentName)}
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-small font-medium text-foreground">{parentName}</span>
            <span className="truncate text-caption text-muted-foreground">{t('tabParent')}</span>
          </span>
        </div>
      </aside>

      <div className="min-w-0 flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
