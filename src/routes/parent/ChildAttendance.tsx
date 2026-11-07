import { useParams } from 'react-router-dom'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'
import {
  attendanceFor,
  attendanceSummary,
  childById,
  children,
} from '@/data/parent'
import type { AttendanceRecord } from '@/types'

/**
 * Attendance, parent view.
 *
 * Factual and unemotional. The school records what happened, the parent sees
 * it, and the only action offered is telling the school about an absence they
 * do not know about yet.
 *
 * No automated warning about attendance percentages. In several of the
 * launch markets that is a legal letter from the school, not a banner from a
 * piece of software.
 */

const tone: Record<AttendanceRecord['state'], string> = {
  present: 'bg-success-tint text-success border-success/30',
  late: 'bg-warning-tint text-warning border-warning/30',
  absent: 'bg-danger-tint text-danger border-danger/30',
  excused: 'bg-muted text-muted-foreground border-border-strong',
}

const labelKey: Record<AttendanceRecord['state'], StringKey> = {
  present: 'parPresent',
  late: 'parLate',
  absent: 'parAbsent',
  excused: 'parExcused',
}

export function ParentChildAttendance() {
  const { childId = '' } = useParams()
  const { t } = useLocale()
  const child = childById(childId) ?? children[0]
  const records = attendanceFor(child)
  const summary = attendanceSummary(child)

  return (
    <Page>
      <PageHeader
        title={t('parNameAttendance').replace('{n}', child.firstName)}
        subtitle={t('parAttendanceSubtitle')}
        actions={
          <Button variant="outline" size="sm">
            {t('parTellSchoolAbsence')}
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={t('parPresent')}
          value={String(summary.present)}
          hint={t('parOfNDays').replace('{n}', String(summary.total))}
        />
        <StatCard label={t('parLate')} value={String(summary.late)} />
        <StatCard
          label={t('parAbsent')}
          value={String(summary.absent)}
          emphasis={summary.absent > 1}
        />
        <StatCard label={t('parExcused')} value={String(summary.excused)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('parDayByDay')}</CardTitle>
          <Badge variant="outline">{t('parNDays').replace('{n}', String(records.length))}</Badge>
        </CardHeader>
        <CardContent className="space-y-1.5">
          {records.map((record) => (
            <div
              key={record.id}
              className="flex items-center gap-3 rounded border border-border px-4 py-2.5"
            >
              <span className="tabular min-w-0 flex-1 text-small text-foreground">
                {record.date}
              </span>
              <span
                className={cn(
                  'flex-none rounded-full border px-2.5 py-0.5 text-caption font-semibold',
                  tone[record.state],
                )}
              >
                {t(labelKey[record.state])}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">{t('parAttendanceNote')}</p>
    </Page>
  )
}
