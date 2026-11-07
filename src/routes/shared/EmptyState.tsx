import { Link } from 'react-router-dom'
import { BookOpen, Inbox, Plus, Search, Star, Users } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

/**
 * Empty states.
 *
 * Four kinds, and they are not interchangeable. The commonest mistake in a
 * platform this size is one blank illustration reused everywhere, which
 * leaves a user unable to tell a new account apart from a broken filter.
 *
 *   Nothing yet, because the term has not started. Explain and offer the
 *   first action.
 *   Nothing left, because the work is done. Say so warmly and stop.
 *   Nothing found, because a filter is too narrow. Offer to widen it, never
 *   offer to create.
 *   Nothing for you, because of permissions. Say who can see it.
 *
 * The early tier version is included because a blank page with a grey icon
 * reads as broken to a six year old.
 */

export function SharedEmptyState() {
  const { t } = useLocale()

  return (
    <Page>
      <PageHeader
        title={t('navEmptyState')}
        subtitle={t('shEmptySubtitle')}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="p-0">
            <div className="border-b border-border px-4 py-2.5">
              <Badge variant="outline">{t('shNothingYet')}</Badge>
            </div>
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-muted">
                <Users className="h-5 w-5 text-muted-foreground" aria-hidden />
              </span>
              <p className="text-small font-medium text-foreground">{t('shNoClassesYet')}</p>
              <p className="max-w-[40ch] text-small text-muted-foreground">
                {t('shNoClassesBody')}
              </p>
              <Button variant="accent" size="sm" asChild className="mt-1">
                <Link to="/school-admin/users/import">
                  <Plus className="h-3.5 w-3.5" aria-hidden />
                  {t('shImportStudents')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="border-b border-border px-4 py-2.5">
              <Badge variant="outline">{t('shNothingLeft')}</Badge>
            </div>
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-success-tint">
                <Inbox className="h-5 w-5 text-success" aria-hidden />
              </span>
              <p className="text-small font-medium text-foreground">{t('shNothingToMark')}</p>
              <p className="max-w-[40ch] text-small text-muted-foreground">
                {t('shQueueClearBody')}
              </p>
              {/* No button. Finishing is the end of the task, not the start of another. */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="border-b border-border px-4 py-2.5">
              <Badge variant="outline">{t('shNothingFound')}</Badge>
            </div>
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-muted">
                <Search className="h-5 w-5 text-muted-foreground" aria-hidden />
              </span>
              <p className="text-small font-medium text-foreground">{t('shNoResultsTitle')}</p>
              <p className="max-w-[40ch] text-small text-muted-foreground">
                {t('shNoResultsBody')}
              </p>
              <Button variant="outline" size="sm" className="mt-1">
                {t('shClearTheFilters')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="border-b border-border px-4 py-2.5">
              <Badge variant="outline">{t('shNothingForYou')}</Badge>
            </div>
            <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-muted">
                <BookOpen className="h-5 w-5 text-muted-foreground" aria-hidden />
              </span>
              <p className="text-small font-medium text-foreground">{t('shCourseNotOpen')}</p>
              <p className="max-w-[44ch] text-small text-muted-foreground">
                {t('shCourseNotOpenBody')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className={cn('learner-scope border-0 bg-background')}>
        <CardContent className="flex flex-col items-center gap-3 px-6 py-12 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-primary/10">
            <Star className="h-8 w-8 fill-primary text-primary" aria-hidden />
          </span>
          <p className="text-subheading font-semibold text-foreground">{t('shAllDoneToday')}</p>
          <p className="max-w-[30ch] text-body text-muted-foreground">
            {t('shComeBackTomorrow')}
          </p>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">{t('shEmptyNote')}</p>
    </Page>
  )
}
