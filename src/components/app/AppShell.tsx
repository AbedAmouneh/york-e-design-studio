import { NavLink, Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'
import { initials } from '@/lib/utils'

export interface NavItem {
  to: string
  labelKey: Parameters<ReturnType<typeof useLocale>['t']>[0]
  icon: LucideIcon
  end?: boolean
}

interface AppShellProps {
  nav: NavItem[]
  schoolName: string
  userName: string
  userRole: string
  /**
   * Studio furniture to sit above the navigation, nothing a real user sees.
   *
   * Optional, and only the student shell passes anything, so every other role
   * is unchanged. It sits above the nav rather than below it because a control
   * that changes who you are viewing as belongs before the list of places that
   * person can go, not after it.
   */
  aboveNav?: ReactNode
}

/**
 * The LMS chrome a real user would see, inside a studio tab.
 *
 * Direction B: the sidebar is white with a border, not a black slab. The
 * active item is marked by a yellow inline-start rule, which is the one place
 * the brand colour appears in navigation.
 */
export function AppShell({ nav, schoolName, userName, userRole, aboveNav }: AppShellProps) {
  const { t } = useLocale()

  return (
    <div className="flex h-full bg-surface">
      <aside className="flex w-sidebar flex-none flex-col border-e border-border bg-background">
        <div className="flex h-14 flex-none items-center border-b border-border px-4">
          <span className="truncate text-small font-semibold text-foreground">{schoolName}</span>
        </div>

        {aboveNav ? (
          <div className="flex-none border-b border-border p-3">{aboveNav}</div>
        ) : null}

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {nav.map((item) => {
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
                <span className="truncate">{t(item.labelKey)}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="flex flex-none items-center gap-2.5 border-t border-border p-3">
          <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-muted text-caption font-semibold text-foreground">
            {initials(userName)}
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-small font-medium text-foreground">{userName}</span>
            <span className="truncate text-caption text-muted-foreground">{userRole}</span>
          </span>
        </div>
      </aside>

      <div className="min-w-0 flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
