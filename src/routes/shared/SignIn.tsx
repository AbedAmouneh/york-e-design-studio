import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid3x3, Languages, Lock, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/lib/i18n'
import { schoolName } from '@/lib/names'
import { cn } from '@/lib/utils'
import { DEFAULT_SCHOOL_ID, schools } from '@/data/seed'

/**
 * Sign in.
 *
 * Two routes in, because the product has two kinds of user and only one of
 * them can type an email address.
 *
 *   Staff, parents and older students sign in with an email and a password.
 *   A K1 to Grade 3 child signs in with a class code and a picture. A six
 *   year old cannot type ibrahim.sleiman@example-school.test, and a school
 *   that has to reset thirty passwords every Monday stops using the platform.
 *
 * The language switch is on this screen rather than inside settings. A parent
 * who reads Arabic should not have to navigate an English interface to find
 * the control that makes it Arabic.
 */

type Mode = 'adult' | 'child'

/*
  The demo school is read from the seed, not written here. This is the first
  screen a reviewer opens, so a hardcoded "Cedar Valley School" would have been
  the first English word on an Arabic page, right under a language switch that
  is on this screen precisely so an Arabic reader never has to navigate English
  to reach Arabic.
*/
const demoSchool = schools.find((item) => item.id === DEFAULT_SCHOOL_ID)

export function SharedSignIn() {
  const { t, locale, toggleLocale } = useLocale()
  const [mode, setMode] = useState<Mode>('adult')
  const [picked, setPicked] = useState<number | null>(null)

  const pictures = ['🦊', '🐢', '🦜', '🐠', '🦋', '🐝', '🐙', '🦉', '🐬']

  return (
    <div className="flex h-screen">
      <div className="flex min-w-0 flex-1 flex-col justify-center bg-background px-6 py-10">
        <div className="mx-auto w-full max-w-sm space-y-8">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded bg-primary text-[17px] font-bold text-primary-foreground">
              Y
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-small font-semibold text-foreground">York-E</span>
              <span className="text-caption text-muted-foreground">
                {schoolName(demoSchool, locale)}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1 rounded border border-border p-0.5">
            <Button
              variant={mode === 'adult' ? 'outline' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setMode('adult')}
            >
              {t('shModeEmail')}
            </Button>
            <Button
              variant={mode === 'child' ? 'outline' : 'ghost'}
              size="sm"
              className="flex-1"
              onClick={() => setMode('child')}
            >
              {t('shModeInClass')}
            </Button>
          </div>

          {mode === 'adult' ? (
            <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
              <h1 className="text-heading font-semibold text-foreground">{t('shSignIn')}</h1>

              <label className="flex flex-col gap-1.5">
                <span className="text-small font-medium text-foreground">{t('shEmail')}</span>
                <span className="relative">
                  <Mail
                    className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input className="ps-9" placeholder="you@school.example" />
                </span>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-small font-medium text-foreground">{t('shPassword')}</span>
                <span className="relative">
                  <Lock
                    className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input className="ps-9" type="password" placeholder="••••••••" />
                </span>
              </label>

              <Button variant="accent" size="md" className="w-full">
                {t('shSignIn')}
              </Button>

              <div className="flex items-center justify-between">
                <Link
                  to="/shared/forgot"
                  className="text-small text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  {t('shForgotPasswordLink')}
                </Link>
                <Badge variant="outline">{t('shUseSchoolAccount')}</Badge>
              </div>
            </form>
          ) : (
            <div className="space-y-5">
              <div>
                <h1 className="text-heading font-semibold text-foreground">{t('shChildHello')}</h1>
                <p className="mt-1 text-small text-muted-foreground">{t('shChildIntro')}</p>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-small font-medium text-foreground">{t('shClassCode')}</span>
                <span className="relative">
                  <Grid3x3
                    className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    className="ps-9 text-center text-subheading tracking-[0.3em]"
                    placeholder="OLIVE"
                    defaultValue="OLIVE"
                  />
                </span>
              </label>

              <div className="space-y-2">
                <span className="text-small font-medium text-foreground">
                  {t('shTapYourPicture')}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {pictures.map((picture, index) => (
                    <button
                      key={picture}
                      type="button"
                      onClick={() => setPicked(index)}
                      aria-label={t('shPictureN').replace('{n}', String(index + 1))}
                      className={cn(
                        'grid h-20 place-items-center rounded-xl border-2 text-[32px] transition-colors',
                        picked === index
                          ? 'border-foreground bg-surface'
                          : 'border-border hover:bg-surface',
                      )}
                    >
                      {picture}
                    </button>
                  ))}
                </div>
              </div>

              <Button variant="accent" size="md" className="w-full" disabled={picked === null}>
                {t('shLetUsGo')}
              </Button>

              <p className="text-caption text-muted-foreground">{t('shChildNoPasswordNote')}</p>
            </div>
          )}

          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex items-center gap-1.5 rounded border border-border-strong px-2.5 py-1.5 text-small font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden />
            {locale === 'en' ? t('switchToArabic') : t('switchToEnglish')}
          </button>
        </div>
      </div>

      <div className="hidden flex-1 flex-col justify-end bg-primary p-10 text-primary-foreground lg:flex">
        <p className="max-w-[26ch] text-heading font-semibold leading-tight">
          {t('shSplashHeadline')}
        </p>
        <p className="mt-3 max-w-[40ch] text-body opacity-70">{t('shSplashFooter')}</p>
      </div>
    </div>
  )
}
