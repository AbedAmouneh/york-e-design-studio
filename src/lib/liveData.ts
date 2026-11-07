import { useMemo } from 'react'
import {
  assignedTo,
  messagesAbout,
  releasedTo,
  useStudioState,
} from '@/lib/studioState'
import { classOf, workFor, type StudentWork } from '@/data/student'
import type { Activity, Course, Student } from '@/types'

/**
 * Seed data plus whatever the reviewer has just done.
 *
 * The reader screens take their work from here rather than straight from the
 * seed, so an activity a teacher assigned two clicks ago turns up on the
 * student's list without those screens knowing anything about a store.
 *
 * Everything is a hook because the whole point is that the screen re-renders
 * when the teacher acts. Reading the store outside React would compile and
 * then quietly never update, which is the bug this file exists to avoid.
 */

/** A stand-in Activity built from what the assign flow captured. */
function activityFrom(title: string, titleAr: string, id: string, graded: boolean): Activity {
  return {
    id,
    unitId: 'live',
    title,
    titleAr,
    kind: graded ? 'quiz' : 'lesson',
    graded,
    points: graded ? 20 : 0,
    skillIds: [],
  }
}

function courseFrom(title: string, titleAr: string): Course {
  return { id: 'live', subjectId: 'live', title, titleAr, grade: 0, units: [] }
}

/**
 * Everything a student has been set, seed and live together.
 *
 * Live items come first. A reviewer who has just assigned something expects to
 * see it at the top, not buried under six weeks of sample data.
 */
export function useStudentWork(student: Student): StudentWork[] {
  const assigned = useStudioState((state) => state.assigned)
  const group = classOf(student)

  return useMemo(() => {
    const seeded = workFor(student)
    if (!group) return seeded

    const live = assignedTo(assigned, student.id, group.id).map<StudentWork>((item) => ({
      assignment: {
        id: item.id,
        activityId: item.activityId,
        classId: item.classId,
        opensOn: '2027-02-10',
        dueOn: item.dueOn,
        closesOn: null,
        maxAttempts: item.attempts,
        gradingMethod: 'highest',
        releaseMode: item.releaseMode,
        graded: item.graded,
      },
      activity: activityFrom(item.activityTitle, item.activityTitleAr, item.activityId, item.graded),
      course: courseFrom(item.courseTitle, item.courseTitleAr),
      submission: undefined,
    }))

    return [...live, ...seeded]
  }, [assigned, group, student])
}

/** Work still to do, including anything just assigned. */
export function useStudentDue(student: Student) {
  const all = useStudentWork(student)
  return useMemo(
    () => all.filter((item) => !item.submission || item.submission.state === 'not-started'),
    [all],
  )
}

/**
 * Marks the student can see, seed and live together.
 *
 * A mark only appears here once it has been released. Marking alone changes
 * nothing, which is the rule the gradebook and the parent screens both depend
 * on.
 */
export function useStudentReleased(student: Student): StudentWork[] {
  const released = useStudioState((state) => state.released)

  return useMemo(() => {
    const seeded = workFor(student).filter(
      (item) => item.submission?.released && item.submission.score !== null,
    )

    const live = releasedTo(released, student.id).map<StudentWork>((item) => ({
      assignment: {
        id: item.assignmentId,
        activityId: item.assignmentId,
        classId: 'live',
        opensOn: '2027-02-10',
        dueOn: '2027-02-10',
        closesOn: null,
        maxAttempts: 1,
        gradingMethod: 'highest',
        releaseMode: 'manual',
        graded: true,
      },
      activity: activityFrom(item.activityTitle, item.activityTitleAr, item.assignmentId, true),
      course: undefined,
      submission: {
        id: `sub-live-${item.assignmentId}-${item.studentId}`,
        assignmentId: item.assignmentId,
        studentId: item.studentId,
        state: 'graded',
        // Stored out of the activity's own total, shown as a percentage.
        score: Math.round((item.score / Math.max(item.outOf, 1)) * 100),
        submittedOn: '2027-02-10',
        late: false,
        attempt: 1,
        feedback: item.feedback || null,
        released: true,
      },
    }))

    return [...live, ...seeded]
  }, [released, student])
}

/** Messages a family has received, newest first. */
export function useFamilyMessages(childIds: string[]) {
  const messages = useStudioState((state) => state.messages)
  return useMemo(() => messagesAbout(messages, childIds), [messages, childIds])
}
