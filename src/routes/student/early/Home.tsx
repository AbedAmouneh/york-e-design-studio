import { Link } from 'react-router-dom'
import { BookOpen, Calculator, Check, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
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

const todayWork = [
  { id: 'a1', title: 'Counting in tens', subject: 'Maths', icon: Calculator, done: true, stars: 3 },
  { id: 'a2', title: 'The hungry fox', subject: 'Reading', icon: BookOpen, done: true, stars: 2 },
  { id: 'a3', title: 'Number line to 100', subject: 'Maths', icon: Calculator, done: false, stars: 0 },
]

export function EarlyHome() {
  const next = todayWork.find((item) => !item.done)
  const finished = todayWork.filter((item) => item.done).length

  return (
    <div className="space-y-5 pb-4">
      {next ? (
        <Link
          to={`/student/early/activity/${next.id}`}
          className="block rounded-2xl bg-primary p-6 text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          <p className="text-small font-medium opacity-80">Next for you</p>
          <p className="mt-2 text-heading font-semibold leading-tight">{next.title}</p>
          <p className="mt-1 text-body opacity-80">{next.subject}</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground px-6 py-3 text-body font-semibold text-primary">
            Let us go
          </span>
        </Link>
      ) : (
        <div className="rounded-2xl bg-primary p-6 text-center text-primary-foreground">
          <p className="text-heading font-semibold">All done for today</p>
          <p className="mt-1 text-body opacity-80">Come back tomorrow</p>
        </div>
      )}

      <section className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-subheading font-semibold text-foreground">Today</h2>
          <p className="text-small text-muted-foreground">
            {finished} of {todayWork.length} finished
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
                    {item.title}
                  </span>
                  <span className="block text-small text-muted-foreground">{item.subject}</span>
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
                    Start
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
          You have {earnedStickers.length} stickers
        </span>
        <span className="flex-none text-small font-semibold text-primary">See them</span>
      </Link>
    </div>
  )
}
