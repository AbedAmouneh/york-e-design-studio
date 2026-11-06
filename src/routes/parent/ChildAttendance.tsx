import { useParams } from 'react-router-dom'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
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

const label: Record<AttendanceRecord['state'], string> = {
  present: 'Present',
  late: 'Late',
  absent: 'Absent',
  excused: 'Excused',
}

export function ParentChildAttendance() {
  const { childId = '' } = useParams()
  const child = childById(childId) ?? children[0]
  const records = attendanceFor(child)
  const summary = attendanceSummary(child)

  return (
    <Page>
      <PageHeader
        title={`${child.firstName}'s attendance`}
        subtitle="Term 2 · recorded by the class teacher each morning"
        actions={
          <Button variant="outline" size="sm">
            Tell the school about an absence
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Present"
          value={String(summary.present)}
          hint={`of ${summary.total} days`}
        />
        <StatCard label="Late" value={String(summary.late)} />
        <StatCard label="Absent" value={String(summary.absent)} emphasis={summary.absent > 1} />
        <StatCard label="Excused" value={String(summary.excused)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Day by day</CardTitle>
          <Badge variant="outline">{records.length} days</Badge>
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
                {label[record.state]}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">
        If something here looks wrong, tell the school office rather than the class teacher. The
        register is corrected at the office.
      </p>
    </Page>
  )
}
