import { Navigate, Route, Routes } from 'react-router-dom'
import { StudioShell } from '@/components/studio/StudioShell'
import { Canvas } from '@/routes/Canvas'

import { SchoolAdminApp } from '@/routes/school-admin/SchoolAdminApp'
import { SchoolAdminOverview } from '@/routes/school-admin/Overview'
import { SchoolAdminClasses } from '@/routes/school-admin/Classes'
import { SchoolAdminUsers } from '@/routes/school-admin/Users'
import { SchoolAdminBulkImport } from '@/routes/school-admin/BulkImport'
import { SchoolAdminClassDetail } from '@/routes/school-admin/ClassDetail'
import { SchoolAdminAttendance } from '@/routes/school-admin/Attendance'
import { SchoolAdminAnalytics } from '@/routes/school-admin/Analytics'
import { SchoolAdminAnnouncements } from '@/routes/school-admin/Announcements'
import { SchoolAdminActivityLog } from '@/routes/school-admin/ActivityLog'
import { SchoolAdminSettings } from '@/routes/school-admin/Settings'
import { SchoolAdminCourses } from '@/routes/school-admin/Courses'
import { SchoolAdminCreateClass } from '@/routes/school-admin/CreateClass'
import { SchoolAdminReports } from '@/routes/school-admin/Reports'

import { TeacherApp } from '@/routes/teacher/TeacherApp'
import { TeacherToday } from '@/routes/teacher/Today'
import { TeacherMyClasses } from '@/routes/teacher/MyClasses'
import { TeacherClassHome } from '@/routes/teacher/ClassHome'
import { TeacherCoursePlayer } from '@/routes/teacher/CoursePlayer'
import { TeacherLibrary } from '@/routes/teacher/Library'
import { TeacherAssignActivity } from '@/routes/teacher/AssignActivity'
import { TeacherPlanner } from '@/routes/teacher/Planner'
import { TeacherCalendar } from '@/routes/teacher/Calendar'
import { TeacherGradebook } from '@/routes/teacher/Gradebook'
import { TeacherGradebookSettings } from '@/routes/teacher/GradebookSettings'
import { TeacherGradeAudit } from '@/routes/teacher/GradeAudit'
import { TeacherNeedsGrading } from '@/routes/teacher/NeedsGrading'
import { TeacherGradeSubmission } from '@/routes/teacher/GradeSubmission'
import { TeacherStudents } from '@/routes/teacher/Students'
import { TeacherStudentDetail } from '@/routes/teacher/StudentDetail'
import { TeacherSkillDrilldown } from '@/routes/teacher/SkillDrilldown'
import { TeacherQuestionBank } from '@/routes/teacher/QuestionBank'
import { TeacherCreateQuiz } from '@/routes/teacher/CreateQuiz'
import { TeacherAttendance } from '@/routes/teacher/Attendance'
import { TeacherAnnouncements } from '@/routes/teacher/Announcements'
import { TeacherAiTools } from '@/routes/teacher/AiTools'
import { TeacherPresent } from '@/routes/teacher/Present'

import { StudentApp } from '@/routes/student/StudentApp'
import { StudentDashboard } from '@/routes/student/Dashboard'
import { StudentMyCourses } from '@/routes/student/MyCourses'
import { StudentCoursePlayer } from '@/routes/student/CoursePlayer'
import { StudentAssignments } from '@/routes/student/Assignments'
import { StudentGrades } from '@/routes/student/Grades'
import { StudentProgress } from '@/routes/student/Progress'
import { StudentCalendar } from '@/routes/student/Calendar'
import { StudentAnnouncements } from '@/routes/student/Announcements'
import { StudentTakeQuiz } from '@/routes/student/TakeQuiz'
import { StudentQuizResults } from '@/routes/student/QuizResults'

import { EarlyApp } from '@/routes/student/early/EarlyApp'
import { EarlyHome } from '@/routes/student/early/Home'
import { EarlyActivities } from '@/routes/student/early/Activities'
import { EarlyDoActivity } from '@/routes/student/early/DoActivity'
import { EarlyWellDone } from '@/routes/student/early/WellDone'
import { EarlyStickers } from '@/routes/student/early/Stickers'

import { ParentApp } from '@/routes/parent/ParentApp'
import { ParentMyChildren } from '@/routes/parent/MyChildren'
import { ParentChildOverview } from '@/routes/parent/ChildOverview'
import { ParentChildProgress } from '@/routes/parent/ChildProgress'
import { ParentChildWork } from '@/routes/parent/ChildWork'
import { ParentChildAttendance } from '@/routes/parent/ChildAttendance'
import { ParentMessages } from '@/routes/parent/Messages'
import { ParentAnnouncements } from '@/routes/parent/Announcements'
import { ParentSettings } from '@/routes/parent/Settings'

