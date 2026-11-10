import { useMemo, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useLocale } from '@/lib/i18n'
import { academicYear, groupName, schoolName } from '@/lib/names'
import { initials } from '@/lib/utils'
import {
  assignments,
  attendance,
  classes,
  DEFAULT_SCHOOL_ID,
  guardians,
  schools,
  standings,
  students,
  submissions,
  teachers,
} from '@/data/seed'
import type { Guardian, Role, Student, Teacher } from '@/types'

/**
 * One person, from the school admin's side.
 *
 * The Users table listed a hundred and forty one students and opened none of
 * them, and the class roster did the same, so the directory was a list with no
 * second page. A teacher could open a student and an administrator could not,
 * which is backwards for the person who manages the accounts.
 *
 * ONE ROUTE, THREE SHAPES. A teacher and a parent are not students with
 * different fields: a teacher has classes, a usage figure and a marking queue,
 * a parent has children and almost nothing else. Giving all three the same
 * layout would have produced the generic field list that nobody recognises as
 * a screen, so the role picks the sections.
 *
 * WHAT AN ADMIN SEES. Administration first, then a performance summary, then a
 * link across to the teacher's view for the real detail. The line between them
 * is deliberate: this screen answers "is this account set up correctly and is
 * this child broadly fine", and the teacher's screen answers "what has this
 * child actually done". An admin screen that reproduced the second would be a
 * second marking record kept by somebody who does not mark.
 *
 * THE AGE RULE HOLDS HERE. LMS-22 says K1 to Grade 3 never sees a percentage
 * and never sees "at risk", and that is not only about what the child sees. An
 * administrator reading a six year old's average as a number is one meeting
 * away from a parent being shown the same number. The early tier gets stars
 * and completion, the same as the class roster and the child's own screens.
 */

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-b border-border py-2.5 last:border-0">
      <span className="text-small text-muted-foreground">{label}</span>
      <span className="min-w-0 text-small text-foreground">{children}</span>
    </div>
  )
}

function Stat({ label, value, note }: { label: string; value: ReactNode; note?: string }) {
  return (
    <div className="min-w-0">
      <p className="text-caption text-muted-foreground">{label}</p>
      <p className="tabular mt-0.5 text-subheading font-semibold text-foreground">{value}</p>
      {note ? <p className="mt-0.5 text-caption text-muted-foreground">{note}</p> : null}
    </div>
  )
}

/** A person's row in a list of linked people, on all three shapes. */
function PersonLink({
  id,
  name,
  sub,
}: {
  id: string
  name: string
  sub?: string
}) {
  return (
    <Link
      to={`/school-admin/users/${id}`}
      className="flex items-center gap-2.5 rounded px-2 py-2 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-muted text-caption font-semibold text-foreground">
        {initials(name)}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-small font-medium text-foreground">{name}</span>
        {sub ? <span className="block truncate text-caption text-muted-foreground">{sub}</span> : null}
      </span>
    </Link>
  )
}

export function SchoolAdminUserDetail() {
  const { userId } = useParams()
  const { t, locale } = useLocale()
  const school = schools.find((s) => s.id === DEFAULT_SCHOOL_ID)!

  const person = useMemo(
    () =>
      [...students, ...teachers, ...guardians].find((candidate) => candidate.id === userId) ??
      null,
    [userId],
  )

  const roleLabel: Record<Role, string> = {
    'super-admin': t('tabSuperAdmin'),
    'school-admin': t('tabSchoolAdmin'),
    coordinator: t('tabCoordinator'),
    teacher: t('tabTeacher'),
    student: t('tabStudent'),
    parent: t('tabParent'),
  }

  const back = (
    <Button variant="ghost" size="sm" asChild>
      <Link to="/school-admin/users">
        <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
        {t('admBackToUsers')}
      </Link>
    </Button>
  )

  /*
    A bad identifier in the address bar is a real state, not a crash.

    Somebody pastes a link to a person who has left, or a stale bookmark
    survives a term. It says what happened and offers the way back rather than
    rendering a page of blanks.
  */
  if (!person) {
    return (
      <Page>
        <PageHeader title={t('admPersonNotFound')} actions={back} />
        <Card>
          <CardContent className="p-5">
            <p className="text-small text-muted-foreground">{t('admPersonNotFoundBody')}</p>
          </CardContent>
        </Card>
      </Page>
    )
  }

  const fullName = `${person.firstName} ${person.lastName}`

  const accountCard = (
    <Card>
      <CardHeader>
        <CardTitle>{t('admAccount')}</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-3 pt-0">
        <Field label={t('admFieldEmail')}>{person.email}</Field>
        <Field label={t('admFieldRole')}>
          <Badge variant="outline">{roleLabel[person.role]}</Badge>
        </Field>
        <Field label={t('admFieldStatus')}>
          <Badge variant="neutral">{t('admStatusActive')}</Badge>
        </Field>
        <Field label={t('admFieldSeat')}>{t('admSeatUsed')}</Field>
        <Field label={t('admFieldLastActive')}>
          {person.lastActiveOn ? t('admFeb10') : t('admNever')}
        </Field>
        {/* The identifier is data and never translates, so it stays as it is. */}
        <Field label={t('admFieldId')}>
          <code className="font-mono text-caption text-muted-foreground">{person.id}</code>
        </Field>
      </CardContent>
    </Card>
  )

  return (
    <Page>
      <PageHeader
        title={fullName}
        subtitle={`${roleLabel[person.role]} · ${schoolName(school, locale)}`}
        actions={back}
      />

      {person.role === 'student' ? (
        <StudentShape person={person as Student} accountCard={accountCard} />
      ) : person.role === 'teacher' ? (
        <TeacherShape person={person as Teacher} accountCard={accountCard} />
      ) : (
        <ParentShape person={person as Guardian} accountCard={accountCard} />
      )}
    </Page>
  )
}

