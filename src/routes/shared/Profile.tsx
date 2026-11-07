import { useState } from 'react'
import { Languages, Lock, Type } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useLocale } from '@/lib/i18n'
import { cn, initials } from '@/lib/utils'

/**
 * Profile.
 *
 * Name and photo are editable. Email, role and school are not, because they
 * come from the school's own records and letting a teacher change their own
 * role is how a permissions model stops meaning anything.
 *
 * Accessibility lives here rather than in a separate menu. Dyslexia friendly
 * text and text to speech are in the launch requirements, and a reading
 * support a learner cannot find is a support they do not have.
 */
export function SharedProfile() {
  const { t, locale, setLocale } = useLocale()
  const [dyslexic, setDyslexic] = useState(false)
  const [tts, setTts] = useState(true)
  const [motion, setMotion] = useState(false)
  const [saved, setSaved] = useState(false)

  const name = 'Ziad Mansour'

  return (
    <Page>
      <PageHeader title={t('navProfile')} subtitle={t('shProfileSubtitle')} />

      <Card>
        <CardHeader>
          <CardTitle>{t('shAboutYou')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="grid h-16 w-16 flex-none place-items-center rounded-full bg-muted text-subheading font-semibold text-foreground">
              {initials(name)}
            </span>
            <Button variant="outline" size="sm">
              {t('shChangePhoto')}
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">{t('shName')}</span>
              <Input defaultValue={name} onChange={() => setSaved(false)} />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-small font-medium text-foreground">
                {t('shEmail')}
                <Lock className="ms-1.5 inline h-3 w-3 text-muted-foreground" aria-hidden />
              </span>
              <Input defaultValue="ziad.mansour@example-school.test" disabled />
            </label>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {[
              // The school name is the school's own, not copy, so it is not
              // translated. The role is a platform word and is.
              [t('shRole'), t('tabTeacher')],
              [t('shSchool'), 'Cedar Valley School'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 rounded border border-border bg-surface px-4 py-3"
              >
                <span className="text-small text-muted-foreground">{label}</span>
                <span className="flex items-center gap-2 text-small text-foreground">
                  {value}
                  <Badge variant="outline">{t('shSetByYourSchool')}</Badge>
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('shLanguage')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {(
            [
              // Each language names itself in its own script, which is how a
              // reader finds their own language without reading the other one.
              { key: 'en', label: 'English', hint: t('shLeftToRight') },
              { key: 'ar', label: 'العربية', hint: t('shRightToLeft') },
            ] as const
          ).map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setLocale(option.key)}
              className={cn(
                'flex flex-1 items-center gap-3 rounded border px-4 py-3 text-start transition-colors',
                locale === option.key
                  ? 'border-foreground bg-surface'
                  : 'border-border hover:bg-surface',
              )}
            >
              <Languages className="h-4 w-4 flex-none text-muted-foreground" aria-hidden />
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block text-small text-foreground">{option.label}</span>
                <span className="block text-caption text-muted-foreground">{option.hint}</span>
              </span>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('shReadingAccessibility')}</CardTitle>
          <Badge variant="outline">WCAG 2.2 AA</Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          <label className="flex items-center justify-between gap-4 rounded border border-border px-4 py-3">
            <span className="min-w-0 text-small text-foreground">
              <span className="flex items-center gap-1.5">
                <Type className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
                {t('shDyslexicText')}
              </span>
              <span className="mt-0.5 block text-caption text-muted-foreground">
                {t('shDyslexicHint')}
              </span>
            </span>
            <Switch
              checked={dyslexic}
              onCheckedChange={(value) => {
                setDyslexic(value)
                setSaved(false)
              }}
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded border border-border px-4 py-3">
            <span className="min-w-0 text-small text-foreground">
              {t('shReadAloud')}
              <span className="mt-0.5 block text-caption text-muted-foreground">
                {t('shReadAloudHint')}
              </span>
            </span>
            <Switch
              checked={tts}
              onCheckedChange={(value) => {
                setTts(value)
                setSaved(false)
              }}
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded border border-border px-4 py-3">
            <span className="min-w-0 text-small text-foreground">
              {t('shReduceMotion')}
              <span className="mt-0.5 block text-caption text-muted-foreground">
                {t('shReduceMotionHint')}
              </span>
            </span>
            <Switch
              checked={motion}
              onCheckedChange={(value) => {
                setMotion(value)
                setSaved(false)
              }}
            />
          </label>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button variant="accent" size="sm" onClick={() => setSaved(true)}>
          {t('save')}
        </Button>
        {saved ? <span className="text-small text-success">{t('saved')}</span> : null}
      </div>
    </Page>
  )
}
