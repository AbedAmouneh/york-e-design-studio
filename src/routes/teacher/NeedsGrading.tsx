import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Sparkles } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { needsGradingQueue, teacherClasses } from '@/data/teacher'

/**
 * Needs grading.
 *
 * Ordered by how long the oldest piece has waited, not alphabetically and not
 * by due date. The ordering is the whole product decision here: a teacher
 * opens this screen to be told what to mark next, and any order that makes her
 * choose has failed.
 */
export function TeacherNeedsGrading() {
  const { t, locale } = useLocale()
  const [classFilter, setClassFilter] = useState<string>('all')

  const queue = needsGradingQueue().filter((item) =>
    classFilter === 'all' ? true : item.assignment.classId === classFilter,
  )

  const totalWaiting = queue.reduce((sum, item) => sum + item.waiting, 0)
  const oldest = queue[0]

  return (
    <Page>
      <PageHeader
        title={t('navNeedsGrading')}
        subtitle={t('tchNeedsGradingSubtitle')
          .replace('{n}', String(totalWaiting))
          .replace('{m}', String(queue.length))}
      />

      {oldest ? (
        <Card className="border-accent/40">
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <span className="min-w-0 flex-1">
              <span className="block text-small font-medium text-foreground">
                {t('tchStartHere').replace(
                  '{t}',
                  (locale === 'ar' ? oldest.activity?.titleAr : oldest.activity?.title) ?? '',
                )}
              </span>
              <span className="block text-caption text-muted-foreground">
                {t('tchOldestLine')
                  .replace('{c}', oldest.classGroup?.name ?? '')
                  .replace('{n}', String(oldest.waiting))
                  .replace('{d}', String(oldest.oldestDays))}
              </span>
            </span>
            <Button variant="accent" size="sm" asChild>
              <Link to={`/teacher/grading/${oldest.assignment.id}`}>{t('tchMarkNow')}</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="flex flex-wrap items-center gap-1 rounded border border-border p-0.5">
        <Button
          variant={classFilter === 'all' ? 'outline' : 'ghost'}
          size="sm"
          onClick={() => setClassFilter('all')}
        >
          {t('allClasses')}
        </Button>
        {teacherClasses.map((item) => (
          <Button
            key={item.id}
            variant={classFilter === item.id ? 'outline' : 'ghost'}
            size="sm"
            onClick={() => setClassFilter(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('tchQueue')}</CardTitle>
          <Badge variant="outline">{queue.length}</Badge>
        </CardHeader>
        <CardContent className="space-y-1.5">
          {queue.map((item) => (
            <Link
              key={item.assignment.id}
              to={`/teacher/grading/${item.assignment.id}`}
              className="flex flex-wrap items-center gap-4 rounded border border-border px-4 py-3 transition-colors hover:bg-surface"
            >
              <span className="min-w-[200px] flex-1 leading-tight">
                <span className="block truncate text-small font-medium text-foreground">
                  {item.activity
                    ? locale === 'ar'
                      ? item.activity.titleAr
                      : item.activity.title
                    : t('colActivity')}
                </span>
                <span className="block truncate text-caption text-muted-foreground">
                  {item.classGroup?.name} · {t('tchDueOn').replace('{d}', item.assignment.dueOn)}
                </span>
              </span>

              {item.activity?.kind === 'quiz' ? (
                <Badge variant="outline" className="flex-none">
                  <Sparkles className="me-1 h-3 w-3" aria-hidden />
                  {t('tchAutoMarked')}
                </Badge>
              ) : (
                <Badge variant="outline" className="flex-none">
                  {t('tchMarkedByHand')}
                </Badge>
              )}

              <span
                className={cn(
                  'flex flex-none items-center gap-1.5 text-caption',
                  item.oldestDays >= 5 ? 'font-semibold text-warning' : 'text-muted-foreground',
                )}
              >
                <Clock className="h-3.5 w-3.5" aria-hidden />
                {t('tchWaitingDays').replace('{d}', String(item.oldestDays))}
              </span>

              <span className="tabular w-16 flex-none text-end text-small font-semibold text-foreground">
                {item.waiting}
              </span>
            </Link>
          ))}

          {queue.length === 0 ? (
            <p className="py-10 text-center text-small text-muted-foreground">
              {t('tchQueueClearClass')}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">{t('tchNeedsGradingNote')}</p>
    </Page>
  )
}
