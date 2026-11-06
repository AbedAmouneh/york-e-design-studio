import { Megaphone, Pin } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { announcements } from '@/data/seed'
import { children } from '@/data/parent'

/**
 * Announcements, parent view.
 *
 * Everything addressed to the whole school or to parents, plus anything sent
 * to a class one of their children is in. Nothing else.
 *
 * Each post says which child it concerns. A parent with two children at the
 * school otherwise has to work out for themselves whether the trip letter is
 * about the one in Grade 2 or the one in Grade 6.
 */
export function ParentAnnouncements() {
  const posts = announcements.map((item) => ({
    ...item,
    concerns:
      item.audience === 'school'
        ? 'Whole school'
        : item.title.includes('Grade 6')
          ? children[0].firstName
          : children[1].firstName,
  }))

  return (
    <Page>
      <PageHeader title="Announcements" subtitle="From Cedar Valley School" />

      <div className="space-y-2">
        {posts.map((item) => (
          <Card key={item.id} className={cn(item.pinned && 'border-accent/50')}>
            <CardHeader>
              <CardTitle>
                <span className="flex items-center gap-2">
                  {item.pinned ? (
                    <Pin className="h-3.5 w-3.5 text-foreground" aria-hidden />
                  ) : (
                    <Megaphone className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                  )}
                  {item.title}
                </span>
              </CardTitle>
              <span className="ms-auto text-caption text-muted-foreground">{item.postedOn}</span>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-small text-muted-foreground">{item.body}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{item.authorName}</Badge>
                <Badge variant="neutral">Concerns: {item.concerns}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Page>
  )
}
