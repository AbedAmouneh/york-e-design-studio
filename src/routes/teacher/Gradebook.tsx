import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Download,
  History,
  Minus,
  Settings2,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/input'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import {
  activityById,
  assignmentsForClass,
  fullName,
  standingById,
  studentsInClass,
  submissionsForAssignment,
  teacherClasses,
} from '@/data/teacher'
import type { ProgressStatus, Trend } from '@/types'

/**
 * Gradebook.
 *
 * Three things were asked for and all three are here.
 *
 *   Filter and search, because a class of 26 across six columns is unusable
 *   without them.
 *
 *   Trend, which is Patrick Prendergast's point from 26 June: a single score
 *   does not say whether a child is climbing or sliding. There are two
 *   trends on this screen. Per student, in its own column. Per assignment, in
 *   the column header, which tells the teacher the question was the problem
 *   rather than the class.
 *
 *   Weighting, drop lowest and the grading scale, which live on the settings
 *   screen rather than here, because they are set once a term and changing
 *   them by accident rewrites every number on this page.
 */

const trendIcon: Record<Trend, typeof TrendingUp> = {
  rising: TrendingUp,
  steady: Minus,
  falling: TrendingDown,
}

const trendTone: Record<Trend, string> = {
  rising: 'text-success',
  steady: 'text-muted-foreground',
  falling: 'text-danger',
}

type StatusFilter = 'all' | ProgressStatus

