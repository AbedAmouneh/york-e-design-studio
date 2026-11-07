import { Link } from 'react-router-dom'
import { BookOpen, Calculator, Check, Star } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'
import { earnedStickers } from './Stickers'

/**
 * Early tier home.
 *
 * One job: show the next thing to do, big enough to hit with a finger.
 *
 * Everything on this screen was checked against the rule. No percentage, no
 * average, no at risk, no comparison with anyone else, no red. The child who
 * is behind and the child who is ahead see the same screen with different
 * numbers of stars, and neither is told where they sit in the class.
 */

const todayWork: Array<{
  id: string
  titleKey: StringKey
  subjectKey: StringKey
  icon: typeof Calculator
  done: boolean
  stars: number
}> = [
  {
    id: 'a1',
    titleKey: 'erlActCountingInTens',
    subjectKey: 'erlSubjMaths',
    icon: Calculator,
    done: true,
    stars: 3,
  },
  {
    id: 'a2',
    titleKey: 'erlActHungryFox',
    subjectKey: 'erlSubjReading',
    icon: BookOpen,
    done: true,
    stars: 2,
  },
  {
    id: 'a3',
    titleKey: 'erlActNumberLine100',
    subjectKey: 'erlSubjMaths',
    icon: Calculator,
    done: false,
    stars: 0,
  },
]

export function EarlyHome() {
  const { t } = useLocale()
  const next = todayWork.find((item) => !item.done)
  const finished = todayWork.filter((item) => item.done).length

  return (
    <div className="space-y-5 pb-4">
      {next ? (
        <Link
          to={`/student/early/activity/${next.id}`}
          className="block rounded-2xl bg-primary p-6 text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          <p className="text-small font-medium opacity-80">{t('erlNextForYou')}</p>
          <p className="mt-2 text-heading font-semibold leading-tight">{t(next.titleKey)}</p>
          <p className="mt-1 text-body opacity-80">{t(next.subjectKey)}</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-body font-semibold text-primary">
            {t('erlLetUsGo')}
          </span>
        </Link>
      ) : (
        <div className="rounded-2xl bg-primary p-6 text-center text-primary-foreground">
          <p className="text-heading font-semibold">{t('erlAllDone')}</p>
          <p className="mt-1 text-body opacity-80">{t('erlComeBackTomorrow')}</p>
        </div>
      )}

      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-subheading font-semibold text-foreground">{t('erlToday')}</h2>
          <p className="text-small text-muted-foreground">
            {t('erlNofMFinished')
              .replace('{n}', String(finished))
              .replace('{m}', String(todayWork.length))}
          </p>
        </div>

        {/*
          Progress as filled blocks rather than a percentage bar. Three of
          three is countable by a six year old. Sixty seven percent is not.
        */}
        <div className="flex gap-2">
          {todayWork.map((item) => (
            <span
              key={item.id}
              className={cn(
                'h-3 flex-1 rounded-full',
                item.done ? 'bg-primary' : 'bg-surface',
              )}
              aria-hidden
            />
          ))}
        </div>

        <div className="space-y-3">
          {todayWork.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                to={`/student/early/activity/${item.id}`}
                className="flex items-center gap-4 rounded-2xl bg-surface p-4 transition-colors hover:bg-primary/10"
              >
                <span
                  className={cn(
                    'grid h-14 w-14 flex-none place-items-center rounded-2xl',
                    item.done ? 'bg-primary text-primary-foreground' : 'bg-background text-primary',
                  )}
                >
                  {item.done ? (
                    <Check className="h-7 w-7" aria-hidden />
                  ) : (
                    <Icon className="h-7 w-7" aria-hidden />
                  )}
                </span>

                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block text-body font-semibold text-foreground">
                    {t(item.titleKey)}
                  </span>
                  <span className="block text-small text-muted-foreground">
                    {t(item.subjectKey)}
                  </span>
                </span>

                {item.done ? (
                  <span className="flex flex-none gap-0.5">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          'h-5 w-5',
                          star <= item.stars
                            ? 'fill-primary text-primary'
                            : 'fill-background text-border-strong',
                        )}
                        aria-hidden
                      />
                    ))}
                  </span>
                ) : (
                  <span className="flex-none rounded-full bg-primary px-5 py-2.5 text-small font-semibold text-primary-foreground">
                    {t('start')}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </section>

      <Link
        to="/student/early/stickers"
        className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-primary/40 p-4"
      >
        <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-primary/10">
          <Star className="h-6 w-6 fill-primary text-primary" aria-hidden />
        </span>
        <span className="min-w-0 flex-1 text-body font-medium text-foreground">
          {t('erlYouHaveStickers').replace('{n}', String(earnedStickers.length))}
        </span>
        <span className="flex-none text-small font-semibold text-primary">{t('erlSeeThem')}</span>
      </Link>
    </div>
  )
}
