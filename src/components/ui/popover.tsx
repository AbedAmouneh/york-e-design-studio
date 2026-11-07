import * as PopoverPrimitive from '@radix-ui/react-popover'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Popover.
 *
 * For content a person interacts with: a filter panel, a date range, a short
 * form. If they only need to read it, that is a tooltip, and if they must
 * finish it before doing anything else, that is a dialog.
 *
 * `align` defaults to `start`, which Radix resolves against the writing
 * direction, so a panel anchored to the start edge of its trigger stays
 * anchored to the start edge in Arabic. Hardcoding `left` here would have
 * pinned every popover to the wrong side of its own button in half the studio.
 */

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor
export const PopoverClose = PopoverPrimitive.Close

export const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'start', sideOffset = 6, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded border border-border bg-background p-4 shadow-learner-raised',
        'focus:outline-none',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = 'PopoverContent'
