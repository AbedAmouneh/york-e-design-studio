import type { ReactNode } from 'react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/lib/i18n'
import type { StringKey } from '@/i18n'

/**
 * Design tokens.
 *
 * The values behind every screen, with the name a developer types and the
 * value the browser resolves, side by side. Both are needed: the name alone
 * does not tell you it is a near black rather than pure black, and the hex
 * alone invites someone to paste it in literally and break theming.
 *
 * The swatches read their colour from the same CSS variable the rest of the
 * studio does, so this page cannot drift from the real theme. Hardcoding the
 * hex in a swatch would make a stale token look correct, which is the one
 * failure mode a token page must not have.
 */

/**
 * Both the HSL and the hex, deliberately.
 *
 * The HSL triplet is what sits in `index.css` and what a developer edits. The
 * hex is what a designer or a reviewer recognises, and it is the only form in
 * which "is that really the brand yellow" is a question anyone can answer by
 * looking. Printing one without the other sends half the audience away.
 *
 * Every hex below was computed from the HSL rather than typed from memory. The
 * first pass at this file guessed eleven of them and got all eleven slightly
 * wrong, which is the failure a token page exists to prevent, not commit.
 */
interface Token {
  name: string
  hsl: string
  hex: string
  useKey: StringKey
}

const surfaceTokens: Token[] = [
  { name: '--background', hsl: '0 0% 100%', hex: '#FFFFFF', useKey: 'dsUseBackground' },
  { name: '--surface', hsl: '60 16.7% 97.6%', hex: '#FAFAF8', useKey: 'dsUseSurface' },
  { name: '--surface-sunken', hsl: '60 9% 95%', hex: '#F3F3F1', useKey: 'dsUseSurfaceSunken' },
  { name: '--foreground', hsl: '0 0% 4%', hex: '#0A0A0A', useKey: 'dsUseForeground' },
  { name: '--muted', hsl: '60 9% 95%', hex: '#F3F3F1', useKey: 'dsUseMuted' },
  { name: '--muted-foreground', hsl: '0 0% 42%', hex: '#6B6B6B', useKey: 'dsUseMutedFg' },
  { name: '--border', hsl: '0 0% 91%', hex: '#E8E8E8', useKey: 'dsUseBorder' },
  { name: '--border-strong', hsl: '0 0% 84.7%', hex: '#D8D8D8', useKey: 'dsUseBorderStrong' },
  { name: '--ring', hsl: '0 0% 4%', hex: '#0A0A0A', useKey: 'dsUseRing' },
]

const brandTokens: Token[] = [
  { name: '--primary', hsl: '0 0% 4%', hex: '#0A0A0A', useKey: 'dsUsePrimary' },
  { name: '--accent', hsl: '54.8 99.2% 52%', hex: '#FEE90B', useKey: 'dsUseAccent' },
]

const statusTokens: Token[] = [
  { name: '--success', hsl: '150.3 59.5% 30%', hex: '#1F7A4D', useKey: 'dsUseSuccess' },
  { name: '--success-tint', hsl: '147 44% 93%', hex: '#E5F5EC', useKey: 'dsUseTint' },
  { name: '--warning', hsl: '26 90.5% 37.1%', hex: '#B45309', useKey: 'dsUseWarning' },
  { name: '--warning-tint', hsl: '38 86% 93%', hex: '#FDF1DE', useKey: 'dsUseTint' },
  { name: '--danger', hsl: '3.2 71.3% 41%', hex: '#B3261E', useKey: 'dsUseDanger' },
  { name: '--danger-tint', hsl: '8 71% 95%', hex: '#FBECE9', useKey: 'dsUseTint' },
]

const learnerTokens: Token[] = [
  {
    name: '--learner-surface',
    hsl: '50 100% 98%',
    hex: '#FFFDF5',
    useKey: 'dsUseLearnerSurface',
  },
  {
    name: '--learner-sidebar',
    hsl: '48 100% 93.1%',
    hex: '#FFF8DC',
    useKey: 'dsUseLearnerSidebar',
  },
  {
    name: '--learner-primary',
    hsl: '172.7 57.8% 39%',
    hex: '#2A9D8F',
    useKey: 'dsUseLearnerPrimary',
  },
  { name: '--learner-next', hsl: '44.8 100% 82.9%', hex: '#FFE9A8', useKey: 'dsUseLearnerNext' },
]

const typeScale: Array<{ name: string; size: string; className: string }> = [
  { name: 'display', size: '1.875rem / 2.25rem', className: 'text-display' },
  { name: 'heading', size: '1.5rem / 1.95rem', className: 'text-heading' },
  { name: 'subheading', size: '1.125rem / 1.625rem', className: 'text-subheading' },
  { name: 'body', size: '0.875rem / 1.5rem', className: 'text-body' },
  { name: 'small', size: '0.8125rem / 1.25rem', className: 'text-small' },
  { name: 'caption', size: '0.6875rem / 1rem', className: 'text-caption' },
  { name: 'learner-heading', size: '1.75rem / 2.25rem', className: 'text-learner-heading' },
  { name: 'learner-body', size: '1rem / 1.65rem', className: 'text-learner-body' },
]

const radii: Array<{ name: string; value: string; className: string }> = [
  { name: 'rounded-sm', value: 'calc(var(--radius) - 2px)', className: 'rounded-sm' },
  { name: 'rounded', value: 'var(--radius) = 0.375rem', className: 'rounded' },
  { name: 'rounded-lg', value: 'calc(var(--radius) + 4px)', className: 'rounded-lg' },
  { name: 'rounded-learner', value: 'var(--radius-learner) = 0.75rem', className: 'rounded-learner' },
]

