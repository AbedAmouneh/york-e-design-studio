import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BookOpen,
  FileQuestion,
  PenLine,
  Play,
  Shapes,
} from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useLocale } from '@/lib/i18n'
import { groupName } from '@/lib/names'
import { cn, formatDate } from '@/lib/utils'
import { courses, skills } from '@/data/seed'
import { activityById, assignmentsForClass, classById } from '@/data/teacher'
import type { Activity, Assignment, Skill } from '@/types'

/**
 * Search inside one course.
 *
 * This is not the content library and the difference is the whole point. The
 * library answers "what exists anywhere", which is a planning question asked
 * at a desk. This answers "where in this course did we cover that", which is
 * asked out loud, mid lesson, when a student remembers something from three
 * weeks ago and the teacher has thirty faces waiting.
 *
 * So the results are grouped by unit rather than ranked. The position in the
 * sequence is the answer she actually wants: knowing it was Unit 2 tells her
 * what the class had already met by then, and the library's flat card grid
 * throws that away.
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

type Facet = 'all' | 'lesson' | 'quiz' | 'manipulative' | 'assignment' | 'interactive-book'

interface Hit {
  activity: Activity
  activitySkills: Skill[]
  assignment: Assignment | undefined
  /** Whether the query landed on a skill name rather than on a title. */
  viaSkill: boolean
}

