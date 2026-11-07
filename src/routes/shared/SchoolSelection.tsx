import { useState } from 'react'
import { Check, MessageSquare, PenLine } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { schools } from '@/data/seed'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'
import { cn } from '@/lib/utils'

/**
 * School selection.
 *
 * The screen straight after sign in for anyone who belongs to more than one
 * school in the group. It is the one place multi-tenancy stops being an
 * architecture word and becomes something a person has to answer.
 *
 * Two real cases, not one hypothetical one, because they need different
 * things from the same screen:
 *
 *   A teacher who works at two schools in the group. What decides the pick is
 *   the marking queue, so the queue is on the card.
 *   A parent with a child at each of two schools. What decides the pick is an
 *   unread message, so that is on the card instead.
 *
 * Each option names the school, the role that person holds there, and what is
 * waiting. A chooser that lists only school names makes the reader open one to
 * find out whether it was the right one, which is the same as not choosing.
 */

type Case = 'teacher' | 'parent'

interface Option {
  schoolId: string
  /** Role words are platform words, so they come from the phrase book. */
  roleKey: StringKey
  waitingKey: StringKey
  icon: typeof PenLine
  /** Drives the dot. Nothing waiting is an answer too, and a quiet school should look quiet. */
  waiting: boolean
  /** Where Continue lands, which differs by role rather than by school. */
  to: string
}

const cases: Record<Case, { name: string; options: Option[] }> = {
  teacher: {
    name: 'Ziad Mansour',
    options: [
      {
        schoolId: 'sch-cedar',
        roleKey: 'tabTeacher',
        waitingKey: 'shSelTeacherCedar',
        icon: PenLine,
        waiting: true,
        to: '/teacher',
      },
      {
        schoolId: 'sch-noor',
        roleKey: 'tabTeacher',
        waitingKey: 'shSelTeacherNoor',
        icon: PenLine,
        waiting: true,
        to: '/teacher',
      },
    ],
  },
  parent: {
    name: 'Rana Sleiman',
    options: [
      {
        schoolId: 'sch-cedar',
        roleKey: 'tabParent',
        waitingKey: 'shSelParentCedar',
        icon: MessageSquare,
        waiting: true,
        to: '/parent',
      },
      {
        schoolId: 'sch-rawabi',
        roleKey: 'tabParent',
        waitingKey: 'shSelParentRawabi',
        icon: MessageSquare,
        waiting: false,
        to: '/parent',
      },
    ],
  },
}

export function SharedSchoolSelection() {
  const { t } = useLocale()
  const [current, setCurrent] = useState<Case>('teacher')
  const [picked, setPicked] = useState<string | null>(null)
  const [remember, setRemember] = useState(false)

  const person = cases[current]

  return (
    <div className="min-h-screen bg-surface px-6 py-12">
      <div className="mx-auto w-full max-w-xl space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded bg-primary text-[17px] font-bold text-primary-foreground">
            Y
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-small font-semibold text-foreground">York-E</span>
            <span className="text-caption text-muted-foreground">
              {t('shSelSignedInAs').replace('{t}', person.name)}
            </span>
          </span>
        </div>

        {/*
          The case switch is a studio control rather than a product one. A real
          user arrives inside one of these two situations and never sees the
          other, but a reviewer has to be able to check both.
        */}
        <div className="flex items-center gap-1 rounded border border-border bg-background p-0.5">
          {(
            [
              { key: 'teacher', labelKey: 'shSelCaseTeacher' },
              { key: 'parent', labelKey: 'shSelCaseParent' },
            ] as const
          ).map((option) => (
            <Button
              key={option.key}
              variant={current === option.key ? 'outline' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => {
                setCurrent(option.key)
                setPicked(null)
              }}
            >
              {t(option.labelKey)}
            </Button>
          ))}
        </div>

        <div>
          <h1 className="text-heading font-semibold text-foreground">{t('shSelTitle')}</h1>
          <p className="mt-1 text-small text-muted-foreground">{t('shSelIntro')}</p>
        </div>

        <div className="space-y-2">
          {person.options.map((option) => {
            const school = schools.find((row) => row.id === option.schoolId)
            if (!school) return null

            const Icon = option.icon
            const chosen = picked === school.id

            return (
              <button
                key={school.id}
                type="button"
                onClick={() => setPicked(school.id)}
                className={cn(
                  'flex w-full items-start gap-3 rounded border bg-background px-4 py-4 text-start transition-colors',
                  chosen ? 'border-foreground' : 'border-border hover:bg-surface',
                )}
              >
                <span
                  className={cn(
                    'grid h-10 w-10 flex-none place-items-center rounded-full text-small font-semibold',
                    chosen ? 'bg-accent text-accent-foreground' : 'bg-muted text-foreground',
                  )}
                >
                  {chosen ? <Check className="h-4 w-4" aria-hidden /> : school.name.slice(0, 1)}
                </span>

                <span className="min-w-0 flex-1 leading-tight">
                  <span className="flex flex-wrap items-center gap-2">
                    {/* The school name and its city are the school's own, so neither is translated. */}
                    <span className="text-small font-medium text-foreground">{school.name}</span>
                    <Badge variant="outline">{t(option.roleKey)}</Badge>
                  </span>
                  <span className="mt-0.5 block text-caption text-muted-foreground">
                    {school.city}, {school.country}
                  </span>

                  <span className="mt-2.5 flex items-start gap-2">
                    <Icon
                      className="mt-0.5 h-3.5 w-3.5 flex-none text-muted-foreground"
                      aria-hidden
                    />
                    <span className="min-w-0">
                      <span className="block text-caption uppercase tracking-wide text-muted-foreground">
                        {t('shSelWaitingFor')}
                      </span>
                      <span
                        className={cn(
                          'mt-0.5 block text-small',
                          option.waiting ? 'text-foreground' : 'text-muted-foreground',
                        )}
                      >
                        {t(option.waitingKey)}
                      </span>
                    </span>
                  </span>
                </span>

                {option.waiting ? (
                  <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-accent" aria-hidden />
                ) : null}
              </button>
            )
          })}
        </div>

        <label className="flex items-start gap-3 rounded border border-border bg-background px-4 py-3">
          <Checkbox
            className="mt-0.5"
            checked={remember}
            onCheckedChange={(value) => setRemember(value === true)}
          />
          <span className="min-w-0 text-small text-foreground">
            {t('shSelRemember')}
            {/*
              The undo is stated next to the thing it undoes. A remember box
              with the escape route hidden in settings is how people learn to
              leave the box alone.
            */}
            <span className="mt-0.5 block text-caption text-muted-foreground">
              {t('shSelSwitchNote')}
            </span>
          </span>
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="accent" size="md" disabled={picked === null}>
            {t('shSelContinue')}
          </Button>
          {picked === null ? (
            <span className="text-small text-muted-foreground">{t('shSelPickOne')}</span>
          ) : null}
        </div>

        <p className="text-caption text-muted-foreground">{t('shSelNote')}</p>
      </div>
    </div>
  )
}
