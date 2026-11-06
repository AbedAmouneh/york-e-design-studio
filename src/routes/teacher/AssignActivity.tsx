import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Check, Search } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input, SearchInput } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { coursesForClass, studentsInClass, teacherClasses, fullName } from '@/data/teacher'

/**
 * Flow 7 of 8: assign an activity.
 *
 * Four steps because four decisions are genuinely being made: what, to whom,
 * when, and under what rules. The rules step is where the LMS-22 settings
 * live, and it carries the consequence of each choice in plain words rather
 * than leaving a teacher to work out what manual release means.
 *
 * Assigning to a subset of a class is in the first class of citizens here,
 * not an advanced option, because differentiated practice is the single most
 * common reason a teacher assigns anything twice.
 */

type Step = 'what' | 'who' | 'when' | 'done'

export function TeacherAssignActivity() {
  const [params] = useSearchParams()
  const { locale } = useLocale()

  const [step, setStep] = useState<Step>('what')
  const [classId, setClassId] = useState(params.get('class') ?? teacherClasses[1].id)
  const [activityId, setActivityId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [wholeClass, setWholeClass] = useState(true)
  const [studentIds, setStudentIds] = useState<Set<string>>(new Set())
  const [dueOn, setDueOn] = useState('2027-02-19')
  const [attempts, setAttempts] = useState(1)
  const [release, setRelease] = useState<'immediate' | 'manual'>('manual')
  const [showSolutions, setShowSolutions] = useState(false)
  const [graded, setGraded] = useState(true)

  const classGroup = teacherClasses.find((item) => item.id === classId)!
  const early = classGroup.ageTier === 'early'
  const members = studentsInClass(classId)

  const candidates = useMemo(() => {
    const list = coursesForClass(classId).flatMap((course) =>
      course.units.flatMap((unit) =>
        unit.activities.map((activity) => ({ activity, unit, course })),
      ),
    )
    if (!query) return list.slice(0, 14)
    return list
      .filter((item) =>
        `${item.activity.title} ${item.unit.title} ${item.course.title}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
      .slice(0, 14)
  }, [classId, query])

  const chosen = candidates.find((item) => item.activity.id === activityId)

  const steps: Array<{ key: Step; label: string }> = [
    { key: 'what', label: 'What' },
    { key: 'who', label: 'Who' },
    { key: 'when', label: 'When and how' },
    { key: 'done', label: 'Done' },
  ]
  const activeIndex = steps.findIndex((item) => item.key === step)
  const recipients = wholeClass ? members.length : studentIds.size

  return (
    <Page>
      <PageHeader
        title="Assign an activity"
        subtitle={classGroup.name}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/teacher/classes/${classId}`}>
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              Back to the class
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

      {step === 'what' ? (
        <Card>
          <CardHeader>
            <CardTitle>Choose the activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-wrap items-center gap-1 rounded border border-border p-0.5">
                {teacherClasses.map((item) => (
                  <Button
                    key={item.id}
                    variant={item.id === classId ? 'outline' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      setClassId(item.id)
                      setActivityId(null)
                      setStudentIds(new Set())
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
              <div className="w-full max-w-[260px]">
                <SearchInput
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the course"
                />
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              {candidates.map(({ activity, unit, course }) => (
                <button
                  key={activity.id}
                  type="button"
                  onClick={() => setActivityId(activity.id)}
                  className={cn(
                    'flex items-start gap-3 rounded border p-3 text-start transition-colors',
                    activityId === activity.id
                      ? 'border-foreground bg-surface'
                      : 'border-border hover:bg-surface',
                  )}
                >
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-small font-medium text-foreground">
                      {locale === 'ar' ? activity.titleAr : activity.title}
                    </span>
                    <span className="block truncate text-caption text-muted-foreground">
                      {locale === 'ar' ? course.titleAr : course.title} · {unit.title}
                    </span>
                  </span>
                  <Badge variant="outline" className="flex-none capitalize">
                    {activity.kind.replace('-', ' ')}
                  </Badge>
                </button>
              ))}
              {candidates.length === 0 ? (
                <p className="col-span-full flex items-center gap-2 py-8 text-small text-muted-foreground">
                  <Search className="h-4 w-4" aria-hidden />
                  Nothing matches that in this class's courses.
                </p>
              ) : null}
            </div>

            <div className="flex justify-end">
              <Button
                variant="accent"
                size="sm"
                disabled={!activityId}
                onClick={() => setStep('who')}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'who' ? (
        <Card>
          <CardHeader>
            <CardTitle>Who gets it</CardTitle>
            <Badge variant="outline">{recipients} students</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setWholeClass(true)}
                className={cn(
                  'flex-1 rounded border px-4 py-3 text-start text-small transition-colors',
                  wholeClass
                    ? 'border-foreground bg-surface text-foreground'
                    : 'border-border text-muted-foreground hover:bg-surface',
                )}
              >
                The whole class
                <span className="mt-0.5 block text-caption text-muted-foreground">
                  All {members.length} students in {classGroup.name}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setWholeClass(false)}
                className={cn(
                  'flex-1 rounded border px-4 py-3 text-start text-small transition-colors',
                  !wholeClass
                    ? 'border-foreground bg-surface text-foreground'
                    : 'border-border text-muted-foreground hover:bg-surface',
                )}
              >
                Some students
                <span className="mt-0.5 block text-caption text-muted-foreground">
                  For reteaching or extension, without the rest of the class seeing it
                </span>
              </button>
            </div>

            {!wholeClass ? (
              <div className="max-h-[300px] space-y-0.5 overflow-y-auto rounded border border-border p-2">
                {members.map((student) => (
                  <label
                    key={student.id}
                    className="flex cursor-pointer items-center gap-3 rounded px-2 py-1.5 transition-colors hover:bg-surface"
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
                    <span className="text-small text-foreground">{fullName(student)}</span>
                  </label>
                ))}
              </div>
            ) : null}

            <div className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => setStep('what')}>
                Back
              </Button>
              <Button
                variant="accent"
                size="sm"
                disabled={recipients === 0}
                onClick={() => setStep('when')}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'when' ? (
        <Card>
          <CardHeader>
            <CardTitle>When and how it is marked</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-small font-medium text-foreground">Due</span>
                <Input
                  type="date"
                  value={dueOn}
                  onChange={(event) => setDueOn(event.target.value)}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-small font-medium text-foreground">Attempts allowed</span>
                <Input
                  type="number"
                  min={1}
                  max={5}
                  value={attempts}
                  onChange={(event) => setAttempts(Number(event.target.value) || 1)}
                />
              </label>
            </div>

            <label className="flex items-center justify-between gap-4 rounded border border-border px-4 py-3">
              <span className="min-w-0 text-small text-foreground">
                This counts towards the grade
                <span className="mt-0.5 block text-caption text-muted-foreground">
                  Off makes it practice. It still appears in progress, but never in the gradebook.
                </span>
              </span>
              <Switch checked={graded} onCheckedChange={setGraded} />
            </label>

            <div className="space-y-2">
              <span className="text-small font-medium text-foreground">
                When students see their result
              </span>
              {(
                [
                  {
                    key: 'immediate',
                    label: 'As soon as it is marked',
                    hint: 'Good for self marking quizzes where the feedback is the point.',
                  },
                  {
                    key: 'manual',
                    label: 'When I release it',
                    hint: 'Nothing is visible until you choose, so the class sees results together.',
                  },
                ] as const
              ).map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setRelease(option.key)}
                  className={cn(
                    'flex w-full flex-col rounded border px-4 py-3 text-start transition-colors',
                    release === option.key
                      ? 'border-foreground bg-surface'
                      : 'border-border hover:bg-surface',
                  )}
                >
                  <span className="text-small text-foreground">{option.label}</span>
                  <span className="mt-0.5 text-caption text-muted-foreground">{option.hint}</span>
                </button>
              ))}
            </div>

            <label className="flex items-center justify-between gap-4 rounded border border-border px-4 py-3">
              <span className="min-w-0 text-small text-foreground">
                Show the worked solution after the last attempt
                <span className="mt-0.5 block text-caption text-muted-foreground">
                  Off keeps the questions usable for a retake or a different class.
                </span>
              </span>
              <Switch checked={showSolutions} onCheckedChange={setShowSolutions} />
            </label>

            {early ? (
              <p className="rounded border border-learner-primary/30 bg-learner-surface px-4 py-3 text-small text-foreground">
                This is a K1 to Grade 3 class. Whatever you choose here, the children see stars and
                a completion message, never a percentage.
              </p>
            ) : null}

            <div className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => setStep('who')}>
                Back
              </Button>
              <Button variant="accent" size="sm" onClick={() => setStep('done')}>
                Assign to {recipients} students
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'done' ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-success-tint">
              <Check className="h-5 w-5 text-success" aria-hidden />
            </span>
            <p className="text-subheading font-semibold text-foreground">
              {chosen ? chosen.activity.title : 'Activity'} assigned
            </p>
            <p className="max-w-[56ch] text-small text-muted-foreground">
              {recipients} students in {classGroup.name}, due {dueOn}, {attempts} attempt
              {attempts > 1 ? 's' : ''}.{' '}
              {release === 'manual'
                ? 'Results are held until you release them.'
                : 'Results appear as soon as the work is marked.'}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Button variant="accent" size="sm" asChild>
                <Link to={`/teacher/classes/${classId}`}>Back to the class</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => setStep('what')}>
                Assign another
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </Page>
  )
}
