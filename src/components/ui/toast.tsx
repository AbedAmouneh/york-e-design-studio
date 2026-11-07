import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { Check, Info, TriangleAlert, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Toast and the inline save confirmation.
 *
 * Hand rolled rather than Radix, because `@radix-ui/react-toast` is not a
 * dependency and adding one to the studio would make everyone reinstall to see
 * a confirmation message. The behaviour that actually matters here is small:
 * announce politely, dismiss on a timer, stop the timer when a person is
 * reading or focused inside it.
 *
 * Why two components rather than one. Seven screens had written their own save
 * confirmation before this existed, and all seven were inline, next to the
 * save button. That is the right pattern for a save: the feedback belongs
 * where the action was, and a message that flies in at the corner of the
 * screen makes a person look away from what they just did. `SavedIndicator` is
 * for that. `useToast` is for the other case, something that finished after
 * the person moved on.
 *
 * Accessibility notes that are easy to get wrong and invisible when they are:
 *
 *   The live region is mounted for the life of the app, empty. A region
 *   created at the same moment as its message is not announced, which is the
 *   single most common reason a toast is silent for a screen reader.
 *
 *   `polite`, not `assertive`. These confirm something the person chose to do.
 *   Interrupting them to say it worked is rude in a way that only shows up
 *   when you listen to it.
 *
 *   The dismiss timer pauses on hover and on focus within. Four seconds is
 *   enough to read six words and nowhere near enough to read a sentence in a
 *   second language.
 */

type ToastTone = 'success' | 'info' | 'warning'

interface ToastItem {
  id: number
  message: string
  tone: ToastTone
}

interface ToastContextValue {
  toast: (message: string, tone?: ToastTone) => void
  dismissLabel: string
}

const ToastContext = createContext<ToastContextValue | null>(null)

const DISMISS_AFTER = 4000

const toneIcon = { success: Check, info: Info, warning: TriangleAlert }
const toneClass = {
  success: 'text-success',
  info: 'text-muted-foreground',
  warning: 'text-warning',
}

export function ToastProvider({
  children,
  dismissLabel,
}: {
  children: ReactNode
  /**
   * Required, and not defaulted to "Dismiss". The close button's only name is
   * this string, it is never seen, and an English default would have shipped
   * into the Arabic build unnoticed for exactly that reason.
   */
  dismissLabel: string
}) {
  const [items, setItems] = useState<ToastItem[]>([])
  const nextId = useRef(0)

  const dismiss = useCallback((id: number) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const toast = useCallback((message: string, tone: ToastTone = 'success') => {
    nextId.current += 1
    setItems((current) => [...current, { id: nextId.current, message, tone }])
  }, [])

  const value = useMemo(() => ({ toast, dismissLabel }), [toast, dismissLabel])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div
          // The region exists from first paint, so a screen reader is already
          // watching it when the first message arrives.
          role="status"
          aria-live="polite"
          aria-atomic="false"
          className="pointer-events-none fixed bottom-4 end-4 z-[60] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2"
        >
          {items.map((item) => (
            <ToastRow key={item.id} item={item} onDismiss={dismiss} dismissLabel={dismissLabel} />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

function ToastRow({
  item,
  onDismiss,
  dismissLabel,
}: {
  item: ToastItem
  onDismiss: (id: number) => void
  dismissLabel: string
}) {
  const [paused, setPaused] = useState(false)
  const Icon = toneIcon[item.tone]

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setTimeout(() => onDismiss(item.id), DISMISS_AFTER)
    return () => window.clearTimeout(timer)
  }, [item.id, onDismiss, paused])

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className={cn(
        'pointer-events-auto flex items-start gap-2.5 rounded border border-border bg-background p-3 shadow-learner-raised',
        'animate-in fade-in-0 slide-in-from-bottom-2',
      )}
    >
      <Icon className={cn('mt-0.5 h-4 w-4 flex-none', toneClass[item.tone])} aria-hidden />
      <span className="min-w-0 flex-1 text-small text-foreground">{item.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(item.id)}
        className="flex-none rounded p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
        <span className="sr-only">{dismissLabel}</span>
      </button>
    </div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context.toast
}

/**
 * The inline one. Sits beside the control that saved.
 *
 * It renders nothing when `saved` is false rather than rendering hidden, so
 * the row does not reserve a gap that is empty most of the time.
 */
export function SavedIndicator({ saved, label }: { saved: boolean; label: string }) {
  if (!saved) return null
  return (
    <span
      role="status"
      aria-live="polite"
      className="inline-flex animate-in fade-in-0 items-center gap-1.5 text-small text-success"
    >
      <Check className="h-3.5 w-3.5 flex-none" aria-hidden />
      {label}
    </span>
  )
}
