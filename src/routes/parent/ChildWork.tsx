import { useParams } from 'react-router-dom'
import { Clock, Star } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import {
  childById,
  children,
  isEarly,
  pendingWorkFor,
  releasedWorkFor,
} from '@/data/parent'

/**
 * Assignments and marks, parent view.
 *
 * Only work that has been released. A parent cannot see a mark before their
 * child does, and work still sitting with the teacher does not appear as a
 * blank row either, because a blank row reads as a child who did nothing.
 *
 * The early tier column shows stars rather than a score, matching what the
 * child sees. A parent who wants the number can ask the teacher, which is the
 * conversation the school wants to happen anyway.
 */
export function ParentChildWork() {
  const { childId = '' } = useParams()
  const { locale } = useLocale()
  const child = childById(childId) ?? children[0]
  const early = isEarly(child)

  const due = pendingWorkFor(child)
  const marks = releasedWorkFor(child)

  return (
    <Page>
      <PageHeader
        title={`${child.firstName}'s work`}
        subtitle={`${due.length} still to do · ${marks.length} marked`}
      />

      <Card>
        <CardHeader>
          <CardTitle>Still to do</CardTitle>
          <Badge variant={due.length > 0 ? 'accent' : 'neutral'}>{due.length}</Badge>
        </CardHeader>
        <CardContent className="space-y-1.5">
          {due.map((item) => (
            <div
              key={item.assignment.id}
              className="flex flex-wrap items-center gap-3 rounded border border-border px-4 py-3"
            >
              <span className="min-w-[160px] flex-1 leading-tight">
                <span className="block truncate text-small font-medium text-foreground">
                  {item.activity
                    ? locale === 'ar'
                      ? item.activity.titleAr
                      : item.activity.title
                    : 'Activity'}
                </span>
                <span className="block truncate text-caption text-muted-foreground">
                  {item.course ? (locale === 'ar' ? item.course.titleAr : item.course.title) : ''}
                </span>
              </span>
              <span className="flex flex-none items-center gap-1.5 text-caption text-muted-foreground">
                <Clock className="h-3.5 w-3.5" aria-hidden />
                due {item.assignment.dueOn}
              </span>
            </div>
          ))}
          {due.length === 0 ? (
            <p className="py-6 text-center text-small text-muted-foreground">
              Nothing outstanding right now.
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Marked and returned</CardTitle>
          <Badge variant="outline">{marks.length}</Badge>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Returned</TableHead>
                <TableHead className="text-end">{early ? 'Stars' : 'Mark'}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marks.map((item) => {
                const score = item.submission?.score ?? 0
                const stars = score >= 80 ? 3 : score >= 60 ? 2 : 1
                return (
                  <TableRow key={item.assignment.id}>
                    <TableCell className="font-medium text-foreground">
                      {item.activity
                        ? locale === 'ar'
                          ? item.activity.titleAr
                          : item.activity.title
                        : 'Activity'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.course
                        ? locale === 'ar'
                          ? item.course.titleAr
                          : item.course.title
                        : ''}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.submission?.submittedOn}
                    </TableCell>
                    <TableCell className="text-end">
                      {early ? (
                        <span className="inline-flex gap-0.5">
                          {[1, 2, 3].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                'h-4 w-4',
                                star <= stars
                                  ? 'fill-accent text-accent'
                                  : 'fill-muted text-border-strong',
                              )}
                              aria-hidden
                            />
                          ))}
                        </span>
                      ) : (
                        <span
                          className={cn(
                            'tabular font-semibold',
                            score >= 75
                              ? 'text-success'
                              : score >= 60
                                ? 'text-foreground'
                                : 'text-danger',
                          )}
                        >
                          {score}%
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">
        Work that is with the teacher does not appear until it is marked and released, so you and
        your child see the same thing at the same time.
      </p>
    </Page>
  )
}
