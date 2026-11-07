/**
 * One entry, both languages, side by side.
 *
 * The alternative is an en file and an ar file that drift apart silently. Here
 * a missing Arabic string is a type error rather than an English word showing
 * up in the middle of an Arabic screen, which is the failure mode that
 * actually reaches a customer.
 *
 * Keeping the pair adjacent also means a reviewer who reads Arabic can check a
 * translation against its source without opening two files.
 */
export interface Phrase {
  en: string
  ar: string
}

export type PhraseBook = Record<string, Phrase>

/** Flattens a phrase book into one language. */
export function pick<T extends PhraseBook>(book: T, locale: 'en' | 'ar') {
  return Object.fromEntries(
    Object.entries(book).map(([key, phrase]) => [key, phrase[locale]]),
  ) as Record<keyof T, string>
}
