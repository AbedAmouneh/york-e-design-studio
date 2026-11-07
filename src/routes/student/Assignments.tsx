import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarClock, Check, Clock } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { upperStudent, workFor } from '@/data/student'

/**
 * Assignments and due dates.
 *
 * Sorted by what is due soonest, with everything finished pushed below. The
 * tab order matters: To do first, because that is the only reason a student
 * opens this screen.
 *
 * Late work is marked but not punished in the language. The mark is a fact the
 * teacher acts on, not a scolding delivered by software.
 */

type Tab = 'todo' | 'handed-in' | 'marked'

export function StudentAssignments() {
  const { t, locale } = useLocale()
  const [tab, setTab] = useState<Tab>('todo')
  const all = workFor(upperStudent)

  const todo = all.filter(
    (item) => !item.submission || item.submission.state === 'not-started',
  )
  const handedIn = all.filter(
    (item) =>
      item.submission &&
      (item.submission.state === 'needs-grading' ||
        (item.submission.state === 'graded' && !item.submission.released)),
  )
  const marked = all.filter(
    (item) => item.submission?.released && item.submission.score !== null,
  )

  const tabs: Array<{ key: Tab; label: string; count: number }> = [
    { key: 'todo', label: t('stuTabTodo'), count: todo.length },
    { key: 'handed-in', label: t('stuTabHandedIn'), count: handedIn.length },
    { key: 'marked', label: t('stuTabMarked'), count: marked.length },
  ]

  const rows = tab === 'todo' ? todo : tab === 'handed-in' ? handedIn : marked

  return (
    <Page>
      <PageHeader
        title={t('navAssignments')}
        subtitle={t('stuAssignmentsSubtitle').replace('{n}', String(todo.length))}
      />

      <div className="flex flex-wrap items-center gap-1 rounded border border-border p-0.5">
        {tabs.map((item) => (
          <Button
            key={item.key}
            variant={tab === item.key ? 'outline' : 'ghost'}
            size="sm"
            onClick={() => setTab(item.key)}
          >
            {item.label}
            <Badge variant="neutral" className="ms-1.5">
              {item.count}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {rows.map((item) => {
          const score = item.submission?.score
          const late = item.submission?.late
          return (
            <Card key={item.assignment.id}>
              <CardContent className="flex flex-wrap items-center gap-4 p-4">
                <span className="min-w-[180px] flex-1 leading-tight">
                  <span className="block text-small font-medium text-foreground">
                    {item.activity
                      ? locale === 'ar'
                        ? item.activity.titleAr
                        : item.activity.title
                      : t('stuActivity')}
                  </span>
                  <span className="block text-caption text-muted-foreground">
                    {item.course
                      ? locale === 'ar'
                        ? item.course.titleAr
                        : item.course.title
                      : ''}
                  </span>
                </span>

                <span className="flex flex-none items-center gap-1.5 text-caption text-muted-foreground">
                  <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                  {t('stuDueOn').replace('{d}', item.assignment.dueOn)}
                </span>

                {late ? (
                  <Badge variant="warning" className="flex-none">
                    <Clock className="me-1 h-3 w-3" aria-hidden />
                    {t('stuHandedInLate')}
                  </Badge>
                ) : null}

                {tab === 'todo' ? (
                  <Button variant="accent" size="sm" className="flex-none" asChild>
                    <Link to={`/student/quiz/${item.assignment.id}`}>{t('start')}</Link>
                  </Button>
                ) : tab === 'handed-in' ? (
                  <Badge variant="outline" className="flex-none">
                    <Check className="me-1 h-3 w-3" aria-hidden />
                    {t('stuWithYourTeacher')}
                  </Badge>
                ) : (
                  <span className="flex flex-none items-center gap-3">
                    <span
                      className={cn(
                        'tabular text-small font-semibold',
                        (score ?? 0) >= 75
                          ? 'text-success'
                          : (score ?? 0) >= 60
                            ? 'text-foreground'
                            : 'text-danger',
                      )}
                    >
                      {score}%
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/student/quiz/${item.assignment.id}/results`}>
                        {t('stuSeeFeedback')}
                      </Link>
                    </Button>
                  </span>
                )}
              </CardContent>
            </Card>
          )
        })}

        {rows.length === 0 ? (
          <p className="py-12 text-center text-small text-muted-foreground">
            {tab === 'todo' ? t('stuNothingToDo') : t('stuNothingHereYet')}
          </p>
        ) : null}
      </div>
    </Page>
  )
}
