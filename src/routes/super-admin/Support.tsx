import { useState } from 'react'
import { AlertTriangle, Eye, ShieldAlert } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import { schoolName } from '@/lib/names'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'
import { schools } from '@/data/seed'

/**
 * The history rows carry keys and ids rather than copy.
 *
 * The school is a `schoolId` and not a name. An earlier version wrote the name
 * in here on the argument that an audit line which renames what it is auditing
 * is no longer an audit line. That argument was right about free text and
 * wrong about this: the row points at a tenant record, and showing that
 * tenant's own Arabic name to an Arabic reader is not a rename. Writing the
 * name in place also meant the log could drift from the tenant list above it,
 * which is the failure an audit screen can least afford.
 */
const sessions: Array<{
  id: string
  whoKey: StringKey
  schoolId: string
  asKey: StringKey
  reasonKey: StringKey
  atKey: StringKey
  minutes: number
}> = [
  {
    id: 'imp-1',
    whoKey: 'saPlatformOperations',
    schoolId: 'sch-noor',
    asKey: 'saImpAs1',
    reasonKey: 'saImpReason1',
    atKey: 'saImpAt1',
    minutes: 14,
  },
  {
    id: 'imp-2',
    whoKey: 'saPlatformOperations',
    schoolId: 'sch-cedar',
    asKey: 'saImpAs2',
    reasonKey: 'saImpReason2',
    atKey: 'saImpAt2',
    minutes: 22,
  },
]

/**
 * Support and impersonation.
 *
 * The most dangerous screen in the platform, so it is built to be awkward.
 *
 *   A reason is required and it is free text, because a dropdown of reasons
 *   becomes one reason everybody picks.
 *   The session is time boxed and ends by itself.
 *   It is read only. A support engineer can see what a teacher sees and
 *   cannot change a grade while wearing their face.
 *   The school's own admin sees the session in their activity log, during it,
 *   not in a report afterwards.
 *
 * In several launch markets this screen is what a data protection officer will
 * ask about first, so it states its own rules rather than relying on a policy
 * document nobody reads.
 */
export function SuperAdminSupport() {
  const { t, locale } = useLocale()
  const [reason, setReason] = useState('')
  const [target, setTarget] = useState<string | null>(null)
  const [active, setActive] = useState(false)

  return (
    <Page>
      <PageHeader title={t('navSupport')} subtitle={t('saSupportSubtitle')} />

      <Card className="border-danger/40">
        <CardContent className="flex flex-wrap items-start gap-3 p-4">
          <ShieldAlert className="mt-0.5 h-4 w-4 flex-none text-danger" aria-hidden />
          <span className="min-w-0 flex-1 text-small text-foreground">
            {t('saImpersonationBanner')}
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('saStartSession')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <span className="text-small font-medium text-foreground">{t('saColSchool')}</span>
            <div className="flex flex-wrap gap-2">
              {schools.map((school) => (
                <button
                  key={school.id}
                  type="button"
                  onClick={() => setTarget(school.id)}
                  className={cn(
                    'rounded border px-4 py-2.5 text-small transition-colors',
                    target === school.id
                      ? 'border-foreground bg-surface text-foreground'
                      : 'border-border text-muted-foreground hover:bg-surface',
                  )}
                >
                  {schoolName(school, locale)}
                </button>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-small font-medium text-foreground">{t('saWhyNeeded')}</span>
            <Input
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder={t('saReasonPlaceholder')}
            />
            <span className="text-caption text-muted-foreground">{t('saFreeTextNote')}</span>
          </label>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
            <Button
              variant="danger"
              size="sm"
              disabled={!target || reason.trim().length < 12}
              onClick={() => setActive(true)}
            >
              <Eye className="h-3.5 w-3.5" aria-hidden />
              {t('saStartReadOnly')}
            </Button>
            {active ? (
              <span className="flex items-center gap-2 text-small text-danger">
                <AlertTriangle className="h-4 w-4" aria-hidden />
                {t('saSessionRunning')}
              </span>
            ) : (
              <span className="text-caption text-muted-foreground">{t('saReasonRequired')}</span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('saSessionHistory')}</CardTitle>
          <Badge variant="outline">{t('saPermanent')}</Badge>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('saColWho')}</TableHead>
                <TableHead>{t('saColSchool')}</TableHead>
                <TableHead>{t('saColViewedAs')}</TableHead>
                <TableHead>{t('saColReason')}</TableHead>
                <TableHead>{t('colWhen')}</TableHead>
                <TableHead className="text-end">{t('saColLength')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium text-foreground">
                    {t(session.whoKey)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {schoolName(
                      schools.find((item) => item.id === session.schoolId),
                      locale,
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t(session.asKey)}</TableCell>
                  <TableCell className="max-w-[280px] text-muted-foreground">
                    {t(session.reasonKey)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {t(session.atKey)}
                  </TableCell>
                  <TableCell className="tabular text-end">
                    {t('saNMinutes').replace('{n}', String(session.minutes))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Page>
  )
}
