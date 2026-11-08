import { createContext, useContext, useId, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Radio group.
 *
 * Native `<input type="radio">` rather than a Radix primitive, and not because
 * the package was missing. Grouped native radios already do the thing that is
 * hard to reimplement: the browser treats the group as one tab stop, moves the
 * selection with the arrow keys, wraps at the ends, and reverses the arrow
 * direction in RTL without being asked. A hand rolled roving tabindex gets
 * that wrong in at least one of those four ways most of the time.
 *
 * The input is visually hidden but present and focusable, with the visible
 * circle drawn by a sibling driven off `peer-checked` and `peer-focus-visible`.
 * `appearance-none` on the input itself would have been shorter and is what
 * breaks in forced colours mode, where the real control is the only thing the
 * browser knows how to recolour.
 *
 * Use it where the options are mutually exclusive and all worth seeing at
 * once, up to about five. Beyond that a Select is kinder. A row of buttons,
 * which is what the studio used before this existed, announces as a list of
 * unrelated commands and never says which one is current.
 */

interface RadioGroupContextValue {
  name: string
  value: string
  onValueChange: (value: string) => void
  disabled: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export function RadioGroup({
  value,
  onValueChange,
  name,
  label,
  description,
  disabled = false,
  orientation = 'vertical',
  className,
  children,
}: {
  value: string
  onValueChange: (value: string) => void
  /** Optional. One is generated when omitted, which is right for a single group on a page. */
  name?: string
  /**
   * Required. The group's own name, not the name of a single option.
   *
   * Without it a screen reader reads four options with nothing to say what
   * they are four options for, which is the usual failure of a radio group
   * whose label was a heading somewhere above it.
   */
  label: string
  description?: string
  disabled?: boolean
  orientation?: 'vertical' | 'horizontal'
  className?: string
  children: ReactNode
}) {
  const generated = useId()
  const groupName = name ?? generated
  const descriptionId = description ? `${groupName}-description` : undefined

  return (
    <RadioGroupContext.Provider
      value={{ name: groupName, value, onValueChange, disabled }}
    >
      <fieldset
        className={cn('min-w-0', className)}
        aria-describedby={descriptionId}
        disabled={disabled}
      >
        <legend className="text-small font-medium text-foreground">{label}</legend>
        {description ? (
          <p id={descriptionId} className="mt-0.5 text-caption text-muted-foreground">
            {description}
          </p>
        ) : null}
        <div
          className={cn(
            'mt-2.5',
            orientation === 'vertical' ? 'space-y-2' : 'flex flex-wrap gap-x-5 gap-y-2',
          )}
        >
          {children}
        </div>
      </fieldset>
    </RadioGroupContext.Provider>
  )
}

export function RadioItem({
  value,
  label,
  description,
  disabled = false,
}: {
  value: string
  label: string
  description?: string
  disabled?: boolean
}) {
  const context = useContext(RadioGroupContext)
  if (!context) throw new Error('RadioItem must be used inside RadioGroup')

  const checked = context.value === value
  const isDisabled = disabled || context.disabled

  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-2.5',
        isDisabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <input
        type="radio"
        name={context.name}
        value={value}
        checked={checked}
        disabled={isDisabled}
        onChange={() => context.onValueChange(value)}
        // Hidden rather than removed. A real radio keeps the group semantics,
        // the arrow keys and forced colours support; sizing it to zero would
        // lose the focus ring, so it is clipped instead and the ring is drawn
        // on the circle beside it.
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          'mt-0.5 grid h-4 w-4 flex-none place-items-center rounded-full border transition-colors',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-1 peer-focus-visible:ring-offset-background',
          checked ? 'border-primary' : 'border-border-strong',
        )}
      >
        {checked ? <span className="h-2 w-2 rounded-full bg-primary" /> : null}
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-small text-foreground">{label}</span>
        {description ? (
          <span className="mt-0.5 block text-caption text-muted-foreground">{description}</span>
        ) : null}
      </span>
    </label>
  )
}