const shadows: Array<{ name: string; value: string; className: string }> = [
  { name: 'shadow-card', value: '0 1px 2px 0 rgb(10 10 10 / 0.04)', className: 'shadow-card' },
  {
    name: 'shadow-learner-card',
    value: '0 1px 5px 0 rgb(10 10 10 / 0.07)',
    className: 'shadow-learner-card',
  },
  {
    name: 'shadow-learner-raised',
    value: '0 4px 14px 0 rgb(10 10 10 / 0.1)',
    className: 'shadow-learner-raised',
  },
]

const spacing: Array<{ name: string; value: string }> = [
  { name: 'row-comfortable', value: '2.875rem = 46px' },
  { name: 'sidebar', value: '15rem = 240px' },
  { name: 'sidebar-collapsed', value: '4rem = 64px' },
]

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {note ? <p className="-mt-2 px-5 pb-3 text-small text-muted-foreground">{note}</p> : null}
      <CardContent className="px-0 pb-0">
        <div className="border-t border-border">{children}</div>
      </CardContent>
    </Card>
  )
}

function Row({
  swatch,
  name,
  value,
  extra,
  use,
}: {
  swatch?: ReactNode
  name: string
  value: string
  extra?: string
  use?: string
}) {
  return (
    <div className="grid items-center gap-3 border-b border-border px-5 py-2.5 last:border-0 md:grid-cols-[48px_1.2fr_1.2fr_1fr]">
      <span className="flex items-center">{swatch}</span>
      <code className="font-mono text-caption text-foreground">{name}</code>
      <code className="font-mono text-caption text-muted-foreground">
        {value}
        {extra ? <span className="ms-2 text-foreground">{extra}</span> : null}
      </code>
      <span className="text-small text-muted-foreground">{use}</span>
    </div>
  )
}

/**
 * The swatch reads the live variable rather than the printed hex, so a token
 * changed in `index.css` and not here shows up as a mismatch on this page
 * instead of hiding behind a correct looking colour.
 */
function Swatch({ variable }: { variable: string }) {
  return (
    <span
      className="block h-7 w-7 flex-none rounded border border-border"
      style={{ backgroundColor: `hsl(var(${variable}))` }}
    />
  )
}

export function DesignTokens() {
  const { t } = useLocale()

  const colourGroups: Array<{ titleKey: StringKey; tokens: Token[]; noteKey?: StringKey }> = [
    { titleKey: 'dsColourSurfaces', tokens: surfaceTokens },
    { titleKey: 'dsColourBrand', tokens: brandTokens, noteKey: 'dsAccentRule' },
    { titleKey: 'dsColourStatus', tokens: statusTokens },
    { titleKey: 'dsColourLearner', tokens: learnerTokens, noteKey: 'dsNoRedRule' },
  ]

  return (
    <Page>
      <PageHeader title={t('dsTokens')} subtitle={t('dsTokensSubtitle')} />

      {colourGroups.map((group) => (
        <Section
          key={group.titleKey}
          title={t(group.titleKey)}
          note={group.noteKey ? t(group.noteKey) : undefined}
        >
          <div className="hidden border-b border-border bg-surface px-5 py-2 md:grid md:grid-cols-[48px_1fr_1fr_1fr] md:gap-3">
            <span />
            <span className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
              {t('dsColToken')}
            </span>
            <span className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
              {t('dsColValue')}
            </span>
            <span className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
              {t('dsColUse')}
            </span>
          </div>
          {group.tokens.map((token) => (
            <Row
              key={token.name}
              swatch={<Swatch variable={token.name} />}
              name={token.name}
              value={token.hsl}
              extra={token.hex}
              use={t(token.useKey)}
            />
          ))}
        </Section>
      ))}

      <Section title={t('dsTypeScale')} note={t('dsFontNote')}>
        {typeScale.map((step) => (
          <div
            key={step.name}
            className="grid items-baseline gap-3 border-b border-border px-5 py-3 last:border-0 md:grid-cols-[1fr_200px_200px]"
          >
            <span className={`${step.className} truncate font-medium text-foreground`}>
              {t('dsColSample')}
            </span>
            <code className="font-mono text-caption text-foreground">{step.className}</code>
            <code className="font-mono text-caption text-muted-foreground">{step.size}</code>
          </div>
        ))}
        <div className="px-5 py-3">
          <p className="text-small text-muted-foreground">IBM Plex Sans · IBM Plex Sans Arabic</p>
          <code className="mt-1 block font-mono text-caption text-muted-foreground">
            font-sans, font-arabic, auto on [dir=&quot;rtl&quot;]
          </code>
        </div>
      </Section>

      <Section title={t('dsRadiusShadow')}>
        {radii.map((item) => (
          <Row
            key={item.name}
            swatch={
              <span
                className={`block h-7 w-7 flex-none border border-border-strong bg-surface ${item.className}`}
              />
            }
            name={item.className}
            value={item.value}
          />
        ))}
        {shadows.map((item) => (
          <Row
            key={item.name}
            swatch={
              <span
                className={`block h-7 w-7 flex-none rounded bg-background ${item.className}`}
              />
            }
            name={item.className}
            value={item.value}
          />
        ))}
      </Section>

      <Section title={t('dsSpacing')}>
        {spacing.map((item) => (
          <Row key={item.name} name={item.name} value={item.value} />
        ))}
        <div className="flex flex-wrap items-center gap-3 px-5 py-3">
          <Badge variant="outline">{t('dsColSample')}</Badge>
          <span className="flex h-row-comfortable items-center rounded border border-border bg-surface px-3 text-small text-muted-foreground">
            h-row-comfortable
          </span>
        </div>
      </Section>
    </Page>
  )
}
