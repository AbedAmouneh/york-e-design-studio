import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'
import { courses } from '@/data/seed'

/**
 * Provision a school.
 *
 * The flow that creates a tenant. Four steps because four irreversible things
 * are being decided: who the customer is, what they bought, how their grades
 * are expressed, and where their data lives.
 *
 * The last two carry a warning and are not editable afterwards without a
 * migration. Pretending they are ordinary settings is how a platform ends up
 * with a school in the wrong data region.
 */

type Step = 'school' | 'licence' | 'local' | 'done'

/**
 * The option lists sit at module scope, so they carry keys rather than copy.
 * The country value stays the English name because the data region is derived
 * from it, and a derived rule must not depend on the display language.
 */
const countryOptions: Array<{ value: string; labelKey: StringKey }> = [
  { value: 'Lebanon', labelKey: 'saCountryLebanon' },
  { value: 'United Arab Emirates', labelKey: 'saCountryUae' },
  { value: 'Jordan', labelKey: 'saCountryJordan' },
  { value: 'Egypt', labelKey: 'saCountryEgypt' },
  { value: 'Saudi Arabia', labelKey: 'saCountrySaudi' },
]

const scaleOptions: Array<{
  key: 'percentage' | 'letter' | 'band'
  labelKey: StringKey
  hintKey: StringKey
}> = [
  { key: 'percentage', labelKey: 'saScalePercentage', hintKey: 'saScalePercentageHint' },
  { key: 'letter', labelKey: 'saScaleLetter', hintKey: 'saScaleLetterHint' },
  { key: 'band', labelKey: 'saScaleBand', hintKey: 'saScaleBandHint' },
]

const languageOptions: Array<{ key: 'en' | 'ar'; labelKey: StringKey; hintKey: StringKey }> = [
  { key: 'en', labelKey: 'saLangEnglish', hintKey: 'saLangLtr' },
  { key: 'ar', labelKey: 'saLangArabic', hintKey: 'saLangRtl' },
]

