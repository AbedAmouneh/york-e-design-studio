import { Navigate, Route, Routes } from 'react-router-dom'
import { StudioShell } from '@/components/studio/StudioShell'
import { Placeholder } from '@/components/studio/Placeholder'
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

export default function App() {
  return (
    <Routes>
      <Route element={<StudioShell />}>
        <Route index element={<Navigate to="/school-admin" replace />} />

        <Route path="canvas" element={<Placeholder title="Canvas" note="Every frame side by side. Built once the first role is complete." />} />

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

        <Route path="super-admin" element={<Placeholder title="Super admin" note="York Press level. Eight screens planned." />} />
        <Route path="coordinator" element={<Placeholder title="Coordinator" note="Five screens planned." />} />
        <Route path="teacher" element={<Placeholder title="Teacher" note="Twenty two screens planned." />} />
        <Route path="student" element={<Placeholder title="Student" note="Fifteen screens across two age tiers." />} />
        <Route path="parent" element={<Placeholder title="Parent" note="Eight screens planned." />} />

        <Route path="*" element={<Navigate to="/school-admin" replace />} />
      </Route>
    </Routes>
  )
}
