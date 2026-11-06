/**
 * The two demo students, one per age tier.
 *
 * The age rule is the single most important thing in the student screens, so
 * the studio shows both at once rather than asking a reviewer to imagine the
 * other one. Every number below is the same data the teacher sees. What
 * changes between the tiers is what reaches the child, not what is recorded.
 *
 *   Upper, Grade 6: scores, feedback, progress, due dates.
 *   Early, Grade 2: stars and completion. No percentage anywhere, and the
 *   words at risk never appear in any form.
 */

import {
  activities,
  announcements,
  assignments,
  classes,
  courses,
  mastery,
  skills,
  standings,
  students,
  submissions,
} from './seed'
import type { Activity, Assignment, Course, Student, Submission } from '@/types'

/**
 * The demo students are derived from their class rather than pinned by id.
 *
 * Pinning them by hand put a Grade 2 child behind the Grade 3 and above
 * interface, which showed her a percentage. That is the exact rule these
 * screens exist to demonstrate, so the ids are now resolved from the class
 * and the tier cannot drift again.
 *
 * UPPER_CLASS_ID is one of the demo teacher's classes on purpose. A reviewer
 * should be able to open the same child from the teacher side and the student
 * side and see one set of facts presented two ways.
 */
const UPPER_CLASS_ID = 'cls-3'
const EARLY_CLASS_ID = 'cls-1'

function pickFromClass(classId: string, tier: 'early' | 'upper'): Student {
  const group = classes.find((item) => item.id === classId)
  const members = (group?.studentIds ?? [])
    .map((id) => students.find((student) => student.id === id))
    .filter((student): student is Student => Boolean(student))

  // Prefer someone with work still outstanding, so the screens have something
  // to show. A demo student with an empty to do list proves nothing.
  const withWork = members.find((student) =>
    submissions.some(
      (item) => item.studentId === student.id && item.state === 'not-started',
    ),
  )

  return withWork ?? members[0] ?? students.find((student) => student.ageTier === tier)!
}

export const upperStudent = pickFromClass(UPPER_CLASS_ID, 'upper')
export const earlyStudent = pickFromClass(EARLY_CLASS_ID, 'early')

export const UPPER_STUDENT_ID = upperStudent.id
export const EARLY_STUDENT_ID = earlyStudent.id

const activityIndex = new Map(activities.map((activity) => [activity.id, activity]))

export function classOf(student: Student) {
  return classes.find((item) => student.classIds.includes(item.id))
}

export function coursesOf(student: Student): Course[] {
  const group = classOf(student)
  if (!group) return []
  return courses.filter((course) => group.courseIds.includes(course.id))
}

export function standingOf(student: Student) {
  return standings.find((standing) => standing.studentId === student.id)
}

export interface StudentWork {
  assignment: Assignment
  activity: Activity | undefined
  submission: Submission | undefined
  course: Course | undefined
}

export function workFor(student: Student): StudentWork[] {
  const group = classOf(student)
  if (!group) return []
  return assignments
    .filter((assignment) => assignment.classId === group.id)
    .map((assignment) => {
      const activity = activityIndex.get(assignment.activityId)
      const submission = submissions.find(
        (item) => item.assignmentId === assignment.id && item.studentId === student.id,
      )
      const course = courses.find((item) => assignment.activityId.startsWith(item.id))
      return { assignment, activity, submission, course }
    })
}

/**
 * What a student is actually allowed to see.
 *
 * A mark that a teacher has not released does not exist as far as the student
 * is concerned. Not greyed out, not pending, absent. Showing a held mark in
 * any form invites the question of what it says.
 */
export function visibleWork(student: Student) {
  return workFor(student).filter(
    (item) => item.submission && item.submission.released && item.submission.score !== null,
  )
}

export function dueWork(student: Student) {
  return workFor(student).filter(
    (item) => !item.submission || item.submission.state === 'not-started',
  )
}

export function masteryFor(student: Student) {
  return mastery
    .filter((record) => record.studentId === student.id)
    .map((record) => ({ record, skill: skills.find((item) => item.id === record.skillId) }))
}

/**
 * Stars, which is the early tier's entire scoring vocabulary.
 *
 * Three stars is the ceiling and one star is the floor. There is no zero,
 * because a seven year old who finished the work has not failed at finishing
 * it.
 */
export function starsFor(score: number | null) {
  if (score === null) return 1
  if (score >= 80) return 3
  if (score >= 60) return 2
  return 1
}

/** Warm, specific and never comparative. Nobody is told they are behind. */
export function praiseFor(stars: number) {
  if (stars === 3) return 'Brilliant work'
  if (stars === 2) return 'Nice work'
  return 'You finished it'
}

export const studentAnnouncements = announcements
