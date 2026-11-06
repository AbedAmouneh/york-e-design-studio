import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  FileQuestion,
  PenLine,
  Play,
  Shapes,
} from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { courses, skills } from '@/data/seed'
import { classById } from '@/data/teacher'
import type { Activity } from '@/types'

/**
 * Course content browser.
 *
 * The teacher's view of a course is not the student's. She is scanning for
 * something to assign, so every row carries what it is, how long it takes and
 * which skill it covers, and the preview is a panel rather than a new page so
 * she can look at six things without losing her place.
 */

const kindIcon = {
  lesson: Play,
  'interactive-book': BookOpen,
  quiz: FileQuestion,
  manipulative: Shapes,
  assignment: PenLine,
} as const

export function TeacherCoursePlayer() {
  const { classId = '', courseId = '' } = useParams()
  const { t, locale } = useLocale()

  const course = courses.find((item) => item.id === courseId)
  const classGroup = classById(classId)
  const [openUnit, setOpenUnit] = useState<string | null>(course?.units[0]?.id ?? null)
  const [preview, setPreview] = useState<Activity | null>(course?.units[0]?.activities[0] ?? null)

  if (!course) {
    return (
      <Page>
        <PageHeader title="Course not found" subtitle="It may not be assigned to this class." />
        <Button variant="outline" size="sm" asChild>
          <Link to="/teacher/classes">{t('navMyClasses')}</Link>
        </Button>
      </Page>
    )
  }

  const previewSkills = preview
    ? preview.skillIds.map((id) => skills.find((skill) => skill.id === id)).filter(Boolean)
    : []

  return (
    <Page>
      <PageHeader
        title={locale === 'ar' ? course.titleAr : course.title}
        subtitle={`${classGroup?.name ?? ''} · ${course.units.length} units`}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/teacher/classes/${classId}`}>
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              Back to the class
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="space-y-2">
          {course.units.map((unit) => {
            const open = openUnit === unit.id
            return (
              <Card key={unit.id}>
                <button
                  type="button"
                  onClick={() => setOpenUnit(open ? null : unit.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-start"
                >
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 flex-none text-muted-foreground transition-transform',
                      open ? 'rotate-0' : '-rotate-90 rtl:rotate-90',
                    )}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 text-small font-semibold text-foreground">
                    {locale === 'ar' ? unit.titleAr : unit.title}
                  </span>
                  <Badge variant="outline" className="flex-none">
                    {unit.activities.length} activities
                  </Badge>
                </button>

                {open ? (
                  <CardContent className="space-y-1 pt-0">
                    {unit.activities.map((activity) => {
                      const Icon = kindIcon[activity.kind]
                      const selected = preview?.id === activity.id
                      return (
                        <button
                          key={activity.id}
                          type="button"
                          onClick={() => setPreview(activity)}
                          className={cn(
                            'flex w-full items-center gap-3 rounded border px-3 py-2.5 text-start transition-colors',
                            selected
                              ? 'border-foreground bg-surface'
                              : 'border-transparent hover:bg-surface',
                          )}
                        >
                          <Icon className="h-4 w-4 flex-none text-muted-foreground" aria-hidden />
                          <span className="min-w-0 flex-1 truncate text-small text-foreground">
                            {locale === 'ar' ? activity.titleAr : activity.title}
                          </span>
                          {activity.graded ? (
                            <Badge variant="outline" className="flex-none">
                              {activity.points} marks
                            </Badge>
                          ) : (
                            <span className="flex-none text-caption text-muted-foreground">
                              Not graded
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </CardContent>
                ) : null}
              </Card>
            )
          })}
        </div>

        <Card className="h-fit lg:sticky lg:top-4">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            {preview ? (
              <Badge variant="outline" className="capitalize">
                {preview.kind.replace('-', ' ')}
              </Badge>
            ) : null}
          </CardHeader>
          <CardContent className="space-y-4">
            {preview ? (
              <>
                <div className="grid aspect-video place-items-center rounded border border-border bg-surface">
                  <span className="flex flex-col items-center gap-2 text-caption text-muted-foreground">
                    <Play className="h-6 w-6" aria-hidden />
                    {locale === 'ar' ? preview.titleAr : preview.title}
                  </span>
                </div>

                <div className="space-y-2 text-small">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Marks</span>
                    <span className="tabular text-foreground">
                      {preview.graded ? preview.points : 'Not graded'}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Expected time</span>
                    <span className="text-foreground">15 minutes</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Skills</span>
                    <span className="text-end text-foreground">
                      {previewSkills.length
                        ? previewSkills
                            .map((skill) =>
                              skill ? (locale === 'ar' ? skill.nameAr : skill.name) : '',
                            )
                            .join(', ')
                        : 'Not tagged'}
                    </span>
                  </div>
                </div>

                {previewSkills.length === 0 ? (
                  <p className="rounded border border-warning/40 bg-warning-tint px-3 py-2 text-caption text-warning">
                    Nothing tagged here, so this activity cannot feed the skill drill down or
                    adaptive practice. Tagging happens in the authoring platform.
                  </p>
                ) : null}

                <div className="flex gap-2">
                  <Button variant="accent" size="sm" className="flex-1" asChild>
                    <Link to={`/teacher/assign?class=${classId}`}>Assign</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/teacher/present">Present</Link>
                  </Button>
                </div>
              </>
            ) : (
              <p className="py-8 text-center text-small text-muted-foreground">
                Pick an activity to preview it.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}
