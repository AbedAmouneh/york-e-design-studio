import { useState } from 'react'
import { Clock, ImageUp, Info, Lock, Send } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { schools } from '@/data/seed'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'
import { schoolName } from '@/lib/names'
import { cn } from '@/lib/utils'

/**
 * Support ticket.
 *
 * A school product has to ask three things a generic contact form does not.
 *
 *   Which school. The same person can hold a different role in two of them,
 *   and a gradebook fault at one school says nothing about the other.
 *   What they were doing. Page names mean nothing to a teacher, so the choice
 *   is in the words of the job rather than the words of the interface.
 *   Whether it affects one person or a whole class. That single answer is the
 *   difference between a ticket and an incident, and it is the only thing on
 *   this form that changes who gets woken up.
 *
 * The response time is stated on the screen rather than kept in a support
 * policy nobody reads. A teacher whose gradebook breaks on a Friday is deciding
 * whether to wait or to work around it, and that decision needs a number.
 *
 * Nothing here asks for a browser version. The platform already knows it.
 */

type Impact = 'me' | 'one' | 'class'

const impactLabel: Record<Impact, StringKey> = {
  me: 'shTktAffectsMe',
  one: 'shTktAffectsOne',
  class: 'shTktAffectsClass',
}

const areas: StringKey[] = [
  'shTktAreaMarking',
  'shTktAreaGradebook',
  'shTktAreaAttendance',
  'shTktAreaAssigning',
  'shTktAreaSigningIn',
  'shTktAreaSomethingElse',
]

/** The two schools this person is in. The third seed school is not theirs. */
const mySchoolIds = ['sch-cedar', 'sch-noor']

type Status = 'open' | 'engineering' | 'waiting' | 'resolved'

const statusLabel: Record<Status, StringKey> = {
  open: 'shTktStatusOpen',
  engineering: 'shTktStatusEngineering',
  waiting: 'shTktStatusWaitingYou',
  resolved: 'shTktStatusResolved',
}

const statusVariant: Record<Status, NonNullable<BadgeProps['variant']>> = {
  open: 'neutral',
  engineering: 'danger',
  waiting: 'warning',
  resolved: 'success',
}

interface Ticket {
  ref: string
  issueKey: StringKey
  schoolId: string
  impact: Impact
  atKey: StringKey
  status: Status
}

const tickets: Ticket[] = [
  {
    ref: 'YE-4402',
    issueKey: 'shTkt1Issue',
    schoolId: 'sch-cedar',
    impact: 'one',
    atKey: 'shTkt1At',
    status: 'open',
  },
  {
    ref: 'YE-4397',
    issueKey: 'shTkt2Issue',
    schoolId: 'sch-noor',
    impact: 'class',
    atKey: 'shTkt2At',
    status: 'engineering',
  },
  {
    ref: 'YE-4381',
    issueKey: 'shTkt3Issue',
    schoolId: 'sch-cedar',
    impact: 'one',
    atKey: 'shTkt3At',
    status: 'waiting',
  },
  {
    ref: 'YE-4360',
    issueKey: 'shTkt4Issue',
    schoolId: 'sch-cedar',
    impact: 'me',
    atKey: 'shTkt4At',
    status: 'resolved',
  },
]

