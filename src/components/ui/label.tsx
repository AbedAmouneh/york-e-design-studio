import * as LabelPrimitive from '@radix-ui/react-label'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Label.
 *
 * Radix rather than a bare `<label>` so that clicking the text focuses the
 * control even when the control is a Radix component rendering a button rather
 * than a real input, which a plain `htmlFor` does not always reach.
 *
 * `peer-disabled` dims the label when the field it belongs to is disabled. A
 * label at full strength above a greyed out field reads as a field that failed
 * to load rather than one that is deliberately closed.
 */
export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'text-small font-medium text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
      className,
    )}
    {...props}
  />
))
Label.displayName = 'Label'
