import {
  BookOpen,
  CalendarDays,
  CalendarRange,
  ClipboardList,
  LayoutDashboard,
  Megaphone,
  Sparkles,
  SquareStack,
  Table2,
  UsersRound,
} from 'lucide-react'
import { AppShell, type NavItem } from '@/components/app/AppShell'
import { demoTeacher, fullName } from '@/data/teacher'
import { DEFAULT_SCHOOL_ID, schools } from '@/data/seed'

/**
 * Teacher navigation.
 *
 * Today sits first because a teacher opens the LMS between lessons with one
 * question, which is what needs me now. Needs grading is a top level item for
 * the same reason, not a tab buried inside the gradebook.
 */
const nav: NavItem[] = [
  { to: '/teacher', labelKey: 'navToday', icon: LayoutDashboard, end: true },
  { to: '/teacher/classes', labelKey: 'navMyClasses', icon: UsersRound },
  { to: '/teacher/planner', labelKey: 'navPlanner', icon: CalendarRange },
  { to: '/teacher/calendar', labelKey: 'navCalendar', icon: CalendarDays },
  { to: '/teacher/gradebook', labelKey: 'navGradebook', icon: Table2 },
  { to: '/teacher/grading', labelKey: 'navNeedsGrading', icon: ClipboardList },
  { to: '/teacher/students', labelKey: 'navStudents', icon: UsersRound },
  { to: '/teacher/library', labelKey: 'navCourses', icon: BookOpen },
  { to: '/teacher/question-bank', labelKey: 'navQuestionBank', icon: SquareStack },
  { to: '/teacher/attendance', labelKey: 'navAttendance', icon: CalendarDays },
  { to: '/teacher/announcements', labelKey: 'navAnnouncements', icon: Megaphone },
  { to: '/teacher/ai', labelKey: 'navAiTools', icon: Sparkles },
]

export function TeacherApp() {
  const school = schools.find((item) => item.id === DEFAULT_SCHOOL_ID)!
  return (
    <AppShell
      nav={nav}
      schoolName={school.name}
      userName={fullName(demoTeacher)}
      userRole="Teacher"
    />
  )
}
