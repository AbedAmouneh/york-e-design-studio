import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'
import { fullName, studentsInClass, teacherClasses } from '@/data/teacher'

/**
 * Grade change audit.
 *
 * Every manual override, who made it, when, and the reason they gave. This is
 * the screen that protects the teacher: when a parent asks why a mark moved,
 * the answer is on the record rather than in somebody's memory.
 *
 * The reason field is mandatory at the point of change, which is why there is
 * no empty cell in this column.
 */

interface ChangeRecord {
  id: string
  studentId: string
  classId: string
  activityKey: StringKey
  from: number | null
  to: number
  reasonKey: StringKey
  by: 'you' | 'coordinator'
  atKey: StringKey
}

function buildChanges(): ChangeRecord[] {
  const cedar = studentsInClass('cls-3')
  const maple = studentsInClass('cls-4')
  const jasmine = studentsInClass('cls-5')

  return [
    {
      id: 'chg-1',
      studentId: cedar[2]?.id ?? '',
      classId: 'cls-3',
      activityKey: 'tchActCheck23',
      from: 54,
      to: 68,
      reasonKey: 'tchAuditReason1',
      by: 'you',
      atKey: 'tchAuditAt1',
    },
    {
      id: 'chg-2',
      studentId: cedar[7]?.id ?? '',
      classId: 'cls-3',
      activityKey: 'tchActApply15',
      from: null,
      to: 72,
      reasonKey: 'tchAuditReason2',
      by: 'you',
      atKey: 'tchAuditAt2',
    },
    {
      id: 'chg-3',
      studentId: maple[4]?.id ?? '',
      classId: 'cls-4',
      activityKey: 'tchActCheck13',
      from: 81,
      to: 73,
      reasonKey: 'tchAuditReason3',
      by: 'you',
      atKey: 'tchAuditAt3',
    },
    {
      id: 'chg-4',
      studentId: jasmine[1]?.id ?? '',
      classId: 'cls-5',
      activityKey: 'tchActApply25',
      from: 40,
      to: 55,
      reasonKey: 'tchAuditReason4',
      by: 'coordinator',
      atKey: 'tchAuditAt4',
    },
  ]
}

export function TeacherGradeAudit() {
  const { t } = useLocale()
  const [query, setQuery] = useState('')
  const changes = buildChanges()

  const allStudents = teacherClasses.flatMap((item) => studentsInClass(item.id))
  const nameFor = (id: string) => fullName(allStudents.find((student) => student.id === id))
  const classFor = (id: string) => teacherClasses.find((item) => item.id === id)?.name ?? '—'

  const rows = changes.filter((change) =>
    query ? nameFor(change.studentId).toLowerCase().includes(query.toLowerCase()) : true,
  )

  return (
    <Page>
      <PageHeader
        title={t('tchGradeChanges')}
        subtitle={t('tchGradeChangesSubtitle')}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/teacher/gradebook">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('navGradebook')}
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="max-w-xs">
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('search')}
            />
          </div>

          <div className="-mx-4 -mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('colStudent')}</TableHead>
                  <TableHead>{t('colClass')}</TableHead>
                  <TableHead>{t('colActivity')}</TableHead>
                  <TableHead>{t('tchChange')}</TableHead>
                  <TableHead>{t('tchReason')}</TableHead>
                  <TableHead>{t('tchBy')}</TableHead>
                  <TableHead>{t('colWhen')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((change) => (
                  <TableRow key={change.id}>
                    <TableCell className="font-medium text-foreground">
                      {nameFor(change.studentId)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {classFor(change.classId)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {t(change.activityKey)}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1.5">
                        <span className="tabular text-muted-foreground line-through">
                          {change.from ?? t('tchNotMarked')}
                        </span>
                        <ArrowRight
                          className="h-3.5 w-3.5 text-muted-foreground rtl:-scale-x-100"
                          aria-hidden
                        />
                        <span className="tabular font-semibold text-foreground">{change.to}</span>
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[280px] text-muted-foreground">
                      {t(change.reasonKey)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={change.by === 'you' ? 'neutral' : 'outline'}>
                        {change.by === 'you' ? t('tchByYou') : t('tabCoordinator')}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {t(change.atKey)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">{t('tchGradeAuditNote')}</p>
    </Page>
  )
}
