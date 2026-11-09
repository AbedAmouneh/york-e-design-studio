import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Invalid, matching Input: red border and a red focus ring, plus aria-invalid. */
  invalid?: boolean
  /**
   * Learner size, for the K1 to Grade 3 tier and the quiz player.
   *
   * A child writing an answer gets the body size and more padding. This is the
   * one difference between the six places a textarea appears, and it was the
   * reason the quiz player's copy of the class list diverged from the other
   * five in the first place.
   */
  size?: 'default' | 'comfortable'
}

/**
 * Multi-line text.
 *
 * Six screens had their own `<textarea>` with the class list written out by
 * hand, which is how a design system quietly stops being one. The copies had
 * already drifted: five had `focus-visible:ring-2` with no offset while every
 * `Input` in the studio has `ring-offset-1`, so a focused comment box sat a
 * pixel tighter than a focused field beside it, and none of them carried the
 * invalid state that `Input` grew last week.
 *
 * `resize-y` rather than the browser default of `resize: both`. Horizontal
 * resize lets a person drag a field wider than the card holding it, which
 * breaks the layout and has never once been what they wanted.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid = false, size = 'default', rows = 3, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full resize-y rounded border border-border bg-background text-foreground placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        size === 'comfortable' ? 'px-4 py-3 text-body' : 'px-3 py-2 text-small',
        invalid && 'border-danger focus-visible:ring-danger',
        className,
      )}
      {...props}
    />
  ),
)
Textarea.displayName = 'Textarea'
