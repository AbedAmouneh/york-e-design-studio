import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  FileQuestion,
  PenLine,
  Play,
  Search,
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

const kindKey = {
  lesson: 'tchKindLesson',
  'interactive-book': 'tchKindInteractiveBook',
  quiz: 'tchKindQuiz',
  manipulative: 'tchKindManipulative',
  assignment: 'tchKindAssignment',
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
        <PageHeader title={t('tchCourseNotFound')} subtitle={t('tchCourseNotAssigned')} />
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
        subtitle={t('tchCourseSubtitle')
          .replace('{c}', classGroup?.name ?? '')
          .replace('{n}', String(course.units.length))}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/teacher/classes/${classId}/course/${courseId}/search`}>
                <Search className="h-3.5 w-3.5" aria-hidden />
                {t('tchSearchThisCourse')}
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/teacher/classes/${classId}`}>
                <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                {t('tchBackToClass')}
              </Link>
            </Button>
          </div>
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
                    {t('tchNActivities').replace('{n}', String(unit.activities.length))}
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
                              {t('tchNMarks').replace('{n}', String(activity.points))}
                            </Badge>
                          ) : (
                            <span className="flex-none text-caption text-muted-foreground">
                              {t('tchNotGraded')}
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
            <CardTitle>{t('tchPreview')}</CardTitle>
            {preview ? (
              <Badge variant="outline" className="capitalize">
                {t(kindKey[preview.kind])}
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
                    <span className="text-muted-foreground">{t('tchMarks')}</span>
                    <span className="tabular text-foreground">
                      {preview.graded ? preview.points : t('tchNotGraded')}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{t('tchExpectedTime')}</span>
                    <span className="text-foreground">{t('tch15Minutes')}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">{t('tchSkills')}</span>
                    <span className="text-end text-foreground">
                      {previewSkills.length
                        ? previewSkills
                            .map((skill) =>
                              skill ? (locale === 'ar' ? skill.nameAr : skill.name) : '',
                            )
                            .join(', ')
                        : t('tchNotTagged')}
                    </span>
                  </div>
                </div>

                {previewSkills.length === 0 ? (
                  <p className="rounded border border-warning/40 bg-warning-tint px-3 py-2 text-caption text-warning">
                    {t('tchNotTaggedWarning')}
                  </p>
                ) : null}

                <div className="flex gap-2">
                  <Button variant="accent" size="sm" className="flex-1" asChild>
                    <Link to={`/teacher/assign?class=${classId}`}>{t('tchAssign')}</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/teacher/present">{t('tchPresent')}</Link>
                  </Button>
                </div>
              </>
            ) : (
              <p className="py-8 text-center text-small text-muted-foreground">
                {t('tchPickActivityPreview')}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}
