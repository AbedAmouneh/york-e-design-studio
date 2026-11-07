import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Download, Plus, TriangleAlert } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { StatCard } from '@/components/app/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, StatusBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input, SearchInput } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
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
import type { StringKey } from '@/i18n'

/**
 * Component states.
 *
 * Written for a developer, not for a reviewer. Three columns on every row:
 * what the state is called, what it looks like, and the exact string that
 * produces it. If someone has to read the source of this page to use it, the
 * page has failed.
 *
 * Two things make a page like this lie, and both are handled explicitly:
 *
 *   Hover and focus do not exist in a static render. Those rows apply the
 *   resulting classes directly and say so, rather than showing a rest state
 *   with a hover label over it.
 *
 *   What is missing matters as much as what is here. A spec that only lists
 *   what exists lets a developer assume the gap is their own search failure.
 *   The absences are listed at the bottom, by name.
 */

function Section({
  title,
  note,
  children,
}: {
  title: string
  note?: string
  children: ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {note ? (
        <p className="-mt-2 px-5 pb-3 text-small text-muted-foreground">{note}</p>
      ) : null}
      <CardContent className="px-0 pb-0">
        <div className="border-t border-border">{children}</div>
      </CardContent>
    </Card>
  )
}

/**
 * One row of the spec.
 *
 * `code` is never translated and never wrapped in a sentence. A developer
 * copies it, so it has to survive being selected with a double click.
 */
function Spec({ label, code, children }: { label: string; code: string; children: ReactNode }) {
  return (
    <div className="grid items-center gap-3 border-b border-border px-5 py-3 last:border-0 md:grid-cols-[140px_minmax(0,220px)_1fr]">
      <span className="text-small text-muted-foreground">{label}</span>
      <span className="flex min-w-0 items-center gap-2">{children}</span>
      <code className="block overflow-x-auto whitespace-pre font-mono text-caption text-foreground">
        {code}
      </code>
    </div>
  )
}

