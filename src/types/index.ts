/**
 * Domain types for the York-E 3.0 design studio.
 *
 * These mirror the LMS feature scope in the Platform Feedback workbook and the
 * LMS-22 assignment, submission and grading rules draft. They are shaped for a
 * prototype, not for the real API, so they stay flat and readable.
 */

export type Locale = 'en' | 'ar'

export type Role =
  | 'super-admin'
  | 'school-admin'
  | 'coordinator'
  | 'teacher'
  | 'student'
  | 'parent'

/** K1 to Grade 3 never sees percentages or at risk. Grade 3 and above does. */
export type AgeTier = 'early' | 'upper'

export type ProgressStatus = 'on-track' | 'watch' | 'at-risk'

export type Trend = 'rising' | 'steady' | 'falling'

export type GradingScale = 'percentage' | 'letter' | 'band'

export interface School {
  id: string
  name: string
  city: string
  country: string
  locale: Locale
  gradingScale: GradingScale
  academicYear: string
  seats: number
  seatsUsed: number
  status: 'active' | 'provisioning' | 'suspended'
}

export interface Term {
  id: string
  schoolId: string
  name: string
  startsOn: string
  endsOn: string
  current: boolean
}

export interface Subject {
  id: string
  name: string
  nameAr: string
}

export interface Course {
  id: string
  subjectId: string
  title: string
  titleAr: string
  grade: number
  units: Unit[]
}

export interface Unit {
  id: string
  courseId: string
  title: string
  titleAr: string
  order: number
  activities: Activity[]
}

export type ActivityKind = 'lesson' | 'quiz' | 'assignment' | 'interactive-book' | 'manipulative'

export interface Activity {
  id: string
  unitId: string
  title: string
  titleAr: string
  kind: ActivityKind
  graded: boolean
  points: number
  skillIds: string[]
}

export interface Skill {
  id: string
  name: string
  nameAr: string
  subjectId: string
}

export interface ClassGroup {
  id: string
  schoolId: string
  name: string
  grade: number
  ageTier: AgeTier
  teacherIds: string[]
  courseIds: string[]
  studentIds: string[]
}

export interface Person {
  id: string
  schoolId: string
  firstName: string
  lastName: string
  email: string
  role: Role
  lastActiveOn: string | null
}

export interface Student extends Person {
  role: 'student'
  classIds: string[]
  guardianIds: string[]
  ageTier: AgeTier
}

export interface Teacher extends Person {
  role: 'teacher'
  classIds: string[]
  /** Logins in the last 30 days, used by the teacher usage report. */
  activeDays: number
}

export interface Guardian extends Person {
  role: 'parent'
  childIds: string[]
}

/** One activity given to one class, with the LMS-22 date and attempt rules. */
export interface Assignment {
  id: string
  activityId: string
  classId: string
  opensOn: string
  dueOn: string
  closesOn: string | null
  maxAttempts: number
  gradingMethod: 'highest' | 'average' | 'first' | 'last'
  releaseMode: 'immediate' | 'manual'
  graded: boolean
}

export type SubmissionState =
  | 'not-started'
  | 'in-progress'
  | 'submitted'
  | 'needs-grading'
  | 'graded'
  | 'returned'

export interface Submission {
  id: string
  assignmentId: string
  studentId: string
  state: SubmissionState
  /** Null until graded. Stored as a percentage, the scale converts for display. */
  score: number | null
  submittedOn: string | null
  /** Set when submitted between the due date and the close date. */
  late: boolean
  attempt: number
  feedback: string | null
  released: boolean
}

export interface AttendanceRecord {
  id: string
  studentId: string
  classId: string
  date: string
  state: 'present' | 'absent' | 'late' | 'excused'
}

export interface SkillMastery {
  studentId: string
  skillId: string
  /** 0 to 100. Never shown to the early tier. */
  mastery: number
  attempts: number
}

export interface StudentStanding {
  studentId: string
  average: number
  trend: Trend
  status: ProgressStatus
  completion: number
  /** Stars replace the score for the early tier. 0 to 3. */
  stars: number
}

export interface ActivityLogEntry {
  id: string
  schoolId: string
  actorId: string
  actorName: string
  action: string
  target: string
  at: string
}

export interface Announcement {
  id: string
  schoolId: string
  authorId: string
  authorName: string
  title: string
  body: string
  audience: 'school' | 'class' | 'parents'
  postedOn: string
  pinned: boolean
}
