import { Link } from 'react-router-dom'
import { BookOpen, Calculator, Check, Lock, Shapes, Star } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'

/**
 * My work, early tier.
 *
 * Grouped by subject because that is how a seven year old's day is described
 * to them. No due dates: a Grade 2 child does not manage a deadline, their
 * teacher does, and putting one in front of them creates anxiety without
 * giving them any way to act on it.
 */

const groups: Array<{
  subjectKey: StringKey
  icon: typeof Calculator
  items: Array<{
    id: string
    titleKey: StringKey
    done: boolean
    stars: number
    locked?: boolean
  }>
}> = [
  {
    subjectKey: 'erlSubjMaths',
    icon: Calculator,
    items: [
      { id: 'a1', titleKey: 'erlActCountingInTens', done: true, stars: 3 },
      { id: 'a3', titleKey: 'erlActNumberLine100', done: false, stars: 0 },
      { id: 'a4', titleKey: 'erlActAddingTo20', done: false, stars: 0, locked: true },
    ],
  },
  {
    subjectKey: 'erlSubjReading',
    icon: BookOpen,
    items: [
      { id: 'a2', titleKey: 'erlActHungryFox', done: true, stars: 2 },
      { id: 'a5', titleKey: 'erlActRhymingWords', done: true, stars: 3 },
      { id: 'a6', titleKey: 'erlActLostKite', done: false, stars: 0, locked: true },
    ],
  },
  {
    subjectKey: 'erlSubjShapes',
    icon: Shapes,
    items: [{ id: 'a7', titleKey: 'erlActCirclesSquares', done: true, stars: 3 }],
  },
]

export function EarlyActivities() {
  const { t } = useLocale()

  return (
    <div className="space-y-6 pb-4">
      <h1 className="text-heading font-semibold text-foreground">{t('erlMyWork')}</h1>

      {groups.map((group) => {
        const Icon = group.icon
        const finished = group.items.filter((item) => item.done).length
        return (
          <section key={group.subjectKey} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="min-w-0 flex-1 text-subheading font-semibold text-foreground">
                {t(group.subjectKey)}
              </h2>
              <span className="flex-none text-small text-muted-foreground">
                {t('erlNofMDone')
                  .replace('{n}', String(finished))
                  .replace('{m}', String(group.items.length))}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => {
                const locked = Boolean(item.locked)
                return (
                  <Link
                    key={item.id}
                    to={locked ? '/student/early/activities' : `/student/early/activity/${item.id}`}
                    className={cn(
                      'flex items-center gap-4 rounded-2xl p-4 transition-colors',
                      locked
                        ? 'cursor-default bg-surface opacity-60'
                        : 'bg-surface hover:bg-primary/10',
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-12 w-12 flex-none place-items-center rounded-2xl',
                        item.done
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background text-primary',
                      )}
                    >
                      {item.done ? (
                        <Check className="h-6 w-6" aria-hidden />
                      ) : locked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" aria-hidden />
                      ) : (
                        <Icon className="h-6 w-6" aria-hidden />
                      )}
                    </span>

                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block text-body font-semibold text-foreground">
                        {t(item.titleKey)}
                      </span>
                      {locked ? (
                        <span className="block text-small text-muted-foreground">
                          {t('erlTeacherWillOpen')}
                        </span>
                      ) : item.done ? (
                        <span className="mt-1 flex gap-0.5">
                          {[1, 2, 3].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                'h-4 w-4',
                                star <= item.stars
                                  ? 'fill-primary text-primary'
                                  : 'fill-background text-border-strong',
                              )}
                              aria-hidden
                            />
                          ))}
                        </span>
                      ) : (
                        <span className="block text-small text-primary">{t('erlReadyForYou')}</span>
                      )}
                    </span>
                  </Link>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
