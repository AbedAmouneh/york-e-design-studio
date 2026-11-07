import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, Upload } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLocale } from '@/lib/i18n'
import { cn, initials } from '@/lib/utils'
import type { StringKey } from '@/i18n'
import { schools } from '@/data/seed'

/**
 * Per school branding.
 *
 * York Press operates the platform, each school is a tenant, and a school that
 * pays for a licence wants to look like itself rather than like its publisher.
 * This screen is where that is granted, and, more usefully, where it is bounded.
 *
 * Three decisions are made here and one is refused:
 *
 *   The logo, which is optional, and whose absence has a defined fallback.
 *   The accent colour, shown applied rather than as a swatch.
 *   The subdomain, which is cheap to change and expensive to have changed.
 *
 * The refusal is a colour that white text cannot be read on. A contrast failure
 * is the one branding choice that reaches a child, so the platform blocks the
 * save instead of warning and shipping it anyway.
 */

/**
 * The accent carries white text everywhere it is used, so the only contrast
 * ratio worth computing is against white. WCAG 2.2 relative luminance, so the
 * number on screen is the same number an auditor would produce.
 */
function channel(value: number) {
  const srgb = value / 255
  return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4
}

function contrastWithWhite(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
  return 1.05 / (luminance + 0.05)
}

const HEX = /^#[0-9a-fA-F]{6}$/
const SUBDOMAIN = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])$/

/**
 * Two of the seven presets fail on purpose. A palette where every option is
 * safe teaches an operator nothing about why the check exists, and pale yellow
 * is the colour schools actually ask for.
 */
const palette: Array<{ hex: string; labelKey: StringKey }> = [
  { hex: '#1F6B4A', labelKey: 'saBrandHueForest' },
  { hex: '#0E5A66', labelKey: 'saBrandHueTeal' },
  { hex: '#1B3A6B', labelKey: 'saBrandHueNavy' },
  { hex: '#7A1F2B', labelKey: 'saBrandHueMaroon' },
  { hex: '#5C5A16', labelKey: 'saBrandHueOlive' },
  { hex: '#F6E27A', labelKey: 'saBrandHuePaleYellow' },
  { hex: '#9FD3F0', labelKey: 'saBrandHueSky' },
]

/**
 * Branding that the seed does not carry, keyed to the three seed schools so a
 * reviewer can switch tenants and see each state. Rawabi Academy has no logo,
 * which is what makes the fallback visible rather than described.
 */
const branding: Record<string, { accent: string; subdomain: string; logoFile: string | null }> = {
  'sch-cedar': { accent: '#1F6B4A', subdomain: 'cedarvalley', logoFile: 'cedar-valley-crest.svg' },
  'sch-noor': { accent: '#1B3A6B', subdomain: 'alnoor', logoFile: 'al-noor-mark.png' },
  'sch-rawabi': { accent: '#7A1F2B', subdomain: 'rawabi', logoFile: null },
}

/** Names York Press keeps for itself, so a tenant cannot claim the operator's own address. */
const reserved = ['york', 'yorkpress', 'www', 'app', 'api', 'admin', 'school']

function initialDraft(schoolId: string) {
  const seed = branding[schoolId] ?? branding['sch-cedar']
  return {
    schoolId,
    accent: seed.accent,
    hex: seed.accent,
    subdomain: seed.subdomain,
    logoFile: seed.logoFile,
  }
}