export function SharedSupportTicket() {
  const { t, locale } = useLocale()
  const [schoolId, setSchoolId] = useState(mySchoolIds[0])
  const [area, setArea] = useState<StringKey>('shTktAreaMarking')
  const [impact, setImpact] = useState<Impact>('one')
  const [body, setBody] = useState('')
  const [sent, setSent] = useState(false)

  const waitingOnYou = tickets.some((ticket) => ticket.status === 'waiting')

  return (
    <Page>
      <PageHeader title={t('shNavSupport')} subtitle={t('shTktSubtitle')} />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>{t('shTktNew')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <span className="text-small font-medium text-foreground">
                  {t('shTktWhichSchool')}
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {mySchoolIds.map((id) => {
                    const school = schools.find((row) => row.id === id)
                    if (!school) return null
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setSchoolId(id)}
                        className={cn(
                          'rounded border px-3 py-1.5 text-small font-medium transition-colors',
                          schoolId === id
                            ? 'border-foreground bg-surface text-foreground'
                            : 'border-border text-muted-foreground hover:bg-surface',
                        )}
                      >
                        {schoolName(school, locale)}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="flex items-center text-small font-medium text-foreground">
                  {t('shTktYourRoleThere')}
                  <Lock className="ms-1.5 h-3 w-3 text-muted-foreground" aria-hidden />
                </span>
                {/*
                  The role is read from the school's records rather than typed.
                  A person who can pick their own role on a support form can
                  claim one they do not hold, and support would believe it.
                */}
                <div className="flex h-10 items-center justify-between gap-3 rounded border border-border bg-surface px-3">
                  <span className="text-small text-foreground">{t('tabTeacher')}</span>
                  <Badge variant="outline">{t('shSetByYourSchool')}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-small font-medium text-foreground">
                {t('shTktWhatDoing')}
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {areas.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setArea(key)}
                    className={cn(
                      'rounded border px-3 py-1.5 text-small font-medium transition-colors',
                      area === key
                        ? 'border-foreground bg-surface text-foreground'
                        : 'border-border text-muted-foreground hover:bg-surface',
                    )}
                  >
                    {t(key)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-small font-medium text-foreground">
                {t('shTktWhoAffected')}
              </span>
              <div className="grid gap-1.5 sm:grid-cols-3">
                {(Object.keys(impactLabel) as Impact[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setImpact(key)}
                    className={cn(
                      'rounded border px-3 py-2.5 text-start text-small font-medium transition-colors',
                      impact === key
                        ? 'border-foreground bg-surface text-foreground'
                        : 'border-border text-muted-foreground hover:bg-surface',
                    )}
                  >
                    {t(impactLabel[key])}
                  </button>
                ))}
              </div>
              <p className="text-caption text-muted-foreground">{t('shTktAffectsNote')}</p>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">{t('shTktDescribe')}</span>
              <Textarea
                value={body}
                onChange={(event) => {
                  setBody(event.target.value)
                  setSent(false)
                }}
                rows={4}
                placeholder={t('shTktDescribePlaceholder')}
                aria-label={t('shTktDescribePlaceholder')}
              />
            </label>

            <div className="space-y-2">
              <span className="block text-small font-medium text-foreground">
                {t('shTktAttach')}
              </span>
              <div className="flex flex-col items-center gap-2 rounded border border-dashed border-border-strong bg-surface px-6 py-7 text-center">
                <ImageUp className="h-5 w-5 text-muted-foreground" aria-hidden />
                <p className="max-w-[44ch] text-small text-muted-foreground">
                  {t('shTktAttachHint')}
                </p>
                <Button variant="outline" size="sm" className="mt-1">
                  {t('shTktChooseImage')}
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded border border-border bg-surface px-4 py-3">
              <Info className="mt-0.5 h-4 w-4 flex-none text-muted-foreground" aria-hidden />
              <p className="min-w-0 text-small text-muted-foreground">{t('shTktKnowsAlready')}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="accent" size="sm" onClick={() => setSent(true)}>
                <Send className="h-3.5 w-3.5" aria-hidden />
                {t('shTktSend')}
              </Button>
              {sent ? <span className="text-small text-success">{t('shTktSent')}</span> : null}
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{t('shTktWhatNext')}</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden />
          </CardHeader>
          <CardContent className="space-y-2">
            {/*
              Ordered by severity rather than by how often each happens, so the
              line a panicking teacher needs is the one in the middle, not one
              they have to scroll past two reassurances to reach.
            */}
            {(
              [
                { key: 'shTktNextOne', tone: 'quiet' },
                { key: 'shTktNextClass', tone: 'loud' },
                { key: 'shTktNextOutOfHours', tone: 'quiet' },
              ] as const
            ).map((line) => (
              <p
                key={line.key}
                className={cn(
                  'rounded border px-4 py-3 text-small',
                  line.tone === 'loud'
                    ? 'border-danger-tint bg-danger-tint text-foreground'
                    : 'border-border bg-surface text-muted-foreground',
                )}
              >
                {t(line.key)}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('shTktYourTickets')}</CardTitle>
          {waitingOnYou ? (
            <Badge variant="warning">{t('shTktStatusWaitingYou')}</Badge>
          ) : null}
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('shTktRef')}</TableHead>
                <TableHead>{t('shTktIssue')}</TableHead>
                <TableHead>{t('shSchool')}</TableHead>
                <TableHead>{t('shTktImpact')}</TableHead>
                <TableHead>{t('shTktRaised')}</TableHead>
                <TableHead>{t('shTktStatus')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => {
                const school = schools.find((row) => row.id === ticket.schoolId)
                return (
                  <TableRow key={ticket.ref}>
                    {/* The reference is read down a phone line, so it stays an identifier. */}
                    <TableCell className="font-medium text-foreground">{ticket.ref}</TableCell>
                    <TableCell className="text-foreground">{t(ticket.issueKey)}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {schoolName(school, locale)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {t(impactLabel[ticket.impact])}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{t(ticket.atKey)}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[ticket.status]}>
                        {t(statusLabel[ticket.status])}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">{t('shTktWaitingNote')}</p>
    </Page>
  )
}
