import { common } from './common'
import { coordinator } from './coordinator'
import { designSystem } from './designSystem'
import { parent } from './parent'
import { schoolAdmin } from './schoolAdmin'
import { shared } from './shared'
import { student } from './student'
import { superAdmin } from './superAdmin'
import { teacher } from './teacher'
import { pick, type Phrase } from './types'

/**
 * Every phrase in the studio, one module per role.
 *
 * Flattened into a single namespace rather than nested, because `t('gbTitle')`
 * reads better in a component than `t('teacher.gradebook.title')` and the keys
 * are already prefixed by module. A duplicate key across two modules is a
 * genuine mistake, and the spread below makes the later module win, so keys
 * carry a short module prefix by convention.
 */
const phrases = {
  ...common,
  ...schoolAdmin,
  ...teacher,
  ...student,
  ...parent,
  ...coordinator,
  ...superAdmin,
  ...shared,
  ...designSystem,
} satisfies Record<string, Phrase>

export type StringKey = keyof typeof phrases

export const en = pick(phrases, 'en')
export const ar = pick(phrases, 'ar')