function Group({ label }: { label: string }) {
  return (
    <div className="border-b border-border bg-surface px-5 py-2">
      <span className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

/** The ring the focus-visible rule produces, applied without a real focus. */
const forcedRing = 'ring-2 ring-ring ring-offset-2 ring-offset-background'

export function DesignComponents() {
  const { t } = useLocale()

  const missing: StringKey[] = [
    'dsMissingLoading',
    'dsMissingInputError',
    'dsMissingPrimitives',
    'dsMissingToast',
  ]

  return (
    <Page>
      <PageHeader title={t('dsComponents')} subtitle={t('dsComponentsSubtitle')} />

      <Card className="border-accent/50">
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Badge variant="accent">{t('dsColCode')}</Badge>
          <span className="min-w-0 flex-1 text-small text-foreground">{t('dsForcedNote')}</span>
        </CardContent>
      </Card>

      <Section title={t('dsButtons')}>
        <Group label={t('dsButtonVariants')} />
        <Spec label={t('dsStateRest')} code='<Button>'>
          <Button size="sm">{t('save')}</Button>
        </Spec>
        <Spec label={t('dsStateHover')} code="hover:bg-primary/90">
          <Button size="sm" className="bg-primary/90">
            {t('save')}
          </Button>
        </Spec>
        <Spec label={t('dsStateFocus')} code="focus-visible:ring-2 focus-visible:ring-ring">
          <Button size="sm" className={forcedRing}>
            {t('save')}
          </Button>
        </Spec>
        <Spec label={t('dsStateDisabled')} code="disabled:opacity-50">
          <Button size="sm" disabled>
            {t('save')}
          </Button>
        </Spec>
        <Spec label="accent" code='<Button variant="accent">'>
          <Button size="sm" variant="accent">
            {t('start')}
          </Button>
        </Spec>
        <Spec label="outline" code='<Button variant="outline">'>
          <Button size="sm" variant="outline">
            {t('cancel')}
          </Button>
        </Spec>
        <Spec label="ghost" code='<Button variant="ghost">'>
          <Button size="sm" variant="ghost">
            {t('cancel')}
          </Button>
        </Spec>
        <Spec label="danger" code='<Button variant="danger">'>
          <Button size="sm" variant="danger">
            {t('dsSampleDelete')}
          </Button>
        </Spec>

        <Group label={t('dsButtonSizes')} />
        <Spec label="sm" code='size="sm"  h-8 px-3 text-small'>
          <Button size="sm">{t('save')}</Button>
        </Spec>
        <Spec label="md" code='size="md"  h-10 px-4 text-body'>
          <Button>{t('save')}</Button>
        </Spec>
        <Spec label="lg" code='size="lg"  h-11 px-5 text-body'>
          <Button size="lg">{t('save')}</Button>
        </Spec>
        <Spec label="icon" code='size="icon"  h-10 w-10'>
          <Button size="icon" variant="outline" aria-label={t('dsStateWithIcon')}>
            <Download className="h-4 w-4" aria-hidden />
          </Button>
        </Spec>
        <Spec label={t('dsStateWithIcon')} code='className="h-3.5 w-3.5" aria-hidden'>
          <Button size="sm" variant="accent">
            <Plus className="h-3.5 w-3.5" aria-hidden />
            {t('dsSampleAdd')}
          </Button>
        </Spec>
        <Spec label={t('dsStateAsLink')} code="<Button asChild><Link /></Button>">
          <Button size="sm" variant="outline" asChild>
            <Link to="/design/tokens">
              {t('dsTokens')}
              <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
            </Link>
          </Button>
        </Spec>
      </Section>

      <Section title={t('dsBadges')}>
        <Spec label="neutral" code="bg-muted text-muted-foreground">
          <Badge>{t('dsStateRest')}</Badge>
        </Spec>
        <Spec label="success" code="bg-success-tint text-success">
          <Badge variant="success">{t('dsUseSuccess')}</Badge>
        </Spec>
        <Spec label="warning" code="bg-warning-tint text-warning">
          <Badge variant="warning">{t('dsUseWarning')}</Badge>
        </Spec>
        <Spec label="danger" code="bg-danger-tint text-danger">
          <Badge variant="danger">{t('atRisk')}</Badge>
        </Spec>
        <Spec label="accent" code="bg-accent text-accent-foreground">
          <Badge variant="accent">{t('dsColourBrand')}</Badge>
        </Spec>
        <Spec label="outline" code="border border-border-strong">
          <Badge variant="outline">{t('dsStateRest')}</Badge>
        </Spec>

        <Group label={t('dsStatusBadges')} />
        <Spec label="on-track" code='<StatusBadge status="on-track" />'>
          <StatusBadge status="on-track" label={t('onTrack')} />
        </Spec>
        <Spec label="watch" code='<StatusBadge status="watch" />'>
          <StatusBadge status="watch" label={t('watch')} />
        </Spec>
        <Spec label="at-risk" code='<StatusBadge status="at-risk" />'>
          <StatusBadge status="at-risk" label={t('atRisk')} />
        </Spec>
      </Section>

      <Section title={t('dsInputs')} note={t('dsMissingInputError')}>
        <Spec label={t('dsStatePlaceholder')} code="placeholder:text-muted-foreground">
          <Input placeholder={t('search')} readOnly />
        </Spec>
        <Spec label={t('dsStateFilled')} code="<Input defaultValue />">
          <Input defaultValue="Grade 6 Cedar" readOnly />
        </Spec>
        <Spec label={t('dsStateFocus')} code="focus-visible:ring-2 focus-visible:ring-offset-1">
          <Input defaultValue="Grade 6 Cedar" readOnly className={forcedRing} />
        </Spec>
        <Spec label={t('dsStateDisabled')} code="disabled:cursor-not-allowed disabled:opacity-50">
          <Input defaultValue="Grade 6 Cedar" disabled />
        </Spec>
        <Spec label={t('dsStateError')} code='className="border-danger"'>
          <Input defaultValue="" readOnly className="border-danger" />
        </Spec>
        <Spec label="SearchInput" code="ps-9, icon at start-3, mirrors in RTL">
          <SearchInput placeholder={t('search')} readOnly />
        </Spec>
      </Section>

      <Section title={t('dsCheckbox')}>
        <Spec label={t('dsStateUnchecked')} code="border-border-strong">
          <Checkbox checked={false} />
        </Spec>
        <Spec label={t('dsStateChecked')} code="data-[state=checked]:bg-primary">
          <Checkbox checked />
        </Spec>
        <Spec label={t('dsStateIndeterminate')} code='checked="indeterminate"'>
          <Checkbox checked="indeterminate" />
        </Spec>
        <Spec label={t('dsStateFocus')} code="focus-visible:ring-2 focus-visible:ring-offset-1">
          <Checkbox checked className={forcedRing} />
        </Spec>
        <Spec label={t('dsStateDisabled')} code="disabled:opacity-50">
          <Checkbox checked disabled />
        </Spec>
      </Section>

      <Section title={t('dsSwitch')} note="rtl:data-[state=checked]:-translate-x-4">
        <Spec label={t('dsStateOff')} code="data-[state=unchecked]:bg-border-strong">
          <Switch checked={false} />
        </Spec>
        <Spec label={t('dsStateOn')} code="data-[state=checked]:bg-foreground">
          <Switch checked />
        </Spec>
        <Spec label={t('dsStateFocus')} code="focus-visible:ring-2 focus-visible:ring-offset-2">
          <Switch checked className={forcedRing} />
        </Spec>
        <Spec label={t('dsStateDisabled')} code="disabled:opacity-50">
          <Switch checked disabled />
        </Spec>
      </Section>

      <Section title={t('dsTabs')}>
        <Spec label={t('dsStateRest')} code="text-muted-foreground border-transparent">
          <span className="-mb-px border-b-2 border-transparent px-3 py-2 text-small font-medium text-muted-foreground">
            {t('dsStateRest')}
          </span>
        </Spec>
        <Spec label={t('dsStateHover')} code="hover:text-foreground">
          <span className="-mb-px border-b-2 border-transparent px-3 py-2 text-small font-medium text-foreground">
            {t('dsStateHover')}
          </span>
        </Spec>
        <Spec label={t('dsStateActive')} code="data-[state=active]:border-accent">
          <span className="-mb-px border-b-2 border-accent px-3 py-2 text-small font-medium text-foreground">
            {t('dsStateActive')}
          </span>
        </Spec>
      </Section>

      <Section title={t('dsTable')} note={t('dsTabularNote')}>
        <div className="px-5 py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('colStudent')}</TableHead>
                <TableHead className="text-end">{t('colAverage')}</TableHead>
                <TableHead className="text-end">{t('colStatus')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-foreground">Ibrahim Sleiman</TableCell>
                <TableCell className="tabular text-end">78%</TableCell>
                <TableCell className="text-end">
                  <StatusBadge status="on-track" label={t('onTrack')} />
                </TableCell>
              </TableRow>
              <TableRow className="bg-muted">
                <TableCell className="font-medium text-foreground">Rita Barakat</TableCell>
                <TableCell className="tabular text-end">47%</TableCell>
                <TableCell className="text-end">
                  <StatusBadge status="at-risk" label={t('atRisk')} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="mt-3 font-mono text-caption text-muted-foreground">
            {t('dsStateSelected')}: className=&quot;bg-muted&quot;
          </p>
        </div>
      </Section>

      <Section title={t('dsCards')}>
        <div className="grid gap-4 px-5 py-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('dsStateRest')}</CardTitle>
              <Badge variant="outline">{t('dsCards')}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-small text-muted-foreground">
                rounded border border-border bg-background shadow-card
              </p>
            </CardContent>
          </Card>
          <div className="grid gap-3 sm:grid-cols-2">
            <StatCard label={t('dsStatCard')} value="124" hint={t('dsStateRest')} />
            <StatCard
              label={t('dsStatCard')}
              value="108"
              hint={t('dsStateEmphasis')}
              emphasis
            />
          </div>
        </div>
      </Section>

      <Section title={t('dsLearnerTier')} note={t('dsLearnerTierNote')}>
        <div className="learner-scope space-y-4 bg-background px-5 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <Button>{t('start')}</Button>
            <Button variant="outline">{t('cancel')}</Button>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-learner-next px-3 py-1 text-small font-semibold text-learner-next-foreground">
              {t('dsUseLearnerNext')}
            </span>
          </div>
          <Card className="border-0">
            <CardContent className="p-4">
              <p className="text-learner-body font-semibold text-foreground">
                {t('dsLearnerTier')}
              </p>
              <p className="mt-1 text-small text-muted-foreground">
                --radius: var(--radius-learner) = 0.75rem
              </p>
            </CardContent>
          </Card>
          <p className="font-mono text-caption text-muted-foreground">
            .learner-scope {'{'} --primary: var(--learner-primary) {'}'}
          </p>
        </div>
      </Section>

      <Section title={t('dsNotBuilt')} note={t('dsNotBuiltNote')}>
        <ul className="space-y-2 px-5 py-4">
          {missing.map((key) => (
            <li key={key} className="flex gap-2.5">
              <TriangleAlert
                className="mt-0.5 h-3.5 w-3.5 flex-none text-warning"
                aria-hidden
              />
              <span className="min-w-0 text-small text-foreground">{t(key)}</span>
            </li>
          ))}
        </ul>
      </Section>

      <p className={cn('text-caption text-muted-foreground')}>{t('dsAccentRule')}</p>
    </Page>
  )
}
