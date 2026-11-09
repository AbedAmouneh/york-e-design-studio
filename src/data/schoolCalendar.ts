import { assignments, schools, terms } from './seed'
import type { Locale, Term } from '@/types'

/**
 * The school calendar: what a date means to a school, as opposed to what it
 * means to a calendar.
 *
 * This is the data behind the context-aware date picker. A generic picker is a
 * solved problem and nobody needs York to redraw one. A picker that knows 2
 * April ends the term, that Friday is Eid, and that Tuesday already carries
 * three deadlines is the thing worth building, and all of it comes from here.
 *
 * ON THE LUNAR DATES, read this before anyone ships it.
 *
 * Ramadan and both Eids are marked `approximate: true`. Their Gregorian dates
 * depend on moon sighting and are declared per country, so Lebanon, the UAE
 * and Jordan can and do differ by a day, and the date is not final until days
 * before. The dates below are computed estimates for 1448 AH, good enough for
 * a studio and NOT good enough for a product that tells a teacher when the
 * term resumes. Before this ships, the list has to come from each branch, and
 * the UI has to be able to say "around" rather than implying certainty.
 *
 * Getting this wrong in a product sold to schools across Lebanon, the Gulf and
 * Jordan would be the kind of error that is noticed immediately and remembered
 * for a long time, which is why it is flagged in the data itself rather than
 * in a ticket somewhere.
 */

/**
 * Which days a country's school week runs on, and what the month is called.
 *
 * This table exists because the Arabic build disproved two assumptions at
 * once, and both had survived a review.
 *
 * The first was that the first day of the week is a property of the language.
 * It is not. It is a property of the country, and the countries York sells to
 * disagree: Beirut and Dubai start on Monday, Amman and Cairo and Riyadh start
 * on Saturday. Reading it from the locale put Jordan on a Beirut week.
 *
 * The second was that Arabic is one calendar. The Levant says شباط and Egypt
 * and the Gulf say فبراير. Both are correct, and a Jordanian teacher shown
 * فبراير is being shown a foreign calendar in their own language. The locale
 * tag therefore has to carry the country, which is why `calendarLocale` builds
 * `ar-JO` rather than a single `ar`.
 *
 * The weekend moved in here for the same reason. The UAE changed to a Monday
 * to Friday week with a Saturday and Sunday weekend in January 2022, so the
 * old rule of "Friday and Saturday everywhere except Lebanon" was wrong for
 * Dubai, which is the second largest market in the seed.
 *
 * None of this is settled by us. It is a question for each branch, and the
 * table is the shape of the answer rather than the answer itself.
 */
export interface WeekRule {
  /** 0 Sunday through 6 Saturday, matching `Date.getDay()`. */
  weekStart: number
  /** The two days school is closed. */
  weekendDays: number[]
}

export const weekRules: Record<string, WeekRule> = {
  LB: { weekStart: 1, weekendDays: [6, 0] },
  AE: { weekStart: 1, weekendDays: [6, 0] },
  JO: { weekStart: 6, weekendDays: [5, 6] },
  EG: { weekStart: 6, weekendDays: [5, 6] },
  SA: { weekStart: 6, weekendDays: [5, 6] },
  IQ: { weekStart: 6, weekendDays: [5, 6] },
  SY: { weekStart: 6, weekendDays: [5, 6] },
  MA: { weekStart: 1, weekendDays: [6, 0] },
  TR: { weekStart: 1, weekendDays: [6, 0] },
  GR: { weekStart: 1, weekendDays: [6, 0] },
  GB: { weekStart: 1, weekendDays: [6, 0] },
}

const FALLBACK_RULE: WeekRule = { weekStart: 1, weekendDays: [6, 0] }

export function countryCodeOf(schoolId: string): string {
  return schools.find((school) => school.id === schoolId)?.countryCode ?? 'LB'
}

export function weekRuleOf(schoolId: string): WeekRule {
  return weekRules[countryCodeOf(schoolId)] ?? FALLBACK_RULE
}

/**
 * The tag every date in a calendar is formatted with.
 *
 * Latin digits in both languages, which was settled during the Arabic pass and
 * matches how timetables and exam papers print across all three markets. The
 * country is what is new: it decides whether February is شباط or فبراير.
 */
export function calendarLocale(locale: Locale, schoolId: string): string {
  return locale === 'ar' ? `ar-${countryCodeOf(schoolId)}-u-nu-latn` : 'en-GB'
}

export type HolidayKind = 'public' | 'school' | 'religious'

export interface Holiday {
  /** ISO `YYYY-MM-DD`. Single day; multi day breaks are listed as a range below. */
  startsOn: string
  /** Inclusive. Equal to `startsOn` for a single day. */
  endsOn: string
  /** English label. Arabic comes from the dictionary by key where one is shown. */
  name: string
  nameAr: string
  kind: HolidayKind
  /** True when the Gregorian date is not yet fixed. See the note above. */
  approximate?: boolean
  /** Empty means every branch observes it. */
  schoolIds?: string[]
}

