import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Clock, Flag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { upperStudent, workFor } from '@/data/student'

/**
 * Flow 7 of 8: take a quiz.
 *
 * Full screen with no navigation, deliberately. A student mid assessment
 * should not be one stray click away from the gradebook, and a school buying
 * this will ask what stops a child wandering off mid paper.
 *
 * Three things a learner always needs while working, all persistent: how far
 * through they are, how long is left, and which questions they flagged. The
 * flag is the quiet one that matters most, because the alternative is a child
 * losing a mark they could have had by forgetting to come back.
 */

interface Question {
  id: string
  stem: string
  kind: 'multiple-choice' | 'numerical' | 'short'
  options?: string[]
}

const questions: Question[] = [
  {
    id: 'q1',
    stem: 'Which pair of fractions has a common denominator of 12?',
    kind: 'multiple-choice',
    options: ['1/3 and 1/4', '1/2 and 1/5', '2/3 and 3/5', '1/6 and 1/8'],
  },
  {
    id: 'q2',
    stem: 'Work out 1/3 + 1/4. Give your answer as a fraction.',
    kind: 'numerical',
  },
  {
    id: 'q3',
    stem: 'Which of these is equal to 2/6?',
    kind: 'multiple-choice',
    options: ['1/3', '2/3', '1/2', '3/6'],
  },
  {
    id: 'q4',
    stem: 'Explain in one sentence why you cannot add 1/2 and 1/3 without changing them first.',
    kind: 'short',
  },
  {
    id: 'q5',
    stem: 'A recipe needs 3/4 of a cup of flour. You make it twice. How much flour do you need?',
    kind: 'numerical',
  },
]

