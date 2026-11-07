import { useState } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { groupName } from '@/lib/names'
import type { StringKey } from '@/i18n'
import { cn, initials } from '@/lib/utils'
import { attendanceForClass, fullName, studentsInClass, teacherClasses } from '@/data/teacher'
import type { AttendanceRecord } from '@/types'

/**
 * Attendance.
 *
 * A register is taken standing up, in the first minute of a lesson, often on a
 * phone. So everybody starts present, the teacher only taps the exceptions,
 * and the targets are large enough to hit without looking carefully.
 *
 * The link to the gradebook is the point: three absences in a fortnight next
 * to a falling average is the signal that matters, and neither number means
 * much on its own.
 */

type State = AttendanceRecord['state']

const states: Array<{ key: State; labelKey: StringKey; tone: string }> = [
  {
    key: 'present',
    labelKey: 'tchStatePresent',
    tone: 'bg-success-tint text-success border-success/40',
  },
  { key: 'late', labelKey: 'tchStateLate', tone: 'bg-warning-tint text-warning border-warning/40' },
  {
    key: 'absent',
    labelKey: 'tchStateAbsent',
    tone: 'bg-danger-tint text-danger border-danger/40',
  },
  {
    key: 'excused',
    labelKey: 'tchStateExcused',
    tone: 'bg-muted text-muted-foreground border-border-strong',
  },
]

export function TeacherAttendance() {
  const { t, locale } = useLocale()
  const [classId, setClassId] = useState(teacherClasses[1]?.id ?? teacherClasses[0].id)
  const [marks, setMarks] = useState<Record<string, State>>({})
  const [saved, setSaved] = useState(false)

  const members = studentsInClass(classId)
  const history = attendanceForClass(classId)

  const stateFor = (studentId: string): State => marks[studentId] ?? 'present'

  const setState = (studentId: string, state: State) => {
    setMarks((current) => ({ ...current, [studentId]: state }))
    setSaved(false)
  }

  const counts = {
    present: members.filter((s) => stateFor(s.id) === 'present').length,
    late: members.filter((s) => stateFor(s.id) === 'late').length,
    absent: members.filter((s) => stateFor(s.id) === 'absent').length,
    excused: members.filter((s) => stateFor(s.id) === 'excused').length,
  }

  const termAbsences = (studentId: string) =>
    history.filter((record) => record.studentId === studentId && record.state === 'absent').length

  return (
    <Page>
      <PageHeader
        title={t('navAttendance')}
        subtitle={t('tchAttendanceSubtitle')}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label={t('tchPreviousDay')}>
              <ChevronLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Button>
            <Button variant="ghost" size="icon" aria-label={t('tchNextDay')}>
              <ChevronRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => setSaved(true)}
            >
              {t('tchSaveRegister')}
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-1 rounded border border-border p-0.5">
        {teacherClasses.map((item) => (
          <Button
            key={item.id}
            variant={item.id === classId ? 'outline' : 'ghost'}
            size="sm"
            onClick={() => {
              setClassId(item.id)
              setMarks({})
              setSaved(false)
            }}
          >
            {groupName(item, locale)}
          </Button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t('tchStatePresent')} value={String(counts.present)} />
        <StatCard label={t('tchStateLate')} value={String(counts.late)} />
        <StatCard
          label={t('tchStateAbsent')}
          value={String(counts.absent)}
          emphasis={counts.absent > 0}
        />
        <StatCard label={t('tchStateExcused')} value={String(counts.excused)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('tchRegister')}</CardTitle>
          <Badge variant="outline">
            {t('tchNStudents').replace('{n}', String(members.length))}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            className="ms-auto"
            onClick={() => {
              setMarks({})
              setSaved(false)
            }}
          >
            {t('tchResetAllPresent')}
          </Button>
        </CardHeader>
        <CardContent className="space-y-1.5">
          {members.map((student) => {
            const state = stateFor(student.id)
            const absences = termAbsences(student.id)
            return (
              <div
                key={student.id}
                className="flex flex-wrap items-center gap-3 rounded border border-border px-3 py-2"
              >
                <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-muted text-caption font-semibold text-foreground">
                  {initials(fullName(student))}
                </span>
                <span className="min-w-[140px] flex-1 text-small text-foreground">
                  {fullName(student)}
                </span>

                {absences >= 2 ? (
                  <Badge variant="warning" className="flex-none">
                    {t('tchNAbsencesTerm').replace('{n}', String(absences))}
                  </Badge>
                ) : null}

                <div className="flex flex-none gap-1">
                  {states.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setState(student.id, option.key)}
                      className={cn(
                        'h-9 rounded border px-3 text-caption font-medium transition-colors',
                        state === option.key
                          ? option.tone
                          : 'border-border text-muted-foreground hover:bg-surface',
                      )}
                    >
                      {t(option.labelKey)}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {saved ? (
        <p className="flex items-center gap-2 text-small text-success">
          <Check className="h-4 w-4" aria-hidden />
          {t('tchRegisterSaved')}
        </p>
      ) : (
        <p className="text-caption text-muted-foreground">{t('tchAttendanceNote')}</p>
      )}
    </Page>
  )
}
