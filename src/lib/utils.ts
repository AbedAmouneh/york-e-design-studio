import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge has to be told about the custom type scale.
 *
 * `text-*` is two class groups wearing one prefix: a colour and a font size.
 * tailwind-merge tells them apart from its built in list of sizes, which knows
 * `text-sm` and `text-lg` but has never heard of `text-small` or `text-body`.
 * Anything unrecognised it files as a colour, so in
 *
 *     cn('bg-primary text-primary-foreground', 'h-8 px-3 text-small')
 *
 * it read `text-small` as a second colour and dropped `text-primary-foreground`
 * as the loser of a conflict that was never a conflict.
 *
 * The result was silent and everywhere: every sized Button lost its foreground
 * colour and fell back to inheriting `--foreground`. The default variant drew
 * near black text on a near black fill, invisible. The danger variant drew near
 * black on red, about 2:1, which fails WCAG AA outright. Only the accent
 * variant looked right, and only by luck, because its foreground token happens
 * to equal the inherited one.
 *
 * Found by building the component states page. Nothing else would have caught
 * it: every screen that used a primary button had a visible accent button
 * beside it, and a reviewer reads a black rectangle as a style choice.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'caption',
            'small',
            'body',
            'subheading',
            'heading',
            'display',
            'learner-body',
            'learner-heading',
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/*
  The two tags every number and date in the studio is formatted with.

  Latin digits in both languages, which was settled during the Arabic pass:
  `-u-nu-latn` forces them whatever the base locale, and it matches how
  timetables and exam papers print across all three markets.

  The country in the Arabic tag is the part that was wrong until now. It read
  `ar-EG`, which gives فبراير where Lebanon, Syria, Jordan and Iraq say شباط,
  so once the calendar started naming its own month from the school the rest of
  the studio disagreed with it. `LB` is right for the demo school, which is in
  Beirut, and that is all it claims to be.

  In the product the country comes from the school, not from a constant here.
  `calendarLocale` in `data/schoolCalendar.ts` is where that belongs, and these
  formatters take no school to ask. Anything printing a month name for a named
  school should call that instead of these.
*/
const AR_TAG = 'ar-LB-u-nu-latn'
const EN_TAG = 'en-GB'

const tagFor = (locale: 'en' | 'ar') => (locale === 'ar' ? AR_TAG : EN_TAG)

/** Percentages are never shown to K1 to Grade 3. Guard it at the formatter. */
export function formatPercent(value: number, locale: 'en' | 'ar' = 'en') {
  return new Intl.NumberFormat(tagFor(locale), {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(value / 100)
}

export function formatNumber(value: number, locale: 'en' | 'ar' = 'en') {
  return new Intl.NumberFormat(tagFor(locale)).format(value)
}

export function formatDate(iso: string, locale: 'en' | 'ar' = 'en') {
  return new Intl.DateTimeFormat(tagFor(locale), {
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso))
}

export function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
