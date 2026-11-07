import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import { cn, initials } from '@/lib/utils'
import { attendance, classes, courses, standings, students, teachers } from '@/data/seed'
import type { ProgressStatus, Trend } from '@/types'

export function SchoolAdminClassDetail() {
  const { classId } = useParams()
  const { t, locale } = useLocale()

  const classGroup = classes.find((item) => item.id === classId)

  const roster = useMemo(() => {
    if (!classGroup) return []
    const standingById = new Map(standings.map((s) => [s.studentId, s]))
    return classGroup.studentIds
      .map((id) => students.find((student) => student.id === id))
      .filter(Boolean)
      .map((student) => ({ student: student!, standing: standingById.get(student!.id) }))
      .sort((a, b) => (a.standing?.average ?? 0) - (b.standing?.average ?? 0))
  }, [classGroup])

  const attendanceSummary = useMemo(() => {
    if (!classGroup) return { present: 0, absent: 0, late: 0, excused: 0, total: 0 }
    const records = attendance.filter((record) => record.classId === classGroup.id)
    return {
      present: records.filter((r) => r.state === 'present').length,
      absent: records.filter((r) => r.state === 'absent').length,
      late: records.filter((r) => r.state === 'late').length,
      excused: records.filter((r) => r.state === 'excused').length,
      total: records.length,
    }
  }, [classGroup])

  if (!classGroup) {
    return (
      <Page>
        <PageHeader title={t('admClassNotFound')} />
      </Page>
    )
  }

  const classTeachers = teachers.filter((teacher) => classGroup.teacherIds.includes(teacher.id))
  const classCourses = courses.filter((course) => classGroup.courseIds.includes(course.id))

  const statusLabel: Record<ProgressStatus, string> = {
    'on-track': t('onTrack'),
    watch: t('watch'),
    'at-risk': t('atRisk'),
  }
  const trendLabel: Record<Trend, string> = {
    rising: t('rising'),
    steady: t('steady'),
    falling: t('falling'),
  }

  const attendanceRate = attendanceSummary.total
    ? Math.round((attendanceSummary.present / attendanceSummary.total) * 100)
    : 0

  return (
    <Page>
      <PageHeader
        title={classGroup.name}
        subtitle={t('admClassSubtitle')
          .replace('{g}', String(classGroup.grade))
          .replace('{n}', String(classGroup.studentIds.length))}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/school-admin/classes">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('navClasses')}
            </Link>
          </Button>
        }
      />

      <Tabs defaultValue="roster">
        <TabsList>
          <TabsTrigger value="roster">{t('admTabRoster')}</TabsTrigger>
          <TabsTrigger value="courses">{t('navCourses')}</TabsTrigger>
          <TabsTrigger value="teachers">{t('admTabTeachers')}</TabsTrigger>
          <TabsTrigger value="attendance">{t('navAttendance')}</TabsTrigger>
        </TabsList>

        <TabsContent value="roster" className="pt-5">
          <Card>
            <CardContent className="px-0 py-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('colStudent')}</TableHead>
                    <TableHead className="text-end">{t('colAverage')}</TableHead>
                    <TableHead className="text-end">{t('colCompletion')}</TableHead>
                    <TableHead>{t('colTrend')}</TableHead>
                    <TableHead>{t('colStatus')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roster.map(({ student, standing }) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <span className="flex items-center gap-2.5">
                          <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-muted text-caption font-semibold text-foreground">
                            {initials(`${student.firstName} ${student.lastName}`)}
                          </span>
                          <span className="font-medium text-foreground">
                            {student.firstName} {student.lastName}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="tabular text-end">
                        {classGroup.ageTier === 'early' ? (
                          <span className="text-muted-foreground">
                            {'★'.repeat(standing?.stars ?? 0)}
                            <span className="opacity-30">{'★'.repeat(3 - (standing?.stars ?? 0))}</span>
                          </span>
                        ) : (
                          `${standing?.average ?? 0}%`
                        )}
                      </TableCell>
                      <TableCell className="tabular text-end">{standing?.completion ?? 0}%</TableCell>
                      <TableCell className="text-muted-foreground">
                        {standing ? trendLabel[standing.trend] : '—'}
                      </TableCell>
                      <TableCell>
                        {classGroup.ageTier === 'early' ? (
                          <Badge variant="neutral">{t('admKeepGoing')}</Badge>
                        ) : standing ? (
                          <StatusBadge status={standing.status} label={statusLabel[standing.status]} />
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {classGroup.ageTier === 'early' ? (
            <p className="mt-3 text-caption text-muted-foreground">
              {t('admEarlyRosterNote')}
            </p>
          ) : null}
        </TabsContent>

        <TabsContent value="courses" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>{t('admAssignedCourses')}</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-3.5 w-3.5" aria-hidden />
                {t('admAssignCourse')}
              </Button>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('colCourse')}</TableHead>
                    <TableHead className="text-end">{t('admColUnits')}</TableHead>
                    <TableHead className="text-end">{t('admColActivities')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium text-foreground">
                        {locale === 'ar' ? course.titleAr : course.title}
                      </TableCell>
                      <TableCell className="tabular text-end">{course.units.length}</TableCell>
                      <TableCell className="tabular text-end">
                        {course.units.reduce((sum, unit) => sum + unit.activities.length, 0)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teachers" className="pt-5">
          <Card>
            <CardHeader>
              <CardTitle>{t('admTabTeachers')}</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-3.5 w-3.5" aria-hidden />
                {t('admAddTeacher')}
              </Button>
            </CardHeader>
            <CardContent className="space-y-0 pb-2">
              {classTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-0"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-muted text-caption font-semibold text-foreground">
                      {initials(`${teacher.firstName} ${teacher.lastName}`)}
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-small font-medium text-foreground">
                        {teacher.firstName} {teacher.lastName}
                      </span>
                      <span className="text-caption text-muted-foreground">{teacher.email}</span>
                    </span>
                  </span>
                  <span className="tabular text-small text-muted-foreground">
                    {t('admActiveDaysOf30').replace('{n}', String(teacher.activeDays))}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="pt-5">
          <div className="grid grid-cols-4 gap-4">
            <AttendanceStat label={t('admAttendanceRate')} value={`${attendanceRate}%`} />
            <AttendanceStat
              label={t('admAbsences')}
              value={String(attendanceSummary.absent)}
              tone="danger"
            />
            <AttendanceStat
              label={t('admLate')}
              value={String(attendanceSummary.late)}
              tone="warning"
            />
            <AttendanceStat label={t('admExcused')} value={String(attendanceSummary.excused)} />
          </div>
          <p className="mt-3 text-caption text-muted-foreground">{t('admLastSevenDays')}</p>
        </TabsContent>
      </Tabs>
    </Page>
  )
}

function AttendanceStat({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone?: 'danger' | 'warning'
}) {
  return (
    <Card className="p-4">
      <p className="text-small text-muted-foreground">{label}</p>
      <p
        className={cn(
          'tabular mt-2 text-heading font-semibold leading-none',
          tone === 'danger' && 'text-danger',
          tone === 'warning' && 'text-warning',
          !tone && 'text-foreground',
        )}
      >
        {value}
      </p>
    </Card>
  )
}
