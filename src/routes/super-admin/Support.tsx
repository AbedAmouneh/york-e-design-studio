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
import { cn } from '@/lib/utils'
import { schools } from '@/data/seed'

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
  const { t } = useLocale()
  const [reason, setReason] = useState('')
  const [target, setTarget] = useState<string | null>(null)
  const [active, setActive] = useState(false)

  const sessions = [
    {
      id: 'imp-1',
      who: 'Platform operations',
      school: 'Al Noor International School',
      as: 'Teacher, Grade 6 Falcon',
      reason: 'Gradebook totals reported wrong after a scale change',
      at: '9 Feb, 11:20',
      minutes: 14,
    },
    {
      id: 'imp-2',
      who: 'Platform operations',
      school: 'Cedar Valley School',
      as: 'School admin',
      reason: 'Bulk import failed on 38 rows, reproducing',
      at: '6 Feb, 16:05',
      minutes: 22,
    },
  ]

  return (
    <Page>
      <PageHeader title={t('navSupport')} subtitle="View a school as one of its users" />

      <Card className="border-danger/40">
        <CardContent className="flex flex-wrap items-start gap-3 p-4">
          <ShieldAlert className="mt-0.5 h-4 w-4 flex-none text-danger" aria-hidden />
          <span className="min-w-0 flex-1 text-small text-foreground">
            Impersonation is read only and time boxed to 30 minutes. The school's own admin sees an
            entry in their activity log while the session is running, not afterwards. Every session
            below is permanent and cannot be deleted by anyone, including York Press.
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Start a session</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <span className="text-small font-medium text-foreground">School</span>
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
                  {school.name}
                </button>
              ))}
            </div>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-small font-medium text-foreground">
              Why do you need to do this
            </span>
            <Input
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Reproducing a bug the school reported, with a ticket number"
            />
            <span className="text-caption text-muted-foreground">
              Free text on purpose. A list of reasons becomes one reason everybody picks.
            </span>
          </label>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
            <Button
              variant="danger"
              size="sm"
              disabled={!target || reason.trim().length < 12}
              onClick={() => setActive(true)}
            >
              <Eye className="h-3.5 w-3.5" aria-hidden />
              Start a read only session
            </Button>
            {active ? (
              <span className="flex items-center gap-2 text-small text-danger">
                <AlertTriangle className="h-4 w-4" aria-hidden />
                Session running. 30 minutes remaining. The school has been notified.
              </span>
            ) : (
              <span className="text-caption text-muted-foreground">
                A reason of at least a few words is required before this can start.
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Session history</CardTitle>
          <Badge variant="outline">Permanent</Badge>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Who</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Viewed as</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>When</TableHead>
                <TableHead className="text-end">Length</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium text-foreground">{session.who}</TableCell>
                  <TableCell className="text-muted-foreground">{session.school}</TableCell>
                  <TableCell className="text-muted-foreground">{session.as}</TableCell>
                  <TableCell className="max-w-[280px] text-muted-foreground">
                    {session.reason}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">
                    {session.at}
                  </TableCell>
                  <TableCell className="tabular text-end">{session.minutes} min</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Page>
  )
}
