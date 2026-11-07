import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, RefreshCw, ShieldOff, TriangleAlert, WifiOff } from 'lucide-react'
import { Page, PageHeader } from '@/components/app/PageHeader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'

/**
 * Error states.
 *
 * Three kinds, because a teacher can do something about two of them.
 *
 *   Connection lost. Their problem to solve, and the one that matters most in
 *   schools with weak internet. Says what was kept.
 *   Not allowed. Not a fault. Says who can help.
 *   Something broke. Ours. Gives a reference the support team can search,
 *   because a screenshot of an apology is useless on a ticket.
 *
 * No error here says Error. None shows a stack trace. The reference is a short
 * code a person can read down a phone line.
 */
export function SharedErrorState() {
  const { t } = useLocale()
  const [copied, setCopied] = useState(false)

  return (
    <Page>
      <PageHeader
        title={t('navErrorState')}
        subtitle={t('shErrorSubtitle')}
      />

      <Card className="border-warning/40">
        <CardContent className="flex flex-col items-center gap-3 px-6 py-12 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-warning-tint">
            <WifiOff className="h-5 w-5 text-warning" aria-hidden />
          </span>
          <p className="text-subheading font-semibold text-foreground">{t('shOffline')}</p>
          <p className="max-w-[48ch] text-small text-muted-foreground">{t('shOfflineBody')}</p>
          <Button variant="outline" size="sm" className="mt-1">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            {t('shTryAgain')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center gap-3 px-6 py-12 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-muted">
            <ShieldOff className="h-5 w-5 text-muted-foreground" aria-hidden />
          </span>
          <p className="text-subheading font-semibold text-foreground">{t('shNoAccess')}</p>
          <p className="max-w-[48ch] text-small text-muted-foreground">{t('shNoAccessBody')}</p>
          <Button variant="outline" size="sm" className="mt-1" asChild>
            <Link to="/teacher">{t('shBackToToday')}</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="border-danger/30">
        <CardContent className="flex flex-col items-center gap-3 px-6 py-12 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-danger-tint">
            <TriangleAlert className="h-5 w-5 text-danger" aria-hidden />
          </span>
          <p className="text-subheading font-semibold text-foreground">{t('shOurFault')}</p>
          <p className="max-w-[48ch] text-small text-muted-foreground">{t('shOurFaultBody')}</p>

          <div className="mt-1 flex items-center gap-2">
            {/*
              Not translated. This is an identifier a person reads down a phone
              line to the support desk, and it has to be the same characters in
              every language.
            */}
            <code className="rounded border border-border bg-surface px-3 py-2 text-small text-foreground">
              YE3-K4M2-7Q
            </code>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCopied(true)
                window.setTimeout(() => setCopied(false), 1500)
              }}
            >
              <Copy className="h-3.5 w-3.5" aria-hidden />
              {copied ? t('shCopied') : t('shCopy')}
            </Button>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Button variant="accent" size="sm">
              <RefreshCw className="h-3.5 w-3.5" aria-hidden />
              {t('shTryAgain')}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/teacher">{t('shBackToToday')}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline">{t('shRule')}</Badge>
        <p className="min-w-0 flex-1 text-caption text-muted-foreground">{t('shErrorNote')}</p>
      </div>
    </Page>
  )
}
