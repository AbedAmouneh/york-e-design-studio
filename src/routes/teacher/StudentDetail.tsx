import { Link, useParams } from 'react-router-dom'
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ArrowLeft, Mail, Sparkles } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import { attendance, guardians, mastery, skills } from '@/data/seed'
import {
  activityById,
  classById,
  fullName,
  standingById,
  studentById,
  submissionsForStudent,
  teacherAssignments,
} from '@/data/teacher'

/**
 * Student detail.
 *
 * The trend chart is the centrepiece and it is deliberately a line rather than
 * a number. Patrick Prendergast's point was that a single average cannot tell
 * you whether a child is climbing or sliding, and a teacher about to phone a
 * parent needs to know which.
 *
 * The threshold line is drawn so the shape of the slide is visible against the
 * point where the school says a child needs help.
 */
export function TeacherStudentDetail() {
  const { studentId = '' } = useParams()
  const { t, locale, dir } = useLocale()

  const student = studentById(studentId)
  const standing = standingById(studentId)

  if (!student || !standing) {
    return (
      <Page>
        <PageHeader title="Student not found" subtitle="They may have moved class." />
        <Button variant="outline" size="sm" asChild>
          <Link to="/teacher/students">{t('navStudents')}</Link>
        </Button>
      </Page>
    )
  }

  const classGroup = student.classIds.map((id) => classById(id)).find(Boolean)
  const early = student.ageTier === 'early'
  const guardian = guardians.find((item) => item.childIds.includes(student.id))

  const own = submissionsForStudent(student.id).filter((s) => s.score !== null)
  const trendSeries = own.slice(0, 8).map((submission, index) => {
    const assignment = teacherAssignments.find((item) => item.id === submission.assignmentId)
    const activity = assignment ? activityById(assignment.activityId) : undefined
    return {
      label: activity?.title ?? `Task ${index + 1}`,
      score: submission.score ?? 0,
    }
  })

  const studentAttendance = attendance.filter((record) => record.studentId === student.id)
  const absences = studentAttendance.filter((record) => record.state === 'absent').length
  const lates = studentAttendance.filter((record) => record.state === 'late').length

  const studentMastery = mastery
    .filter((record) => record.studentId === student.id)
    .map((record) => ({ record, skill: skills.find((item) => item.id === record.skillId) }))
    .sort((a, b) => a.record.mastery - b.record.mastery)

  const statusLabel = early
    ? standing.status === 'at-risk'
      ? 'Needs time with you'
      : standing.status === 'watch'
        ? 'Keep going'
        : 'Going well'
    : t(
        standing.status === 'at-risk'
          ? 'atRisk'
          : standing.status === 'watch'
            ? 'watch'
            : 'onTrack',
      )

  return (
    <Page>
      <PageHeader
        title={fullName(student)}
        subtitle={`${classGroup?.name ?? ''} · Grade ${classGroup?.grade ?? ''}`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/teacher/students">
                <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                {t('navStudents')}
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              Message the parent
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-4 rounded border border-border bg-background p-4">
        <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-muted text-small font-semibold text-foreground">
          {initials(fullName(student))}
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block text-small font-medium text-foreground">{student.email}</span>
          <span className="block text-caption text-muted-foreground">
            Parent: {fullName(guardian)} · {guardian?.email}
          </span>
        </span>
        <StatusBadge status={standing.status} label={statusLabel} />
        {early ? <Badge variant="outline">K1 to G3 view</Badge> : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t('colAverage')} value={`${standing.average}%`} />
        <StatCard label={t('colCompletion')} value={`${standing.completion}%`} />
        <StatCard label="Absences" value={String(absences)} hint="This term" emphasis={absences > 2} />
        <StatCard label="Late arrivals" value={String(lates)} hint="This term" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scores over time</CardTitle>
          <Badge
            variant={
              standing.trend === 'rising'
                ? 'success'
                : standing.trend === 'falling'
                  ? 'danger'
                  : 'neutral'
            }
          >
            {t(standing.trend)}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendSeries} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="label"
                  reversed={dir === 'rtl'}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  orientation={dir === 'rtl' ? 'right' : 'left'}
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 6,
                    border: '1px solid hsl(var(--border))',
                    fontSize: 12,
                  }}
                />
                <ReferenceLine
                  y={60}
                  stroke="hsl(var(--danger))"
                  strokeDasharray="4 4"
                  label={{
                    value: 'Needs help below here',
                    fontSize: 10,
                    fill: 'hsl(var(--danger))',
                    position: dir === 'rtl' ? 'insideLeft' : 'insideRight',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--foreground))"
                  strokeWidth={2}
                  dot={{ r: 3, fill: 'hsl(var(--accent))', stroke: 'hsl(var(--foreground))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Work this term</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>{t('colClass')}</TableHead>
                  <TableHead className="text-end">Score</TableHead>
                  <TableHead>State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissionsForStudent(student.id)
                  .slice(0, 8)
                  .map((submission) => {
                    const assignment = teacherAssignments.find(
                      (item) => item.id === submission.assignmentId,
                    )
                    const activity = assignment ? activityById(assignment.activityId) : undefined
                    return (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium text-foreground">
                          {activity
                            ? locale === 'ar'
                              ? activity.titleAr
                              : activity.title
                            : 'Activity'}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {assignment ? classById(assignment.classId)?.name : '—'}
                        </TableCell>
                        <TableCell className="tabular text-end">
                          {submission.score ?? '—'}
                        </TableCell>
                        <TableCell>
                          {submission.state === 'needs-grading' ? (
                            <Badge variant="warning">Waiting</Badge>
                          ) : submission.state === 'not-started' ? (
                            <Badge variant="outline">Not started</Badge>
                          ) : submission.released ? (
                            <Badge variant="success">Released</Badge>
                          ) : (
                            <Badge variant="outline">Held</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weakest skills</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/teacher/students/${student.id}/skills`}>Drill down</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {studentMastery.slice(0, 5).map(({ record, skill }) => (
              <div key={record.skillId} className="space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="min-w-0 truncate text-small text-foreground">
                    {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : 'Skill'}
                  </span>
                  <span className="tabular flex-none text-caption text-muted-foreground">
                    {record.mastery}%
                  </span>
                </div>
                <span className="block h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <span
                    className={cn(
                      'block h-full rounded-full',
                      record.mastery < 50
                        ? 'bg-danger'
                        : record.mastery < 70
                          ? 'bg-warning'
                          : 'bg-success',
                    )}
                    style={{ width: `${record.mastery}%` }}
                  />
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-accent/40">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Sparkles className="h-4 w-4 flex-none text-foreground" aria-hidden />
          <span className="min-w-0 flex-1 text-small text-foreground">
            The drop started after Unit 2, which is where common denominators are introduced. Assign
            the Unit 2 practice set before moving on.
          </span>
          <Button variant="outline" size="sm" asChild>
            <Link to="/teacher/assign">Assign practice</Link>
          </Button>
        </CardContent>
      </Card>
    </Page>
  )
}
