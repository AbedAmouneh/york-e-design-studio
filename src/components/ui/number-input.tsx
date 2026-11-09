import { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * A number field with a minus and a plus.
 *
 * Four screens were using a bare `<Input type="number">`, which looks finished
 * and is not. Three things were wrong with it, and all three are the kind that
 * only show up when somebody actually types.
 *
 * The native spinners are system chrome. They are a different grey from every
 * other control here, they are about eleven pixels tall, and on a touch screen
 * they are unhittable. Hiding them without replacing them would have been
 * worse, which is why the buttons exist.
 *
 * Typing fought the clamp. A field with `min={1}` holding 1, where somebody
 * selects the value and types 3, passes through the empty string on the way,
 * and `Number('') || 1` snapped it back to 1 before the 3 arrived. Every one
 * of the four call sites had that bug. The fix is that this holds the raw text
 * while the field is focused and only commits a number on blur, so a person can
 * empty the box and type.
 *
 * And the bounds were invisible. `min` and `max` were set on all four, and
 * nothing on screen said so: a teacher could type 150 into a field capped at
 * 100 and the only feedback was the number quietly changing later. The plus
 * disables itself at the ceiling, which says the same thing before the fact.
 */
export function NumberInput({
  value,
  onChange,
  onClear,
  label,
  min = 0,
  max,
  step = 1,
  invalid = false,
  disabled = false,
  suffix,
  className,
}: {
  /**
   * `null` is a real value, and the marking screen is why.
   *
   * A script nobody has marked yet and a script marked zero are different
   * facts, and a field that cannot tell them apart would show thirty unmarked
   * submissions as thirty zeros. `null` draws an empty box.
   */
  value: number | null
  onChange: (value: number) => void
  /**
   * Called when the person empties the field.
   *
   * Without it, clearing the box puts the current value back, which is what
   * the three bounded fields want: there is no such thing as an unset number
   * of attempts. The marking field passes it, so clearing a mark returns the
   * script to unmarked rather than setting it to zero.
   */
  onClear?: () => void
  /**
   * The field's name, for the two buttons.
   *
   * Required, like Progress and DatePicker. A stepper announced as "increase"
   * with no object is the control a screen reader user has to guess at, and
   * the visible label beside the field does not attach itself to a button.
   */
  label: string
  min?: number
  max?: number
  step?: number
  invalid?: boolean
  disabled?: boolean
  /** A unit shown inside the field, such as per cent or points. Never translated by this. */
  suffix?: string
  className?: string
}) {
  const { t } = useLocale()
  const text = (n: number | null) => (n === null ? '' : String(n))
  const [draft, setDraft] = useState(text(value))
  const [editing, setEditing] = useState(false)

  // Follow the value when it changes from outside, but never while the person
  // is mid-word in the box.
  useEffect(() => {
    if (!editing) setDraft(text(value))
  }, [value, editing])

  const clamp = (n: number) => Math.min(max ?? Number.MAX_SAFE_INTEGER, Math.max(min, n))

  const commit = (raw: string) => {
    const empty = raw.trim() === ''
    const parsed = Number(raw)

    if (empty || Number.isNaN(parsed)) {
      // An unparseable box always reverts. An empty one reverts too, unless
      // the field is one where empty means something, in which case clearing
      // it is a decision and not a slip.
      if (empty && onClear) {
        setDraft('')
        onClear()
        return
      }
      setDraft(text(value))
      return
    }

    const next = clamp(parsed)
    setDraft(String(next))
    if (next !== value) onChange(next)
  }

  const nudge = (by: number) => {
    // Stepping an empty field starts from the floor rather than from nothing,
    // so the first press of plus on an unmarked script gives the minimum mark
    // instead of NaN.
    const next = clamp((value ?? min) + by)
    setDraft(String(next))
    if (next !== value) onChange(next)
  }

  const atMin = value !== null && value <= min
  const atMax = max !== undefined && value !== null && value >= max

  const button =
    'grid h-full w-9 flex-none place-items-center text-muted-foreground transition-colors ' +
    'hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-inset focus-visible:ring-ring ' +
    'disabled:pointer-events-none disabled:opacity-30'

  return (
    <div
      className={cn(
        'flex h-10 items-stretch overflow-hidden rounded border border-border bg-background',
        'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background',
        invalid && 'border-danger focus-within:ring-danger',
        disabled && 'opacity-50',
        className,
      )}
    >
      {/*
        Minus first in the DOM, so it sits on the left in English and the right
        in Arabic. The buttons mirror with the layout because they are a pair
        read in reading order; the digits between them do not, because the
        studio uses Latin numerals in both languages.
      */}
      <button
        type="button"
        tabIndex={-1}
        disabled={disabled || atMin}
        aria-label={t('niDecrease').replace('{n}', label)}
        onClick={() => nudge(-step)}
        className={cn(button, 'border-e border-border')}
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>

      <input
        type="number"
        inputMode="numeric"
        aria-label={label}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        value={draft}
        min={min}
        max={max}
        step={step}
        onFocus={() => setEditing(true)}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={(event) => {
          setEditing(false)
          commit(event.target.value)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') event.currentTarget.blur()
        }}
        className={cn(
          'tabular min-w-0 flex-1 bg-transparent px-2 text-center text-small text-foreground',
          'focus:outline-none disabled:cursor-not-allowed',
          // The native spinners, removed because the buttons replace them.
          '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
        )}
      />

      {suffix ? (
        <span className="grid flex-none place-items-center pe-2 text-caption text-muted-foreground">
          {suffix}
        </span>
      ) : null}

      <button
        type="button"
        tabIndex={-1}
        disabled={disabled || atMax}
        aria-label={t('niIncrease').replace('{n}', label)}
        onClick={() => nudge(step)}
        className={cn(button, 'border-s border-border')}
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  )
}
