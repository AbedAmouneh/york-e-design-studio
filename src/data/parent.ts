/**
 * The demo parent.
 *
 * Given two children on purpose, one in each age tier. The seed gives every
 * guardian a single child, which hides the question a family actually asks:
 * can I see both of mine without logging out.
 *
 * It also forces the age rule into the parent screens. The parent of a Grade 2
 * child and the parent of a Grade 6 child are the same person here, so the
 * studio has to show how the two read differently side by side.
 */

import { attendance, guardians, standings, students, submissions } from './seed'
import { classOf, workFor } from './student'
import { earlyStudent, upperStudent } from './student'
import type { Student } from '@/types'

export const children: Student[] = [upperStudent, earlyStudent]

export const demoParent = {
  id: 'gdn-demo',
  firstName: guardians.find((item) => item.childIds.includes(upperStudent.id))?.firstName ?? 'Rana',
  lastName: upperStudent.lastName,
  email: 'rana.home@example-home.test',
  childIds: children.map((child) => child.id),
}

export const parentName = `${demoParent.firstName} ${demoParent.lastName}`

export function childById(id: string) {
  return children.find((child) => child.id === id)
}

export function standingOfChild(child: Student) {
  return standings.find((standing) => standing.studentId === child.id)
}

export function classOfChild(child: Student) {
  return classOf(child)
}

/**
 * What a parent is allowed to see.
 *
 * Exactly what the child sees, never more. A parent who learns a mark before
 * their child does turns the platform into a way of being told off at home for
 * something nobody has explained yet.
 */
export function releasedWorkFor(child: Student) {
  return workFor(child).filter(
    (item) => item.submission?.released && item.submission.score !== null,
  )
}

export function pendingWorkFor(child: Student) {
  return workFor(child).filter(
    (item) => !item.submission || item.submission.state === 'not-started',
  )
}

export function attendanceFor(child: Student) {
  return attendance.filter((record) => record.studentId === child.id)
}

export function attendanceSummary(child: Student) {
  const records = attendanceFor(child)
  return {
    total: records.length,
    present: records.filter((item) => item.state === 'present').length,
    late: records.filter((item) => item.state === 'late').length,
    absent: records.filter((item) => item.state === 'absent').length,
    excused: records.filter((item) => item.state === 'excused').length,
  }
}

export function submissionCountFor(child: Student) {
  return submissions.filter((item) => item.studentId === child.id).length
}

export function fullNameOf(child: Student | undefined) {
  return child ? `${child.firstName} ${child.lastName}` : 'Unknown'
}

export const isEarly = (child: Student) => child.ageTier === 'early'

/**
 * The sentence a parent reads about an early tier child.
 *
 * Derived from the stars rather than written once, because a fixed sentence
 * saying a child is getting most of it right sat next to one filled star,
 * which is the kind of contradiction that costs a product its credibility in
 * the first thirty seconds of a demo.
 *
 * Never a verdict, always a next step. A one star child is told what to
 * practise, not that they are behind.
 */
export function earlySummary(child: Student) {
  const stars = standings.find((item) => item.studentId === child.id)?.stars ?? 1
  if (stars === 3) {
    return `${child.firstName} is finishing their work and getting most of it right.`
  }
  if (stars === 2) {
    return `${child.firstName} is finishing their work. A few topics are still settling.`
  }
  return `${child.firstName} is finishing their work and finding some of it hard. Their teacher is working on it with them.`
}

export { students }
