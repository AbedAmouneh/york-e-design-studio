/**
 * The frame register.
 *
 * One list of every screen in the studio, which the canvas lays out and the
 * progress counts are derived from. Screens that are planned but not built sit
 * in the list as `built: false` rather than being left out, so the canvas is an
 * honest picture of what exists rather than a gallery of the finished parts.
 */

export interface Frame {
  /** Numbered for review. "Look at frame 34" has to mean something. */
  n: number
  title: string
  /** Route without the leading hash. Empty when the screen is not built yet. */
  path: string
  built: boolean
  /** Marked when the screen is an addition beyond the agreed features sheet. */
  proposed?: boolean
  note?: string
}

export interface FrameSection {
  id: string
  title: string
  blurb: string
  frames: Frame[]
}

let counter = 0
const f = (title: string, path: string, extra: Partial<Frame> = {}): Frame => {
  counter += 1
  return { n: counter, title, path, built: Boolean(path), ...extra }
}

export const frameSections: FrameSection[] = [
  {
    id: 'school-admin',
    title: 'School admin',
    blurb: 'Runs one school. Sets up people, classes and courses, then watches the term.',
    frames: [
      f('Overview', '/school-admin'),
      f('Analytics', '/school-admin/analytics'),
      f('Classes', '/school-admin/classes'),
      f('Create a class', '/school-admin/classes/new', { note: 'Flow' }),
      f('Class detail', '/school-admin/classes/cls-3'),
      f('Class detail, early tier', '/school-admin/classes/cls-1'),
      f('Users', '/school-admin/users'),
      f('Bulk import', '/school-admin/users/import', { note: 'Flow' }),
      f('Courses and licences', '/school-admin/courses'),
      f('Attendance', '/school-admin/attendance'),
      f('Announcements', '/school-admin/announcements'),
      f('Reports', '/school-admin/reports', { proposed: true, note: 'Ministry report proposed' }),
      f('Activity log', '/school-admin/activity-log'),
      f('Settings', '/school-admin/settings'),
    ],
  },
  {
    id: 'teacher',
    title: 'Teacher',
    blurb: 'The role the product is judged on. Marking, planning and spotting who is slipping.',
    frames: [
      f('Today', '/teacher'),
      f('My classes', '/teacher/classes'),
      f('Class home', '/teacher/classes/cls-3'),
      f('Class home, early tier', '/teacher/classes/cls-1'),
      f('Course content', '/teacher/classes/cls-3/course/crs-math-g6'),
      f('Content library', '/teacher/library'),
      f('Assign an activity', '/teacher/assign', { note: 'Flow' }),
      f('Weekly planner', '/teacher/planner'),
      f('Calendar', '/teacher/calendar'),
      f('Gradebook', '/teacher/gradebook'),
      f('Gradebook settings', '/teacher/gradebook/settings'),
      f('Grade changes', '/teacher/gradebook/audit'),
      f('Needs grading', '/teacher/grading'),
      f('Grade a submission', '/teacher/grading/asg-cls-3-1', { note: 'Flow' }),
      f('Students', '/teacher/students'),
      f('Student detail', '/teacher/students/std-48'),
      f('Skill drill down', '/teacher/students/std-48/skills'),
      f('Question bank', '/teacher/question-bank'),
      f('Create a quiz', '/teacher/question-bank/new'),
      f('Attendance register', '/teacher/attendance'),
      f('Announcements and messages', '/teacher/announcements'),
      f('AI teacher tools', '/teacher/ai'),
      f('Classroom presentation', '/teacher/present', { note: 'No chrome, projected' }),
    ],
  },
  {
    id: 'student-upper',
    title: 'Student, Grade 3 and above',
    blurb: 'Sees scores, feedback and progress. Ten screens.',
    frames: [
      f('Dashboard', ''),
      f('My courses', ''),
      f('Course player', ''),
      f('Take a quiz', '', { note: 'Flow' }),
      f('Quiz results and feedback', ''),
      f('My grades', ''),
      f('Assignments and due dates', ''),
      f('Calendar', ''),
      f('Announcements', ''),
      f('My progress', ''),
    ],
  },
  {
    id: 'student-early',
    title: 'Student, K1 to Grade 3',
    blurb: 'Stars and completion. Never a percentage, never the words at risk.',
    frames: [
      f('Home', ''),
      f('My activities', ''),
      f('Doing an activity', ''),
      f('Well done moment', '', { note: 'Flow' }),
      f('My stickers', ''),
    ],
  },
  {
    id: 'parent',
    title: 'Parent',
    blurb: 'One child at a time, or several. Reads rather than acts.',
    frames: [
      f('My children', ''),
      f('Child overview', ''),
      f('Progress over time', ''),
      f('Attendance', ''),
      f('Assignments and marks', ''),
      f('Messages from school', ''),
      f('Announcements', ''),
      f('Notification settings', ''),
    ],
  },
  {
    id: 'coordinator',
    title: 'Coordinator',
    blurb: 'Owns the unit plan and standards coverage across several classes.',
    frames: [
      f('Overview', ''),
      f('Unit plans', ''),
      f('Standards coverage', ''),
      f('Across my classes', ''),
      f('Flagged students', ''),
    ],
  },
  {
    id: 'super-admin',
    title: 'Super admin',
    blurb: 'York Press level. Tenants, seats and what every school is doing.',
    frames: [
      f('Tenants', ''),
      f('Tenant detail', ''),
      f('Provision a school', '', { note: 'Flow' }),
      f('Seats and licences', ''),
      f('Course catalogue', ''),
      f('Usage across schools', ''),
      f('Support and impersonation', ''),
      f('Platform settings', ''),
    ],
  },
  {
    id: 'shared',
    title: 'Shared',
    blurb: 'Screens every role meets.',
    frames: [
      f('Sign in', ''),
      f('Forgotten password', ''),
      f('Profile', ''),
      f('Notifications', ''),
      f('Empty state', ''),
      f('Something went wrong', ''),
    ],
  },
]

export const allFrames = frameSections.flatMap((section) => section.frames)
export const builtCount = allFrames.filter((frame) => frame.built).length
export const totalCount = allFrames.length
