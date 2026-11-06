import { Navigate, Route, Routes } from 'react-router-dom'
import { StudioShell } from '@/components/studio/StudioShell'
import { Placeholder } from '@/components/studio/Placeholder'
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

        <Route
          path="super-admin"
          element={<Placeholder title="Super admin" note="York Press level. Eight screens planned." />}
        />
        <Route
          path="coordinator"
          element={<Placeholder title="Coordinator" note="Five screens planned." />}
        />
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
        </Route>
        <Route path="parent" element={<Placeholder title="Parent" note="Eight screens planned." />} />

        <Route path="*" element={<Navigate to="/school-admin" replace />} />
      </Route>
    </Routes>
  )
}
