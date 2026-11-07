import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Clock, Sparkles } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useLocale } from '@/lib/i18n'
import { useStudioState } from '@/lib/studioState'
import { groupName } from '@/lib/names'
import { cn, initials } from '@/lib/utils'
import {
  activityById,
  classById,
  fullName,
  studentById,
  submissionsForAssignment,
  teacherAssignments,
} from '@/data/teacher'

/**
 * Flow 6 of 8: grade a submission.
 *
 * Marking is repetitive work, so the screen is built around moving to the next
 * child without leaving the page. The list of who is left stays on the side,
 * the score field is focused, and saving advances automatically.
 *
 * Release is a deliberate second step. A teacher marking thirty scripts over
 * two evenings does not want child one to see a mark while child thirty is
 * still waiting, so marks are held until she releases the set.
 */

const rubric = [
  { id: 'r1', labelKey: 'tchRubricMethod', points: 8 },
  { id: 'r2', labelKey: 'tchRubricWorking', points: 6 },
  { id: 'r3', labelKey: 'tchRubricAnswerUnits', points: 6 },
] as const

const quickCommentKeys = [
  'tchQuickComment1',
  'tchQuickComment2',
  'tchQuickComment3',
  'tchQuickComment4',
] as const

export function TeacherGradeSubmission() {
  const { assignmentId = '' } = useParams()
  const { t, locale } = useLocale()

  const assignment = teacherAssignments.find((item) => item.id === assignmentId)
  const activity = assignment ? activityById(assignment.activityId) : undefined
  const classGroup = assignment ? classById(assignment.classId) : undefined

  const waiting = useMemo(
    () =>
      assignment
        ? submissionsForAssignment(assignment.id).filter((s) => s.state === 'needs-grading')
        : [],
    [assignment],
  )

  const releaseGrades = useStudioState((state) => state.releaseGrades)
  const [index, setIndex] = useState(0)
  const [scores, setScores] = useState<Record<string, number | undefined>>({})
  const [feedback, setFeedback] = useState<Record<string, string | undefined>>({})
  const [releaseNow, setReleaseNow] = useState(false)
  const [done, setDone] = useState(false)

  if (!assignment || waiting.length === 0) {
    return (
      <Page>
        <PageHeader title={t('tchNothingToMark')} subtitle={t('tchAllMarked')} />
        <Button variant="outline" size="sm" asChild>
          <Link to="/teacher/grading">{t('navNeedsGrading')}</Link>
        </Button>
      </Page>
    )
  }

  const current = waiting[Math.min(index, waiting.length - 1)]
  const student = studentById(current.studentId)
  const marked = Object.keys(scores).length
  const score = scores[current.id] ?? ''
  const comment = feedback[current.id] ?? ''

  /*
   * Releasing is what makes a mark exist for the student and the parent, so it
   * is the only point that writes to the studio state. Marking alone writes
   * nothing, which is the same rule the real product follows.
   */
  const publish = () => {
    releaseGrades(
      waiting
        .filter((submission) => scores[submission.id] !== undefined)
        .map((submission) => ({
          assignmentId: submission.assignmentId,
          studentId: submission.studentId,
          activityTitle: activity?.title ?? '',
          activityTitleAr: activity?.titleAr ?? '',
          score: scores[submission.id] ?? 0,
          outOf: activity?.points ?? 20,
          feedback: feedback[submission.id] ?? '',
        })),
    )
  }

  const save = () => {
    if (index < waiting.length - 1) {
      setIndex(index + 1)
      return
    }
    if (releaseNow) publish()
    setDone(true)
  }

  if (done) {
    return (
      <Page>
        <PageHeader
          title={t('tchSetMarked')}
          subtitle={locale === 'ar' ? activity?.titleAr : activity?.title}
        />
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-success-tint">
              <Check className="h-5 w-5 text-success" aria-hidden />
            </span>
            <p className="text-subheading font-semibold text-foreground">
              {t('tchMarkedCount')
                .replace('{n}', String(marked))
                .replace('{m}', String(waiting.length))}
            </p>
            <p className="max-w-[52ch] text-small text-muted-foreground">
              {releaseNow ? t('tchReleasedNow') : t('tchMarksHeld')}
            </p>
            <div className="mt-2 flex items-center gap-2">
              {!releaseNow ? (
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => {
                    publish()
                    setReleaseNow(true)
                  }}
                >
                  {t('tchReleaseToStudents')}
                </Button>
              ) : null}
              <Button variant="outline" size="sm" asChild>
                <Link to="/teacher/grading">{t('tchBackToQueue')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Page>
    )
  }

  return (
    <Page>
      <PageHeader
        title={activity ? (locale === 'ar' ? activity.titleAr : activity.title) : t('tchMarking')}
        subtitle={t('tchMarkingSubtitle')
          .replace('{c}', groupName(classGroup, locale))
          .replace('{p}', String(activity?.points ?? 20))
          .replace('{n}', String(waiting.length - index))}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/teacher/grading">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('navNeedsGrading')}
            </Link>
          </Button>
        }
      />

      <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${(index / waiting.length) * 100}%` }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-muted text-caption font-semibold text-foreground">
                    {initials(fullName(student))}
                  </span>
                  {fullName(student)}
                </span>
              </CardTitle>
              {current.late ? (
                <Badge variant="warning">
                  <Clock className="me-1 h-3 w-3" aria-hidden />
                  {t('tchLate')}
                </Badge>
              ) : null}
              <span className="ms-auto text-caption text-muted-foreground">
                {t('tchSubmittedAttempt')
                  .replace('{d}', current.submittedOn ?? '')
                  .replace('{n}', String(current.attempt))}
              </span>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded border border-border bg-surface p-4">
                <p className="text-caption font-medium uppercase tracking-wide text-muted-foreground">
                  {t('tchTheQuestion')}
                </p>
                <p className="mt-1.5 text-body text-foreground">{t('tchSampleQuestion')}</p>
              </div>

              <div className="rounded border border-border p-4">
                <p className="text-caption font-medium uppercase tracking-wide text-muted-foreground">
                  {t('tchTheAnswer')}
                </p>
                <p className="mt-1.5 whitespace-pre-line text-body text-foreground">
                  {'3/4 x 1 1/2\n= 3/4 x 3/2\n= 9/8\n= 1 and 1/8 cups'}
                </p>
              </div>

              <div className="flex items-start gap-2.5 rounded border border-accent/40 bg-surface p-4">
                <Sparkles className="mt-0.5 h-4 w-4 flex-none text-foreground" aria-hidden />
                <p className="text-small text-foreground">{t('tchSuggestedMark')}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('tchMarkTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {rubric.map((row) => (
                  <div
                    key={row.id}
                    className="flex items-center justify-between gap-4 rounded border border-border px-4 py-2.5"
                  >
                    <span className="text-small text-foreground">{t(row.labelKey)}</span>
                    <span className="tabular text-caption text-muted-foreground">
                      {t('tchOutOf').replace('{n}', String(row.points))}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2">
                  <span className="text-small font-medium text-foreground">{t('colScore')}</span>
                  <Input
                    type="number"
                    min={0}
                    max={activity?.points ?? 20}
                    value={score}
                    autoFocus
                    className="h-9 w-24"
                    onChange={(event) =>
                      setScores((current_) => ({
                        ...current_,
                        [current.id]: Number(event.target.value),
                      }))
                    }
                  />
                  <span className="text-small text-muted-foreground">
                    {t('tchOutOf').replace('{n}', String(activity?.points ?? 20))}
                  </span>
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setScores((current_) => ({ ...current_, [current.id]: 18 }))
                  }
                >
                  {t('tchAcceptSuggestion')}
                </Button>
              </div>

              <div className="space-y-2">
                <span className="text-small font-medium text-foreground">{t('tchFeedback')}</span>
                <textarea
                  value={comment}
                  rows={3}
                  onChange={(event) =>
                    setFeedback((current_) => ({ ...current_, [current.id]: event.target.value }))
                  }
                  placeholder={t('tchFeedbackPlaceholder')}
                  className="w-full rounded border border-border bg-background px-3 py-2 text-small text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <div className="flex flex-wrap gap-1.5">
                  {quickCommentKeys.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() =>
                        setFeedback((current_) => ({ ...current_, [current.id]: t(key) }))
                      }
                      className="rounded-full border border-border px-3 py-1 text-caption text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <label className="flex items-center gap-2.5">
                  <Switch checked={releaseNow} onCheckedChange={setReleaseNow} />
                  <span className="text-small text-foreground">
                    {t('tchReleaseAsIMark')}
                    <span className="block text-caption text-muted-foreground">
                      {t('tchReleaseAsIMarkHint')}
                    </span>
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={index === 0}
                    onClick={() => setIndex(index - 1)}
                  >
                    {t('tchPrevious')}
                  </Button>
                  <Button variant="accent" size="sm" onClick={save} disabled={score === ''}>
                    {t('tchSaveAndNext')}
                    <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{t('tchStillToMark')}</CardTitle>
            <Badge variant="outline">{waiting.length - marked}</Badge>
          </CardHeader>
          <CardContent className="max-h-[520px] space-y-0.5 overflow-y-auto">
            {waiting.map((submission, position) => {
              const person = studentById(submission.studentId)
              const isDone = scores[submission.id] !== undefined
              return (
                <button
                  key={submission.id}
                  type="button"
                  onClick={() => setIndex(position)}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded px-2.5 py-2 text-start transition-colors',
                    position === index ? 'bg-muted' : 'hover:bg-surface',
                  )}
                >
                  <span
                    className={cn(
                      'grid h-5 w-5 flex-none place-items-center rounded-full',
                      isDone ? 'bg-success-tint text-success' : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {isDone ? (
                      <Check className="h-3 w-3" aria-hidden />
                    ) : (
                      <span className="tabular text-caption">{position + 1}</span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-small text-foreground">
                    {fullName(person)}
                  </span>
                  {submission.late ? (
                    <span className="flex-none text-caption font-semibold text-warning">L</span>
                  ) : null}
                </button>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}
