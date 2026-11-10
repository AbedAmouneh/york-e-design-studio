/**
 * Localised names for seed entities.
 *
 * Courses, units, skills and subjects each carry their Arabic inline and are
 * read with a `locale === 'ar' ? x.nameAr : x.name` ternary at the point of
 * use. Classes could not follow that pattern: the class name appears on
 * roughly thirty screens across every role, and repeating the ternary thirty
 * times is thirty chances to forget one, which is exactly how "Grade 2 Olive"
 * ended up sitting in the middle of an Arabic page.
 *
 * So classes get a function instead. One place to read, one place to change if
 * the shape of a class name ever changes.
 *
 * `groupName` tolerates undefined because most callers reach a class through a
 * lookup that can miss (`classes.find(...)`, a student's first class id) and
 * every one of those sites was already handling the miss with `?? ''`.
 */

import type { ClassGroup, Locale, School } from '@/types'

export function groupName(group: ClassGroup | undefined | null, locale: Locale): string {
  if (!group) return ''
  return locale === 'ar' ? group.nameAr : group.name
}

/**
 * Both names at once, for search boxes.
 *
 * A teacher typing "الزيتون" and a teacher typing "Olive" are looking for the
 * same class, and which one they type does not depend on which language the
 * interface happens to be in. Filtering on the displayed name only would make
 * the search quietly worse in Arabic, where the English name is the one that
 * matches a code or a printed register.
 */
export function groupSearchText(group: ClassGroup): string {
  return `${group.name} ${group.nameAr}`
}

/**
 * Schools, by the same argument as classes.
 *
 * The school name is in the sidebar of every staff screen and all through the
 * operator view, which is more places than a ternary per site survives.
 */
export function schoolName(school: School | undefined | null, locale: Locale): string {
  if (!school) return ''
  return locale === 'ar' ? school.nameAr : school.name
}

/**
 * City and country as one phrase, because they are almost never shown apart.
 *
 * The separator is a comma in both languages here rather than an Arabic comma
 * in one and a Latin comma in the other: the surrounding screens already join
 * with a middle dot, and mixing two comma glyphs for the same job reads as an
 * inconsistency rather than a nicety.
 */
export function schoolPlace(school: School | undefined | null, locale: Locale): string {
  if (!school) return ''
  return locale === 'ar'
    ? `${school.cityAr}، ${school.countryAr}`
    : `${school.city}, ${school.country}`
}

export function schoolSearchText(school: School): string {
  return `${school.name} ${school.nameAr} ${school.city} ${school.cityAr} ${school.country} ${school.countryAr}`
}

/**
 * The academic year, which was a bidi bug on six screens.
 *
 * It was stored as the string `'2026 to 2027'` and printed straight into both
 * languages. In Arabic the three left to right runs were ordered right to left
 * and it came out as "to 2027 2026", with an English word sitting in Arabic
 * copy either way.
 *
 * English keeps "2026 to 2027". Arabic uses a slash, which is how an academic
 * year is written across the three markets and drops the English word. Latin
 * digits in both, matching every other number in the studio.
 *
 * The Arabic range is wrapped in a directional isolate, U+2066 and U+2069.
 * Without it the two digit runs are ordered by the paragraph and the range
 * displays as "2027 / 2026". That is correct bidi and reads correctly right to
 * left, but Latin digits pull a skimming eye left to right, and a year range
 * that can be read either way is one that will be read wrongly. The isolate
 * pins it so both languages show the same thing.
 *
 * FOR THE ARABIC REVIEW: leaving bidi to order it is also defensible, and a
 * native reader may prefer the start year on the right. This is a question for
 * Lena or Marie-Therese, not a settled answer.
 */
export function academicYear(school: School | undefined | null, locale: Locale): string {
  if (!school) return ''
  const start = school.academicYearStart
  return locale === 'ar'
    ? `⁦${start} / ${start + 1}⁩`
    : `${start} to ${start + 1}`
}
