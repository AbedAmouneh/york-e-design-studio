import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  Table2,
  TrendingUp,
} from 'lucide-react'
import { AppShell, type NavItem } from '@/components/app/AppShell'
import { useLocale } from '@/lib/i18n'
import { classOf, upperStudent } from '@/data/student'

/**
 * Student, Grade 3 and above.
 *
 * Deliberately the same shell the staff use. A twelve year old does not need a
 * different navigation model, they need less in it. There is no content
 * library in this nav: Patrick Prendergast's position on 4 July was that the
 * teacher controls what a class sees, so a student browsing the whole school
 * catalogue is a feature we chose not to build.
 */
const nav: NavItem[] = [
  { to: '/student', labelKey: 'navHome', icon: LayoutDashboard, end: true },
  { to: '/student/courses', labelKey: 'navMyCourses', icon: BookOpen },
  { to: '/student/assignments', labelKey: 'navAssignments', icon: ClipboardList },
  { to: '/student/grades', labelKey: 'navMyGrades', icon: Table2 },
  { to: '/student/progress', labelKey: 'navProgress', icon: TrendingUp },
  { to: '/student/calendar', labelKey: 'navCalendar', icon: CalendarDays },
  { to: '/student/announcements', labelKey: 'navAnnouncements', icon: Megaphone },
]

export function StudentApp() {
  const { t } = useLocale()
  const group = classOf(upperStudent)
  return (
    <AppShell
      nav={nav}
      schoolName={group?.name ?? 'Cedar Valley School'}
      userName={`${upperStudent.firstName} ${upperStudent.lastName}`}
      userRole={t('stuGradeN').replace('{n}', String(group?.grade ?? 6))}
    />
  )
}
