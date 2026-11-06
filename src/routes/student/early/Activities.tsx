import { Link } from 'react-router-dom'
import { BookOpen, Calculator, Check, Lock, Shapes, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * My work, early tier.
 *
 * Grouped by subject because that is how a seven year old's day is described
 * to them. No due dates: a Grade 2 child does not manage a deadline, their
 * teacher does, and putting one in front of them creates anxiety without
 * giving them any way to act on it.
 */

const groups = [
  {
    subject: 'Maths',
    icon: Calculator,
    items: [
      { id: 'a1', title: 'Counting in tens', done: true, stars: 3 },
      { id: 'a3', title: 'Number line to 100', done: false, stars: 0 },
      { id: 'a4', title: 'Adding to 20', done: false, stars: 0, locked: true },
    ],
  },
  {
    subject: 'Reading',
    icon: BookOpen,
    items: [
      { id: 'a2', title: 'The hungry fox', done: true, stars: 2 },
      { id: 'a5', title: 'Rhyming words', done: true, stars: 3 },
      { id: 'a6', title: 'The lost kite', done: false, stars: 0, locked: true },
    ],
  },
  {
    subject: 'Shapes',
    icon: Shapes,
    items: [{ id: 'a7', title: 'Circles and squares', done: true, stars: 3 }],
  },
]

export function EarlyActivities() {
  return (
    <div className="space-y-6 pb-4">
      <h1 className="text-heading font-semibold text-foreground">My work</h1>

      {groups.map((group) => {
        const Icon = group.icon
        const finished = group.items.filter((item) => item.done).length
        return (
          <section key={group.subject} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="min-w-0 flex-1 text-subheading font-semibold text-foreground">
                {group.subject}
              </h2>
              <span className="flex-none text-small text-muted-foreground">
                {finished} of {group.items.length} done
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {group.items.map((item) => {
                const locked = 'locked' in item && item.locked
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
                        {item.title}
                      </span>
                      {locked ? (
                        <span className="block text-small text-muted-foreground">
                          Your teacher will open this
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
                        <span className="block text-small text-primary">Ready for you</span>
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
