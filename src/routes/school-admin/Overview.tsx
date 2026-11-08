import { useMemo } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowUpRight, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { StatCard } from '@/components/app/StatCard'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import { groupName, schoolName, schoolPlace } from '@/lib/names'
import { cn, formatNumber } from '@/lib/utils'
import {
  activityLog,
  classesForSchool,
  DEFAULT_SCHOOL_ID,
  mastery,
  schools,
  skills,
  standings,
  students,
  teachersForSchool,
} from '@/data/seed'
import type { ProgressStatus } from '@/types'

const weeklyActive = [
  { week: 'W1', early: 38, middle: 44, upper: 41 },
  { week: 'W2', early: 41, middle: 47, upper: 43 },
  { week: 'W3', early: 39, middle: 52, upper: 46 },
  { week: 'W4', early: 43, middle: 55, upper: 44 },
  { week: 'W5', early: 40, middle: 51, upper: 48 },
  { week: 'W6', early: 44, middle: 58, upper: 50 },
]

export function SchoolAdminOverview() {
  const { t, locale, dir } = useLocale()
  const school = schools.find((s) => s.id === DEFAULT_SCHOOL_ID)!

  const schoolClasses = useMemo(() => classesForSchool(school.id), [school.id])
  const schoolStudents = useMemo(
    () => students.filter((s) => s.schoolId === school.id),
    [school.id],
  )
  const schoolTeachers = useMemo(() => teachersForSchool(school.id), [school.id])

  const standingById = useMemo(
    () => new Map(standings.map((standing) => [standing.studentId, standing])),
    [],
  )

  const attentionList = useMemo(
    () =>
      schoolStudents
        .map((student) => ({ student, standing: standingById.get(student.id) }))
        .filter((row) => row.standing?.status === 'at-risk')
        .sort((a, b) => (a.standing?.average ?? 0) - (b.standing?.average ?? 0))
        .slice(0, 5),
    [schoolStudents, standingById],
  )

  const classRows = useMemo(
    () =>
      schoolClasses.map((classGroup) => {
        const members = classGroup.studentIds
          .map((id) => standingById.get(id))
          .filter(Boolean) as NonNullable<ReturnType<typeof standingById.get>>[]
        const average = members.length
          ? Math.round(members.reduce((sum, m) => sum + m.average, 0) / members.length)
          : 0
        const completion = members.length
          ? Math.round(members.reduce((sum, m) => sum + m.completion, 0) / members.length)
          : 0
        const atRisk = members.filter((m) => m.status === 'at-risk').length
        const status: ProgressStatus = average >= 75 ? 'on-track' : average >= 65 ? 'watch' : 'at-risk'
        const teacher = schoolTeachers.find((teach) => classGroup.teacherIds.includes(teach.id))
        return { classGroup, average, completion, atRisk, status, teacher }
      }),
    [schoolClasses, schoolTeachers, standingById],
  )

  const weakestSkills = useMemo(() => {
    const byskill = new Map<string, { total: number; count: number }>()
    mastery.forEach((record) => {
      const entry = byskill.get(record.skillId) ?? { total: 0, count: 0 }
      entry.total += record.mastery
      entry.count += 1
      byskill.set(record.skillId, entry)
    })
    return Array.from(byskill.entries())
      .map(([skillId, entry]) => ({
        skill: skills.find((s) => s.id === skillId)!,
        average: Math.round(entry.total / entry.count),
      }))
      .filter((row) => row.skill)
      .sort((a, b) => a.average - b.average)
      .slice(0, 5)
  }, [])

  const statusLabel: Record<ProgressStatus, string> = {
    'on-track': t('onTrack'),
    watch: t('watch'),
    'at-risk': t('atRisk'),
  }

  const activeCount = schoolStudents.filter((s) => s.lastActiveOn).length
  const attentionCount = schoolStudents.filter(
    (s) => standingById.get(s.id)?.status !== 'on-track',
  ).length

  return (
    <div className="mx-auto max-w-[1180px] space-y-5 p-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-heading font-semibold tracking-tight text-foreground">
            {t('overviewTitle')}
          </h1>
          <p className="mt-1 text-small text-muted-foreground">
            {schoolName(school, locale)} · {schoolPlace(school, locale)} · {school.academicYear}
          </p>
        </div>
        <Button variant="accent" size="sm">
          {t('export')}
        </Button>
      </header>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label={t('activeLearners')} value={formatNumber(activeCount, locale)} hint={`${formatNumber(school.seatsUsed, locale)} ${t('seatsUsed')}`} />
        <StatCard label={t('needsAttention')} value={formatNumber(attentionCount, locale)} hint={t('thisTerm')} emphasis />
        <StatCard label={t('classesCount')} value={formatNumber(schoolClasses.length, locale)} />
        <StatCard label={t('teachersCount')} value={formatNumber(schoolTeachers.length, locale)} />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{t('weeklyActive')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyActive} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillUpper" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity={0.18} />
                      <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="week"
                    reversed={dir === 'rtl'}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    orientation={dir === 'rtl' ? 'right' : 'left'}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 6,
                      border: '1px solid hsl(var(--border))',
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="middle"
                    stroke="hsl(var(--foreground))"
                    strokeWidth={2}
                    fill="url(#fillUpper)"
                  />
                  <Area
                    type="monotone"
                    dataKey="upper"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('needsYourAttention')}</CardTitle>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              {t('viewAll')}
              <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
            </Button>
          </CardHeader>
          <CardContent className="space-y-0 pb-2">
            {attentionList.map(({ student, standing }) => (
              <div
                key={student.id}
                className="flex items-center justify-between gap-3 border-b border-border py-2.5 last:border-0"
              >
                <span className="min-w-0 truncate text-small text-foreground">
                  {student.firstName} {student.lastName}
                </span>
                <span className="flex flex-none items-center gap-2">
                  <span className="tabular text-small text-muted-foreground">
                    {standing?.average}%
                  </span>
                  <StatusBadge status="at-risk" label={t('atRisk')} />
                </span>
              </div>
            ))}
          </CardContent>
          <div className="flex items-center gap-2 border-t border-border px-5 py-3">
            <Users className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            <span className="text-caption text-muted-foreground">
              {t('admSelectToMessage')}
            </span>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{t('progressByClass')}</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('colClass')}</TableHead>
                  <TableHead>{t('colTeacher')}</TableHead>
                  <TableHead className="text-end">{t('colAverage')}</TableHead>
                  <TableHead className="text-end">{t('colCompletion')}</TableHead>
                  <TableHead>{t('colStatus')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classRows.map((row) => (
                  <TableRow key={row.classGroup.id}>
                    <TableCell className="font-medium text-foreground">
                      {groupName(row.classGroup, locale)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.teacher ? `${row.teacher.firstName} ${row.teacher.lastName}` : '—'}
                    </TableCell>
                    <TableCell className="tabular text-end">{row.average}%</TableCell>
                    <TableCell className="tabular text-end">{row.completion}%</TableCell>
                    <TableCell>
                      <StatusBadge status={row.status} label={statusLabel[row.status]} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('weakestSkills')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {weakestSkills.map((row) => (
              <div key={row.skill.id} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="min-w-0 truncate text-small text-foreground">
                    {locale === 'ar' ? row.skill.nameAr : row.skill.name}
                  </span>
                  <span className="tabular flex-none text-small text-muted-foreground">
                    {row.average}%
                  </span>
                </div>
                <Progress
                  value={row.average}
                  label={`${locale === 'ar' ? row.skill.nameAr : row.skill.name} · ${t('colMastery')}`}
                  tone={row.average < 55 ? 'danger' : row.average < 70 ? 'warning' : 'success'}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('teacherUsage')}</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('colTeacher')}</TableHead>
                  <TableHead className="text-end">{t('colLastActive')}</TableHead>
                  <TableHead className="text-end">{t('admActiveDays')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schoolTeachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell className="font-medium text-foreground">
                      {teacher.firstName} {teacher.lastName}
                    </TableCell>
                    <TableCell className="text-end text-muted-foreground">
                      {t('admFeb10')}
                    </TableCell>
                    <TableCell className="tabular text-end">
                      <span className={cn(teacher.activeDays < 10 && 'text-warning font-semibold')}>
                        {teacher.activeDays} / 30
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 pb-2">
            {activityLog.map((entry) => (
              <div key={entry.id} className="border-b border-border py-2.5 last:border-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-small font-medium text-foreground">{entry.action}</span>
                  <span className="flex-none text-caption text-muted-foreground">
                    {entry.at.slice(11, 16)}
                  </span>
                </div>
                <p className="mt-0.5 text-caption text-muted-foreground">
                  {entry.actorName} · {entry.target}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

