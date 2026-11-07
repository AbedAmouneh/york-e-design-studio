import { DirectionProvider } from '@radix-ui/react-direction'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Locale } from '@/types'
import { ar, en, type StringKey } from '@/i18n'

type Dictionary = Record<StringKey, string>

const dictionaries: Record<Locale, Dictionary> = { en, ar }

interface LocaleContextValue {
  locale: Locale
  dir: 'ltr' | 'rtl'
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: (key: StringKey) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

/**
 * Two things are needed for RTL, not one.
 *
 *   1. dir and lang on the html element, which handles layout.
 *   2. Radix DirectionProvider, which handles component behaviour: which side
 *      a menu opens on, and how the left and right arrow keys map.
 *
 * Setting only one of the two leaves the page half mirrored, which is the most
 * common way teams get this wrong.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')
  const dir: 'ltr' | 'rtl' = locale === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('lang', locale)
    root.setAttribute('dir', dir)
  }, [locale, dir])

  const toggleLocale = useCallback(() => {
    setLocale((current) => (current === 'en' ? 'ar' : 'en'))
  }, [])

  const t = useCallback(
    (key: StringKey) => dictionaries[locale][key] ?? dictionaries.en[key] ?? String(key),
    [locale],
  )

  const value = useMemo(
    () => ({ locale, dir, setLocale, toggleLocale, t }),
    [locale, dir, toggleLocale, t],
  )

  return (
    <LocaleContext.Provider value={value}>
      <DirectionProvider dir={dir}>{children}</DirectionProvider>
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used inside LocaleProvider')
  return context
}
