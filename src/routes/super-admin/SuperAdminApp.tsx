import { BarChart3, BookOpen, Building2, LifeBuoy, Settings, Ticket } from 'lucide-react'
import { AppShell, type NavItem } from '@/components/app/AppShell'
import { useLocale } from '@/lib/i18n'

/**
 * Super admin, York Press level.
 *
 * Operates the platform across every school rather than inside one. The thing
 * that makes this role real is multi-tenancy, which is a Phase 1 foundation
 * item, so the screens here are the proof that tenant isolation was designed
 * in rather than retrofitted.
 *
 * York Press is the operator here, not a school. The schools are customers.
 */
const nav: NavItem[] = [
  { to: '/super-admin', labelKey: 'navTenants', icon: Building2, end: true },
  { to: '/super-admin/seats', labelKey: 'navSeats', icon: Ticket },
  { to: '/super-admin/catalogue', labelKey: 'navCourses', icon: BookOpen },
  { to: '/super-admin/usage', labelKey: 'navUsage', icon: BarChart3 },
  { to: '/super-admin/support', labelKey: 'navSupport', icon: LifeBuoy },
  { to: '/super-admin/settings', labelKey: 'navSettings', icon: Settings },
]

export function SuperAdminApp() {
  const { t } = useLocale()

  return (
    <AppShell
      nav={nav}
      schoolName="York Press"
      userName={t('saPlatformOperations')}
      userRole={t('tabSuperAdmin')}
    />
  )
}
