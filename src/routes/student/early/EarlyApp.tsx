import { Link, NavLink, Outlet } from 'react-router-dom'
import { CircleHelp, Home, Sparkles, Star } from 'lucide-react'
import { TierSwitch } from '@/components/studio/TierSwitch'
import { useLocale } from '@/lib/i18n'
import { groupName } from '@/lib/names'
import { cn } from '@/lib/utils'
import { classOf, earlyStudent, standingOf } from '@/data/student'
import type { StringKey } from '@/i18n'

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

const tabs: Array<{ to: string; labelKey: StringKey; icon: typeof Home; end?: boolean }> = [
  { to: '/student/early', labelKey: 'erlHome', icon: Home, end: true },
  { to: '/student/early/activities', labelKey: 'erlMyWork', icon: Sparkles },
  { to: '/student/early/stickers', labelKey: 'erlMyStickers', icon: Star },
]

export function EarlyApp() {
  const { t, locale } = useLocale()
  const standing = standingOf(earlyStudent)
  const group = classOf(earlyStudent)

  return (
    <div className="flex h-full flex-col bg-surface-sunken">
      {/*
        The tier switch, and the one thing on this screen a child never sees.

        It sits outside the learner-scope wrapper rather than inside it, which
        is both the honest structure and the thing that makes it look right:
        inside the scope it would inherit the warm palette and the soft corner
        radius and read as part of Rami's app. Out here it is plainly studio
        chrome, in the same neutral grey as the rest of the studio.
      */}
      <div className="flex flex-none justify-end border-b border-border px-6 py-2">
        <TierSwitch />
      </div>

      <div className="learner-scope flex min-h-0 flex-1 flex-col bg-background">
        <header className="flex flex-none items-center gap-4 px-6 py-5">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-primary text-[18px] font-bold text-primary-foreground">
            {earlyStudent.firstName.charAt(0)}
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-subheading font-semibold text-foreground">
              {t('erlHello').replace('{n}', earlyStudent.firstName)}
            </span>
            <span className="block text-small text-muted-foreground">
              {groupName(group, locale)}
            </span>
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

          {/*
            Help sits in the header rather than as a fourth tab. Three large
            targets along the bottom is already the most a young child tracks,
            and help is something they reach for in a moment of trouble rather
            than something they browse to.
          */}
          <Link
            to="/student/early/help"
            aria-label={t('erlHelp')}
            className="grid h-12 w-12 flex-none place-items-center rounded-full bg-surface text-primary transition-colors hover:bg-primary/10"
          >
            <CircleHelp className="h-6 w-6" aria-hidden />
          </Link>
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
                <span className="text-small font-medium">{t(tab.labelKey)}</span>
              </NavLink>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
