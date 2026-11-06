import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { earlyStudent, praiseFor } from '@/data/student'

/**
 * Flow 8 of 8: the well done moment.
 *
 * A whole screen for one sentence, on purpose. This is the reward moment, and
 * a reward crammed into a toast at the corner of a results page is not a
 * reward.
 *
 * Two stars, not three, deliberately. A studio that only ever shows the
 * perfect case hides the question everyone will ask in review: what does a
 * child see when they did not get everything right? They see this. Warm,
 * specific, and no mention of the one they missed.
 */
export function EarlyWellDone() {
  const stars = 2

  return (
    <div className="learner-scope flex h-screen flex-col items-center justify-center gap-8 bg-background px-6 text-center">
      <div className="flex items-end gap-3">
        {[1, 2, 3].map((position) => (
          <Star
            key={position}
            className={cn(
              'transition-transform',
              position === 2 ? 'h-24 w-24' : 'h-16 w-16',
              position <= stars
                ? 'fill-primary text-primary'
                : 'fill-surface text-border-strong',
            )}
            aria-hidden
          />
        ))}
      </div>
      <span className="sr-only">You earned {stars} out of 3 stars</span>

      <div className="space-y-2">
        <p className="text-display font-semibold leading-tight text-foreground">
          {praiseFor(stars)}, {earlyStudent.firstName}
        </p>
        <p className="max-w-[28ch] text-body text-muted-foreground">
          You finished counting in tens. You got better as you went.
        </p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-3">
        <Link
          to="/student/early"
          className="rounded-full bg-primary px-8 py-4 text-body font-semibold text-primary-foreground"
        >
          Keep going
        </Link>
        <Link
          to="/student/early/stickers"
          className="rounded-full bg-surface px-8 py-4 text-body font-semibold text-foreground"
        >
          See my stickers
        </Link>
      </div>

      <p className="max-w-[34ch] text-small text-muted-foreground">
        Your teacher can see how you did.
      </p>
    </div>
  )
}
