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

export default function App() {
  return (
    <Routes>
      {/* Present mode is outside the studio shell on purpose: it is projected. */}
      <Route path="/teacher/present" element={<TeacherPresent />} />

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
        <Route
          path="student"
          element={<Placeholder title="Student" note="Fifteen screens across two age tiers." />}
        />
        <Route path="parent" element={<Placeholder title="Parent" note="Eight screens planned." />} />

        <Route path="*" element={<Navigate to="/school-admin" replace />} />
      </Route>
    </Routes>
  )
}
