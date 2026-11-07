import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'
import { Badge } from '@/components/ui/badge'

/**
 * The outer chrome. Everything the reviewer sees sits inside this: the role
 * tabs, the synthetic data badge and the language switch.
 *
 * The language switch lives here rather than inside each app because the whole
 * point is to flip any screen to Arabic without leaving it.
 *
 * ?bare=1 drops the chrome. The canvas loads every screen in its own frame and
 * the studio header has no business appearing forty two times inside itself.
 */

const tabs = [
  { to: '/canvas', labelKey: 'tabCanvas' },
  { to: '/super-admin', labelKey: 'tabSuperAdmin' },
  { to: '/school-admin', labelKey: 'tabSchoolAdmin' },
  { to: '/coordinator', labelKey: 'tabCoordinator' },
  { to: '/teacher', labelKey: 'tabTeacher' },
  { to: '/student', labelKey: 'tabStudent' },
  { to: '/parent', labelKey: 'tabParent' },
  // The shared screens have no tab and are reached from the canvas, because a
  // reviewer meets them in the course of a role. The design system does get
  // one: it is the only section nobody arrives at by accident, and a developer
  // checking a class name mid task should not have to go through the canvas.
  { to: '/design/components', labelKey: 'tabDesignSystem' },
] as const

export function StudioShell() {
  const { t, locale, toggleLocale } = useLocale()
  const [params] = useSearchParams()

  if (params.get('bare') === '1') {
    return (
      <div className="h-screen overflow-hidden bg-surface-sunken">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-surface-sunken">
      <header className="flex h-14 flex-none items-center gap-6 border-b border-border bg-background px-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded bg-primary text-[15px] font-bold text-primary-foreground">
            Y
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-small font-semibold text-foreground">{t('studioName')}</span>
            <span className="text-caption text-muted-foreground">{t('studioSubtitle')}</span>
          </span>
        </div>

        <nav className="flex items-center gap-0.5">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                cn(
                  'rounded px-3 py-1.5 text-small font-medium transition-colors',
                  isActive
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )
              }
            >
              {t(tab.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-3">
          <Badge variant="accent">{t('syntheticData')}</Badge>
          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex items-center gap-1.5 rounded border border-border-strong px-2.5 py-1.5 text-small font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden />
            {locale === 'en' ? t('switchToArabic') : t('switchToEnglish')}
          </button>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  )
}
