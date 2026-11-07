import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input, SearchInput } from '@/components/ui/input'
import { useLocale } from '@/lib/i18n'
import { cn, initials } from '@/lib/utils'
import { courses, DEFAULT_SCHOOL_ID, students, teachersForSchool } from '@/data/seed'

/**
 * Flow 5 of 8: create a class.
 *
 * This is also admin-driven enrolment (2.3.1 in the features sheet). Naming,
 * assigning courses, assigning a teacher and enrolling students are one task
 * for a school admin, not four screens, so they are one flow here.
 */

type Step = 'details' | 'courses' | 'people' | 'done'

export function SchoolAdminCreateClass() {
  const { t, locale } = useLocale()
  const [step, setStep] = useState<Step>('details')
  const [name, setName] = useState('')
  const [grade, setGrade] = useState(6)
  const [courseIds, setCourseIds] = useState<Set<string>>(new Set())
  const [teacherId, setTeacherId] = useState<string | null>(null)
  const [studentIds, setStudentIds] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState('')

  const schoolTeachers = teachersForSchool(DEFAULT_SCHOOL_ID)
  const gradeCourses = useMemo(
    () => courses.filter((course) => course.grade === grade),
    [grade],
  )

  const unassigned = useMemo(
    () =>
      students
        .filter((student) => student.schoolId === DEFAULT_SCHOOL_ID)
        .filter((student) =>
          query
            ? `${student.firstName} ${student.lastName}`
                .toLowerCase()
                .includes(query.toLowerCase())
            : true,
        )
        .slice(0, 12),
    [query],
  )

  const ageTier = grade <= 3 ? 'early' : 'upper'

  const steps: Array<{ key: Step; label: string }> = [
    { key: 'details', label: t('admStepDetails') },
    { key: 'courses', label: t('navCourses') },
    { key: 'people', label: t('admStepTeacherStudents') },
    { key: 'done', label: t('done') },
  ]
  const activeIndex = steps.findIndex((item) => item.key === step)

  return (
    <Page>
      <PageHeader
        title={t('admCreateClass')}
        subtitle="Cedar Valley School"
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/school-admin/classes">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('navClasses')}
            </Link>
          </Button>
        }
      />

      <ol className="flex flex-wrap items-center gap-2">
        {steps.map((item, index) => (
          <li key={item.key} className="flex items-center gap-2">
            <span
              className={cn(
                'flex items-center gap-2 rounded px-3 py-1.5 text-small font-medium',
                index === activeIndex
                  ? 'bg-foreground text-background'
                  : index < activeIndex
                    ? 'bg-success-tint text-success'
                    : 'bg-muted text-muted-foreground',
              )}
            >
              <span className="tabular text-caption">{index + 1}</span>
              {item.label}
            </span>
            {index < steps.length - 1 ? (
              <span className="h-px w-5 bg-border-strong" aria-hidden />
            ) : null}
          </li>
        ))}
      </ol>

      {step === 'details' ? (
        <Card>
          <CardHeader>
            <CardTitle>{t('admClassDetails')}</CardTitle>
          </CardHeader>
          <CardContent className="max-w-xl space-y-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">{t('admClassName')}</span>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Grade 6 Cypress"
              />
            </label>

            <div className="flex flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">{t('admGrade')}</span>
              <div className="flex flex-wrap gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setGrade(value)
                      setCourseIds(new Set())
                    }}
                    className={cn(
                      'h-9 w-9 rounded border text-small font-medium transition-colors',
                      grade === value
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border text-muted-foreground hover:bg-muted',
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div
              className={cn(
                'rounded border px-4 py-3 text-small',
                ageTier === 'early'
                  ? 'border-learner-primary/30 bg-learner-surface text-foreground'
                  : 'border-border bg-surface text-muted-foreground',
              )}
            >
              {ageTier === 'early' ? t('admEarlyTierBanner') : t('admUpperTierBanner')}
            </div>

            <div className="flex justify-end">
              <Button
                variant="accent"
                size="sm"
                disabled={!name.trim()}
                onClick={() => setStep('courses')}
              >
                {t('next')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'courses' ? (
        <Card>
          <CardHeader>
            <CardTitle>{t('admAssignCourses')}</CardTitle>
            <Badge variant="outline">{t('admGradeN').replace('{n}', String(grade))}</Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {gradeCourses.length ? (
              gradeCourses.map((course) => (
                <label
                  key={course.id}
                  className="flex cursor-pointer items-center gap-3 rounded border border-border px-4 py-3 transition-colors hover:bg-surface"
                >
                  <Checkbox
                    checked={courseIds.has(course.id)}
                    onCheckedChange={() =>
                      setCourseIds((current) => {
                        const next = new Set(current)
                        if (next.has(course.id)) next.delete(course.id)
                        else next.add(course.id)
                        return next
                      })
                    }
                  />
                  <span className="flex flex-col leading-tight">
                    <span className="text-small font-medium text-foreground">
                      {locale === 'ar' ? course.titleAr : course.title}
                    </span>
                    <span className="text-caption text-muted-foreground">
                      {t('admUnitsActivities')
                        .replace('{n}', String(course.units.length))
                        .replace(
                          '{m}',
                          String(
                            course.units.reduce((sum, unit) => sum + unit.activities.length, 0),
                          ),
                        )}
                    </span>
                  </span>
                </label>
              ))
            ) : (
              <p className="text-small text-muted-foreground">
                {t('admNoCoursesForGrade').replace('{n}', String(grade))}
              </p>
            )}

            <div className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => setStep('details')}>
                {t('back')}
              </Button>
              <Button variant="accent" size="sm" onClick={() => setStep('people')}>
                {t('next')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'people' ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('admTeacherCard')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {schoolTeachers.map((teacher) => (
                <button
                  key={teacher.id}
                  type="button"
                  onClick={() => setTeacherId(teacher.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded border px-4 py-2.5 text-start transition-colors',
                    teacherId === teacher.id
                      ? 'border-foreground bg-surface'
                      : 'border-border hover:bg-surface',
                  )}
                >
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-muted text-caption font-semibold text-foreground">
                    {initials(`${teacher.firstName} ${teacher.lastName}`)}
                  </span>
                  <span className="min-w-0 flex-1 text-small font-medium text-foreground">
                    {teacher.firstName} {teacher.lastName}
                  </span>
                  {teacherId === teacher.id ? (
                    <Check className="h-4 w-4 flex-none text-foreground" aria-hidden />
                  ) : null}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('admStudentsCard')}</CardTitle>
              <Badge variant="outline">
                {t('admNSelected').replace('{n}', String(studentIds.size))}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <SearchInput
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('search')}
              />
              <div className="max-h-[280px] space-y-1 overflow-y-auto">
                {unassigned.map((student) => (
                  <label
                    key={student.id}
                    className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 transition-colors hover:bg-surface"
                  >
                    <Checkbox
                      checked={studentIds.has(student.id)}
                      onCheckedChange={() =>
                        setStudentIds((current) => {
                          const next = new Set(current)
                          if (next.has(student.id)) next.delete(student.id)
                          else next.add(student.id)
                          return next
                        })
                      }
                    />
                    <span className="text-small text-foreground">
                      {student.firstName} {student.lastName}
                    </span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between lg:col-span-2">
            <Button variant="ghost" size="sm" onClick={() => setStep('courses')}>
              {t('back')}
            </Button>
            <Button
              variant="accent"
              size="sm"
              disabled={!teacherId || studentIds.size === 0}
              onClick={() => setStep('done')}
            >
              {t('admCreateTheClass')}
            </Button>
          </div>
        </div>
      ) : null}

      {step === 'done' ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-success-tint">
              <Check className="h-5 w-5 text-success" aria-hidden />
            </span>
            <p className="text-subheading font-semibold text-foreground">
              {t('admClassCreated').replace('{c}', name)}
            </p>
            <p className="max-w-[52ch] text-small text-muted-foreground">
              {t('admClassCreatedSummary')
                .replace('{n}', String(studentIds.size))
                .replace('{m}', String(courseIds.size))}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Button variant="accent" size="sm" asChild>
                <Link to="/school-admin/classes">{t('admViewClasses')}</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setStep('details')
                  setName('')
                  setCourseIds(new Set())
                  setStudentIds(new Set())
                  setTeacherId(null)
                }}
              >
                {t('admCreateAnother')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </Page>
  )
}
