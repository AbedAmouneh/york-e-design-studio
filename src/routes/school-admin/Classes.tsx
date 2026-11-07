import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge, StatusBadge } from '@/components/ui/badge'
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
import {
  classesForSchool,
  courses,
  DEFAULT_SCHOOL_ID,
  schools,
  standings,
  teachersForSchool,
} from '@/data/seed'
import type { ProgressStatus } from '@/types'

export function SchoolAdminClasses() {
  const { t, locale } = useLocale()
  const [query, setQuery] = useState('')
  const school = schools.find((s) => s.id === DEFAULT_SCHOOL_ID)!
  const schoolTeachers = teachersForSchool(school.id)

  const standingById = useMemo(
    () => new Map(standings.map((standing) => [standing.studentId, standing])),
    [],
  )

  const rows = useMemo(() => {
    return classesForSchool(school.id)
      .map((classGroup) => {
        const members = classGroup.studentIds
          .map((id) => standingById.get(id))
          .filter(Boolean) as NonNullable<ReturnType<typeof standingById.get>>[]
        const average = members.length
          ? Math.round(members.reduce((sum, m) => sum + m.average, 0) / members.length)
          : 0
        const atRisk = members.filter((m) => m.status === 'at-risk').length
        const status: ProgressStatus =
          average >= 75 ? 'on-track' : average >= 65 ? 'watch' : 'at-risk'
        const teacher = schoolTeachers.find((teach) => classGroup.teacherIds.includes(teach.id))
        const classCourses = courses.filter((course) => classGroup.courseIds.includes(course.id))
        return { classGroup, average, atRisk, status, teacher, classCourses }
      })
      .filter((row) =>
        query ? row.classGroup.name.toLowerCase().includes(query.toLowerCase()) : true,
      )
  }, [school.id, schoolTeachers, standingById, query])

  const statusLabel: Record<ProgressStatus, string> = {
    'on-track': t('onTrack'),
    watch: t('watch'),
    'at-risk': t('atRisk'),
  }

  return (
    <Page>
      <PageHeader
        title={t('navClasses')}
        subtitle={`${school.name} · ${school.academicYear}`}
        actions={
          <Button variant="accent" size="sm" asChild>
            <Link to="/school-admin/classes/new">
              <Plus className="h-3.5 w-3.5" aria-hidden />
              {t('admCreateClass')}
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
                  <TableHead>{t('colClass')}</TableHead>
                  <TableHead>{t('colTeacher')}</TableHead>
                  <TableHead className="text-end">{t('admColStudents')}</TableHead>
                  <TableHead>{t('navCourses')}</TableHead>
                  <TableHead className="text-end">{t('colAverage')}</TableHead>
                  <TableHead>{t('colStatus')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.classGroup.id}>
                    <TableCell>
                      <Link
                        to={`/school-admin/classes/${row.classGroup.id}`}
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {row.classGroup.name}
                      </Link>
                      {row.classGroup.ageTier === 'early' ? (
                        <Badge variant="outline" className="ms-2">
                          {t('admEarlyTierBadge')}
                        </Badge>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.teacher ? `${row.teacher.firstName} ${row.teacher.lastName}` : '—'}
                    </TableCell>
                    <TableCell className="tabular text-end">
                      {row.classGroup.studentIds.length}
                      {row.atRisk > 0 ? (
                        <span className="ms-2 text-caption font-semibold text-danger">
                          {t('admAtRiskCount').replace('{n}', String(row.atRisk))}
                        </span>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.classCourses
                        .map((course) => (locale === 'ar' ? course.titleAr : course.title))
                        .join(', ') || '—'}
                    </TableCell>
                    <TableCell className="tabular text-end">{row.average}%</TableCell>
                    <TableCell>
                      <StatusBadge status={row.status} label={statusLabel[row.status]} />
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