function StudentShape({ person, accountCard }: { person: Student; accountCard: ReactNode }) {
  const { t, locale } = useLocale()
  const school = schools.find((s) => s.id === DEFAULT_SCHOOL_ID)!
  const standing = standings.find((s) => s.studentId === person.id)
  const early = person.ageTier === 'early'

  const enrolledIn = person.classIds
    .map((id) => classes.find((group) => group.id === id))
    .filter((group): group is NonNullable<typeof group> => Boolean(group))

  const parents = person.guardianIds
    .map((id) => guardians.find((guardian) => guardian.id === id))
    .filter((guardian): guardian is Guardian => Boolean(guardian))

  const submitted = submissions.filter(
    (submission) => submission.studentId === person.id && submission.submittedOn !== null,
  ).length

  const days = attendance.filter((record) => record.studentId === person.id)
  const present = days.filter(
    (record) => record.state === 'present' || record.state === 'late',
  ).length

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('admPerformance')}</CardTitle>
            {/*
              The link across, which is the whole point of the division. This
              screen says whether the child is broadly fine; the teacher's
              screen says what they have done.
            */}
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/teacher/students/${person.id}`}>
                {t('admOpenTeacherView')}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {/*
                The early tier branch. Stars instead of an average and no status
                badge at all, because "at risk" is not a thing a six year old's
                record says on any screen in this product.
              */}
              {early ? (
                <Stat
                  label={t('colAverage')}
                  value={
                    <span aria-label={`${standing?.stars ?? 0} / 3`}>
                      {'★'.repeat(standing?.stars ?? 0)}
                      <span className="opacity-30" aria-hidden>
                        {'★'.repeat(3 - (standing?.stars ?? 0))}
                      </span>
                    </span>
                  }
                />
              ) : (
                <Stat label={t('colAverage')} value={`${standing?.average ?? 0}%`} />
              )}
              <Stat label={t('colCompletion')} value={`${standing?.completion ?? 0}%`} />
              <Stat
                label={t('admAttendanceRate')}
                value={days.length ? `${Math.round((present / days.length) * 100)}%` : '0%'}
                note={t('admDaysPresent')
                  .replace('{n}', String(present))
                  .replace('{m}', String(days.length))}
              />
              <Stat label={t('admSubmissionsThisTerm')} value={submitted} />
            </div>

            {!early && standing ? (
              <div className="flex flex-wrap items-center gap-3 border-t border-border pt-3">
                <StatusBadge status={standing.status} label={t(statusKey[standing.status])} />
                <span className="text-small text-muted-foreground">
                  {t(trendKey[standing.trend])}
                </span>
              </div>
            ) : null}

            <Progress
              value={standing?.completion ?? 0}
              label={t('colCompletion')}
              tone={early ? 'accent' : 'default'}
            />

            <p className="text-caption text-muted-foreground">
              {early ? t('admEarlyTierNote') : t('admAdminPerformanceNote')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('admEnrolment')}</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-3 pt-0">
            <Field label={t('admFieldClass')}>
              {enrolledIn.length > 0 ? (
                <span className="flex flex-wrap justify-end gap-2">
                  {enrolledIn.map((group) => (
                    <Link
                      key={group.id}
                      to={`/school-admin/classes/${group.id}`}
                      className="rounded text-small font-medium text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {groupName(group, locale)}
                    </Link>
                  ))}
                </span>
              ) : (
                t('noData')
              )}
            </Field>
            <Field label={t('admFieldAgeTier')}>
              {early ? t('admTierEarly') : t('admTierLater')}
            </Field>
            <Field label={t('admFieldSchool')}>{schoolName(school, locale)}</Field>
            <Field label={t('admFieldYear')}>{academicYear(school, locale)}</Field>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {accountCard}
        <Card>
          <CardHeader>
            <CardTitle>{t('admLinkedParents')}</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 pt-0">
            {parents.length > 0 ? (
              parents.map((guardian) => (
                <PersonLink
                  key={guardian.id}
                  id={guardian.id}
                  name={`${guardian.firstName} ${guardian.lastName}`}
                  sub={guardian.email}
                />
              ))
            ) : (
              <p className="px-2 py-2 text-small text-muted-foreground">
                {t('admNoParentsLinked')}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TeacherShape({ person, accountCard }: { person: Teacher; accountCard: ReactNode }) {
  const { t, locale } = useLocale()

  const taught = person.classIds
    .map((id) => classes.find((group) => group.id === id))
    .filter((group): group is NonNullable<typeof group> => Boolean(group))

  const studentCount = taught.reduce((total, group) => total + group.studentIds.length, 0)

  const classIds = new Set(taught.map((group) => group.id))
  const set = assignments.filter((assignment) => classIds.has(assignment.classId))
  const setIds = new Set(set.map((assignment) => assignment.id))
  const awaiting = submissions.filter(
    (submission) =>
      setIds.has(submission.assignmentId) && submission.state === 'needs-grading',
  ).length

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t('admWorkload')}</CardTitle>
          </CardHeader>
          <CardContent>
            {/*
              A teacher's figures are about load and not attainment. Nothing
              here is an assessment of them, which is a line worth keeping: a
              usage number read as a performance score is how a tool like this
              starts being resented.
            */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label={t('classesCount')} value={taught.length} />
              <Stat label={t('admStudentsTaught')} value={studentCount} />
              <Stat label={t('admAssignmentsSet')} value={set.length} />
              <Stat label={t('admAwaitingMarking')} value={awaiting} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('admClassesTaught')}</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 pt-0">
            {taught.length > 0 ? (
              taught.map((group) => (
                <Link
                  key={group.id}
                  to={`/school-admin/classes/${group.id}`}
                  className="flex items-center justify-between gap-3 rounded px-2 py-2.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="min-w-0 text-small font-medium text-foreground">
                    {groupName(group, locale)}
                  </span>
                  <span className="tabular flex-none text-caption text-muted-foreground">
                    {group.studentIds.length} {t('students')}
                  </span>
                </Link>
              ))
            ) : (
              <p className="px-2 py-2 text-small text-muted-foreground">{t('noData')}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {accountCard}
        <Card>
          <CardHeader>
            <CardTitle>{t('admAccess')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Stat
              label={t('admActiveDays')}
              value={`${person.activeDays} / 30`}
              note={t('admLast30Days')}
            />
            <Progress
              value={Math.round((person.activeDays / 30) * 100)}
              label={t('admActiveDays')}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ParentShape({ person, accountCard }: { person: Guardian; accountCard: ReactNode }) {
  const { t, locale } = useLocale()

  const children = person.childIds
    .map((id) => students.find((student) => student.id === id))
    .filter((student): student is Student => Boolean(student))

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4">
        {/*
          A parent page is short, and that is correct rather than unfinished.
          A parent has no work, no marks and no classes of their own: the only
          questions an administrator has are who they are, who they are linked
          to, and whether they have ever signed in.
        */}
        <Card>
          <CardHeader>
            <CardTitle>{t('admLinkedChildren')}</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pb-3 pt-0">
            {children.length > 0 ? (
              children.map((student) => {
                const group = classes.find((item) => item.id === student.classIds[0])
                return (
                  <PersonLink
                    key={student.id}
                    id={student.id}
                    name={`${student.firstName} ${student.lastName}`}
                    sub={group ? groupName(group, locale) : undefined}
                  />
                )
              })
            ) : (
              <p className="px-2 py-2 text-small text-muted-foreground">
                {t('admNoChildrenLinked')}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">{accountCard}</div>
    </div>
  )
}

const statusKey = {
  'on-track': 'onTrack',
  watch: 'watch',
  'at-risk': 'atRisk',
} as const

const trendKey = {
  rising: 'rising',
  steady: 'steady',
  falling: 'falling',
} as const
