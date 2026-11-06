import { NavLink, Outlet } from 'react-router-dom'
import { Home, Sparkles, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { classOf, earlyStudent, standingOf } from '@/data/student'

/**
 * Student, K1 to Grade 3.
 *
 * A different shell, not a restyled one. A seven year old does not read a
 * sidebar of eight items, so there are three large targets along the bottom,
 * where a thumb sits on a tablet.
 *
 * Everything inside this tree is wrapped in learner-scope, which swaps the
 * palette to Direction C and the corner radius to the softer one. Scoping it
 * here rather than at the root is the whole point: the warm palette cannot
 * leak into a staff screen by accident.
 */

const tabs = [
  { to: '/student/early', label: 'Home', icon: Home, end: true },
  { to: '/student/early/activities', label: 'My work', icon: Sparkles },
  { to: '/student/early/stickers', label: 'My stickers', icon: Star },
]

export function EarlyApp() {
  const standing = standingOf(earlyStudent)
  const group = classOf(earlyStudent)

  return (
    <div className="learner-scope flex h-full flex-col bg-background">
      <header className="flex flex-none items-center gap-4 px-6 py-5">
        <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-primary text-[18px] font-bold text-primary-foreground">
          {earlyStudent.firstName.charAt(0)}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block text-subheading font-semibold text-foreground">
            Hello, {earlyStudent.firstName}
          </span>
          <span className="block text-small text-muted-foreground">{group?.name}</span>
        </span>

        {/*
          A star count, never a score. This is the only number anywhere in the
          early tier, and it only ever goes up.
        */}
        <span className="flex flex-none items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
          <Star className="h-5 w-5 fill-primary text-primary" aria-hidden />
          <span className="tabular text-subheading font-semibold text-foreground">
            {(standing?.stars ?? 1) * 9}
          </span>
        </span>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-6 pb-4">
        <Outlet />
      </main>

      <nav className="flex flex-none items-center justify-around gap-2 border-t border-border bg-background px-4 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                cn(
                  'flex min-w-[96px] flex-col items-center gap-1.5 rounded-xl px-5 py-2.5 transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-surface',
                )
              }
            >
              <Icon className="h-6 w-6" aria-hidden />
              <span className="text-small font-medium">{tab.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