export function SuperAdminBranding() {
  const { tenantId = '' } = useParams()
  const { t } = useLocale()

  const school = schools.find((item) => item.id === tenantId) ?? schools[0]
  const current = branding[school.id] ?? branding['sch-cedar']

  const [draft, setDraft] = useState(() => initialDraft(school.id))
  const [saved, setSaved] = useState(false)

  /*
    The route parameter changes without unmounting, so the draft has to follow
    the tenant. Resetting during render rather than in an effect keeps the
    screen from flashing one school's colour on another school's name.
  */
  if (draft.schoolId !== school.id) {
    setDraft(initialDraft(school.id))
    setSaved(false)
  }

  const ratio = contrastWithWhite(draft.accent)
  const passes = ratio >= 4.5
  const ratioLabel = ratio.toFixed(1)

  const changedSubdomain = draft.subdomain !== current.subdomain
  const takenElsewhere = Object.entries(branding).some(
    ([id, value]) => id !== school.id && value.subdomain === draft.subdomain,
  )
  const subdomainState = !SUBDOMAIN.test(draft.subdomain)
    ? 'invalid'
    : reserved.includes(draft.subdomain)
      ? 'reserved'
      : takenElsewhere
        ? 'taken'
        : 'available'

  const update = (patch: Partial<typeof draft>) => {
    setDraft((value) => ({ ...value, ...patch }))
    setSaved(false)
  }

  return (
    <Page>
      <PageHeader
        title={t('saBranding')}
        subtitle={`${school.name} · ${t('saBrandingSubtitle')}`}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/super-admin/tenant/${school.id}`}>
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {school.name}
            </Link>
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-small text-muted-foreground">{t('saColSchool')}</span>
        {schools.map((item) => (
          <Link
            key={item.id}
            to={`/super-admin/tenant/${item.id}/branding`}
            className={cn(
              'rounded border px-3 py-1.5 text-small transition-colors',
              item.id === school.id
                ? 'border-foreground bg-background text-foreground'
                : 'border-border text-muted-foreground hover:bg-background',
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('saBrandLogo')}</CardTitle>
          <Badge variant="outline">{t('saBrandOptional')}</Badge>
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-3">
            <span className="text-small font-medium text-foreground">
              {t('saBrandCurrentLogo')}
            </span>
            <div className="flex items-center gap-4 rounded border border-border bg-background p-4">
              {draft.logoFile ? (
                <>
                  {/*
                    The studio has no asset pipeline, so an uploaded crest is
                    stood in for by a monogram tile. It sits in the accent so
                    the two choices on this screen are seen together.
                  */}
                  <span
                    className="grid h-16 w-16 flex-none place-items-center rounded text-subheading font-semibold"
                    style={{ backgroundColor: draft.accent, color: '#FFFFFF' }}
                    aria-hidden
                  >
                    {initials(school.name)}
                  </span>
                  <span className="min-w-0 flex-1 text-small text-foreground">
                    {school.name}
                    <span className="mt-0.5 block break-all text-caption text-muted-foreground">
                      {t('saBrandLogoFile').replace('{n}', draft.logoFile)}
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="grid h-16 w-16 flex-none place-items-center rounded border border-dashed border-border-strong text-muted-foreground"
                    aria-hidden
                  >
                    <Upload className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1 text-small text-muted-foreground">
                    {t('saBrandNoLogo')}
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => update({ logoFile: current.logoFile ?? `${school.id}-logo.svg` })}
              >
                {draft.logoFile ? t('saBrandReplaceLogo') : t('saBrandUploadLogo')}
              </Button>
              {draft.logoFile ? (
                <Button variant="ghost" size="sm" onClick={() => update({ logoFile: null })}>
                  {t('saBrandRemoveLogo')}
                </Button>
              ) : null}
            </div>
            <p className="text-caption text-muted-foreground">{t('saBrandLogoSpec')}</p>
            <p className="text-caption text-muted-foreground">{t('saBrandLogoWhere')}</p>
          </div>

          <div className="space-y-3">
            <span className="text-small font-medium text-foreground">{t('saBrandFallback')}</span>
            {/*
              Shown whether or not a logo exists. The rule is the deliverable
              here, and an operator asked about it mid call should not have to
              delete a file to find out what the answer is.
            */}
            <div className="rounded border border-border bg-background p-4">
              <span className="text-caption text-muted-foreground">{t('saBrandOnReport')}</span>
              <p className="mt-2 text-subheading font-semibold tracking-tight text-foreground">
                {school.name}
              </p>
              <p className="mt-0.5 text-caption text-muted-foreground">
                {school.city}, {school.country}
              </p>
              <Badge variant="outline" className="mt-3">
                {t('saBrandFallbackPreview')}
              </Badge>
            </div>
            <p className="max-w-[60ch] text-caption text-muted-foreground">
              {t('saBrandFallbackNote')}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className={cn(!passes && 'border-danger/40')}>
        <CardHeader>
          <CardTitle>{t('saBrandAccent')}</CardTitle>
          <Badge variant={passes ? 'success' : 'danger'}>
            {passes ? t('saBrandContrastPass') : t('saBrandRefused')}
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <p className="max-w-[60ch] text-small text-muted-foreground">
              {t('saBrandAccentHint')}
            </p>

            <div className="flex flex-wrap gap-2">
              {palette.map((option) => (
                <button
                  key={option.hex}
                  type="button"
                  onClick={() => update({ accent: option.hex, hex: option.hex })}
                  className={cn(
                    'flex items-center gap-2 rounded border px-3 py-2 text-small transition-colors',
                    draft.accent === option.hex
                      ? 'border-foreground bg-background text-foreground'
                      : 'border-border text-muted-foreground hover:bg-background',
                  )}
                >
                  <span
                    className="h-4 w-4 flex-none rounded-sm border border-border-strong"
                    style={{ backgroundColor: option.hex }}
                    aria-hidden
                  />
                  {t(option.labelKey)}
                </button>
              ))}
            </div>

            <label className="flex max-w-xs flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">
                {t('saBrandCustomHex')}
              </span>
              <Input
                value={draft.hex}
                spellCheck={false}
                dir="ltr"
                onChange={(event) => {
                  const next = event.target.value
                  // Keep the last valid colour on screen while a partial value is typed.
                  update(HEX.test(next) ? { hex: next, accent: next } : { hex: next })
                }}
              />
              <span className="text-caption text-muted-foreground">{t('saBrandCustomHexHint')}</span>
            </label>

            <div
              className={cn(
                'rounded border px-4 py-3',
                passes ? 'border-border bg-surface' : 'border-danger/40 bg-danger-tint',
              )}
            >
              <p
                className={cn(
                  'text-small font-medium',
                  passes ? 'text-foreground' : 'text-danger',
                )}
              >
                {t('saBrandContrastRatio').replace('{n}', ratioLabel)}
              </p>
              <p className={cn('mt-1 text-caption', passes ? 'text-muted-foreground' : 'text-danger')}>
                {passes ? t('saBrandContrastPass') : t('saBrandContrastFailNote')}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-small font-medium text-foreground">
              {t('saBrandConsequence')}
            </span>
            <div className="space-y-5 rounded border border-border bg-background p-4">
              {/*
                A button, an active nav item and a progress bar: the three
                places the accent lands, at the size a learner meets them.
                A swatch would hide exactly the failure this screen exists to
                catch, which is white text on a pale fill.
              */}
              <button
                type="button"
                className="rounded px-4 py-2 text-small font-medium"
                style={{ backgroundColor: draft.accent, color: '#FFFFFF' }}
              >
                {t('saBrandPreviewButton')}
              </button>

              <div className="w-56 overflow-hidden rounded border border-border">
                <div className="flex items-stretch bg-muted">
                  <span
                    className="w-[2px] flex-none"
                    style={{ backgroundColor: draft.accent }}
                    aria-hidden
                  />
                  <span className="px-3 py-2 text-small font-medium text-foreground">
                    {t('navMyCourses')}
                  </span>
                </div>
                <div className="flex items-stretch">
                  <span className="w-[2px] flex-none" aria-hidden />
                  <span className="px-3 py-2 text-small text-muted-foreground">
                    {t('navGradebook')}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-caption text-muted-foreground">
                  <span>{t('saBrandPreviewProgress')}</span>
                  <span className="tabular">64%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{ width: '64%', backgroundColor: draft.accent }}
                  />
                </div>
              </div>
            </div>
            <p className="max-w-[60ch] text-caption text-muted-foreground">
              {t('saBrandConsequenceNote')}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('saBrandSubdomain')}</CardTitle>
          <Badge
            variant={
              subdomainState === 'available'
                ? 'success'
                : subdomainState === 'invalid'
                  ? 'neutral'
                  : 'danger'
            }
          >
            {subdomainState === 'available'
              ? t('saBrandAvailable')
              : subdomainState === 'taken'
                ? t('saBrandTaken')
                : subdomainState === 'reserved'
                  ? t('saBrandReserved')
                  : t('saBrandSubdomainRules')}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="max-w-[60ch] text-small text-muted-foreground">
            {t('saBrandSubdomainHint')}
          </p>

          <div className="flex justify-between gap-4 border-b border-border py-2 text-small">
            <span className="text-muted-foreground">{t('saBrandCurrentAddress')}</span>
            {/*
              An address is a technical identifier, so it stays left to right
              and in Latin characters on an Arabic screen. A mirrored URL is not
              a URL a teacher can type.
            */}
            <span className="text-foreground" dir="ltr">
              {current.subdomain}.york-e.school
            </span>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-small font-medium text-foreground">{t('saBrandNewAddress')}</span>
            <span className="flex max-w-md items-center gap-2" dir="ltr">
              <Input
                value={draft.subdomain}
                spellCheck={false}
                onChange={(event) => update({ subdomain: event.target.value.toLowerCase() })}
              />
              <span className="flex-none text-small text-muted-foreground">.york-e.school</span>
            </span>
            <span className="text-caption text-muted-foreground">
              {t('saBrandSubdomainRules')}
            </span>
          </label>

          {changedSubdomain ? (
            <div className="flex gap-3 rounded border border-warning/40 bg-warning-tint px-4 py-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-warning" aria-hidden />
              <p className="max-w-[70ch] text-caption text-warning">
                {t('saBrandSubdomainBreaks')}
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card className="border-danger/30">
        <CardHeader>
          <CardTitle>{t('saBrandLimits')}</CardTitle>
          <Badge variant="danger">{t('saBrandSkinNotBehaviour')}</Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          {(
            [
              ['saBrandLimitLayout', 'saBrandLimitLayoutHint'],
              ['saBrandLimitTiers', 'saBrandLimitTiersHint'],
              ['saBrandLimitGrades', 'saBrandLimitGradesHint'],
            ] as Array<[StringKey, StringKey]>
          ).map(([labelKey, hintKey]) => (
            <div
              key={labelKey}
              className="flex items-center justify-between gap-4 rounded border border-border bg-surface px-4 py-3"
            >
              <span className="min-w-0 flex-1 text-small text-foreground">
                {t(labelKey)}
                <span className="mt-0.5 block text-caption text-muted-foreground">
                  {t(hintKey)}
                </span>
              </span>
              <Badge variant="neutral" className="flex-none">
                {t('saLockedOn')}
              </Badge>
            </div>
          ))}
          <p className="max-w-[80ch] pt-1 text-caption text-muted-foreground">
            {t('saBrandLimitsNote')}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="accent"
          size="sm"
          disabled={!passes || subdomainState !== 'available'}
          onClick={() => setSaved(true)}
        >
          {t('save')}
        </Button>
        {!passes ? (
          <span className="text-small text-danger">{t('saBrandSaveBlocked')}</span>
        ) : saved ? (
          <span className="text-small text-success">{t('saBrandSaved')}</span>
        ) : (
          <span className="text-caption text-muted-foreground">{t('saBrandChangesLogged')}</span>
        )}
      </div>
    </Page>
  )
}
