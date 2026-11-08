import { assignments, terms } from './seed'
import type { Term } from '@/types'

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
    name: 'Ramadan, shortened day',
    nameAr: 'رمضان، دوام مختصر',
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

/** Weekend, which is not the same two days everywhere we sell. */
export function isWeekend(date: Date, schoolId: string): boolean {
  const day = date.getDay()
  // Friday and Saturday across the Arab branches, Saturday and Sunday for the
  // rest. Hardcoding Sat/Sun would put a deadline on a Friday in Amman.
  const arabWeekend = schoolId !== 'sch-cedar'
  return arabWeekend ? day === 5 || day === 6 : day === 6 || day === 0
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
