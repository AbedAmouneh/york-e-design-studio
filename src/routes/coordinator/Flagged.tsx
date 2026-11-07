import { useState } from 'react'
import { Flag, MessageSquare } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useLocale } from '@/lib/i18n'
import { cn, initials } from '@/lib/utils'
import type { StringKey } from '@/i18n'
import { classes, standings, students, teachers } from '@/data/seed'

/**
 * Flagged students.
 *
 * Children a teacher has escalated, or who are struggling in more than one
 * class at once. The second group is the reason this screen belongs to the
 * coordinator and not the teacher: no individual teacher can see that a child
 * is sliding in three subjects, because each of them only sees their own.
 *
 * Two or more flags is the threshold for a conversation rather than an
 * intervention plan. The platform surfaces the pattern, a person decides what
 * it means.
 */
export function CoordinatorFlagged() {
  const { t } = useLocale()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [done, setDone] = useState<string | null>(null)

  const myClasses = classes.filter((item) => item.schoolId === 'sch-cedar' && item.grade >= 6)

  const rows = myClasses
    .flatMap((group) =>
      group.studentIds.map((id) => {
        const student = students.find((item) => item.id === id)
        const standing = standings.find((item) => item.studentId === id)
        const teacher = teachers.find((item) => group.teacherIds.includes(item.id))
        return { student, standing, group, teacher }
      }),
    )
    .filter((row) => row.student && row.standing?.status === 'at-risk')
    .slice(0, 8)
    .map((row, index) => ({
      ...row,
      subjects: index % 3 === 0 ? 3 : index % 2 === 0 ? 2 : 1,
      raisedByKey: (index % 4 === 0 ? 'coRaisedAutomatic' : 'coRaisedTeacher') as StringKey,
    }))

  const multi = rows.filter((row) => row.subjects > 1)

  const toggle = (id: string) => {
    setDone(null)
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <Page>
      <PageHeader
        title={t('navFlagged')}
        subtitle={t('coFlaggedSubtitle')
          .replace('{n}', String(rows.length))
          .replace('{m}', String(multi.length))}
      />

      {multi.length > 0 ? (
        <Card className="border-warning/40">
          <CardContent className="flex flex-wrap items-center gap-3 p-4">
            <Flag className="h-4 w-4 flex-none text-warning" aria-hidden />
            <span className="min-w-0 flex-1 text-small text-foreground">
              {t('coMultiSubjectBanner').replace('{n}', String(multi.length))}
            </span>
          </CardContent>
        </Card>
      ) : null}

      {selected.size > 0 ? (
        <Card className="border-accent/50">
          <CardContent className="flex flex-wrap items-center gap-3 p-3">
            <Badge variant="accent">
              {selected.size} {t('selected')}
            </Badge>
            <Button variant="outline" size="sm" onClick={() => setDone('meeting')}>
              <MessageSquare className="h-3.5 w-3.5" aria-hidden />
              {t('coAskTeachersForNote')}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setDone('head')}>
              {t('coRaiseWithHead')}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>
              {t('clear')}
            </Button>
            {done ? (
              <span className="text-small text-success">
                {(done === 'meeting' ? t('coRequestedNotes') : t('coRaisedWithHead')).replace(
                  '{n}',
                  String(selected.size),
                )}
              </span>
            ) : null}
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{t('coFlaggedTitle')}</CardTitle>
          <Badge variant="outline">{rows.length}</Badge>
        </CardHeader>
        <CardContent className="space-y-1.5">
          {rows.map((row) => {
            if (!row.student || !row.standing) return null
            const name = `${row.student.firstName} ${row.student.lastName}`
            return (
              <label
                key={row.student.id}
                className={cn(
                  'flex cursor-pointer flex-wrap items-center gap-4 rounded border px-4 py-3 transition-colors',
                  row.subjects > 1 ? 'border-warning/40 bg-warning-tint/30' : 'border-border',
                )}
              >
                <Checkbox
                  checked={selected.has(row.student.id)}
                  onCheckedChange={() => toggle(row.student!.id)}
                />

                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-muted text-caption font-semibold text-foreground">
                  {initials(name)}
                </span>

                <span className="min-w-[150px] flex-1 leading-tight">
                  <span className="block truncate text-small font-medium text-foreground">
                    {name}
                  </span>
                  <span className="block truncate text-caption text-muted-foreground">
                    {row.group.name} ·{' '}
                    {row.teacher
                      ? `${row.teacher.firstName} ${row.teacher.lastName}`
                      : t('coUnassigned')}
                  </span>
                </span>

                <Badge
                  variant={row.subjects > 1 ? 'warning' : 'outline'}
                  className="flex-none"
                >
                  {t(row.subjects === 1 ? 'coOneSubject' : 'coNSubjects').replace(
                    '{n}',
                    String(row.subjects),
                  )}
                </Badge>

                <Badge variant="outline" className="flex-none">
                  {t(row.raisedByKey)}
                </Badge>

                <span className="tabular w-14 flex-none text-end text-small text-foreground">
                  {row.standing.average}%
                </span>
              </label>
            )
          })}
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">{t('coFlaggedNote')}</p>
    </Page>
  )
}