export function SuperAdminProvision() {
  const { t, locale } = useLocale()
  const [step, setStep] = useState<Step>('school')
  const [name, setName] = useState('')
  const [country, setCountry] = useState('Lebanon')
  const [seats, setSeats] = useState(500)
  const [courseIds, setCourseIds] = useState<Set<string>>(new Set())
  const [scale, setScale] = useState<'percentage' | 'letter' | 'band'>('percentage')
  const [language, setLanguage] = useState<'en' | 'ar'>('en')
  const [region, setRegion] = useState<'EU' | 'Gulf'>('EU')

  const steps: Array<{ key: Step; labelKey: StringKey }> = [
    { key: 'school', labelKey: 'saStepSchool' },
    { key: 'licence', labelKey: 'saStepLicence' },
    { key: 'local', labelKey: 'saStepLocal' },
    { key: 'done', labelKey: 'done' },
  ]
  const activeIndex = steps.findIndex((item) => item.key === step)
  const regionLabel = t(region === 'EU' ? 'saRegionEu' : 'saRegionGulf')

  return (
    <Page>
      <PageHeader
        title={t('saProvisionSchool')}
        subtitle={t('saProvisionSubtitle')}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link to="/super-admin">
              <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
              {t('navTenants')}
            </Link>
          </Button>
        }
      />

      <ol className="flex flex-wrap items-center gap-2">
        {steps.map((item, index) => (
          <li key={item.key} className="flex items-center gap-2">
            <span
              className={cn(
                'flex items-center gap-2 rounded px-3 py-1.5 text-small font-medium',
                index === activeIndex
                  ? 'bg-foreground text-background'
                  : index < activeIndex
                    ? 'bg-success-tint text-success'
                    : 'bg-muted text-muted-foreground',
              )}
            >
              <span className="tabular text-caption">{index + 1}</span>
              {t(item.labelKey)}
            </span>
            {index < steps.length - 1 ? (
              <span className="h-px w-5 bg-border-strong" aria-hidden />
            ) : null}
          </li>
        ))}
      </ol>

      {step === 'school' ? (
        <Card>
          <CardHeader>
            <CardTitle>{t('saStepSchool')}</CardTitle>
          </CardHeader>
          <CardContent className="max-w-xl space-y-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">{t('saSchoolName')}</span>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t('saSchoolNamePlaceholder')}
              />
            </label>

            <div className="flex flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">{t('saColCountry')}</span>
              <div className="flex flex-wrap gap-1.5">
                {countryOptions.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      setCountry(item.value)
                      setRegion(item.value === 'Lebanon' ? 'EU' : 'Gulf')
                    }}
                    className={cn(
                      'rounded border px-3 py-2 text-small transition-colors',
                      country === item.value
                        ? 'border-foreground bg-surface text-foreground'
                        : 'border-border text-muted-foreground hover:bg-surface',
                    )}
                  >
                    {t(item.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="accent"
                size="sm"
                disabled={!name.trim()}
                onClick={() => setStep('licence')}
              >
                {t('next')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'licence' ? (
        <Card>
          <CardHeader>
            <CardTitle>{t('saStepLicence')}</CardTitle>
            <Badge variant="outline">
              {t('saNCourses').replace('{n}', String(courseIds.size))}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex max-w-xs flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">{t('saColSeats')}</span>
              <Input
                type="number"
                min={1}
                value={seats}
                onChange={(event) => setSeats(Number(event.target.value) || 0)}
              />
              <span className="text-caption text-muted-foreground">{t('saSeatHint')}</span>
            </label>

            <div className="space-y-2">
              <span className="text-small font-medium text-foreground">{t('navCourses')}</span>
              {courses.map((course) => (
                <label
                  key={course.id}
                  className="flex cursor-pointer items-center gap-3 rounded border border-border px-4 py-3 transition-colors hover:bg-surface"
                >
                  <Checkbox
                    checked={courseIds.has(course.id)}
                    onCheckedChange={() =>
                      setCourseIds((current) => {
                        const next = new Set(current)
                        if (next.has(course.id)) next.delete(course.id)
                        else next.add(course.id)
                        return next
                      })
                    }
                  />
                  <span className="min-w-0 flex-1 text-small text-foreground">
                    {locale === 'ar' ? course.titleAr : course.title}
                  </span>
                  <Badge variant="outline">
                    {t('saGradeN').replace('{n}', String(course.grade))}
                  </Badge>
                </label>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => setStep('school')}>
                {t('back')}
              </Button>
              <Button
                variant="accent"
                size="sm"
                disabled={courseIds.size === 0}
                onClick={() => setStep('local')}
              >
                {t('next')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'local' ? (
        <Card>
          <CardHeader>
            <CardTitle>{t('saStepLocal')}</CardTitle>
            <Badge variant="warning">{t('saCannotChangeLater')}</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <span className="text-small font-medium text-foreground">{t('saGradingScale')}</span>
              <div className="flex flex-wrap gap-2">
                {scaleOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setScale(option.key)}
                    className={cn(
                      'flex-1 rounded border px-4 py-3 text-start text-small transition-colors',
                      scale === option.key
                        ? 'border-foreground bg-surface text-foreground'
                        : 'border-border text-muted-foreground hover:bg-surface',
                    )}
                  >
                    {t(option.labelKey)}
                    <span className="mt-0.5 block text-caption text-muted-foreground">
                      {t(option.hintKey)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-small font-medium text-foreground">
                {t('saDefaultLanguage')}
              </span>
              <div className="flex gap-2">
                {languageOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setLanguage(option.key)}
                    className={cn(
                      'flex-1 rounded border px-4 py-3 text-start text-small transition-colors',
                      language === option.key
                        ? 'border-foreground bg-surface text-foreground'
                        : 'border-border text-muted-foreground hover:bg-surface',
                    )}
                  >
                    {t(option.labelKey)}
                    <span className="mt-0.5 block text-caption text-muted-foreground">
                      {t(option.hintKey)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded border border-warning/40 bg-warning-tint px-4 py-3">
              <p className="text-small font-medium text-warning">
                {t('saDataRegionValue').replace('{r}', regionLabel)}
              </p>
              <p className="mt-1 text-caption text-warning">{t('saRegionFixedNote')}</p>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={() => setStep('licence')}>
                {t('back')}
              </Button>
              <Button variant="accent" size="sm" onClick={() => setStep('done')}>
                {t('saCreateTenant')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 'done' ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-success-tint">
              <Check className="h-5 w-5 text-success" aria-hidden />
            </span>
            <p className="text-subheading font-semibold text-foreground">
              {t('saTenantCreated').replace('{n}', name)}
            </p>
            <p className="max-w-[56ch] text-small text-muted-foreground">
              {t('saProvisionSummary')
                .replace('{s}', String(seats))
                .replace('{c}', String(courseIds.size))
                .replace(
                  '{g}',
                  t(scaleOptions.find((option) => option.key === scale)!.labelKey),
                )
                .replace('{l}', t(language === 'ar' ? 'saLangArabic' : 'saLangEnglish'))
                .replace('{r}', regionLabel)}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Button variant="accent" size="sm" asChild>
                <Link to="/super-admin">{t('saBackToSchools')}</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => setStep('school')}>
                {t('saProvisionAnother')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </Page>
  )
}
