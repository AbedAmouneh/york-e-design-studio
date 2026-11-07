import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  Megaphone,
  ScrollText,
  Settings,
  Users,
  UsersRound,
} from 'lucide-react'
import { AppShell, type NavItem } from '@/components/app/AppShell'
import { useLocale } from '@/lib/i18n'
import { DEFAULT_SCHOOL_ID, schools } from '@/data/seed'

const nav: NavItem[] = [
  { to: '/school-admin', labelKey: 'navOverview', icon: LayoutDashboard, end: true },
  { to: '/school-admin/analytics', labelKey: 'navAnalytics', icon: BarChart3 },
  { to: '/school-admin/classes', labelKey: 'navClasses', icon: UsersRound },
  { to: '/school-admin/users', labelKey: 'navUsers', icon: Users },
  { to: '/school-admin/courses', labelKey: 'navCourses', icon: BookOpen },
  { to: '/school-admin/attendance', labelKey: 'navAttendance', icon: CalendarCheck },
  { to: '/school-admin/announcements', labelKey: 'navAnnouncements', icon: Megaphone },
  { to: '/school-admin/reports', labelKey: 'navReports', icon: FileText },
  { to: '/school-admin/activity-log', labelKey: 'navActivityLog', icon: ScrollText },
  { to: '/school-admin/settings', labelKey: 'navSettings', icon: Settings },
]

export function SchoolAdminApp() {
  const { t } = useLocale()
  const school = schools.find((s) => s.id === DEFAULT_SCHOOL_ID)!
  return (
    <AppShell
      nav={nav}
      schoolName={school.name}
      userName="Nadine Khoury"
      userRole={t('tabSchoolAdmin')}
    />
  )
}
