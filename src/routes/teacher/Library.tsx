import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, FileQuestion, PenLine, Play, Shapes } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/input'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { courses, skills, subjects } from '@/data/seed'
import { teacherClasses } from '@/data/teacher'

/**
 * Content library, which is search across every course the teacher can reach
 * rather than inside one.
 *
 * This is the screen Patrick pushed back on for students and asked for on the
 * teacher side. A teacher browsing everything is a strength. A student
 * browsing everything undercuts the teacher's control of what the class sees,
 * so the student has no equivalent of this page.
 *
 * Searching by skill rather than by title is the part that only works if the
 * authoring metadata exists.
 */

const kindIcon = {
  lesson: Play,
  'interactive-book': BookOpen,
  quiz: FileQuestion,
  manipulative: Shapes,
  assignment: PenLine,
} as const

type Facet = 'all' | 'lesson' | 'quiz' | 'manipulative' | 'assignment' | 'interactive-book'

export function TeacherLibrary() {
  const { locale } = useLocale()
  const [query, setQuery] = useState('')
  const [facet, setFacet] = useState<Facet>('all')
  const [subjectId, setSubjectId] = useState('all')

  const reachable = useMemo(() => {
    const courseIds = new Set(teacherClasses.flatMap((item) => item.courseIds))
    return courses.filter((course) => courseIds.has(course.id))
  }, [])

  const results = useMemo(() => {
    const rows = reachable.flatMap((course) =>
      course.units.flatMap((unit) =>
        unit.activities.map((activity) => {
          const activitySkills = activity.skillIds
            .map((id) => skills.find((skill) => skill.id === id))
            .filter(Boolean)
          return { activity, unit, course, activitySkills }
        }),
      ),
    )

    return rows
      .filter((row) => (facet === 'all' ? true : row.activity.kind === facet))
      .filter((row) => (subjectId === 'all' ? true : row.course.subjectId === subjectId))
      .filter((row) => {
        if (!query) return true
        const haystack = [
          row.activity.title,
          row.unit.title,
          row.course.title,
          ...row.activitySkills.map((skill) => skill?.name ?? ''),
        ]
          .join(' ')
          .toLowerCase()
        return haystack.includes(query.toLowerCase())
      })
      .slice(0, 40)
  }, [reachable, query, facet, subjectId])

  const facets: Array<{ key: Facet; label: string }> = [
    { key: 'all', label: 'Everything' },
    { key: 'lesson', label: 'Lessons' },
    { key: 'interactive-book', label: 'Books' },
    { key: 'quiz', label: 'Quizzes' },
    { key: 'manipulative', label: 'Manipulatives' },
    { key: 'assignment', label: 'Assignments' },
  ]

  return (
    <Page>
      <PageHeader
        title="Content library"
        subtitle="Search every course you teach, by title or by skill"
      />

      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="max-w-xl">
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try a skill, such as common denominators"
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

            <div className="ms-auto flex flex-wrap items-center gap-1">
              <Button
                variant={subjectId === 'all' ? 'outline' : 'ghost'}
                size="sm"
                onClick={() => setSubjectId('all')}
              >
                All subjects
              </Button>
              {subjects
                .filter((subject) => reachable.some((c) => c.subjectId === subject.id))
                .map((subject) => (
                  <Button
                    key={subject.id}
                    variant={subjectId === subject.id ? 'outline' : 'ghost'}
                    size="sm"
                    onClick={() => setSubjectId(subject.id)}
                  >
                    {locale === 'ar' ? subject.nameAr : subject.name}
                  </Button>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">
        {results.length} results across {reachable.length} courses
      </p>

      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {results.map(({ activity, unit, course, activitySkills }) => {
          const Icon = kindIcon[activity.kind]
          return (
            <div
              key={`${course.id}-${activity.id}`}
              className="flex flex-col gap-3 rounded border border-border bg-background p-4"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 flex-none place-items-center rounded bg-muted">
                  <Icon className="h-4 w-4 text-foreground" aria-hidden />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-small font-medium text-foreground">
                    {locale === 'ar' ? activity.titleAr : activity.title}
                  </span>
                  <span className="block truncate text-caption text-muted-foreground">
                    {locale === 'ar' ? course.titleAr : course.title} · {unit.title}
                  </span>
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {activitySkills.length ? (
                  activitySkills.map((skill) => (
                    <Badge key={skill?.id} variant="neutral">
                      {skill ? (locale === 'ar' ? skill.nameAr : skill.name) : ''}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline">Not tagged</Badge>
                )}
              </div>

              <div className={cn('mt-auto flex gap-2')}>
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to="/teacher/assign">Assign</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/teacher/classes/${teacherClasses[1].id}/course/${course.id}`}>
                    Open
                  </Link>
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {results.length === 0 ? (
        <p className="py-12 text-center text-small text-muted-foreground">
          Nothing matches. Try a skill name rather than a title.
        </p>
      ) : null}
    </Page>
  )
}
