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
import { groupName, schoolName } from '@/lib/names'
import { classOf, upperStudent } from '@/data/student'
import { schools } from '@/data/seed'

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
  const { t, locale } = useLocale()
  const group = classOf(upperStudent)
  /*
    The class name is what a student recognises, so it leads. When the class
    lookup misses, fall back to the student's own school from the seed rather
    than to a literal: a hardcoded "Cedar Valley School" was still English on
    an Arabic page, which is the exact bug the localised name helper exists to
    close. The School type now carries its own Arabic name, so the fallback
    reads through the same helper the class name does and both sides localise.
  */
  const school = schools.find((item) => item.id === upperStudent.schoolId)
  const schoolLabel = groupName(group, locale) || schoolName(school, locale)
  return (
    <AppShell
      nav={nav}
      schoolName={schoolLabel}
      userName={`${upperStudent.firstName} ${upperStudent.lastName}`}
      userRole={t('stuGradeN').replace('{n}', String(group?.grade ?? 6))}
    />
  )
}