export function StudentTakeQuiz() {
  const { assignmentId = '' } = useParams()
  const navigate = useNavigate()

  const work = workFor(upperStudent).find((item) => item.assignment.id === assignmentId)

  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | undefined>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [confirming, setConfirming] = useState(false)

  const question = questions[index]
  const answered = Object.values(answers).filter(Boolean).length
  const unanswered = questions.length - answered

  const toggleFlag = (id: string) =>
    setFlagged((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const setAnswer = (value: string) =>
    setAnswers((current) => ({ ...current, [question.id]: value }))

  return (
    <div className="flex h-screen flex-col bg-surface">
      <header className="flex flex-none flex-wrap items-center gap-4 border-b border-border bg-background px-5 py-3">
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-small font-semibold text-foreground">
            {work?.activity?.title ?? 'Quiz'}
          </span>
          <span className="block text-caption text-muted-foreground">
            {work?.course?.title ?? 'Mathematics, Grade 6'} · one attempt
          </span>
        </span>

        <span className="flex flex-none items-center gap-1.5 rounded border border-border px-2.5 py-1.5 text-small text-foreground">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
          <span className="tabular">18:42</span>
        </span>

        <Button variant="ghost" size="sm" asChild>
          <Link to="/student/assignments">Leave</Link>
        </Button>
      </header>

      <div className="h-1 w-full flex-none bg-muted">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${(answered / questions.length) * 100}%` }}
        />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[1fr_220px]">
        <main className="overflow-y-auto p-6 lg:p-10">
          <div className="mx-auto max-w-2xl space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="neutral">
                Question {index + 1} of {questions.length}
              </Badge>
              <Button
                variant={flagged.has(question.id) ? 'outline' : 'ghost'}
                size="sm"
                onClick={() => toggleFlag(question.id)}
              >
                <Flag
                  className={cn(
                    'h-3.5 w-3.5',
                    flagged.has(question.id) && 'fill-accent text-accent',
                  )}
                  aria-hidden
                />
                {flagged.has(question.id) ? 'Flagged' : 'Flag for later'}
              </Button>
            </div>

            <p className="text-subheading leading-snug text-foreground">{question.stem}</p>

            {question.kind === 'multiple-choice' ? (
              <div className="space-y-2">
                {question.options?.map((option) => {
                  const chosen = answers[question.id] === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswer(option)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded border px-4 py-3.5 text-start text-body transition-colors',
                        chosen
                          ? 'border-foreground bg-background'
                          : 'border-border bg-background hover:bg-surface',
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-5 w-5 flex-none place-items-center rounded-full border',
                          chosen ? 'border-foreground' : 'border-border-strong',
                        )}
                      >
                        {chosen ? (
                          <span className="h-2.5 w-2.5 rounded-full bg-foreground" aria-hidden />
                        ) : null}
                      </span>
                      <span className="text-foreground">{option}</span>
                    </button>
                  )
                })}
              </div>
            ) : question.kind === 'numerical' ? (
              <div className="max-w-xs">
                <Input
                  value={answers[question.id] ?? ''}
                  onChange={(event) => setAnswer(event.target.value)}
                  placeholder="Your answer"
                  className="h-12 text-body"
                />
              </div>
            ) : (
              <textarea
                value={answers[question.id] ?? ''}
                rows={4}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Write your answer"
                className="w-full rounded border border-border bg-background px-4 py-3 text-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            )}

            <div className="flex items-center justify-between gap-3 border-t border-border pt-5">
              <Button
                variant="ghost"
                size="sm"
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
              >
                <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                Back
              </Button>

              {index === questions.length - 1 ? (
                <Button variant="accent" size="sm" onClick={() => setConfirming(true)}>
                  Hand it in
                </Button>
              ) : (
                <Button variant="accent" size="sm" onClick={() => setIndex(index + 1)}>
                  Next
                  <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                </Button>
              )}
            </div>
          </div>
        </main>

        <aside className="hidden flex-col gap-3 border-s border-border bg-background p-4 lg:flex">
          <p className="text-caption font-medium uppercase tracking-wide text-muted-foreground">
            Questions
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {questions.map((item, position) => {
              const isAnswered = Boolean(answers[item.id])
              const isFlagged = flagged.has(item.id)
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(position)}
                  className={cn(
                    'relative grid h-10 place-items-center rounded border text-small font-medium transition-colors',
                    position === index
                      ? 'border-foreground bg-foreground text-background'
                      : isAnswered
                        ? 'border-border bg-muted text-foreground'
                        : 'border-border text-muted-foreground hover:bg-surface',
                  )}
                >
                  {position + 1}
                  {isFlagged ? (
                    <span
                      className="absolute end-1 top-1 h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden
                    />
                  ) : null}
                </button>
              )
            })}
          </div>

          <div className="mt-2 space-y-1.5 text-caption text-muted-foreground">
            <p>{answered} answered</p>
            <p>{flagged.size} flagged</p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="mt-auto"
            onClick={() => setConfirming(true)}
          >
            Hand it in
          </Button>
        </aside>
      </div>

      {confirming ? (
        <div className="fixed inset-0 grid place-items-center bg-primary/50 p-6">
          <Card className="w-full max-w-md">
            <CardContent className="space-y-4 p-6">
              <p className="text-subheading font-semibold text-foreground">Hand it in?</p>

              {unanswered > 0 ? (
                <p className="rounded border border-warning/40 bg-warning-tint px-4 py-3 text-small text-warning">
                  {unanswered} question{unanswered > 1 ? 's are' : ' is'} still blank.
                </p>
              ) : null}

              {flagged.size > 0 ? (
                <p className="rounded border border-border bg-surface px-4 py-3 text-small text-muted-foreground">
                  You flagged {flagged.size} question{flagged.size > 1 ? 's' : ''} to come back to.
                </p>
              ) : null}

              <p className="text-small text-muted-foreground">
                You have one attempt, so you cannot change your answers after this.
              </p>

              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
                  Keep working
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => navigate(`/student/quiz/${assignmentId}/results`)}
                >
                  <Check className="h-3.5 w-3.5" aria-hidden />
                  Hand it in
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  )
}