/**
 * Term 2 of the 2026 to 2027 year, 11 January to 2 April 2027, which is the
 * window every screen in the studio sits in.
 */
export const holidays: Holiday[] = [
  {
    startsOn: '2027-02-09',
    endsOn: '2027-02-09',
    name: 'Saint Maron',
    nameAr: 'عيد مار مارون',
    kind: 'public',
    schoolIds: ['sch-cedar'],
  },
  {
    startsOn: '2027-02-14',
    endsOn: '2027-02-14',
    name: 'Rafic Hariri Memorial Day',
    nameAr: 'ذكرى رفيق الحريري',
    kind: 'public',
    schoolIds: ['sch-cedar'],
  },
  {
    // Ramadan shortens the school day rather than closing the school, which is
    // why it is a range and why the picker shows it differently from a closure.
    startsOn: '2027-02-08',
    endsOn: '2027-03-09',
    // Just the name. "Shortened day" is a qualifier the interface adds, not
    // part of what the month is called, and baking it in produced lines like
    // "Ramadan, shortened day, date not yet confirmed".
    name: 'Ramadan',
    nameAr: 'رمضان',
    kind: 'religious',
    approximate: true,
  },
  {
    startsOn: '2027-03-10',
    endsOn: '2027-03-12',
    name: 'Eid al-Fitr',
    nameAr: 'عيد الفطر',
    kind: 'religious',
    approximate: true,
  },
  {
    startsOn: '2027-03-25',
    endsOn: '2027-03-25',
    name: 'Feast of the Annunciation',
    nameAr: 'عيد البشارة',
    kind: 'public',
    schoolIds: ['sch-cedar'],
  },
  {
    startsOn: '2027-03-26',
    endsOn: '2027-03-29',
    name: 'Easter break',
    nameAr: 'عطلة الفصح',
    kind: 'school',
    schoolIds: ['sch-cedar', 'sch-noor'],
  },
]

const iso = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

/** The term a date falls in, or null for a date between terms. */
export function termOn(date: Date, schoolId: string): Term | null {
  const key = iso(date)
  return (
    terms.find(
      (term) => term.schoolId === schoolId && key >= term.startsOn && key <= term.endsOn,
    ) ?? null
  )
}

/** True when the date is the last teaching day of its term. */
export function isTermEnd(date: Date, schoolId: string): boolean {
  const term = termOn(date, schoolId)
  return term ? term.endsOn === iso(date) : false
}

export function holidayOn(date: Date, schoolId: string): Holiday | null {
  const key = iso(date)
  return (
    holidays.find(
      (holiday) =>
        key >= holiday.startsOn &&
        key <= holiday.endsOn &&
        (!holiday.schoolIds || holiday.schoolIds.includes(schoolId)),
    ) ?? null
  )
}

/**
 * Whether the school is open at all.
 *
 * Ramadan is deliberately not a closure: the day is shorter, not cancelled, so
 * a teacher can still set a deadline in it. Treating it as closed would be
 * both wrong and quietly insulting.
 */
export function isClosed(date: Date, schoolId: string): boolean {
  const holiday = holidayOn(date, schoolId)
  if (!holiday) return false
  return holiday.kind !== 'religious' || !holiday.name.includes('Ramadan')
}

/**
 * Weekend, which is not the same two days everywhere we sell.
 *
 * This used to read "Friday and Saturday unless the school is Cedar", which
 * was a guess from a school id and was wrong for Dubai: the UAE moved to a
 * Monday to Friday week with a Saturday and Sunday weekend in January 2022.
 * It now comes from the country, via `weekRules`.
 */
export function isWeekend(date: Date, schoolId: string): boolean {
  return weekRuleOf(schoolId).weekendDays.includes(date.getDay())
}

/** How many things are already due that day, across the given classes. */
export function dueLoadOn(date: Date, classIds: string[]): number {
  const key = iso(date)
  return assignments.filter(
    (assignment) => assignment.dueOn === key && classIds.includes(assignment.classId),
  ).length
}

/**
 * What the picker should say about a day, in one call.
 *
 * Returned as a single object rather than five separate lookups so the grid
 * does one pass per cell. Forty two cells times five lookups per render is the
 * kind of thing that is fine until the month view does it for a term.
 */
export interface DayContext {
  closed: boolean
  weekend: boolean
  holiday: Holiday | null
  inTerm: boolean
  termEnd: boolean
  dueCount: number
}

export function dayContext(
  date: Date,
  schoolId: string,
  classIds: string[] = [],
): DayContext {
  const holiday = holidayOn(date, schoolId)
  return {
    closed: isClosed(date, schoolId),
    weekend: isWeekend(date, schoolId),
    holiday,
    inTerm: termOn(date, schoolId) !== null,
    termEnd: isTermEnd(date, schoolId),
    dueCount: classIds.length > 0 ? dueLoadOn(date, classIds) : 0,
  }
}
