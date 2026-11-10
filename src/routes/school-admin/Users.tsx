import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Upload } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { groupName, schoolName } from '@/lib/names'
import { cn, initials } from '@/lib/utils'
import { classes, DEFAULT_SCHOOL_ID, guardians, schools, students, teachers } from '@/data/seed'
import type { Role } from '@/types'

type Filter = 'all' | 'student' | 'teacher' | 'parent'

export function SchoolAdminUsers() {
  const { t, locale } = useLocale()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>('student')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const school = schools.find((s) => s.id === DEFAULT_SCHOOL_ID)!

  const classNameById = useMemo(
    () => new Map(classes.map((classGroup) => [classGroup.id, groupName(classGroup, locale)])),
    [locale],
  )

  const people = useMemo(() => {
    const everyone = [
      ...students.filter((s) => s.schoolId === school.id),
      ...teachers.filter((p) => p.schoolId === school.id),
      ...guardians.filter((p) => p.schoolId === school.id),
    ]
    return everyone
      .filter((person) => (filter === 'all' ? true : person.role === filter))
      .filter((person) =>
        query
          ? `${person.firstName} ${person.lastName}`.toLowerCase().includes(query.toLowerCase())
          : true,
      )
      .slice(0, 40)
  }, [school.id, filter, query])

  const roleLabel: Record<Role, string> = {
    'super-admin': t('tabSuperAdmin'),
    'school-admin': t('tabSchoolAdmin'),
    coordinator: t('tabCoordinator'),
    teacher: t('tabTeacher'),
    student: t('tabStudent'),
    parent: t('tabParent'),
  }

  const allSelected = people.length > 0 && people.every((person) => selected.has(person.id))
  const someSelected = people.some((person) => selected.has(person.id))

  function toggleAll() {
    setSelected((current) => {
      const next = new Set(current)
      if (allSelected) people.forEach((person) => next.delete(person.id))
      else people.forEach((person) => next.add(person.id))
      return next
    })
  }

  function toggleOne(id: string) {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filters: Array<{ key: Filter; label: string; count: number }> = [
    {
      key: 'student',
      label: t('admFilterStudents'),
      count: students.filter((s) => s.schoolId === school.id).length,
    },
    {
      key: 'teacher',
      label: t('teachersCount'),
      count: teachers.filter((s) => s.schoolId === school.id).length,
    },
    {
      key: 'parent',
      label: t('admFilterParents'),
      count: guardians.filter((s) => s.schoolId === school.id).length,
    },
    { key: 'all', label: t('admFilterEveryone'), count: 0 },
  ]

  return (
    <Page>
      <PageHeader
        title={t('navUsers')}
        subtitle={`${schoolName(school, locale)} · ${school.seatsUsed} ${t('seatsUsed')} ${t('ofTotal')} ${school.seats}`}
        actions={
          <Button variant="accent" size="sm" asChild>
            <Link to="/school-admin/users/import">
              <Upload className="h-3.5 w-3.5" aria-hidden />
              {t('admBulkImport')}
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              {filters.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setFilter(option.key)}
                  className={cn(
                    'rounded px-3 py-1.5 text-small font-medium transition-colors',
                    filter === option.key
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {option.label}
                  {option.count ? (
                    <span className="tabular ms-1.5 text-caption text-muted-foreground">
                      {option.count}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
            <div className="w-full max-w-xs">
              <SearchInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('search')}
              />
            </div>
          </div>

          {someSelected ? (
            <div className="flex items-center justify-between gap-3 rounded border border-border bg-surface px-4 py-2.5">
              <span className="text-small font-medium text-foreground">
                {selected.size} {t('selected')}
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  {t('admMessage')}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>
                  {t('clear')}
                </Button>
              </div>
            </div>
          ) : null}

          <div className="-mx-4 -mb-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                      onCheckedChange={toggleAll}
                      aria-label={t('admSelectAll')}
                    />
                  </TableHead>
                  <TableHead>{t('admColName')}</TableHead>
                  <TableHead>{t('admColRole')}</TableHead>
                  <TableHead>{t('colClass')}</TableHead>
                  <TableHead>{t('admColEmail')}</TableHead>
                  <TableHead className="text-end">{t('colLastActive')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {people.map((person) => {
                  const classIds =
                    'classIds' in person ? (person.classIds as string[]) : []
                  return (
                    /*
                      The row opens the person, and the name is also a real
                      link. Both, on purpose.

                      A row with an onClick is not reachable by keyboard and
                      announces nothing, so the link is what makes the row
                      navigable at all; the row click is the large target a
                      mouse expects from a table like this. The link carries
                      the accessibility and the row carries the convenience.

                      The checkbox cell stops the click, because selecting
                      people for a bulk message and opening one of them are
                      different intentions and the first must not trigger the
                      second.
                    */
                    <TableRow
                      key={person.id}
                      onClick={() => navigate(`/school-admin/users/${person.id}`)}
                      className="cursor-pointer"
                    >
                      <TableCell onClick={(event) => event.stopPropagation()}>
                        <Checkbox
                          checked={selected.has(person.id)}
                          onCheckedChange={() => toggleOne(person.id)}
                          aria-label={t('admSelectPerson').replace('{n}', person.firstName)}
                        />
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2.5">
                          <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-muted text-caption font-semibold text-foreground">
                            {initials(`${person.firstName} ${person.lastName}`)}
                          </span>
                          <Link
                            to={`/school-admin/users/${person.id}`}
                            onClick={(event) => event.stopPropagation()}
                            className="rounded font-medium text-foreground hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {person.firstName} {person.lastName}
                          </Link>
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{roleLabel[person.role]}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {classIds.map((id) => classNameById.get(id)).filter(Boolean).join(', ') ||
                          '—'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{person.email}</TableCell>
                      <TableCell className="text-end text-muted-foreground">
                        {person.lastActiveOn ? t('admFeb10') : t('admNever')}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Page>
  )
}
