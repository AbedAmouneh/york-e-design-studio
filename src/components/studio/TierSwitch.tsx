import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'

/**
 * Switches between the two student age tiers.
 *
 * This is studio furniture, not product. No real student has an age tier
 * switch, and a seven year old certainly does not get a control that turns
 * their app into a twelve year old's. So it is drawn in neutral studio grey in
 * both tiers rather than in the palette of the shell it sits in, and it is
 * labelled as a studio view. A reviewer should never have to wonder whether
 * the thing they are looking at is something a child would see.
 *
 * It exists because the comparison is the point. The two tier rule in LMS-22
 * is the single most consequential design decision in the student experience,
 * and before this the only route to Rami's side was the canvas or a URL
 * somebody had to be told. A rule nobody can see demonstrated is a rule that
 * gets argued about from memory.
 */

const tiers = [
  { to: '/student/early', labelKey: 'shSectionStudentEarly' },
  { to: '/student', labelKey: 'shSectionStudentUpper' },
] as const

export function TierSwitch({ className }: { className?: string }) {
  const { t } = useLocale()
  const { pathname } = useLocation()

  // Anything under /student/early is the early tier, everything else under
  // /student is the upper one. Checked by prefix rather than by exact match so
  // the switch stays correct on the inner screens too.
  const early = pathname.startsWith('/student/early')

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-caption font-medium uppercase tracking-wide text-muted-foreground">
        {t('tierSwitchLabel')}
      </span>
      <div className="inline-flex rounded border border-border-strong bg-background p-0.5">
        {tiers.map((tier) => {
          const active = tier.to === '/student/early' ? early : !early
          return (
            <Link
              key={tier.to}
              to={tier.to}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex-1 rounded-sm px-2 py-1 text-center text-caption font-medium transition-colors',
                active
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {t(tier.labelKey)}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
