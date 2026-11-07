import { BookOpen, LayoutDashboard, ListChecks, Target, Users } from 'lucide-react'
import { AppShell, type NavItem } from '@/components/app/AppShell'
import { useLocale } from '@/lib/i18n'
import { schoolName } from '@/lib/names'
import { DEFAULT_SCHOOL_ID, schools } from '@/data/seed'

/**
 * Coordinator.
 *
 * The role the permissions matrix names and nobody had drawn. A coordinator
 * owns a subject across several classes and several teachers: they set the
 * unit plan, they answer for standards coverage, and they are the first
 * escalation when a child is struggling in more than one class.
 *
 * Deliberately narrow. A coordinator is not a second school admin, so there is
 * no user management, no licences and no settings here.
 */
const nav: NavItem[] = [
  { to: '/coordinator', labelKey: 'navOverview', icon: LayoutDashboard, end: true },
  { to: '/coordinator/unit-plans', labelKey: 'navUnitPlans', icon: BookOpen },
  { to: '/coordinator/standards', labelKey: 'navStandards', icon: Target },
  { to: '/coordinator/classes', labelKey: 'navAcrossClasses', icon: ListChecks },
  { to: '/coordinator/flagged', labelKey: 'navFlagged', icon: Users },
]

export function CoordinatorApp() {
  const { t, locale } = useLocale()
  const school = schools.find((item) => item.id === DEFAULT_SCHOOL_ID)!
  const schoolLabel = schoolName(school, locale)
  return (
    <AppShell
      nav={nav}
      schoolName={schoolLabel}
      userName="Maya Haddad"
      userRole={t('coRoleTitle')}
    />
  )
}
