/**
 * The frame register.
 *
 * One list of every screen in the studio, which the canvas lays out and the
 * progress counts are derived from. Screens that are planned but not built sit
 * in the list as `built: false` rather than being left out, so the canvas is an
 * honest picture of what exists rather than a gallery of the finished parts.
 *
 * The register holds string keys rather than English words. The canvas is the
 * first screen a reviewer opens, so an English title here would be the one
 * English word left on an otherwise Arabic studio. The text for every key lives
 * in `src/i18n/shared.ts`, except the six section titles that already exist as
 * tab labels in `src/i18n/common.ts` and are reused rather than duplicated.
 */

import type { StringKey } from '@/i18n'
import { UPPER_STUDENT_ID } from './student'
import { children } from './parent'

const UPPER_CHILD = children[0].id
const EARLY_CHILD = children[1].id

export interface Frame {
  /** Numbered for review. "Look at frame 34" has to mean something. */
  n: number
  titleKey: StringKey
  /** Route without the leading hash. Empty when the screen is not built yet. */
  path: string
  built: boolean
  /** Marked when the screen is an addition beyond the agreed features sheet. */
  proposed?: boolean
  noteKey?: StringKey
}

export interface FrameSection {
  id: string
  titleKey: StringKey
  blurbKey: StringKey
  frames: Frame[]
}

let counter = 0
const f = (titleKey: StringKey, path: string, extra: Partial<Frame> = {}): Frame => {
  counter += 1
  return { n: counter, titleKey, path, built: Boolean(path), ...extra }
}

