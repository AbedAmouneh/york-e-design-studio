import * as ProgressPrimitive from '@radix-ui/react-progress'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Progress.
 *
 * Twelve screens drew this by hand before it existed, each with its own height
 * and its own rounding, and none of them told a screen reader anything. Radix
 * puts the right role and value on it for free.
 *
 * `label` is required rather than optional. A bare bar announces a number with
 * no subject, and "68 percent" on its own is the kind of thing that passes an
 * automated audit and still means nothing to the person listening.
 *
 * The fill is translated rather than width animated so it moves from the start
 * edge in both directions; `rtl:translate-x` flips the sign in Arabic.
 */
export const Progress = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    value: number
    label: string
    tone?: 'default' | 'accent' | 'muted' | 'success' | 'warning' | 'danger' | 'learner'
  }
>(({ className, value, label, tone = 'default', ...props }, ref) => {
  const clamped = Math.max(0, Math.min(100, value))
  /**
   * `accent` and `muted` were added after the first migration, because the
   * first five screens converted had been drawing their bar in York yellow and
   * one in a deliberately soft grey, and a palette of five tones silently
   * turned all six black. A component that forces every call site to the
   * nearest available colour is worse than the hand written bars it replaced.
   *
   * `accent` is the student's own progress through their own work, which is
   * the one place the brand colour earns being a fill rather than an accent:
   * nothing is being judged, so there is no status for a status colour to say.
   *
   * `muted` is for a bar that should not draw the eye at all, such as the
   * lowest mastery band on a parent screen, where black reads as an
   * accusation and red is forbidden outright.
   */
  const fill = {
    default: 'bg-foreground',
    accent: 'bg-accent',
    muted: 'bg-border-strong',
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    learner: 'bg-learner-primary',
  }[tone]

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={clamped}
      aria-label={label}
      className={cn('relative h-1.5 w-full overflow-hidden rounded-full bg-muted', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn('h-full w-full transition-transform', fill)}
        style={{ transform: `translateX(calc(var(--progress-sign, -1) * ${100 - clamped}%))` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = 'Progress'
