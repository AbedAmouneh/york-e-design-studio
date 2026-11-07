import { create } from 'zustand'

/**
 * The thin layer of state that survives navigation.
 *
 * Without this the studio demonstrates screens but not a product. A reviewer
 * assigns an activity, lands on a confirmation, opens the student and finds
 * nothing, and correctly concludes that the two sides are not connected.
 *
 * So this holds exactly the three things the plan said must propagate, and
 * nothing else:
 *
 *   A teacher assigns an activity, and it appears on the student's due work.
 *   A teacher releases a mark, and it appears in the student's gradebook and
 *   on the parent's screen.
 *   A teacher messages the families of at-risk students, and it appears in the
 *   parent's messages.
 *
 * It is deliberately not a model of the real system. There is no persistence,
 * no server and no identity: reload and it is gone. That is correct for a
 * design studio, and the alternative is building the LMS twice.
 */

export interface AssignedActivity {
  id: string
  activityId: string
  classId: string
  activityTitle: string
  activityTitleAr: string
  courseTitle: string
  courseTitleAr: string
  dueOn: string
  attempts: number
  releaseMode: 'immediate' | 'manual'
  graded: boolean
  /** Null when the whole class was assigned. */
  studentIds: string[] | null
}

export interface ReleasedGrade {
  assignmentId: string
  studentId: string
  activityTitle: string
  activityTitleAr: string
  score: number
  outOf: number
  feedback: string
}

export interface FamilyMessage {
  id: string
  studentIds: string[]
  bodyKey: string
  from: string
  at: string
}

interface StudioState {
  assigned: AssignedActivity[]
  released: ReleasedGrade[]
  messages: FamilyMessage[]
  assignActivity: (activity: AssignedActivity) => void
  releaseGrades: (grades: ReleasedGrade[]) => void
  messageFamilies: (message: FamilyMessage) => void
  reset: () => void
}

export const useStudioState = create<StudioState>((set) => ({
  assigned: [],
  released: [],
  messages: [],

  assignActivity: (activity) =>
    set((state) => ({ assigned: [...state.assigned, activity] })),

  releaseGrades: (grades) =>
    set((state) => ({ released: [...state.released, ...grades] })),

  messageFamilies: (message) =>
    set((state) => ({ messages: [message, ...state.messages] })),

  reset: () => set({ assigned: [], released: [], messages: [] }),
}))

/** What a given student has been given since the reviewer started clicking. */
export function assignedTo(assigned: AssignedActivity[], studentId: string, classId: string) {
  return assigned.filter(
    (item) =>
      item.classId === classId &&
      (item.studentIds === null || item.studentIds.includes(studentId)),
  )
}

/** Marks released to a given student since the reviewer started clicking. */
export function releasedTo(released: ReleasedGrade[], studentId: string) {
  return released.filter((item) => item.studentId === studentId)
}

/** Messages that concern a given child. */
export function messagesAbout(messages: FamilyMessage[], studentIds: string[]) {
  return messages.filter((item) => item.studentIds.some((id) => studentIds.includes(id)))
}