export const frameSections: FrameSection[] = [
  {
    id: 'school-admin',
    titleKey: 'tabSchoolAdmin',
    blurbKey: 'shSectionSchoolAdminBlurb',
    frames: [
      f('shFrameOverview', '/school-admin'),
      f('shFrameAnalytics', '/school-admin/analytics'),
      f('shFrameClasses', '/school-admin/classes'),
      f('shFrameCreateClass', '/school-admin/classes/new', { noteKey: 'shFrameNoteFlow' }),
      f('shFrameClassDetail', '/school-admin/classes/cls-3'),
      f('shFrameClassDetailEarly', '/school-admin/classes/cls-1'),
      f('shFrameUsers', '/school-admin/users'),
      f('shFrameBulkImport', '/school-admin/users/import', { noteKey: 'shFrameNoteFlow' }),
      f('shFrameCoursesLicences', '/school-admin/courses'),
      f('shFrameAttendance', '/school-admin/attendance'),
      f('shFrameAnnouncements', '/school-admin/announcements'),
      f('shFrameReports', '/school-admin/reports', {
        proposed: true,
        noteKey: 'shFrameNoteMinistryReport',
      }),
      f('shFrameActivityLog', '/school-admin/activity-log'),
      f('shFrameSettings', '/school-admin/settings'),
    ],
  },
  {
    id: 'teacher',
    titleKey: 'tabTeacher',
    blurbKey: 'shSectionTeacherBlurb',
    frames: [
      f('shFrameToday', '/teacher'),
      f('shFrameMyClasses', '/teacher/classes'),
      f('shFrameClassHome', '/teacher/classes/cls-3'),
      f('shFrameClassHomeEarly', '/teacher/classes/cls-1'),
      f('shFrameCourseContent', '/teacher/classes/cls-3/course/crs-math-g6'),
      f('shFrameContentLibrary', '/teacher/library'),
      f('shFrameAssignActivity', '/teacher/assign', { noteKey: 'shFrameNoteFlow' }),
      f('shFrameWeeklyPlanner', '/teacher/planner'),
      f('shFrameCalendar', '/teacher/calendar'),
      f('shFrameGradebook', '/teacher/gradebook'),
      f('shFrameGradebookSettings', '/teacher/gradebook/settings'),
      f('shFrameGradeChanges', '/teacher/gradebook/audit'),
      f('shFrameNeedsGrading', '/teacher/grading'),
      f('shFrameGradeSubmission', '/teacher/grading/asg-cls-3-1', { noteKey: 'shFrameNoteFlow' }),
      f('shFrameStudents', '/teacher/students'),
      // The same child the student frames show, so the two sides can be
      // compared directly.
      f('shFrameStudentDetail', `/teacher/students/${UPPER_STUDENT_ID}`),
      f('shFrameSkillDrillDown', `/teacher/students/${UPPER_STUDENT_ID}/skills`),
      f('shFrameQuestionBank', '/teacher/question-bank'),
      f('shFrameCreateQuiz', '/teacher/question-bank/new'),
      f('shFrameAttendanceRegister', '/teacher/attendance'),
      f('shFrameAnnouncementsMessages', '/teacher/announcements'),
      f('shFrameAiTeacherTools', '/teacher/ai'),
      f('shFrameClassroomPresentation', '/teacher/present', {
        noteKey: 'shFrameNoteNoChromeProjected',
      }),
    ],
  },
  {
    id: 'student-upper',
    titleKey: 'shSectionStudentUpper',
    blurbKey: 'shSectionStudentUpperBlurb',
    frames: [
      f('shFrameDashboard', '/student'),
      f('shFrameMyCourses', '/student/courses'),
      f('shFrameCoursePlayer', '/student/courses/crs-math-g6'),
      f('shFrameAssignmentsDueDates', '/student/assignments'),
      f('shFrameTakeQuiz', '/student/quiz/asg-cls-3-1', { noteKey: 'shFrameNoteFlowNoChrome' }),
      f('shFrameQuizResults', '/student/quiz/asg-cls-3-1/results'),
      f('shFrameMyGrades', '/student/grades'),
      f('shFrameMyProgress', '/student/progress'),
      f('shFrameCalendar', '/student/calendar'),
      f('shFrameAnnouncements', '/student/announcements'),
    ],
  },
  {
    id: 'student-early',
    titleKey: 'shSectionStudentEarly',
    blurbKey: 'shSectionStudentEarlyBlurb',
    frames: [
      f('shFrameHome', '/student/early'),
      f('shFrameMyWork', '/student/early/activities'),
      f('shFrameDoingActivity', '/student/early/activity/a3', { noteKey: 'shFrameNoteNoChrome' }),
      f('shFrameWellDone', '/student/early/done', { noteKey: 'shFrameNoteFlow' }),
      f('shFrameMyStickers', '/student/early/stickers'),
    ],
  },
  {
    id: 'parent',
    titleKey: 'tabParent',
    blurbKey: 'shSectionParentBlurb',
    frames: [
      f('shFrameMyChildren', '/parent'),
      f('shFrameChildOverviewUpper', `/parent/child/${UPPER_CHILD}`),
      f('shFrameChildOverviewEarly', `/parent/child/${EARLY_CHILD}`),
      f('shFrameProgressOverTime', `/parent/child/${UPPER_CHILD}/progress`),
      f('shFrameAssignmentsMarks', `/parent/child/${UPPER_CHILD}/work`),
      f('shFrameAttendance', `/parent/child/${UPPER_CHILD}/attendance`),
      f('shFrameMessagesFromSchool', '/parent/messages'),
      f('shFrameNotificationSettings', '/parent/settings'),
    ],
  },
  {
    id: 'coordinator',
    titleKey: 'tabCoordinator',
    blurbKey: 'shSectionCoordinatorBlurb',
    frames: [
      f('shFrameOverview', '/coordinator'),
      f('shFrameUnitPlans', '/coordinator/unit-plans'),
      f('shFrameStandardsCoverage', '/coordinator/standards'),
      f('shFrameAcrossMyClasses', '/coordinator/classes'),
      f('shFrameFlaggedStudents', '/coordinator/flagged'),
    ],
  },
  {
    id: 'super-admin',
    titleKey: 'tabSuperAdmin',
    blurbKey: 'shSectionSuperAdminBlurb',
    frames: [
      f('shFrameSchools', '/super-admin'),
      f('shFrameSchoolDetail', '/super-admin/tenant/sch-noor'),
      f('shFrameProvisionSchool', '/super-admin/provision', { noteKey: 'shFrameNoteFlow' }),
      f('shFrameSeatsLicences', '/super-admin/seats'),
      f('shFrameCourseCatalogue', '/super-admin/catalogue'),
      f('shFrameUsageAcrossSchools', '/super-admin/usage'),
      f('shFrameSupportImpersonation', '/super-admin/support'),
      f('shFramePlatformSettings', '/super-admin/settings'),
    ],
  },
  {
    id: 'shared',
    titleKey: 'tabShared',
    blurbKey: 'shSectionSharedBlurb',
    frames: [
      f('shFrameSignIn', '/shared/sign-in', { noteKey: 'shFrameNoteTwoRoutesNoChrome' }),
      f('shFrameForgottenPassword', '/shared/forgot', { noteKey: 'shFrameNoteNoChrome' }),
      f('shFrameProfileAccessibility', '/shared/profile'),
      f('shFrameNotifications', '/shared/notifications'),
      f('shFrameEmptyStates', '/shared/empty'),
      f('shFrameErrorStates', '/shared/error'),
    ],
  },
]

export const allFrames = frameSections.flatMap((section) => section.frames)
export const builtCount = allFrames.filter((frame) => frame.built).length
export const totalCount = allFrames.length
