import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CalendarClock, Mail, Star } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import {
  attendanceSummary,
  childById,
  children,
  classOfChild,
  earlySummary,
  fullNameOf,
  isEarly,
  pendingWorkFor,
  releasedWorkFor,
  standingOfChild,
} from '@/data/parent'

/**
 * One child, everything about them.
 *
 * Two things a parent is never shown anywhere in this role. Where their child
 * sits against the rest of the class, because that is a conversation for a
 * teacher and not a number on a dashboard. And the at risk flag, because the
 * school decides when and how a family is told that, in person.
 *
 * What replaces both is a plain sentence about what is going well and what to
 * help with at home, which is the thing a parent can actually act on.
 */
export function ParentChildOverview() {
  const { childId = '' } = useParams()
  const { locale } = useLocale()
  const child = childById(childId) ?? children[0]

  const standing = standingOfChild(child)
  const group = classOfChild(child)
  const early = isEarly(child)
  const due = pendingWorkFor(child)
  const marks = releasedWorkFor(child)
  const attendance = attendanceSummary(child)

  return (
    <Page>
      <PageHeader
        title={fullNameOf(child)}
        subtitle={`${group?.name} · Term 2, week 5`}
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link to="/parent/messages">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              Message the teacher
            </Link>
          </Button>
        }
      />

      {early ? (
        <Card className="border-accent/40">
          <CardContent className="flex flex-wrap items-center gap-4 p-4">
            <span className="flex flex-none gap-1">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    'h-7 w-7',
                    star <= (standing?.stars ?? 1)
                      ? 'fill-accent text-accent'
                      : 'fill-muted text-border-strong',
                  )}
                  aria-hidden
                />
              ))}
            </span>
            <span className="min-w-0 flex-1 text-small text-foreground">
              {earlySummary(child)} In class they see stars like these, never a score.
            </span>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {early ? (
          <StatCard label="Work finished" value={`${standing?.completion}%`} />
        ) : (
          <StatCard label="Average this term" value={`${standing?.average}%`} />
        )}
        <StatCard label="Marks released" value={String(marks.length)} />
        <StatCard label="Due soon" value={String(due.length)} emphasis={due.length > 2} />
        <StatCard
          label="Days present"
          value={`${attendance.present} of ${attendance.total}`}
          emphasis={attendance.absent > 1}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How {child.firstName} is getting on</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded border border-success/30 bg-success-tint px-4 py-3">
            <p className="text-caption font-medium uppercase tracking-wide text-success">
              Going well
            </p>
            <p className="mt-1 text-small text-foreground">
              {early
                ? 'Counting in tens and reading aloud. They finished everything set this week.'
                : 'Place value and common denominators. Work is handed in on time.'}
            </p>
          </div>

          <div className="rounded border border-border bg-surface px-4 py-3">
            <p className="text-caption font-medium uppercase tracking-wide text-muted-foreground">
              Worth a bit of help at home
            </p>
            <p className="mt-1 text-small text-foreground">
              {early
                ? 'Counting past 100. Practising out loud on the way to school is plenty.'
                : 'Adding fractions with different denominators. Ten minutes of practice would help.'}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Coming up</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/parent/child/${child.id}/work`}>See all</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {due.slice(0, 4).map((item) => (
              <div
                key={item.assignment.id}
                className="flex items-center gap-3 rounded border border-border px-4 py-2.5"
              >
                <CalendarClock className="h-4 w-4 flex-none text-muted-foreground" aria-hidden />
                <span className="min-w-0 flex-1 truncate text-small text-foreground">
                  {item.activity
                    ? locale === 'ar'
                      ? item.activity.titleAr
                      : item.activity.title
                    : 'Activity'}
                </span>
                <span className="flex-none text-caption text-muted-foreground">
                  {item.assignment.dueOn}
                </span>
              </div>
            ))}
            {due.length === 0 ? (
              <p className="py-6 text-center text-small text-muted-foreground">
                Nothing outstanding.
              </p>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent marks</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/parent/child/${child.id}/progress`}>
                Progress
                <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {marks.slice(0, 4).map((item) => {
              const score = item.submission?.score ?? 0
              return (
                <div
                  key={item.assignment.id}
                  className="flex items-center gap-3 rounded border border-border px-4 py-2.5"
                >
                  <span className="min-w-0 flex-1 truncate text-small text-foreground">
                    {item.activity
                      ? locale === 'ar'
                        ? item.activity.titleAr
                        : item.activity.title
                      : 'Activity'}
                  </span>
                  {early ? (
                    <span className="flex flex-none gap-0.5">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            'h-4 w-4',
                            star <= (score >= 80 ? 3 : score >= 60 ? 2 : 1)
                              ? 'fill-accent text-accent'
                              : 'fill-muted text-border-strong',
                          )}
                          aria-hidden
                        />
                      ))}
                    </span>
                  ) : (
                    <Badge variant={score >= 75 ? 'success' : score >= 60 ? 'neutral' : 'danger'}>
                      {score}%
                    </Badge>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}
