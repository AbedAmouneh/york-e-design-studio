import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Megaphone, Minus, TrendingDown, TrendingUp, UserPlus } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SearchInput } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import { useStudioState } from '@/lib/studioState'
import { cn } from '@/lib/utils'
import {
  demoTeacher,
  fullName,
  standingById,
  studentsInClass,
  teacherClasses,
} from '@/data/teacher'
import type { ProgressStatus, Trend } from '@/types'

/**
 * Students.
 *
 * Patrick Prendergast praised the at risk, needs attention, on track split and
 * then asked the obvious follow up: once I have found the eight children who
 * are struggling, let me act on all eight at once. So selection and the bulk
 * bar are the point of this screen, not the table.
 *
 * The early tier relabelling is here too. The teacher sees the same data for a
 * Grade 2 class, in language she could repeat to a seven year old's parent.
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

export function TeacherStudents() {
  const { t } = useLocale()
  const [classFilter, setClassFilter] = useState('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [query, setQuery] = useState('')
  const messageFamilies = useStudioState((state) => state.messageFamilies)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sent, setSent] = useState<string | null>(null)

  const rows = useMemo(() => {
    const source =
      classFilter === 'all'
        ? teacherClasses.flatMap((item) =>
            studentsInClass(item.id).map((student) => ({ student, classGroup: item })),
          )
        : studentsInClass(classFilter).map((student) => ({
            student,
            classGroup: teacherClasses.find((item) => item.id === classFilter)!,
          }))

    return source
      .map((row) => ({ ...row, standing: standingById(row.student.id) }))
      .filter((row) => {
        if (status !== 'all' && row.standing?.status !== status) return false
        if (!query) return true
        return fullName(row.student).toLowerCase().includes(query.toLowerCase())
      })
      .sort((a, b) => (a.standing?.average ?? 0) - (b.standing?.average ?? 0))
  }, [classFilter, status, query])

  const counts = useMemo(() => {
    const all = teacherClasses.flatMap((item) =>
      studentsInClass(item.id).map((student) => standingById(student.id)),
    )
    return {
      total: all.length,
      'on-track': all.filter((s) => s?.status === 'on-track').length,
      watch: all.filter((s) => s?.status === 'watch').length,
      'at-risk': all.filter((s) => s?.status === 'at-risk').length,
    }
  }, [])

  const allVisibleSelected = rows.length > 0 && rows.every((row) => selected.has(row.student.id))

  const toggleAll = () => {
    setSent(null)
    setSelected((current) => {
      const next = new Set(current)
      if (allVisibleSelected) rows.forEach((row) => next.delete(row.student.id))
      else rows.forEach((row) => next.add(row.student.id))
      return next
    })
  }

  const toggleOne = (id: string) => {
    setSent(null)
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filters: Array<{ key: StatusFilter; label: string; count: number }> = [
    { key: 'all', label: t('tchAll'), count: counts.total },
    { key: 'at-risk', label: t('atRisk'), count: counts['at-risk'] },
    { key: 'watch', label: t('watch'), count: counts.watch },
    { key: 'on-track', label: t('onTrack'), count: counts['on-track'] },
  ]

  return (
    <Page>
      <PageHeader
        title={t('navStudents')}
        subtitle={t('tchStudentsSubtitle')
          .replace('{n}', String(counts.total))
          .replace('{m}', String(teacherClasses.length))}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap items-center gap-1 rounded border border-border p-0.5">
          <Button
            variant={classFilter === 'all' ? 'outline' : 'ghost'}
            size="sm"
            onClick={() => setClassFilter('all')}
          >
            {t('allClasses')}
          </Button>
          {teacherClasses.map((item) => (
            <Button
              key={item.id}
              variant={classFilter === item.id ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => setClassFilter(item.id)}
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
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {filters.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setStatus(item.key)}
            className={cn(
              'rounded border p-4 text-start transition-colors',
              status === item.key
                ? 'border-foreground bg-background'
                : 'border-border bg-background hover:bg-surface',
            )}
          >
            <span className="text-small text-muted-foreground">{item.label}</span>
            <span className="tabular mt-2 block text-display font-semibold leading-none text-foreground">
              {item.count}
            </span>
          </button>
        ))}
      </div>

      {selected.size > 0 ? (
        <Card className="border-accent/50">
          <CardContent className="flex flex-wrap items-center gap-3 p-3">
            <Badge variant="accent">
              {selected.size} {t('selected')}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                /*
                 * One message, many families. Writing it here is what puts it
                 * in the parent's inbox rather than only on this screen.
                 */
                messageFamilies({
                  id: `msg-live-${Date.now()}`,
                  studentIds: Array.from(selected),
                  bodyKey: 'tchBulkMessageBody',
                  from: fullName(demoTeacher),
                  at: 'Just now',
                })
                setSent('message')
              }}
            >
              <Megaphone className="h-3.5 w-3.5" aria-hidden />
              {t('tchMessageParents')}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSent('assign')}>
              <UserPlus className="h-3.5 w-3.5" aria-hidden />
              {t('tchAssignExtraPractice')}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSent('flag')}>
              {t('tchFlagToCoordinator')}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>
              {t('clear')}
            </Button>
            {sent ? (
              <span className="text-small text-success">
                {sent === 'message'
                  ? t('tchDraftedForFamilies').replace('{n}', String(selected.size))
                  : sent === 'assign'
                    ? t('tchPracticeQueued').replace('{n}', String(selected.size))
                    : t('tchFlaggedToCoordinator').replace('{n}', String(selected.size))}
              </span>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox checked={allVisibleSelected} onCheckedChange={toggleAll} />
                </TableHead>
                <TableHead>{t('colStudent')}</TableHead>
                <TableHead>{t('colClass')}</TableHead>
                <TableHead className="text-end">{t('colAverage')}</TableHead>
                <TableHead className="text-center">{t('colTrend')}</TableHead>
                <TableHead className="text-end">{t('colCompletion')}</TableHead>
                <TableHead>{t('colStatus')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(({ student, classGroup, standing }) => {
                if (!standing) return null
                const early = classGroup.ageTier === 'early'
                const TrendMark = trendIcon[standing.trend]
                const label =
                  early && standing.status === 'at-risk'
                    ? t('tchNeedsTimeWithYou')
                    : early && standing.status === 'watch'
                      ? t('tchKeepGoing')
                      : early
                        ? t('tchGoingWell')
                        : t(
                            standing.status === 'at-risk'
                              ? 'atRisk'
                              : standing.status === 'watch'
                                ? 'watch'
                                : 'onTrack',
                          )
                return (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Checkbox
                        checked={selected.has(student.id)}
                        onCheckedChange={() => toggleOne(student.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/teacher/students/${student.id}`}
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {fullName(student)}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{classGroup.name}</TableCell>
                    <TableCell className="tabular text-end">{standing.average}%</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'flex items-center justify-center',
                          trendTone[standing.trend],
                        )}
                      >
                        <TrendMark className="h-4 w-4" aria-hidden />
                        <span className="sr-only">{t(standing.trend)}</span>
                      </span>
                    </TableCell>
                    <TableCell className="tabular text-end">{standing.completion}%</TableCell>
                    <TableCell>
                      <StatusBadge status={standing.status} label={label} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">{t('tchStudentsNote')}</p>
    </Page>
  )
}
