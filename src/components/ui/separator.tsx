import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Separator.
 *
 * `decorative` defaults to true, which is right nearly every time: a line
 * between two groups of controls is a drawing, and announcing "separator" to a
 * screen reader on every one of them is noise. Pass `decorative={false}` only
 * when the line is the only thing marking a real boundary between sections.
 */
export const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    orientation={orientation}
    decorative={decorative}
    className={cn(
      'flex-none bg-border',
      orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      className,
    )}
    {...props}
  />
))
Separator.displayName = 'Separator'
