import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { earlyStudent } from '@/data/student'

/**
 * Flow 8 of 8: the well done moment.
 *
 * A whole screen for one sentence, on purpose. This is the reward moment, and
 * a reward crammed into a toast at the corner of a results page is not a
 * reward.
 *
 * Two stars, not three, deliberately. A studio that only ever shows the
 * perfect case hides the question everyone will ask in review: what does a
 * child see when they did not get everything right? They see this. Warm,
 * specific, and no mention of the one they missed.
 */
export function EarlyWellDone() {
  const { t } = useLocale()
  const stars: number = 2

  /*
   * Warm, specific and never comparative, the same rule the praise helper in
   * the data layer follows. Keeping the whole sentence per key lets the Arabic
   * put the vocative where it belongs rather than bolting a name on the end.
   */
  const praiseKey = stars === 3 ? 'erlPraiseThree' : stars === 2 ? 'erlPraiseTwo' : 'erlPraiseOne'

  return (
    <div className="learner-scope flex h-screen flex-col items-center justify-center gap-8 bg-background px-6 text-center">
      <div className="flex items-end gap-3">
        {[1, 2, 3].map((position) => (
          <Star
            key={position}
            className={cn(
              'transition-transform',
              position === 2 ? 'h-24 w-24' : 'h-16 w-16',
              position <= stars
                ? 'fill-primary text-primary'
                : 'fill-surface text-border-strong',
            )}
            aria-hidden
          />
        ))}
      </div>
      <span className="sr-only">{t('erlStarsEarned').replace('{n}', String(stars))}</span>

      <div className="space-y-2">
        <p className="text-display font-semibold leading-tight text-foreground">
          {t(praiseKey).replace('{n}', earlyStudent.firstName)}
        </p>
        <p className="max-w-[28ch] text-body text-muted-foreground">{t('erlWellDoneBody')}</p>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-3">
        <Link
          to="/student/early"
          className="rounded-full bg-primary px-8 py-4 text-body font-semibold text-primary-foreground"
        >
          {t('erlKeepGoing')}
        </Link>
        <Link
          to="/student/early/stickers"
          className="rounded-full bg-surface px-8 py-4 text-body font-semibold text-foreground"
        >
          {t('erlSeeMyStickers')}
        </Link>
      </div>

      <p className="max-w-[34ch] text-small text-muted-foreground">{t('erlTeacherCanSee')}</p>
    </div>
  )
}
