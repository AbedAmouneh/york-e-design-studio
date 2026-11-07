import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, Volume2, X } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * Doing an activity, early tier.
 *
 * Three rules that are not negotiable at this age.
 *
 *   A wrong answer is never red and never says wrong. It says have another
 *   look, and the child tries again. There is no running score, so there is
 *   nothing to lose by trying.
 *
 *   Every question can be read aloud. A seven year old who cannot decode the
 *   question cannot show you whether they can do the maths.
 *
 *   Progress is dots, not a number. Four dots with two filled is legible
 *   before a child can read a percentage.
 */

export function EarlyDoActivity() {
  const navigate = useNavigate()
  const { t } = useLocale()

  // Only the stems need a translation. The options are numbers.
  const questions = useMemo(
    () => [
      { id: 'q1', stem: t('erlQ1'), options: ['30', '50', '41'], answer: '50' },
      { id: 'q2', stem: t('erlQ2'), options: ['80', '60', '71'], answer: '80' },
      { id: 'q3', stem: t('erlQ3'), options: ['31', '40', '35'], answer: '40' },
      { id: 'q4', stem: t('erlQ4'), options: ['70', '50', '59'], answer: '50' },
    ],
    [t],
  )

  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [tryAgain, setTryAgain] = useState(false)

  const question = questions[index]
  const correct = picked === question.answer

  const choose = (option: string) => {
    setPicked(option)
    setTryAgain(option !== question.answer)
  }

  const next = () => {
    if (index === questions.length - 1) {
      navigate('/student/early/done')
      return
    }
    setIndex(index + 1)
    setPicked(null)
    setTryAgain(false)
  }

  return (
    <div className="learner-scope flex h-screen flex-col bg-background">
      <header className="flex flex-none items-center gap-4 px-6 py-5">
        <Link
          to="/student/early/activities"
          className="grid h-11 w-11 flex-none place-items-center rounded-full bg-surface text-muted-foreground"
          aria-label={t('erlClose')}
        >
          <X className="h-5 w-5" aria-hidden />
        </Link>

        <span className="min-w-0 flex-1 text-body font-semibold text-foreground">
          {t('erlActCountingInTens')}
        </span>

        <span
          className="flex flex-none gap-1.5"
          aria-label={t('erlQuestionNofM')
            .replace('{n}', String(index + 1))
            .replace('{m}', String(questions.length))}
        >
          {questions.map((item, position) => (
            <span
              key={item.id}
              className={cn(
                'h-3 w-3 rounded-full',
                position < index
                  ? 'bg-primary'
                  : position === index
                    ? 'bg-primary/50'
                    : 'bg-surface',
              )}
              aria-hidden
            />
          ))}
        </span>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center gap-8 px-6 pb-6">
        <div className="flex items-center gap-4">
          <p className="text-center text-heading font-semibold leading-tight text-foreground">
            {question.stem}
          </p>
          <button
            type="button"
            aria-label={t('erlReadAloud')}
            className="grid h-12 w-12 flex-none place-items-center rounded-full bg-primary/10 text-primary"
          >
            <Volume2 className="h-6 w-6" aria-hidden />
          </button>
        </div>

        <div className="grid w-full max-w-lg gap-3 sm:grid-cols-3">
          {question.options.map((option) => {
            const chosen = picked === option
            const isAnswer = option === question.answer
            return (
              <button
                key={option}
                type="button"
                disabled={correct}
                onClick={() => choose(option)}
                className={cn(
                  'grid h-24 place-items-center rounded-2xl text-heading font-semibold transition-colors',
                  chosen && isAnswer
                    ? 'bg-primary text-primary-foreground'
                    : chosen && !isAnswer
                      ? 'bg-warning-tint text-warning'
                      : 'bg-surface text-foreground hover:bg-primary/10',
                )}
              >
                {option}
              </button>
            )
          })}
        </div>

        <div className="flex min-h-[72px] flex-col items-center gap-3">
          {correct ? (
            <>
              <p className="flex items-center gap-2 text-subheading font-semibold text-primary">
                <Check className="h-6 w-6" aria-hidden />
                {t('erlThatIsRight')}
              </p>
              <button
                type="button"
                onClick={next}
                className="rounded-full bg-primary px-8 py-3.5 text-body font-semibold text-primary-foreground"
              >
                {index === questions.length - 1 ? t('erlFinish') : t('next')}
              </button>
            </>
          ) : tryAgain ? (
            <>
              {/*
                Not "wrong". Not red. The child picks again with nothing lost,
                which is the entire difference between practice and testing at
                this age.
              */}
              <p className="text-subheading font-semibold text-foreground">
                {t('erlHaveAnotherLook')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setPicked(null)
                  setTryAgain(false)
                }}
                className="rounded-full bg-surface px-8 py-3.5 text-body font-semibold text-foreground"
              >
                {t('erlTryAgain')}
              </button>
            </>
          ) : (
            <p className="text-body text-muted-foreground">{t('erlTapYourAnswer')}</p>
          )}
        </div>
      </main>
    </div>
  )
}