export function TeacherGradebook() {
  const { t, locale } = useLocale()
  const [classId, setClassId] = useState(teacherClasses[1]?.id ?? teacherClasses[0].id)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')

  const classGroup = teacherClasses.find((item) => item.id === classId)!
  const early = classGroup.ageTier === 'early'
  const classAssignments = assignmentsForClass(classId)

  const columns = useMemo(
    () =>
      classAssignments.map((assignment) => {
        const subs = submissionsForAssignment(assignment.id)
        const scored = subs.filter((s) => s.score !== null)
        const average = scored.length
          ? Math.round(scored.reduce((sum, s) => sum + (s.score ?? 0), 0) / scored.length)
          : 0
        const health: ProgressStatus =
          average >= 75 ? 'on-track' : average >= 62 ? 'watch' : 'at-risk'
        const byStudent = new Map(subs.map((submission) => [submission.studentId, submission]))
        return { assignment, activity: activityById(assignment.activityId), average, health, byStudent }
      }),
    [classAssignments],
  )

  const rows = useMemo(() => {
    return studentsInClass(classId)
      .map((student) => ({ student, standing: standingById(student.id) }))
      .filter(({ student, standing }) => {
        if (status !== 'all' && standing?.status !== status) return false
        if (!query) return true
        return fullName(student).toLowerCase().includes(query.toLowerCase())
      })
  }, [classId, query, status])

  const filters: Array<{ key: StatusFilter; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'on-track', label: early ? 'Going well' : t('onTrack') },
    { key: 'watch', label: early ? 'Keep going' : t('watch') },
    { key: 'at-risk', label: early ? 'Needs time' : t('atRisk') },
  ]

  return (
    <Page>
      <PageHeader
        title={t('navGradebook')}
        subtitle={`${classGroup.name} · Term 2 · ${columns.length} graded activities`}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/teacher/gradebook/audit">
                <History className="h-3.5 w-3.5" aria-hidden />
                Changes
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/teacher/gradebook/settings">
                <Settings2 className="h-3.5 w-3.5" aria-hidden />
                {t('navSettings')}
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" aria-hidden />
              {t('export')}
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-1 rounded border border-border p-0.5">
              {teacherClasses.map((item) => (
                <Button
                  key={item.id}
                  variant={item.id === classId ? 'outline' : 'ghost'}
                  size="sm"
                  onClick={() => setClassId(item.id)}
                >
                  {item.name}
                </Button>
              ))}
            </div>

            <div className="w-full max-w-[220px]">
              <SearchInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('search')}
              />
            </div>

            <div className="flex flex-wrap items-center gap-1">
              {filters.map((item) => (
                <Button
                  key={item.key}
                  variant={item.key === status ? 'outline' : 'ghost'}
                  size="sm"
                  onClick={() => setStatus(item.key)}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            <span className="ms-auto text-caption text-muted-foreground">
              {rows.length} of {classGroup.studentIds.length} students
            </span>
          </div>

          <div className="-mx-4 -mb-4 overflow-x-auto">
            <table className="w-full border-collapse text-small">
              <thead>
                <tr className="border-y border-border bg-surface">
                  <th className="sticky start-0 z-10 min-w-[200px] bg-surface px-4 py-2.5 text-start font-medium text-muted-foreground">
                    {t('colStudent')}
                  </th>
                  <th className="min-w-[88px] px-3 py-2.5 text-end font-medium text-muted-foreground">
                    {t('colAverage')}
                  </th>
                  <th className="min-w-[72px] px-3 py-2.5 text-center font-medium text-muted-foreground">
                    {t('colTrend')}
                  </th>
                  {columns.map((column) => (
                    <th key={column.assignment.id} className="min-w-[116px] px-3 py-2 align-bottom">
                      <span className="flex flex-col items-end gap-1 leading-tight">
                        <span className="truncate text-caption font-medium text-foreground">
                          {column.activity
                            ? locale === 'ar'
                              ? column.activity.titleAr
                              : column.activity.title
                            : '—'}
                        </span>
                        <span className="text-caption font-normal text-muted-foreground">
                          out of {column.activity?.points ?? 20}
                        </span>
                        {/* Per assignment health, so a bad column reads as a bad question. */}
                        <span
                          className={cn(
                            'rounded-full px-1.5 py-0.5 text-caption font-semibold',
                            column.health === 'on-track' && 'bg-success-tint text-success',
                            column.health === 'watch' && 'bg-warning-tint text-warning',
                            column.health === 'at-risk' && 'bg-danger-tint text-danger',
                          )}
                        >
                          {column.average}% avg
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ student, standing }) => {
                  const Trend = standing ? trendIcon[standing.trend] : Minus
                  return (
                    <tr key={student.id} className="border-b border-border last:border-0">
                      <td className="sticky start-0 z-10 bg-background px-4 py-2.5">
                        <Link
                          to={`/teacher/students/${student.id}`}
                          className="font-medium text-foreground underline-offset-4 hover:underline"
                        >
                          {fullName(student)}
                        </Link>
                      </td>
                      <td className="tabular px-3 py-2.5 text-end font-medium text-foreground">
                        {standing?.average}%
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className={cn(
                            'flex items-center justify-center',
                            standing ? trendTone[standing.trend] : 'text-muted-foreground',
                          )}
                          title={standing ? t(standing.trend) : undefined}
                        >
                          <Trend className="h-4 w-4" aria-hidden />
                          <span className="sr-only">{standing ? t(standing.trend) : ''}</span>
                        </span>
                      </td>
                      {columns.map((column) => {
                        const submission = column.byStudent.get(student.id)
                        return (
                          <td key={column.assignment.id} className="px-3 py-2.5 text-end">
                            <GradeCell
                              assignmentId={column.assignment.id}
                              state={submission?.state}
                              score={submission?.score ?? null}
                              late={submission?.late ?? false}
                              released={submission?.released ?? false}
                            />
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-4 text-caption text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-warning" aria-hidden />
          Waiting to be marked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted-foreground" aria-hidden />
          Not started
        </span>
        <span className="flex items-center gap-1.5">
          <Badge variant="outline">Held</Badge>
          Marked but not released to the student
        </span>
        <span>L = submitted late</span>
      </div>
    </Page>
  )
}

function GradeCell({
  assignmentId,
  state,
  score,
  late,
  released,
}: {
  assignmentId: string
  state: string | undefined
  score: number | null
  late: boolean
  released: boolean
}) {
  if (state === 'needs-grading') {
    return (
      <Link
        to={`/teacher/grading/${assignmentId}`}
        className="inline-flex items-center gap-1.5 rounded bg-warning-tint px-2 py-0.5 text-caption font-semibold text-warning"
      >
        Mark
      </Link>
    )
  }

  if (state === 'not-started' || score === null) {
    return <span className="text-muted-foreground">—</span>
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      {late ? <span className="text-caption font-semibold text-warning">L</span> : null}
      <span
        className={cn(
          'tabular font-medium',
          score < 50 ? 'text-danger' : 'text-foreground',
          !released && 'opacity-55',
        )}
        title={released ? undefined : 'Marked but not released to the student'}
      >
        {score}
      </span>
    </span>
  )
}