export function TeacherCourseSearch() {
  const { classId = '', courseId = '' } = useParams()
  const { t, locale } = useLocale()

  const [query, setQuery] = useState('')
  const [facet, setFacet] = useState<Facet>('all')
  const [assignedOnly, setAssignedOnly] = useState(false)

  const course = courses.find((item) => item.id === courseId)
  const classGroup = classById(classId)

  /*
   * A class carries assignments from every course it takes, so an activity id
   * has to be resolved back to its unit before we can tell which assignments
   * belong to the course on screen. Keyed by activity so a row can answer
   * "have I already given this out" in one lookup rather than a scan.
   */
  const assignedHere = useMemo(() => {
    const unitIds = new Set(course?.units.map((unit) => unit.id) ?? [])
    const map = new Map<string, Assignment>()
    for (const assignment of assignmentsForClass(classId)) {
      const activity = activityById(assignment.activityId)
      if (!activity || !unitIds.has(activity.unitId)) continue
      map.set(activity.id, assignment)
    }
    return map
  }, [course, classId])

  /*
   * Both languages are searched whatever the interface language, because a
   * bilingual teacher types whichever word came to mind first and should not
   * have to switch the whole screen to Arabic to find an Arabic title.
   */
  const groups = useMemo(() => {
    if (!course) return []
    const needle = query.trim().toLowerCase()

    return course.units
      .map((unit) => {
        const hits: Hit[] = unit.activities
          .filter((activity) => (facet === 'all' ? true : activity.kind === facet))
          .filter((activity) => (assignedOnly ? assignedHere.has(activity.id) : true))
          .map((activity) => {
            const activitySkills = activity.skillIds
              .map((id) => skills.find((skill) => skill.id === id))
              .filter(Boolean) as Skill[]
            const skillText = activitySkills
              .map((skill) => `${skill.name} ${skill.nameAr}`)
              .join(' ')
              .toLowerCase()

            return {
              activity,
              activitySkills,
              assignment: assignedHere.get(activity.id),
              // Tracked rather than discarded so the row can say why it is
              // here. A teacher who sees a skill match once learns that skill
              // search exists, which no amount of placeholder text teaches.
              viaSkill: needle.length > 0 && skillText.includes(needle),
            }
          })
          .filter((hit) => {
            if (!needle) return true
            const titleText = [
              hit.activity.title,
              hit.activity.titleAr,
              unit.title,
              unit.titleAr,
            ]
              .join(' ')
              .toLowerCase()
            return hit.viaSkill || titleText.includes(needle)
          })

        return { unit, hits }
      })
      .filter((group) => group.hits.length > 0)
  }, [course, query, facet, assignedOnly, assignedHere])

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

  const total = groups.reduce((count, group) => count + group.hits.length, 0)
  const courseTitle = locale === 'ar' ? course.titleAr : course.title

  const facets: Array<{ key: Facet; label: string }> = [
    { key: 'all', label: t('tchFacetEverything') },
    { key: 'lesson', label: t('tchFacetLessons') },
    { key: 'interactive-book', label: t('tchFacetBooks') },
    { key: 'quiz', label: t('tchFacetQuizzes') },
    { key: 'manipulative', label: t('tchFacetManipulatives') },
    { key: 'assignment', label: t('tchFacetAssignments') },
  ]

  return (
    <Page>
      <PageHeader
        title={t('tchCourseSearchTitle')}
        subtitle={t('tchCourseSearchSubtitle')
          .replace('{c}', courseTitle)
          .replace('{g}', groupName(classGroup, locale))}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/teacher/classes/${classId}/course/${courseId}`}>
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('tchBackToCourse')}
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="max-w-xl">
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('tchCourseSearchPlaceholder')}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-1">
              {facets.map((item) => (
                <Button
                  key={item.key}
                  variant={facet === item.key ? 'outline' : 'ghost'}
                  size="sm"
                  onClick={() => setFacet(item.key)}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            <label className="ms-auto flex cursor-pointer items-center gap-3">
              <span className="text-end leading-tight">
                <span className="block text-small text-foreground">{t('tchOnlyAssigned')}</span>
                <span className="block text-caption text-muted-foreground">
                  {t('tchOnlyAssignedHint')}
                </span>
              </span>
              <Switch checked={assignedOnly} onCheckedChange={setAssignedOnly} />
            </label>
          </div>
        </CardContent>
      </Card>

      {/*
        The scope line is not a disclaimer. A teacher who searches here, finds
        nothing and concludes the activity does not exist has been misled by
        the screen, so the way out sits next to the count rather than buried.
      */}
      <p className="text-caption text-muted-foreground">
        {query.trim()
          ? t('tchCourseSearchCount')
              .replace('{n}', String(total))
              .replace('{m}', String(groups.length))
          : t('tchCourseSearchAllShown')}{' '}
        {t('tchCourseSearchScope')}{' '}
        <Link to="/teacher/library" className="font-medium text-foreground underline">
          {t('tchSearchEveryCourse')}
        </Link>
      </p>

      <div className="space-y-2">
        {groups.map(({ unit, hits }) => (
          <Card key={unit.id}>
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-small font-semibold text-foreground">
                  {locale === 'ar' ? unit.titleAr : unit.title}
                </span>
                <span className="block text-caption text-muted-foreground">
                  {t('tchUnitPosition')
                    .replace('{n}', String(unit.order))
                    .replace('{m}', String(course.units.length))}
                </span>
              </span>
              <Badge variant="outline" className="flex-none">
                {t('tchNMatchesInUnit').replace('{n}', String(hits.length))}
              </Badge>
            </div>

            <CardContent className="space-y-1 pt-3">
              {hits.map(({ activity, activitySkills, assignment, viaSkill }) => {
                const Icon = kindIcon[activity.kind]
                return (
                  <div
                    key={activity.id}
                    className="flex flex-wrap items-center gap-3 rounded border border-transparent px-3 py-2.5 transition-colors hover:border-border hover:bg-surface"
                  >
                    <Icon className="h-4 w-4 flex-none text-muted-foreground" aria-hidden />

                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block truncate text-small text-foreground">
                        {locale === 'ar' ? activity.titleAr : activity.title}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-1.5">
                        <Badge variant="outline">{t(kindKey[activity.kind])}</Badge>
                        {activitySkills.length ? (
                          activitySkills.map((skill) => (
                            <Badge key={skill.id} variant="neutral">
                              {locale === 'ar' ? skill.nameAr : skill.name}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline">{t('tchNotTagged')}</Badge>
                        )}
                        {viaSkill ? (
                          <span className="text-caption text-muted-foreground">
                            {t('tchMatchedOnSkill')}
                          </span>
                        ) : null}
                      </span>
                    </span>

                    <span className="flex-none text-end leading-tight">
                      {assignment ? (
                        <>
                          <Badge variant="success">{t('tchAlreadyAssigned')}</Badge>
                          <span className="mt-1 block text-caption text-muted-foreground">
                            {t('tchDueOn').replace('{d}', formatDate(assignment.dueOn, locale))}
                          </span>
                        </>
                      ) : (
                        <span className="text-caption text-muted-foreground">
                          {t('tchNotAssignedYet')}
                        </span>
                      )}
                    </span>

                    <span className={cn('flex flex-none gap-2')}>
                      {/*
                        The activity id travels with the link so the course
                        browser can land on the row rather than on the top of
                        Unit 1, which is where she just came from.
                      */}
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          to={`/teacher/classes/${classId}/course/${courseId}?activity=${activity.id}`}
                        >
                          {t('open')}
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/teacher/assign?class=${classId}`}>{t('tchAssign')}</Link>
                      </Button>
                    </span>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      {groups.length === 0 ? (
        <Card>
          <CardContent className="space-y-3 p-8 text-center">
            <p className="text-small text-foreground">{t('tchNoCourseSearchMatch')}</p>
            <Button variant="outline" size="sm" asChild>
              <Link to="/teacher/library">{t('tchSearchEveryCourse')}</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <p className="text-caption text-muted-foreground">{t('tchCourseSearchNote')}</p>
    </Page>
  )
}
