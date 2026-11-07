import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useLocale } from '@/lib/i18n'

/**
 * Forgotten password.
 *
 * Says the same thing whether or not the address exists. A message that
 * confirms an account is there is a way of discovering who attends the school,
 * which matters more when the accounts belong to children.
 *
 * Children are routed to their teacher rather than to an email flow. Most of
 * them do not have an email address, and the ones who do cannot reach it
 * during a lesson.
 */
export function SharedForgotPassword() {
  const { t } = useLocale()
  const [sent, setSent] = useState(false)

  return (
    <div className="grid h-screen place-items-center bg-surface px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded bg-primary text-[17px] font-bold text-primary-foreground">
            Y
          </span>
          <span className="text-small font-semibold text-foreground">York-E</span>
        </div>

        {sent ? (
          <Card>
            <CardContent className="space-y-4 p-6 text-center">
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-success-tint">
                <Check className="h-5 w-5 text-success" aria-hidden />
              </span>
              <p className="text-subheading font-semibold text-foreground">
                {t('shCheckYourEmail')}
              </p>
              {/*
                Deliberately does not confirm whether the address exists. The
                same words appear either way.
              */}
              <p className="text-small text-muted-foreground">{t('shResetSentBody')}</p>
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/shared/sign-in">{t('shBackToSignIn')}</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="space-y-4 p-6">
              <div>
                <h1 className="text-subheading font-semibold text-foreground">
                  {t('shSetNewPassword')}
                </h1>
                <p className="mt-1 text-small text-muted-foreground">{t('shForgotIntro')}</p>
              </div>

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

              <Button variant="accent" size="md" className="w-full" onClick={() => setSent(true)}>
                {t('shSendTheLink')}
              </Button>

              <Link
                to="/shared/sign-in"
                className="flex items-center justify-center gap-1.5 text-small text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                {t('shBackToSignIn')}
              </Link>
            </CardContent>
          </Card>
        )}

        <Card className="border-dashed">
          <CardContent className="p-4">
            <p className="text-small font-medium text-foreground">{t('shAreYouStudent')}</p>
            <p className="mt-1 text-caption text-muted-foreground">{t('shStudentAskTeacher')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