import { CoordinatorApp } from '@/routes/coordinator/CoordinatorApp'
import { CoordinatorOverview } from '@/routes/coordinator/Overview'
import { CoordinatorUnitPlans } from '@/routes/coordinator/UnitPlans'
import { CoordinatorStandards } from '@/routes/coordinator/Standards'
import { CoordinatorAcrossClasses } from '@/routes/coordinator/AcrossClasses'
import { CoordinatorFlagged } from '@/routes/coordinator/Flagged'

import { SuperAdminApp } from '@/routes/super-admin/SuperAdminApp'
import { SuperAdminTenants } from '@/routes/super-admin/Tenants'
import { SuperAdminTenantDetail } from '@/routes/super-admin/TenantDetail'
import { SuperAdminProvision } from '@/routes/super-admin/Provision'
import { SuperAdminSeats } from '@/routes/super-admin/Seats'
import { SuperAdminCatalogue } from '@/routes/super-admin/Catalogue'
import { SuperAdminUsage } from '@/routes/super-admin/Usage'
import { SuperAdminSupport } from '@/routes/super-admin/Support'
import { SuperAdminSettings } from '@/routes/super-admin/Settings'

import { SharedApp } from '@/routes/shared/SharedApp'
import { SharedSignIn } from '@/routes/shared/SignIn'
import { SharedForgotPassword } from '@/routes/shared/ForgotPassword'
import { SharedProfile } from '@/routes/shared/Profile'
import { SharedNotifications } from '@/routes/shared/Notifications'
import { SharedEmptyState } from '@/routes/shared/EmptyState'
import { SharedErrorState } from '@/routes/shared/ErrorState'
import { SharedSchoolSelection } from '@/routes/shared/SchoolSelection'
import { SharedHelpCentre } from '@/routes/shared/HelpCentre'
import { SharedSupportTicket } from '@/routes/shared/SupportTicket'
import { StudentLessonPlayer } from '@/routes/student/LessonPlayer'
import { EarlyHelp } from '@/routes/student/early/Help'
import { SuperAdminBranding } from '@/routes/super-admin/Branding'
import { TeacherCourseSearch } from '@/routes/teacher/CourseSearch'

