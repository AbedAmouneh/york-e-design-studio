import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Percentages are never shown to K1 to Grade 3. Guard it at the formatter. */
export function formatPercent(value: number, locale: 'en' | 'ar' = 'en') {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB', {
    style: 'percent',
    maximumFractionDigits: 0,
  }).format(value / 100)
}

export function formatNumber(value: number, locale: 'en' | 'ar' = 'en') {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB').format(value)
}

export function formatDate(iso: string, locale: 'en' | 'ar' = 'en') {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB', {
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
