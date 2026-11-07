/**
 * Synthetic sample data for the York-E 3.0 design studio.
 *
 * Three schools across the launch markets, so the super admin and tenant
 * screens have something real to show and so RTL can be proved on a school
 * whose own locale is Arabic:
 *
 *   Cedar Valley School, Beirut      fully populated, percentage scale
 *   Al Noor International, Dubai     lighter, letter scale
 *   Rawabi Academy, Amman            Arabic first, band scale
 *
 * Everything is generated from a fixed seed, so the numbers are stable across
 * reloads and two reviewers looking at the same screen see the same figures.
 */

import type {
  Activity,
  Announcement,
  Assignment,
  AttendanceRecord,
  ClassGroup,
  Course,
  Guardian,
  ActivityLogEntry,
  School,
  Skill,
  SkillMastery,
  Student,
  StudentStanding,
  Subject,
  Submission,
  Teacher,
  Term,
  Trend,
  Unit,
} from '@/types'
import { familyNames, givenNames } from './names'

/** Deterministic PRNG so every reload shows identical numbers. */
function mulberry32(seed: number) {
  return function random() {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(20261106)

const pick = <T,>(items: T[]) => items[Math.floor(rand() * items.length)]
const between = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min

// ---------------------------------------------------------------- schools

export const schools: School[] = [
  {
    id: 'sch-cedar',
    name: 'Cedar Valley School',
    nameAr: 'مدرسة وادي الأرز',
    city: 'Beirut',
    cityAr: 'بيروت',
    country: 'Lebanon',
    countryAr: 'لبنان',
    locale: 'en',
    gradingScale: 'percentage',
    academicYear: '2026 to 2027',
    seats: 1400,
    seatsUsed: 1284,
    status: 'active',
  },
  {
    id: 'sch-noor',
    name: 'Al Noor International School',
    nameAr: 'مدرسة النور الدولية',
    city: 'Dubai',
    cityAr: 'دبي',
    country: 'United Arab Emirates',
    countryAr: 'الإمارات العربية المتحدة',
    locale: 'en',
    gradingScale: 'letter',
    academicYear: '2026 to 2027',
    seats: 900,
    seatsUsed: 742,
    status: 'active',
  },
  {
    id: 'sch-rawabi',
    name: 'Rawabi Academy',
    nameAr: 'أكاديمية الروابي',
    city: 'Amman',
    cityAr: 'عمّان',
    country: 'Jordan',
    countryAr: 'الأردن',
    locale: 'ar',
    gradingScale: 'band',
    academicYear: '2026 to 2027',
    seats: 600,
    seatsUsed: 318,
    status: 'provisioning',
  },
]

export const terms: Term[] = schools.flatMap((school) => [
  {
    id: `${school.id}-t1`,
    schoolId: school.id,
    name: 'Term 1',
    startsOn: '2026-09-07',
    endsOn: '2026-12-18',
    current: false,
  },
  {
    id: `${school.id}-t2`,
    schoolId: school.id,
    name: 'Term 2',
    startsOn: '2027-01-11',
    endsOn: '2027-04-02',
    current: true,
  },
  {
    id: `${school.id}-t3`,
    schoolId: school.id,
    name: 'Term 3',
    startsOn: '2027-04-19',
    endsOn: '2027-06-25',
    current: false,
  },
])

// ------------------------------------------------------- subjects, skills

export const subjects: Subject[] = [
  { id: 'sub-math', name: 'Mathematics', nameAr: 'الرياضيات' },
  { id: 'sub-sci', name: 'Science', nameAr: 'العلوم' },
  { id: 'sub-eng', name: 'English', nameAr: 'اللغة الإنجليزية' },
  { id: 'sub-ara', name: 'Arabic', nameAr: 'اللغة العربية' },
]

const skillSeeds: Array<[string, string, string]> = [
  ['Adding fractions', 'جمع الكسور', 'sub-math'],
  ['Common denominators', 'المقام المشترك', 'sub-math'],
  ['Place value', 'القيمة المكانية', 'sub-math'],
  ['Multiplying decimals', 'ضرب الأعداد العشرية', 'sub-math'],
  ['Reading a number line', 'قراءة خط الأعداد', 'sub-math'],
  ['The water cycle', 'دورة الماء', 'sub-sci'],
  ['States of matter', 'حالات المادة', 'sub-sci'],
  ['Photosynthesis', 'التمثيل الضوئي', 'sub-sci'],
  ['Reading comprehension', 'الفهم القرائي', 'sub-eng'],
  ['Past tense', 'زمن الماضي', 'sub-eng'],
  ['Paragraph structure', 'بنية الفقرة', 'sub-eng'],
  ['القراءة الجهرية', 'القراءة الجهرية', 'sub-ara'],
  ['الإعراب', 'الإعراب', 'sub-ara'],
]

export const skills: Skill[] = skillSeeds.map(([name, nameAr, subjectId], index) => ({
  id: `skl-${index + 1}`,
  name,
  nameAr,
  subjectId,
}))

// ------------------------------------------------------- courses and units

function buildCourse(subjectId: string, grade: number, title: string, titleAr: string): Course {
  const courseId = `crs-${subjectId.replace('sub-', '')}-g${grade}`
  const subjectSkills = skills.filter((skill) => skill.subjectId === subjectId)

  const units: Unit[] = Array.from({ length: 4 }, (_, unitIndex) => {
    const unitId = `${courseId}-u${unitIndex + 1}`
    const activities: Activity[] = Array.from({ length: 5 }, (_, activityIndex) => {
      const kinds: Activity['kind'][] = [
        'lesson',
        'interactive-book',
        'quiz',
        'manipulative',
        'assignment',
      ]
      const kind = kinds[activityIndex]
      const graded = kind === 'quiz' || kind === 'assignment'
      return {
        id: `${unitId}-a${activityIndex + 1}`,
        unitId,
        title: `${['Explore', 'Read', 'Check', 'Practise', 'Apply'][activityIndex]} ${unitIndex + 1}.${activityIndex + 1}`,
        titleAr: `${['استكشف', 'اقرأ', 'تحقق', 'تدرب', 'طبّق'][activityIndex]} ${unitIndex + 1}.${activityIndex + 1}`,
        kind,
        graded,
        points: graded ? 20 : 0,
        skillIds: subjectSkills.length
          ? [subjectSkills[(unitIndex + activityIndex) % subjectSkills.length].id]
          : [],
      }
    })
    return {
      id: unitId,
      courseId,
      title: `Unit ${unitIndex + 1}`,
      titleAr: `الوحدة ${unitIndex + 1}`,
      order: unitIndex + 1,
      activities,
    }
  })

  return { id: courseId, subjectId, title, titleAr, grade, units }
}

export const courses: Course[] = [
  buildCourse('sub-math', 2, 'Mathematics, Grade 2', 'الرياضيات، الصف الثاني'),
  buildCourse('sub-math', 6, 'Mathematics, Grade 6', 'الرياضيات، الصف السادس'),
  buildCourse('sub-sci', 6, 'Science, Grade 6', 'العلوم، الصف السادس'),
  buildCourse('sub-eng', 6, 'English, Grade 6', 'اللغة الإنجليزية، الصف السادس'),
  buildCourse('sub-ara', 7, 'Arabic, Grade 7', 'اللغة العربية، الصف السابع'),
  buildCourse('sub-eng', 7, 'English, Grade 7', 'اللغة الإنجليزية، الصف السابع'),
]

export const activities: Activity[] = courses.flatMap((course) =>
  course.units.flatMap((unit) => unit.activities),
)

// --------------------------------------------------------------- people

let personCounter = 0
function makeName() {
  personCounter += 1
  const first = pick(givenNames)
  const last = pick(familyNames)
  return { first, last, id: personCounter }
}

export const teachers: Teacher[] = [
  'sch-cedar',
  'sch-cedar',
  'sch-cedar',
  'sch-cedar',
  'sch-cedar',
  'sch-cedar',
  'sch-noor',
  'sch-noor',
  'sch-rawabi',
].map((schoolId, index) => {
  const { first, last } = makeName()
  return {
    id: `tch-${index + 1}`,
    schoolId,
    firstName: first,
    lastName: last,
    email: `${first.toLowerCase()}.${last.toLowerCase().replace(/\s/g, '')}@example-school.test`,
    role: 'teacher' as const,
    lastActiveOn: '2027-02-10',
    classIds: [],
    activeDays: between(4, 30),
  }
})

/**
 * Classes are named "Grade N <section>" in English and "الصف <N>، شعبة <قسم>"
 * in Arabic. The section word is translated rather than transliterated, so
 * Olive is الزيتون and not أوليف: these are tree and plant names a school
 * actually picks, and a transliterated one reads as a foreign label.
 *
 * Al Noor Dubai keeps falcon and oryx, which are the local choices there.
 * Rawabi Amman was always Arabic-first, so its English name is the one that
 * had to be written.
 */
const classDefinitions: Array<{
  schoolId: string
  name: string
  nameAr: string
  grade: number
  size: number
}> = [
  { schoolId: 'sch-cedar', name: 'Grade 2 Olive', nameAr: 'الصف الثاني، شعبة الزيتون', grade: 2, size: 22 },
  { schoolId: 'sch-cedar', name: 'Grade 2 Pine', nameAr: 'الصف الثاني، شعبة الصنوبر', grade: 2, size: 21 },
  { schoolId: 'sch-cedar', name: 'Grade 6 Cedar', nameAr: 'الصف السادس، شعبة الأرز', grade: 6, size: 26 },
  { schoolId: 'sch-cedar', name: 'Grade 6 Maple', nameAr: 'الصف السادس، شعبة القيقب', grade: 6, size: 25 },
  { schoolId: 'sch-cedar', name: 'Grade 7 Jasmine', nameAr: 'الصف السابع، شعبة الياسمين', grade: 7, size: 24 },
  { schoolId: 'sch-cedar', name: 'Grade 7 Laurel', nameAr: 'الصف السابع، شعبة الغار', grade: 7, size: 23 },
  { schoolId: 'sch-noor', name: 'Grade 6 Falcon', nameAr: 'الصف السادس، شعبة الصقر', grade: 6, size: 20 },
  { schoolId: 'sch-noor', name: 'Grade 7 Oryx', nameAr: 'الصف السابع، شعبة المها', grade: 7, size: 19 },
  { schoolId: 'sch-rawabi', name: 'Grade 7 Section A', nameAr: 'الصف السابع، شعبة أ', grade: 7, size: 18 },
]

export const students: Student[] = []
export const classes: ClassGroup[] = []

classDefinitions.forEach((definition, classIndex) => {
  const classId = `cls-${classIndex + 1}`
  const teacher = teachers.filter((t) => t.schoolId === definition.schoolId)[
    classIndex % Math.max(1, teachers.filter((t) => t.schoolId === definition.schoolId).length)
  ]
  const ageTier = definition.grade <= 3 ? 'early' : 'upper'
  const studentIds: string[] = []

  for (let i = 0; i < definition.size; i += 1) {
    const { first, last, id } = makeName()
    const studentId = `std-${id}`
    studentIds.push(studentId)
    students.push({
      id: studentId,
      schoolId: definition.schoolId,
      firstName: first,
      lastName: last,
      email: `${first.toLowerCase()}.${id}@example-school.test`,
      role: 'student',
      lastActiveOn: rand() > 0.12 ? '2027-02-10' : null,
      classIds: [classId],
      guardianIds: [`gdn-${id}`],
      ageTier,
    })
  }

  const courseIds = courses
    .filter((course) => course.grade === definition.grade)
    .map((course) => course.id)

  classes.push({
    id: classId,
    schoolId: definition.schoolId,
    name: definition.name,
    nameAr: definition.nameAr,
    grade: definition.grade,
    ageTier,
    teacherIds: teacher ? [teacher.id] : [],
    courseIds,
    studentIds,
  })

  if (teacher) teacher.classIds.push(classId)
})

export const guardians: Guardian[] = students.map((student) => {
  const guardianId = student.guardianIds[0]
  return {
    id: guardianId,
    schoolId: student.schoolId,
    firstName: pick(givenNames),
    lastName: student.lastName,
    email: `${guardianId}@example-home.test`,
    role: 'parent',
    lastActiveOn: rand() > 0.4 ? '2027-02-09' : null,
    childIds: [student.id],
  }
})

// ------------------------------------------------ assignments and results

export const assignments: Assignment[] = []

classes.forEach((classGroup) => {
  const gradedActivities = activities.filter(
    (activity) =>
      activity.graded && classGroup.courseIds.some((courseId) => activity.id.startsWith(courseId)),
  )
  gradedActivities.slice(0, 6).forEach((activity, index) => {
    assignments.push({
      id: `asg-${classGroup.id}-${index + 1}`,
      activityId: activity.id,
      classId: classGroup.id,
      opensOn: '2027-01-18',
      dueOn: index < 4 ? '2027-02-05' : '2027-02-19',
      closesOn: index < 4 ? '2027-02-12' : null,
      maxAttempts: activity.kind === 'quiz' ? 1 : 2,
      gradingMethod: 'highest',
      releaseMode: activity.kind === 'quiz' ? 'immediate' : 'manual',
      graded: true,
    })
  })
})

export const submissions: Submission[] = []

assignments.forEach((assignment) => {
  const classGroup = classes.find((c) => c.id === assignment.classId)
  if (!classGroup) return
  classGroup.studentIds.forEach((studentId) => {
    const roll = rand()
    let state: Submission['state'] = 'graded'
    let score: number | null = between(38, 99)
    let released = true

    if (roll > 0.93) {
      state = 'not-started'
      score = null
      released = false
    } else if (roll > 0.86) {
      state = 'needs-grading'
      score = null
      released = false
    } else if (assignment.releaseMode === 'manual' && rand() > 0.7) {
      state = 'graded'
      released = false
    }

    submissions.push({
      id: `sub-${assignment.id}-${studentId}`,
      assignmentId: assignment.id,
      studentId,
      state,
      score,
      submittedOn: state === 'not-started' ? null : '2027-02-04',
      late: state !== 'not-started' && rand() > 0.88,
      attempt: 1,
      feedback: state === 'graded' && rand() > 0.6 ? 'Good working, check your units next time.' : null,
      released,
    })
  })
})

// ------------------------------------------------------------- standings

const trends: Trend[] = ['rising', 'steady', 'falling']

export const standings: StudentStanding[] = students.map((student) => {
  const own = submissions.filter((s) => s.studentId === student.id && s.score !== null)
  const average = own.length
    ? Math.round(own.reduce((total, s) => total + (s.score ?? 0), 0) / own.length)
    : 0
  const status = average >= 75 ? 'on-track' : average >= 60 ? 'watch' : 'at-risk'
  const done = submissions.filter((s) => s.studentId === student.id && s.state !== 'not-started')
  const total = submissions.filter((s) => s.studentId === student.id).length || 1
  return {
    studentId: student.id,
    average,
    trend: pick(trends),
    status,
    completion: Math.round((done.length / total) * 100),
    stars: average >= 80 ? 3 : average >= 65 ? 2 : 1,
  }
})

export const mastery: SkillMastery[] = students.flatMap((student) =>
  skills.slice(0, 6).map((skill) => ({
    studentId: student.id,
    skillId: skill.id,
    mastery: between(30, 98),
    attempts: between(1, 6),
  })),
)

// ------------------------------------------------------------ attendance

const attendanceDays = [
  '2027-02-02',
  '2027-02-03',
  '2027-02-04',
  '2027-02-05',
  '2027-02-08',
  '2027-02-09',
  '2027-02-10',
]

export const attendance: AttendanceRecord[] = classes.flatMap((classGroup) =>
  classGroup.studentIds.flatMap((studentId) =>
    attendanceDays.map((date) => {
      const roll = rand()
      const state: AttendanceRecord['state'] =
        roll > 0.94 ? 'absent' : roll > 0.89 ? 'late' : roll > 0.87 ? 'excused' : 'present'
      return { id: `att-${studentId}-${date}`, studentId, classId: classGroup.id, date, state }
    }),
  ),
)

// ------------------------------------------------------ log, announcements

export const activityLog: ActivityLogEntry[] = [
  {
    id: 'log-1',
    schoolId: 'sch-cedar',
    actorId: 'tch-3',
    actorName: `${teachers[2].firstName} ${teachers[2].lastName}`,
    action: 'Released grades',
    target: 'Grade 6 Cedar, Check 2.3',
    at: '2027-02-10T09:12:00',
  },
  {
    id: 'log-2',
    schoolId: 'sch-cedar',
    actorId: 'adm-1',
    actorName: 'School admin',
    action: 'Imported users',
    target: '38 students, Grade 7',
    at: '2027-02-09T16:40:00',
  },
  {
    id: 'log-3',
    schoolId: 'sch-cedar',
    actorId: 'tch-1',
    actorName: `${teachers[0].firstName} ${teachers[0].lastName}`,
    action: 'Changed a grade',
    target: 'Apply 1.5, one student, reason recorded',
    at: '2027-02-09T11:05:00',
  },
  {
    id: 'log-4',
    schoolId: 'sch-cedar',
    actorId: 'tch-5',
    actorName: `${teachers[4].firstName} ${teachers[4].lastName}`,
    action: 'Assigned an activity',
    target: 'Grade 7 Jasmine, Practise 2.4',
    at: '2027-02-08T14:22:00',
  },
  {
    id: 'log-5',
    schoolId: 'sch-cedar',
    actorId: 'adm-1',
    actorName: 'School admin',
    action: 'Changed the grading scale',
    target: 'Percentage, all grades',
    at: '2027-02-06T10:02:00',
  },
]

export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    schoolId: 'sch-cedar',
    authorId: 'adm-1',
    authorName: 'School admin',
    title: 'Term 2 reports close on 2 April',
    body: 'Please make sure all grades are released before the end of term.',
    audience: 'school',
    postedOn: '2027-02-09',
    pinned: true,
  },
  {
    id: 'ann-2',
    schoolId: 'sch-cedar',
    authorId: 'tch-3',
    authorName: `${teachers[2].firstName} ${teachers[2].lastName}`,
    title: 'Science trip, Grade 6',
    body: 'Consent forms are due Thursday.',
    audience: 'parents',
    postedOn: '2027-02-07',
    pinned: false,
  },
]

// --------------------------------------------------------- derived helpers

export const DEFAULT_SCHOOL_ID = 'sch-cedar'

export function studentsForSchool(schoolId: string) {
  return students.filter((student) => student.schoolId === schoolId)
}

export function classesForSchool(schoolId: string) {
  return classes.filter((classGroup) => classGroup.schoolId === schoolId)
}

export function teachersForSchool(schoolId: string) {
  return teachers.filter((teacher) => teacher.schoolId === schoolId)
}

export function standingFor(studentId: string) {
  return standings.find((standing) => standing.studentId === studentId)
}
