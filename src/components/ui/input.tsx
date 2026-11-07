import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { AlertCircle, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Invalid. A real state rather than a border override at the call site.
   *
   * It moves the focus ring to the danger colour as well as the border,
   * because a field that turns red and then focuses black reads as having
   * fixed itself the moment the person clicks into it.
   *
   * It also sets `aria-invalid`, which is the half that colour alone cannot
   * do: red is not available to a screen reader, and about one in twelve men
   * will not see it as a warning either.
   */
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', invalid = false, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(
        'h-10 w-full rounded border border-border bg-background px-3 text-small text-foreground placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        invalid && 'border-danger focus-visible:ring-danger',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

/** Search field with a leading icon that stays on the correct side in RTL. */
export const SearchInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <Search
        className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input ref={ref} className={cn('ps-9', className)} {...props} />
    </div>
  ),
)
SearchInput.displayName = 'SearchInput'

/**
 * The message under an invalid field.
 *
 * Separate from `Input` rather than a `message` prop, because the error often
 * belongs to a group of fields rather than to one box, and because the id has
 * to be wired to `aria-describedby` by whoever owns the form.
 *
 * `role="alert"` is deliberately absent. These messages appear on blur or on
 * submit next to the field that caused them, and an alert interrupts whatever
 * the screen reader was saying. `aria-invalid` on the input already makes the
 * field announce itself as wrong when the person reaches it.
 */
export function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="flex items-start gap-1.5 text-caption text-danger">
      <AlertCircle className="mt-0.5 h-3 w-3 flex-none" aria-hidden />
      <span className="min-w-0">{children}</span>
    </p>
  )
}
