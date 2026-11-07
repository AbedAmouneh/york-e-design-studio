import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, MessageSquare, X } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { upperStudent, workFor } from '@/data/student'

/**
 * Quiz results and feedback.
 *
 * The score is present but small. The question level breakdown is the screen,
 * because a mark a student cannot act on teaches nothing, and the thing they
 * can act on is seeing which idea they got wrong and why.
 *
 * Wrong answers show the correct answer and a short explanation. Hiding the
 * right answer to protect the question bank optimises for the institution over
 * the learner, so this screen does not do it. The teacher can switch it off
 * per assignment when a paper is being reused.
 */

interface Result {
  id: string
  stem: string
  yours: string
  correct: string
  marks: number
  outOf: number
  why?: string
}

export function StudentQuizResults() {
  const { assignmentId = '' } = useParams()
  const { t, locale } = useLocale()

  const work = workFor(upperStudent).find((item) => item.assignment.id === assignmentId)

  /*
   * Built inside the component so the stems, the student's own wording and
   * the explanations all follow the locale. Bare fractions stay as glyphs.
   */
  const results: Result[] = useMemo(
    () => [
      {
        id: 'q1',
        stem: t('stuQ1'),
        yours: t('stuQ1OptA'),
        correct: t('stuQ1OptA'),
        marks: 2,
        outOf: 2,
      },
      {
        id: 'q2',
        stem: t('stuR2'),
        yours: '2/7',
        correct: '7/12',
        marks: 0,
        outOf: 4,
        why: t('stuWhy2'),
      },
      { id: 'q3', stem: t('stuQ3'), yours: '1/3', correct: '1/3', marks: 2, outOf: 2 },
      {
        id: 'q4',
        stem: t('stuR4'),
        yours: t('stuA4Yours'),
        correct: '',
        marks: 3,
        outOf: 4,
        why: t('stuWhy4'),
      },
      {
        id: 'q5',
        stem: t('stuR5'),
        yours: t('stuA5'),
        correct: t('stuA5'),
        marks: 4,
        outOf: 4,
      },
    ],
    [t],
  )

  const earned = results.reduce((sum, row) => sum + row.marks, 0)
  const total = results.reduce((sum, row) => sum + row.outOf, 0)
  const percent = Math.round((earned / total) * 100)

  return (
    <Page>
      <PageHeader
        title={
          work?.activity
            ? locale === 'ar'
              ? work.activity.titleAr
              : work.activity.title
            : t('stuYourResults')
        }
        subtitle={
          work?.course
            ? locale === 'ar'
              ? work.course.titleAr
              : work.course.title
            : t('stuMathsGrade6')
        }
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/student/assignments">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('navAssignments')}
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent className="flex flex-wrap items-center gap-6 p-5">
          <span className="flex items-baseline gap-2">
            <span className="tabular text-heading font-semibold leading-none text-foreground">
              {earned}
            </span>
            <span className="text-small text-muted-foreground">
              {t('stuOutOf').replace('{n}', String(total))}
            </span>
          </span>
          <span className="tabular text-small text-muted-foreground">{percent}%</span>
          <span className="h-2 min-w-[120px] flex-1 overflow-hidden rounded-full bg-muted">
            <span
              className="block h-full rounded-full bg-accent"
              style={{ width: `${percent}%` }}
            />
          </span>
          <Badge variant="outline">
            {t('stuFullyRight')
              .replace('{n}', String(results.filter((r) => r.marks === r.outOf).length))
              .replace('{m}', String(results.length))}
          </Badge>
        </CardContent>
      </Card>

      {work?.submission?.feedback ? (
        <Card className="border-accent/40">
          <CardContent className="flex items-start gap-3 p-4">
            <MessageSquare className="mt-0.5 h-4 w-4 flex-none text-foreground" aria-hidden />
            <span className="min-w-0 flex-1">
              <span className="block text-caption uppercase tracking-wide text-muted-foreground">
                {t('stuFromYourTeacher')}
              </span>
              <span className="mt-1 block text-small text-foreground">
                {work.submission.feedback}
              </span>
            </span>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{t('stuQuestionByQuestion')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {results.map((row, index) => {
            const full = row.marks === row.outOf
            const none = row.marks === 0
            return (
              <div
                key={row.id}
                className={cn(
                  'rounded border p-4',
                  none ? 'border-danger/30 bg-danger-tint/40' : 'border-border',
                )}
              >
                <div className="flex flex-wrap items-start gap-3">
                  <span
                    className={cn(
                      'grid h-6 w-6 flex-none place-items-center rounded-full',
                      full
                        ? 'bg-success-tint text-success'
                        : none
                          ? 'bg-danger-tint text-danger'
                          : 'bg-warning-tint text-warning',
                    )}
                  >
                    {full ? (
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    ) : none ? (
                      <X className="h-3.5 w-3.5" aria-hidden />
                    ) : (
                      <span className="text-caption font-semibold">{row.marks}</span>
                    )}
                  </span>

                  <span className="min-w-0 flex-1 text-small font-medium text-foreground">
                    {index + 1}. {row.stem}
                  </span>

                  <span className="tabular flex-none text-caption text-muted-foreground">
                    {row.marks} / {row.outOf}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 ps-9 text-small">
                  <p className="text-muted-foreground">
                    {t('stuYouWrote')} <span className="text-foreground">{row.yours}</span>
                  </p>
                  {row.correct && row.correct !== row.yours ? (
                    <p className="text-muted-foreground">
                      {t('stuTheAnswerWas')}{' '}
                      <span className="font-medium text-success">{row.correct}</span>
                    </p>
                  ) : null}
                  {row.why ? (
                    <p className="mt-2 rounded bg-background px-3 py-2 text-caption text-muted-foreground">
                      {row.why}
                    </p>
                  ) : null}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <span className="min-w-0 flex-1 text-small text-foreground">{t('stuPractiseHint')}</span>
          <Button variant="outline" size="sm" asChild>
            <Link to="/student/courses">{t('stuGoToUnit')}</Link>
          </Button>
        </CardContent>
      </Card>
    </Page>
  )
}
