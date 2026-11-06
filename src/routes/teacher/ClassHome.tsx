import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, Plus } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
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
import { cn } from '@/lib/utils'
import {
  activityById,
  assignmentsForClass,
  atRiskInClass,
  classAverage,
  classById,
  coursesForClass,
  fullName,
  standingById,
  studentsInClass,
  submissionsForAssignment,
} from '@/data/teacher'
import type { ProgressStatus } from '@/types'

/**
 * Class home.
 *
 * One class, everything about it. The early tier switch happens here as well
 * as on the student side: for a Grade 2 class the teacher still sees the real
 * numbers, but the language on the page changes so she is never reading a
 * label the child would be upset to see.
 */
export function TeacherClassHome() {
  const { classId = '' } = useParams()
  const { t, locale } = useLocale()
  const [tab, setTab] = useState('students')

  const classGroup = classById(classId)

  if (!classGroup) {
    return (
      <Page>
        <PageHeader title="Class not found" subtitle="It may have been archived." />
        <Button variant="outline" size="sm" asChild>
          <Link to="/teacher/classes">{t('navMyClasses')}</Link>
        </Button>
      </Page>
    )
  }

  const early = classGroup.ageTier === 'early'
  const members = studentsInClass(classGroup.id)
  const average = classAverage(classGroup.id)
  const atRisk = atRiskInClass(classGroup.id)
  const classCourses = coursesForClass(classGroup.id)
  const classAssignments = assignmentsForClass(classGroup.id)

  const statusLabel: Record<ProgressStatus, string> = {
    'on-track': early ? 'Going well' : t('onTrack'),
    watch: early ? 'Keep going' : t('watch'),
    'at-risk': early ? 'Needs time with you' : t('atRisk'),
  }

  return (
    <Page>
      <PageHeader
        title={classGroup.name}
        subtitle={`Grade ${classGroup.grade} · ${members.length} students · Term 2`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/teacher/classes">
                <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                {t('navMyClasses')}
              </Link>
            </Button>
            <Button variant="accent" size="sm" asChild>
              <Link to={`/teacher/assign?class=${classGroup.id}`}>
                <Plus className="h-3.5 w-3.5" aria-hidden />
                Assign an activity
              </Link>
            </Button>
          </div>
        }
      />

      {early ? (
        <Card className="border-learner-primary/30 bg-learner-surface">
          <CardContent className="p-4 text-small text-foreground">
            This is a K1 to Grade 3 class. You see the real scores so you can act on them. The
            children see stars and completion only, never a percentage and never the words at risk.
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Students" value={String(members.length)} />
        <StatCard label={t('colAverage')} value={`${average}%`} hint="Class average this term" />
        <StatCard
          label={early ? 'Needs time with you' : t('atRisk')}
          value={String(atRisk.length)}
          emphasis={atRisk.length > 0}
        />
        <StatCard label="Assignments" value={String(classAssignments.length)} hint="This term" />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="students">{t('navStudents')}</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="pt-4">
          <Card>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('colStudent')}</TableHead>
                    <TableHead className="text-end">{t('colAverage')}</TableHead>
                    <TableHead className="text-end">{t('colCompletion')}</TableHead>
                    <TableHead>{t('colStatus')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((student) => {
                    const standing = standingById(student.id)
                    if (!standing) return null
                    return (
                      <TableRow key={student.id}>
                        <TableCell>
                          <Link
                            to={`/teacher/students/${student.id}`}
                            className="font-medium text-foreground underline-offset-4 hover:underline"
                          >
                            {fullName(student)}
                          </Link>
                        </TableCell>
                        <TableCell className="tabular text-end">{standing.average}%</TableCell>
                        <TableCell className="tabular text-end">{standing.completion}%</TableCell>
                        <TableCell>
                          <StatusBadge
                            status={standing.status}
                            label={statusLabel[standing.status]}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="pt-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {classCourses.map((course) => (
              <Link
                key={course.id}
                to={`/teacher/classes/${classGroup.id}/course/${course.id}`}
                className="flex items-start gap-3 rounded border border-border bg-background p-4 transition-colors hover:bg-surface"
              >
                <span
                  className={cn(
                    'grid h-9 w-9 flex-none place-items-center rounded',
                    early ? 'bg-learner-surface' : 'bg-muted',
                  )}
                >
                  <BookOpen className="h-4 w-4 text-foreground" aria-hidden />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-small font-medium text-foreground">
                    {locale === 'ar' ? course.titleAr : course.title}
                  </span>
                  <span className="block text-caption text-muted-foreground">
                    {course.units.length} units
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <Badge variant="outline">{classAssignments.length}</Badge>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead className="text-end">Submitted</TableHead>
                    <TableHead className="text-end">Waiting</TableHead>
                    <TableHead>Release</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classAssignments.map((assignment) => {
                    const activity = activityById(assignment.activityId)
                    const subs = submissionsForAssignment(assignment.id)
                    const submitted = subs.filter((s) => s.state !== 'not-started').length
                    const waiting = subs.filter((s) => s.state === 'needs-grading').length
                    return (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium text-foreground">
                          {activity ? (locale === 'ar' ? activity.titleAr : activity.title) : '—'}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{assignment.dueOn}</TableCell>
                        <TableCell className="tabular text-end">
                          {submitted} / {subs.length}
                        </TableCell>
                        <TableCell className="tabular text-end">
                          {waiting > 0 ? (
                            <Link
                              to={`/teacher/grading/${assignment.id}`}
                              className="font-semibold text-warning underline-offset-4 hover:underline"
                            >
                              {waiting}
                            </Link>
                          ) : (
                            <span className="text-muted-foreground">0</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              assignment.releaseMode === 'immediate' ? 'neutral' : 'outline'
                            }
                          >
                            {assignment.releaseMode === 'immediate' ? 'Immediate' : 'Manual'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Page>
  )
}
