import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, LifeBuoy } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/input'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'
import { cn } from '@/lib/utils'

/**
 * Help centre.
 *
 * Grouped by the role reading the article, not by the part of the product the
 * article is about. A teacher and a parent who both ask how grades work need
 * two different answers, and the fastest way to lose a parent is to hand them
 * the teacher version and let them work out it was not meant for them.
 *
 * So every article carries its audience on the row itself, visible before it
 * is opened. Articles written for everyone stay visible under every filter,
 * because hiding them behind a role would mean writing them six times.
 *
 * Search runs over the translated title and summary rather than an English
 * key, so a reader searching in Arabic searches the text they can see.
 */

type Audience = 'teacher' | 'parent' | 'admin' | 'everyone'

interface Article {
  id: string
  titleKey: StringKey
  bodyKey: StringKey
  audience: Audience
  long?: boolean
}

const articles: Article[] = [
  { id: 'a1', titleKey: 'shHelpA1Title', bodyKey: 'shHelpA1Body', audience: 'teacher' },
  { id: 'a2', titleKey: 'shHelpA2Title', bodyKey: 'shHelpA2Body', audience: 'parent' },
  { id: 'a3', titleKey: 'shHelpA3Title', bodyKey: 'shHelpA3Body', audience: 'teacher', long: true },
  { id: 'a4', titleKey: 'shHelpA4Title', bodyKey: 'shHelpA4Body', audience: 'admin', long: true },
  { id: 'a5', titleKey: 'shHelpA5Title', bodyKey: 'shHelpA5Body', audience: 'teacher' },
  { id: 'a6', titleKey: 'shHelpA6Title', bodyKey: 'shHelpA6Body', audience: 'teacher' },
  { id: 'a7', titleKey: 'shHelpA7Title', bodyKey: 'shHelpA7Body', audience: 'parent' },
  { id: 'a8', titleKey: 'shHelpA8Title', bodyKey: 'shHelpA8Body', audience: 'everyone' },
]

const audienceLabel: Record<Audience, StringKey> = {
  teacher: 'shHelpForTeachers',
  parent: 'shHelpForParents',
  admin: 'shHelpForAdmins',
  everyone: 'shHelpForEveryone',
}

type Filter = 'all' | Audience

const filters: { key: Filter; labelKey: StringKey }[] = [
  { key: 'all', labelKey: 'shHelpFilterAll' },
  { key: 'teacher', labelKey: 'tabTeacher' },
  { key: 'parent', labelKey: 'tabParent' },
  { key: 'admin', labelKey: 'tabSchoolAdmin' },
]

export function SharedHelpCentre() {
  const { t } = useLocale()
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const needle = query.trim().toLowerCase()

  const rows = articles.filter((article) => {
    // An article for everyone belongs under every role, not only under All.
    const inFilter =
      filter === 'all' || article.audience === filter || article.audience === 'everyone'
    if (!inFilter) return false
    if (!needle) return true
    return `${t(article.titleKey)} ${t(article.bodyKey)}`.toLowerCase().includes(needle)
  })

  return (
    <Page>
      <PageHeader
        title={t('shNavHelp')}
        subtitle={t('shHelpSubtitle')}
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link to="/shared/support">
              <LifeBuoy className="h-3.5 w-3.5" aria-hidden />
              {t('shHelpRaiseTicket')}
            </Link>
          </Button>
        }
      />

      <SearchInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('shHelpSearchPlaceholder')}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1 rounded border border-border p-0.5">
          {filters.map((option) => (
            <Button
              key={option.key}
              variant={filter === option.key ? 'outline' : 'ghost'}
              size="sm"
              onClick={() => setFilter(option.key)}
            >
              {t(option.labelKey)}
            </Button>
          ))}
        </div>
        <span className="text-small text-muted-foreground">
          {t('shHelpNArticles').replace('{n}', String(rows.length))}
        </span>
      </div>

      <div className="space-y-1.5">
        {rows.map((article) => (
          <Link
            key={article.id}
            to="/shared/help"
            className={cn(
              'flex items-start gap-4 rounded border border-border bg-background px-4 py-3.5 transition-colors',
              'hover:bg-surface',
            )}
          >
            <span className="min-w-0 flex-1 leading-tight">
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-small font-medium text-foreground">
                  {t(article.titleKey)}
                </span>
                {/*
                  The audience sits on the row, not inside the article. A parent
                  should be able to tell a teacher's instructions apart from
                  their own before spending a minute reading them.
                */}
                <Badge variant={article.audience === 'everyone' ? 'neutral' : 'outline'}>
                  {t(audienceLabel[article.audience])}
                </Badge>
              </span>
              <span className="mt-1 block text-small text-muted-foreground">
                {t(article.bodyKey)}
              </span>
            </span>

            <span className="flex flex-none items-center gap-2 text-caption text-muted-foreground">
              {t(article.long ? 'shHelpLongerRead' : 'shHelpShortRead')}
              <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
            </span>
          </Link>
        ))}

        {rows.length === 0 ? (
          <p className="py-12 text-center text-small text-muted-foreground">
            {t('shHelpNoResults')}
          </p>
        ) : null}
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-4 p-4">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-muted">
            <LifeBuoy className="h-4 w-4 text-muted-foreground" aria-hidden />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-small font-medium text-foreground">
              {t('shHelpStillStuck')}
            </span>
            <span className="mt-0.5 block text-small text-muted-foreground">
              {t('shHelpStillStuckBody')}
            </span>
          </span>
          <Button variant="accent" size="sm" asChild>
            <Link to="/shared/support">{t('shHelpRaiseTicket')}</Link>
          </Button>
        </CardContent>
      </Card>

      <p className="text-caption text-muted-foreground">{t('shHelpAudienceNote')}</p>
    </Page>
  )
}
