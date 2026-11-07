import { Bell, CircleHelp, Layers, LifeBuoy, TriangleAlert, User } from 'lucide-react'
import { AppShell, type NavItem } from '@/components/app/AppShell'
import { useLocale } from '@/lib/i18n'

/**
 * A shell for the screens that belong to no single role.
 *
 * Profile and notifications look the same whoever is signed in, and so do the
 * empty and error states. Building them once and showing them in one place
 * stops six roles growing six slightly different versions of the same page.
 */
const nav: NavItem[] = [
  { to: '/shared/profile', labelKey: 'navProfile', icon: User },
  { to: '/shared/notifications', labelKey: 'navNotifications', icon: Bell },
  // Help and support sit next to each other because one leads to the other:
  // the help centre is where a person goes first, and a ticket is what they
  // raise when the article did not answer it.
  { to: '/shared/help', labelKey: 'shNavHelp', icon: CircleHelp },
  { to: '/shared/support', labelKey: 'shNavSupport', icon: LifeBuoy },
  { to: '/shared/empty', labelKey: 'navEmptyState', icon: Layers },
  { to: '/shared/error', labelKey: 'navErrorState', icon: TriangleAlert },
]

export function SharedApp() {
  const { t } = useLocale()

  return (
    <AppShell
      nav={nav}
      schoolName={t('shSharedScreens')}
      userName="Ziad Mansour"
      userRole={t('shSignedInAsTeacher')}
    />
  )
}
