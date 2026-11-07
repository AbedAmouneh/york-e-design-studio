import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Tooltip.
 *
 * A tooltip is a hint, never the only place information lives. It does not
 * appear on touch and it does not appear for a screen reader that is reading
 * rather than focusing, so anything a person needs in order to act has to be
 * on the page. The common misuse in a platform this size is a row of icon only
 * buttons explained entirely by tooltips, which leaves a phone user guessing.
 *
 * `delayDuration` is 200 rather than the Radix default of 700. The studio's
 * tooltips sit on dense table controls where a person is already hovering with
 * intent, and 700ms reads as the tooltip being broken.
 */

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 max-w-[260px] rounded bg-foreground px-2.5 py-1.5 text-caption text-background shadow-card',
        'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = 'TooltipContent'

/** The whole thing in one call, for the common case of a label on a control. */
export function Hint({
  label,
  children,
  side = 'top',
}: {
  label: string
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
}) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{label}</TooltipContent>
      </Tooltip>
    </TooltipPrimitive.Provider>
  )
}
