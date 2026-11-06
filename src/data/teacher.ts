/**
 * The demo teacher and the queries her screens run.
 *
 * The seed gives each Cedar teacher one class, which is too thin to show the
 * thing Patrick Prendergast actually asked for: grouping by class when a
 * teacher has several. So the demo teacher is given four classes here rather
 * than in the seed, which keeps the seed untouched and keeps this decision
 * visible in one file.
 *
 * The four are chosen deliberately. Grade 2 Olive is an early tier class, so
 * every teacher screen has to prove it handles both age tiers at once. The
 * other three are upper tier across two grades and two subjects.
 */

import {
  activities,
  assignments,
  attendance,
  classes,
  courses,
  standings,
  students,
  submissions,
  teachers,
} from './seed'
import type { Activity, Assignment, ClassGroup, Student, Submission } from '@/types'

export const DEMO_TEACHER_ID = 'tch-3'

export const demoTeacher = teachers.find((teacher) => teacher.id === DEMO_TEACHER_ID)!

const DEMO_CLASS_IDS = ['cls-1', 'cls-3', 'cls-4', 'cls-5']

export const teacherClasses: ClassGroup[] = DEMO_CLASS_IDS.map(
  (id) => classes.find((item) => item.id === id)!,
).filter(Boolean)

export const teacherClassIds = teacherClasses.map((item) => item.id)

const studentIndex = new Map(students.map((student) => [student.id, student]))
const activityIndex = new Map(activities.map((activity) => [activity.id, activity]))
const standingIndex = new Map(standings.map((standing) => [standing.studentId, standing]))

export const studentById = (id: string) => studentIndex.get(id)
export const activityById = (id: string) => activityIndex.get(id)
export const standingById = (id: string) => standingIndex.get(id)
export const classById = (id: string) => teacherClasses.find((item) => item.id === id)

export function fullName(person: { firstName: string; lastName: string } | undefined) {
  return person ? `${person.firstName} ${person.lastName}` : 'Unknown'
}

export function studentsInClass(classId: string): Student[] {
  const group = classById(classId)
  if (!group) return []
  return group.studentIds.map((id) => studentIndex.get(id)).filter(Boolean) as Student[]
}

export function assignmentsForClass(classId: string): Assignment[] {
  return assignments.filter((assignment) => assignment.classId === classId)
}

export const teacherAssignments: Assignment[] = assignments.filter((assignment) =>
  teacherClassIds.includes(assignment.classId),
)

export function submissionsForAssignment(assignmentId: string): Submission[] {
  return submissions.filter((submission) => submission.assignmentId === assignmentId)
}

export function submissionsForStudent(studentId: string): Submission[] {
  return submissions.filter((submission) => submission.studentId === studentId)
}

export interface GradingItem {
  assignment: Assignment
  activity: Activity | undefined
  classGroup: ClassGroup | undefined
  waiting: number
  oldestDays: number
}

/**
 * How long the oldest piece in a set has been waiting.
 *
 * Derived from the id so it is stable across reloads and spread out enough
 * that the queue ordering is visibly doing something. A queue where every row
 * says the same number proves nothing to a reviewer.
 */
function daysWaiting(assignmentId: string, dueOn: string) {
  const spread = assignmentId.split('').reduce((total, char) => total + char.charCodeAt(0), 0) % 4
  return (dueOn === '2027-02-05' ? 5 : 1) + spread
}

/**
 * The needs grading queue, ordered by how long the oldest piece has waited.
 *
 * A teacher opens this screen to answer one question, which is what to mark
 * next, so the ordering is the product decision and not the filters.
 */
export function needsGradingQueue(): GradingItem[] {
  return teacherAssignments
    .map((assignment) => {
      const waiting = submissionsForAssignment(assignment.id).filter(
        (submission) => submission.state === 'needs-grading',
      ).length
      return {
        assignment,
        activity: activityIndex.get(assignment.activityId),
        classGroup: classById(assignment.classId),
        waiting,
        oldestDays: daysWaiting(assignment.id, assignment.dueOn),
      }
    })
    .filter((item) => item.waiting > 0)
    .sort((a, b) => b.oldestDays - a.oldestDays || b.waiting - a.waiting)
}

export function classAverage(classId: string) {
  const members = studentsInClass(classId)
    .map((student) => standingIndex.get(student.id))
    .filter(Boolean)
  if (!members.length) return 0
  return Math.round(
    members.reduce((total, standing) => total + (standing?.average ?? 0), 0) / members.length,
  )
}

export function atRiskInClass(classId: string) {
  return studentsInClass(classId).filter(
    (student) => standingIndex.get(student.id)?.status === 'at-risk',
  )
}

export function coursesForClass(classId: string) {
  const group = classById(classId)
  if (!group) return []
  return courses.filter((course) => group.courseIds.includes(course.id))
}

export function attendanceForClass(classId: string) {
  return attendance.filter((record) => record.classId === classId)
}

/** Totals for the Today screen, computed once rather than per card. */
export function teacherTotals() {
  const waiting = teacherAssignments.reduce(
    (total, assignment) =>
      total +
      submissionsForAssignment(assignment.id).filter((s) => s.state === 'needs-grading').length,
    0,
  )
  const learners = teacherClasses.reduce((total, item) => total + item.studentIds.length, 0)
  const atRisk = teacherClasses.reduce((total, item) => total + atRiskInClass(item.id).length, 0)
  const dueThisWeek = teacherAssignments.filter((a) => a.dueOn === '2027-02-05').length
  return { waiting, learners, atRisk, dueThisWeek }
}
