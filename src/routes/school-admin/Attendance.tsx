import { useMemo, useState } from 'react'
import { Download } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import { groupName } from '@/lib/names'
import { cn } from '@/lib/utils'
import { attendance, classesForSchool, DEFAULT_SCHOOL_ID, students } from '@/data/seed'
import type { AttendanceRecord } from '@/types'
import type { StringKey } from '@/i18n'

const days: Array<{ date: string; labelKey: StringKey }> = [
  { date: '2027-02-02', labelKey: 'admDayTue2' },
  { date: '2027-02-03', labelKey: 'admDayWed3' },
  { date: '2027-02-04', labelKey: 'admDayThu4' },
  { date: '2027-02-05', labelKey: 'admDayFri5' },
  { date: '2027-02-08', labelKey: 'admDayMon8' },
  { date: '2027-02-09', labelKey: 'admDayTue9' },
  { date: '2027-02-10', labelKey: 'admDayWed10' },
]

/**
 * The glyph stays Latin in both languages. A, L and E are read as a legend
 * against the key above the table, not as words, and a one letter Arabic
 * abbreviation would collide across حاضر, غائب and بعذر.
 */
const stateMark: Record<
  AttendanceRecord['state'],
  { glyph: string; className: string; labelKey: StringKey }
> = {
  present: { glyph: '·', className: 'text-muted-foreground', labelKey: 'admStatePresent' },
  absent: {
    glyph: 'A',
    className: 'bg-danger-tint text-danger font-semibold',
    labelKey: 'admStateAbsent',
  },
  late: {
    glyph: 'L',
    className: 'bg-warning-tint text-warning font-semibold',
    labelKey: 'admStateLate',
  },
  excused: {
    glyph: 'E',
    className: 'bg-muted text-muted-foreground font-semibold',
    labelKey: 'admStateExcused',
  },
}

export function SchoolAdminAttendance() {
  const { t, locale } = useLocale()
  const schoolClasses = classesForSchool(DEFAULT_SCHOOL_ID)
  const [classId, setClassId] = useState(schoolClasses[0]?.id ?? '')

  const rows = useMemo(() => {
    const classGroup = schoolClasses.find((item) => item.id === classId)
    if (!classGroup) return []
    return classGroup.studentIds
      .map((studentId) => {
        const student = students.find((item) => item.id === studentId)!
        const byDate = new Map(
          attendance
            .filter((record) => record.studentId === studentId)
            .map((record) => [record.date, record.state]),
        )
        const absences = days.filter((day) => byDate.get(day.date) === 'absent').length
        return { student, byDate, absences }
      })
      .sort((a, b) => b.absences - a.absences)
  }, [classId, schoolClasses])

  const totals = useMemo(() => {
    const flat = rows.flatMap((row) => days.map((day) => row.byDate.get(day.date)))
    const present = flat.filter((state) => state === 'present').length
    return { present, total: flat.length }
  }, [rows])

  const rate = totals.total ? Math.round((totals.present / totals.total) * 100) : 0

  return (
    <Page>
      <PageHeader
        title={t('navAttendance')}
        subtitle={t('admLastSevenDays')}
        actions={
          <Button variant="outline" size="sm">
            <Download className="h-3.5 w-3.5" aria-hidden />
            {t('export')}
          </Button>
        }
      />

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1">
              {schoolClasses.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setClassId(item.id)}
                  className={cn(
                    'rounded px-3 py-1.5 text-small font-medium transition-colors',
                    classId === item.id
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {groupName(item, locale)}
                </button>
              ))}
            </div>
            <span className="text-small text-muted-foreground">
              {t('admAttendanceRate')}{' '}
              <span className="tabular font-semibold text-foreground">{rate}%</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {(['absent', 'late', 'excused'] as const).map((state) => (
              <span key={state} className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'grid h-5 w-5 place-items-center rounded text-caption',
                    stateMark[state].className,
                  )}
                >
                  {stateMark[state].glyph}
                </span>
                <span className="text-caption text-muted-foreground">
                  {t(stateMark[state].labelKey)}
                </span>
              </span>
            ))}
          </div>

          <div className="-mx-4 -mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('colStudent')}</TableHead>
                  {days.map((day) => (
                    <TableHead key={day.date} className="w-14 text-center">
                      {t(day.labelKey)}
                    </TableHead>
                  ))}
                  <TableHead className="text-end">{t('admAbsences')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.student.id}>
                    <TableCell className="font-medium text-foreground">
                      {row.student.firstName} {row.student.lastName}
                    </TableCell>
                    {days.map((day) => {
                      const state = row.byDate.get(day.date) ?? 'present'
                      const mark = stateMark[state]
                      return (
                        <TableCell key={day.date} className="text-center">
                          <span
                            className={cn(
                              'mx-auto grid h-6 w-6 place-items-center rounded text-caption',
                              mark.className,
                            )}
                            title={t(mark.labelKey)}
                          >
                            {mark.glyph}
                          </span>
                        </TableCell>
                      )
                    })}
                    <TableCell className="text-end">
                      {row.absences >= 2 ? (
                        <Badge variant="danger">{row.absences}</Badge>
                      ) : (
                        <span className="tabular text-muted-foreground">{row.absences}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Page>
  )
}
