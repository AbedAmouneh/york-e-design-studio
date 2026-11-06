import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import type { ProgressStatus } from '@/types'

/**
 * Status pills use the tint as a background and the full colour as text, so
 * they read clearly without competing with the York yellow accent.
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-caption font-semibold',
  {
    variants: {
      variant: {
        neutral: 'bg-muted text-muted-foreground',
        success: 'bg-success-tint text-success',
        warning: 'bg-warning-tint text-warning',
        danger: 'bg-danger-tint text-danger',
        accent: 'bg-accent text-accent-foreground',
        outline: 'border border-border-strong text-muted-foreground',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

const statusVariant: Record<ProgressStatus, NonNullable<BadgeProps['variant']>> = {
  'on-track': 'success',
  watch: 'warning',
  'at-risk': 'danger',
}

export function StatusBadge({ status, label }: { status: ProgressStatus; label: string }) {
  return <Badge variant={statusVariant[status]}>{label}</Badge>
}

export { badgeVariants }
