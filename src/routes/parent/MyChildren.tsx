import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Star } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, initials } from '@/lib/utils'
import {
  attendanceSummary,
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
 * My children.
 *
 * The landing screen for a family with more than one child at the school. One
 * card each, each card answering the question a parent actually opens the app
 * with, which is: is anything wrong, and is anything due.
 *
 * The two cards are visibly different because the children are in different
 * age tiers. The Grade 6 card carries a percentage, the Grade 2 card carries
 * stars, and that is the clearest place in the whole studio to see the age
 * rule applied to the same screen at the same moment.
 */
export function ParentMyChildren() {
  return (
    <Page>
      <PageHeader title="My children" subtitle="Cedar Valley School · Term 2, week 5" />

      <div className="grid gap-4 lg:grid-cols-2">
        {children.map((child) => {
          const standing = standingOfChild(child)
          const group = classOfChild(child)
          const early = isEarly(child)
          const due = pendingWorkFor(child).length
          const marks = releasedWorkFor(child).length
          const attendance = attendanceSummary(child)

          return (
            <Card key={child.id}>
              <CardContent className="space-y-5 p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-muted text-small font-semibold text-foreground">
                    {initials(fullNameOf(child))}
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-subheading font-semibold text-foreground">
                      {fullNameOf(child)}
                    </span>
                    <span className="block truncate text-small text-muted-foreground">
                      {group?.name}
                    </span>
                  </span>
                  {early ? <Badge variant="outline">K1 to G3</Badge> : null}
                </div>

                {early ? (
                  <div className="space-y-2 rounded border border-border bg-surface p-4">
                    <span className="flex items-center gap-1">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            'h-6 w-6',
                            star <= (standing?.stars ?? 1)
                              ? 'fill-accent text-accent'
                              : 'fill-muted text-border-strong',
                          )}
                          aria-hidden
                        />
                      ))}
                      <span className="ms-2 text-small text-muted-foreground">
                        average this term
                      </span>
                    </span>
                    <p className="text-small text-foreground">{earlySummary(child)}</p>
                  </div>
                ) : (
                  <div className="space-y-2 rounded border border-border bg-surface p-4">
                    <span className="flex items-baseline gap-2">
                      <span className="tabular text-display font-semibold leading-none text-foreground">
                        {standing?.average}%
                      </span>
                      <span className="text-small text-muted-foreground">average this term</span>
                    </span>
                    <p className="text-small text-muted-foreground">
                      Based on {marks} marked {marks === 1 ? 'piece' : 'pieces'} of work released so
                      far.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded border border-border p-3">
                    <span className="text-caption text-muted-foreground">Due soon</span>
                    <p className="tabular mt-1 text-subheading font-semibold text-foreground">
                      {due}
                    </p>
                  </div>
                  <div className="rounded border border-border p-3">
                    <span className="flex items-center gap-1.5 text-caption text-muted-foreground">
                      <CalendarCheck className="h-3.5 w-3.5" aria-hidden />
                      Attendance
                    </span>
                    <p className="tabular mt-1 text-subheading font-semibold text-foreground">
                      {Math.round((attendance.present / Math.max(attendance.total, 1)) * 100)}%
                    </p>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to={`/parent/child/${child.id}`}>
                    See {child.firstName}
                    <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <p className="text-caption text-muted-foreground">
        You see the same marks your child sees. Work your child's teacher has not released yet does
        not appear here either.
      </p>
    </Page>
  )
}
