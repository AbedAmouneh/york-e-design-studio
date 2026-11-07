import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/**
 * Direction B: yellow is an accent, not a surface. The accent variant is for
 * the single primary action on a screen. Anything more and it stops reading
 * as emphasis.
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        accent: 'bg-accent text-accent-foreground hover:bg-accent/85',
        outline: 'border border-border-strong bg-background hover:bg-muted',
        ghost: 'hover:bg-muted',
        danger: 'bg-danger text-danger-foreground hover:bg-danger/90',
      },
      size: {
        sm: 'h-8 px-3 text-small',
        md: 'h-10 px-4 text-body',
        lg: 'h-11 px-5 text-body',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /**
   * Pending. Disables the button and shows a spinner beside the label.
   *
   * The label stays. Swapping it for a spinner is the common shortcut and it
   * makes the button change width mid click, which moves whatever sits next to
   * it. Keeping the text also keeps the action readable: a person who looks
   * back at a half finished form should still see what it was doing.
   *
   * `aria-busy` rather than a visually hidden "loading" string, because the
   * button is already disabled and a screen reader announcing a disabled
   * control twice is noise.
   */
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    // `asChild` renders someone else's element, usually a Link. Injecting a
    // spinner there would give Slot two children and throw, and a link that is
    // pending is a navigation rather than a submit, so it is not a state this
    // component should claim to handle.
    if (asChild) {
      return (
        <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props}>
          {children}
        </Comp>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : null}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
