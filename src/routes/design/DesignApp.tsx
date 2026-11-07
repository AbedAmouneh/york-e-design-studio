import { Component, Layers, Palette, TriangleAlert } from 'lucide-react'
import { AppShell, type NavItem } from '@/components/app/AppShell'
import { useLocale } from '@/lib/i18n'

/**
 * The design system shell.
 *
 * Separate from the shared shell on purpose. Shared screens are product: a
 * profile, a notification list, the page a teacher sees when a filter returns
 * nothing. These four are documentation about the product, and a reviewer who
 * opens the wrong one wastes a minute working out which kind of thing they are
 * looking at.
 *
 * The empty and error states appear here as well as under shared, because they
 * are both: a real screen a user hits, and the reference a developer copies
 * when they need a fifth one.
 */
const nav: NavItem[] = [
  { to: '/design/components', labelKey: 'dsComponents', icon: Component },
  { to: '/design/tokens', labelKey: 'dsTokens', icon: Palette },
  { to: '/shared/empty', labelKey: 'navEmptyState', icon: Layers },
  { to: '/shared/error', labelKey: 'navErrorState', icon: TriangleAlert },
]

export function DesignApp() {
  const { t } = useLocale()

  return (
    <AppShell
      nav={nav}
      schoolName={t('tabDesignSystem')}
      userName="York-E 3.0"
      userRole={t('dsColCode')}
    />
  )
}
