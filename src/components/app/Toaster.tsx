import type { ReactNode } from 'react'
import { ToastProvider } from '@/components/ui/toast'
import { useLocale } from '@/lib/i18n'

/**
 * Wires the toast provider to the dictionary.
 *
 * `ToastProvider` takes its dismiss label as a prop rather than reading the
 * locale itself, so the component stays usable outside this studio. This is
 * the one place that knows about both, and it has to sit inside
 * `LocaleProvider` to do it.
 */
export function Toaster({ children }: { children: ReactNode }) {
  const { t } = useLocale()
  return <ToastProvider dismissLabel={t('dismiss')}>{children}</ToastProvider>
}