export default function App() {
  return (
    <Routes>
      {/*
        Three screens sit outside the studio shell because each one takes the
        whole display in real use: a projected lesson, a student mid
        assessment, and a six year old's reward moment.
      */}
      <Route path="/teacher/present" element={<TeacherPresent />} />
      <Route path="/student/quiz/:assignmentId" element={<StudentTakeQuiz />} />
      <Route path="/student/early/activity/:activityId" element={<EarlyDoActivity />} />
      <Route path="/student/early/done" element={<EarlyWellDone />} />
      <Route path="/shared/sign-in" element={<SharedSignIn />} />
      <Route path="/shared/forgot" element={<SharedForgotPassword />} />
      <Route path="/shared/schools" element={<SharedSchoolSelection />} />
      <Route
        path="/student/courses/:courseId/activity/:activityId"
        element={<StudentLessonPlayer />}
      />

      <Route element={<StudioShell />}>
        <Route index element={<Navigate to="/school-admin" replace />} />

        <Route path="canvas" element={<Canvas />} />

        <Route path="school-admin" element={<SchoolAdminApp />}>
          <Route index element={<SchoolAdminOverview />} />
          <Route path="analytics" element={<SchoolAdminAnalytics />} />
          <Route path="classes" element={<SchoolAdminClasses />} />
          <Route path="classes/new" element={<SchoolAdminCreateClass />} />
          <Route path="classes/:classId" element={<SchoolAdminClassDetail />} />
          <Route path="users" element={<SchoolAdminUsers />} />
          <Route path="users/import" element={<SchoolAdminBulkImport />} />
          <Route path="courses" element={<SchoolAdminCourses />} />
          <Route path="attendance" element={<SchoolAdminAttendance />} />
          <Route path="announcements" element={<SchoolAdminAnnouncements />} />
          <Route path="reports" element={<SchoolAdminReports />} />
          <Route path="activity-log" element={<SchoolAdminActivityLog />} />
          <Route path="settings" element={<SchoolAdminSettings />} />
        </Route>

        <Route path="teacher" element={<TeacherApp />}>
          <Route index element={<TeacherToday />} />
          <Route path="classes" element={<TeacherMyClasses />} />
          <Route path="classes/:classId" element={<TeacherClassHome />} />
          <Route path="classes/:classId/course/:courseId" element={<TeacherCoursePlayer />} />
          <Route
            path="classes/:classId/course/:courseId/search"
            element={<TeacherCourseSearch />}
          />
          <Route path="library" element={<TeacherLibrary />} />
          <Route path="assign" element={<TeacherAssignActivity />} />
          <Route path="planner" element={<TeacherPlanner />} />
          <Route path="calendar" element={<TeacherCalendar />} />
          <Route path="gradebook" element={<TeacherGradebook />} />
          <Route path="gradebook/settings" element={<TeacherGradebookSettings />} />
          <Route path="gradebook/audit" element={<TeacherGradeAudit />} />
          <Route path="grading" element={<TeacherNeedsGrading />} />
          <Route path="grading/:assignmentId" element={<TeacherGradeSubmission />} />
          <Route path="students" element={<TeacherStudents />} />
          <Route path="students/:studentId" element={<TeacherStudentDetail />} />
          <Route path="students/:studentId/skills" element={<TeacherSkillDrilldown />} />
          <Route path="question-bank" element={<TeacherQuestionBank />} />
          <Route path="question-bank/new" element={<TeacherCreateQuiz />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="announcements" element={<TeacherAnnouncements />} />
          <Route path="ai" element={<TeacherAiTools />} />
        </Route>

        <Route path="super-admin" element={<SuperAdminApp />}>
          <Route index element={<SuperAdminTenants />} />
          <Route path="tenant/:tenantId" element={<SuperAdminTenantDetail />} />
          <Route path="tenant/:tenantId/branding" element={<SuperAdminBranding />} />
          <Route path="provision" element={<SuperAdminProvision />} />
          <Route path="seats" element={<SuperAdminSeats />} />
          <Route path="catalogue" element={<SuperAdminCatalogue />} />
          <Route path="usage" element={<SuperAdminUsage />} />
          <Route path="support" element={<SuperAdminSupport />} />
          <Route path="settings" element={<SuperAdminSettings />} />
        </Route>

        <Route path="coordinator" element={<CoordinatorApp />}>
          <Route index element={<CoordinatorOverview />} />
          <Route path="unit-plans" element={<CoordinatorUnitPlans />} />
          <Route path="standards" element={<CoordinatorStandards />} />
          <Route path="classes" element={<CoordinatorAcrossClasses />} />
          <Route path="flagged" element={<CoordinatorFlagged />} />
        </Route>
        <Route path="student" element={<StudentApp />}>
          <Route index element={<StudentDashboard />} />
          <Route path="courses" element={<StudentMyCourses />} />
          <Route path="courses/:courseId" element={<StudentCoursePlayer />} />
          <Route path="assignments" element={<StudentAssignments />} />
          <Route path="quiz/:assignmentId/results" element={<StudentQuizResults />} />
          <Route path="grades" element={<StudentGrades />} />
          <Route path="progress" element={<StudentProgress />} />
          <Route path="calendar" element={<StudentCalendar />} />
          <Route path="announcements" element={<StudentAnnouncements />} />
        </Route>

        <Route path="student/early" element={<EarlyApp />}>
          <Route index element={<EarlyHome />} />
          <Route path="activities" element={<EarlyActivities />} />
          <Route path="stickers" element={<EarlyStickers />} />
          <Route path="help" element={<EarlyHelp />} />
        </Route>
        <Route path="parent" element={<ParentApp />}>
          <Route index element={<ParentMyChildren />} />
          <Route path="child/:childId" element={<ParentChildOverview />} />
          <Route path="child/:childId/progress" element={<ParentChildProgress />} />
          <Route path="child/:childId/work" element={<ParentChildWork />} />
          <Route path="child/:childId/attendance" element={<ParentChildAttendance />} />
          <Route path="messages" element={<ParentMessages />} />
          <Route path="announcements" element={<ParentAnnouncements />} />
          <Route path="settings" element={<ParentSettings />} />
        </Route>

        <Route path="shared" element={<SharedApp />}>
          <Route index element={<Navigate to="/shared/profile" replace />} />
          <Route path="profile" element={<SharedProfile />} />
          <Route path="notifications" element={<SharedNotifications />} />
          <Route path="empty" element={<SharedEmptyState />} />
          <Route path="error" element={<SharedErrorState />} />
          <Route path="help" element={<SharedHelpCentre />} />
          <Route path="support" element={<SharedSupportTicket />} />
        </Route>

        <Route path="*" element={<Navigate to="/school-admin" replace />} />
      </Route>
    </Routes>
  )
}
