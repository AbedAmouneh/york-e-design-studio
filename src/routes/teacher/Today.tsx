import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, Sparkles } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import {
  atRiskInClass,
  classAverage,
  fullName,
  needsGradingQueue,
  standingById,
  teacherClasses,
  teacherTotals,
} from '@/data/teacher'

/**
 * Today.
 *
 * A teacher opens the LMS in a five minute gap between lessons. The screen has
 * to answer what needs me now, not present a dashboard. So the order is: the
 * four numbers, then the lessons happening today, then the two queues that
 * actually generate work.
 */

const periods = [
  { time: '08:15', classId: 'cls-3', label: 'Mathematics, Unit 2', room: 'Room 12' },
  { time: '09:30', classId: 'cls-1', label: 'Mathematics, Unit 2', room: 'Room 4' },
  { time: '11:00', classId: 'cls-4', label: 'Mathematics, Unit 3', room: 'Room 12' },
  { time: '13:15', classId: 'cls-5', label: 'Mathematics, Unit 1', room: 'Room 9' },
]

export function TeacherToday() {
  const { t } = useLocale()
  const totals = teacherTotals()
  const queue = needsGradingQueue().slice(0, 4)

  const attention = teacherClasses
    .flatMap((classGroup) =>
      atRiskInClass(classGroup.id).map((student) => ({ student, classGroup })),
    )
    .slice(0, 5)

  return (
    <Page>
      <PageHeader
        title="Wednesday, 10 February"
        subtitle="Term 2, week 5 · Four classes today"
        actions={
          <Button variant="accent" size="sm" asChild>
            <Link to="/teacher/grading">
              Start marking
              <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Waiting to be marked"
          value={String(totals.waiting)}
          hint="Across four classes"
          emphasis={totals.waiting > 20}
        />
        <StatCard label="Due this week" value={String(totals.dueThisWeek)} hint="Assignments" />
        <StatCard
          label={t('atRisk')}
          value={String(totals.atRisk)}
          hint="Students below the threshold"
          emphasis={totals.atRisk > 0}
        />
        <StatCard label="Learners" value={String(totals.learners)} hint="In your classes" />
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Today</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/teacher/calendar">{t('navCalendar')}</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {periods.map((period) => {
              const classGroup = teacherClasses.find((item) => item.id === period.classId)
              if (!classGroup) return null
              const early = classGroup.ageTier === 'early'
              return (
                <Link
                  key={period.time}
                  to={`/teacher/classes/${classGroup.id}`}
                  className="flex items-center gap-4 rounded border border-border px-4 py-3 transition-colors hover:bg-surface"
                >
                  <span className="tabular flex-none text-small font-semibold text-foreground">
                    {period.time}
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-small font-medium text-foreground">
                        {classGroup.name}
                      </span>
                      {early ? (
                        <Badge variant="outline" className="flex-none">
                          K1 to G3
                        </Badge>
                      ) : null}
                    </span>
                    <span className="block truncate text-caption text-muted-foreground">
                      {period.label} · {period.room} · {classGroup.studentIds.length} students
                    </span>
                  </span>
                  <Button variant="outline" size="sm" className="flex-none" asChild>
                    <span>Present</span>
                  </Button>
                </Link>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('navNeedsGrading')}</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/teacher/grading">{t('viewAll')}</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {queue.map((item) => (
              <Link
                key={item.assignment.id}
                to={`/teacher/grading/${item.assignment.id}`}
                className="flex items-center gap-3 rounded border border-border px-4 py-3 transition-colors hover:bg-surface"
              >
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-small font-medium text-foreground">
                    {item.activity?.title ?? 'Activity'}
                  </span>
                  <span className="block truncate text-caption text-muted-foreground">
                    {item.classGroup?.name}
                  </span>
                </span>
                <span
                  className={cn(
                    'flex flex-none items-center gap-1 text-caption',
                    item.oldestDays >= 5 ? 'font-semibold text-warning' : 'text-muted-foreground',
                  )}
                >
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {item.oldestDays}d
                </span>
                <Badge variant="neutral" className="flex-none">
                  {item.waiting}
                </Badge>
              </Link>
            ))}
            {queue.length === 0 ? (
              <p className="py-6 text-center text-small text-muted-foreground">
                Nothing waiting. The queue is clear.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{t('needsYourAttention')}</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/teacher/students">{t('navStudents')}</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {attention.map(({ student, classGroup }) => {
              const standing = standingById(student.id)
              const early = classGroup.ageTier === 'early'
              return (
                <Link
                  key={student.id}
                  to={`/teacher/students/${student.id}`}
                  className="flex items-center gap-3 rounded border border-border px-4 py-2.5 transition-colors hover:bg-surface"
                >
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-small font-medium text-foreground">
                      {fullName(student)}
                    </span>
                    <span className="block truncate text-caption text-muted-foreground">
                      {classGroup.name}
                    </span>
                  </span>
                  {/*
                    The age rule is a teacher-facing rule too. The teacher sees
                    the real number for an early tier child so she can act on
                    it; the child never does. Saying that once under the list is
                    enough, a badge on every row just becomes noise.
                  */}
                  <span className="tabular flex-none text-small text-muted-foreground">
                    {standing?.average}%
                  </span>
                  <StatusBadge
                    status="at-risk"
                    label={early ? 'Needs time with you' : t('atRisk')}
                  />
                </Link>
              )
            })}
            <p className="px-2 pt-1 text-caption text-muted-foreground">
              Scores are shown to you for every age group. Children in K1 to Grade 3 never see a
              percentage or the words at risk.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your classes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {teacherClasses.map((classGroup) => {
              const average = classAverage(classGroup.id)
              return (
                <Link
                  key={classGroup.id}
                  to={`/teacher/classes/${classGroup.id}`}
                  className="flex items-center gap-3 rounded px-2 py-2 transition-colors hover:bg-surface"
                >
                  <span className="min-w-0 flex-1 truncate text-small font-medium text-foreground">
                    {classGroup.name}
                  </span>
                  <span className="h-1.5 w-24 flex-none overflow-hidden rounded-full bg-muted">
                    <span
                      className="block h-full rounded-full bg-foreground"
                      style={{ width: `${average}%` }}
                    />
                  </span>
                  <span className="tabular w-10 flex-none text-end text-caption text-muted-foreground">
                    {average}%
                  </span>
                </Link>
              )
            })}
          </CardContent>
        </Card>
      </section>

      <Card className="border-accent/40">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Sparkles className="h-4 w-4 flex-none text-foreground" aria-hidden />
          <span className="min-w-0 flex-1 text-small text-foreground">
            Six students missed the same question on common denominators. Build a ten minute
            reteach from the course content.
          </span>
          <Button variant="outline" size="sm" asChild>
            <Link to="/teacher/ai">Open AI tools</Link>
          </Button>
        </CardContent>
      </Card>
    </Page>
  )
}
