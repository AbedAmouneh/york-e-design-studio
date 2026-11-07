import { Award, BookOpen, Calculator, Lock, Shapes, Sparkles, Star, Sun } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { earlyStudent } from '@/data/student'
import type { StringKey } from '@/i18n'

/**
 * My stickers.
 *
 * The early tier's version of a progress page. It answers what have I done
 * rather than how am I doing, which is the only one of those two questions a
 * six year old can use.
 *
 * Every sticker is earned by effort or by finishing, never by beating anyone.
 * There is no leaderboard and no class ranking at this age, and that is a
 * decision rather than an omission.
 */

export const earnedStickers: Array<{
  id: string
  labelKey: StringKey
  icon: typeof Calculator
}> = [
  { id: 's1', labelKey: 'erlStickerCounted100', icon: Calculator },
  { id: 's2', labelKey: 'erlStickerRead5', icon: BookOpen },
  { id: 's3', labelKey: 'erlStickerThreeStars', icon: Star },
  { id: 's4', labelKey: 'erlStickerEveryDay', icon: Sun },
  { id: 's5', labelKey: 'erlStickerShapesExpert', icon: Shapes },
  { id: 's6', labelKey: 'erlStickerTriedAgain', icon: Sparkles },
  { id: 's7', labelKey: 'erlStickerFirstFinish', icon: Award },
]

const locked: Array<{ id: string; labelKey: StringKey }> = [
  { id: 's8', labelKey: 'erlStickerRead10' },
  { id: 's9', labelKey: 'erlStickerCounted200' },
  { id: 's10', labelKey: 'erlStickerTwoWeeks' },
]

export function EarlyStickers() {
  const { t } = useLocale()

  return (
    <div className="space-y-6 pb-4">
      <div className="space-y-1">
        <h1 className="text-heading font-semibold text-foreground">{t('erlMyStickers')}</h1>
        <p className="text-body text-muted-foreground">
          {t('erlStickersCount')
            .replace('{n}', String(earnedStickers.length))
            .replace('{m}', earlyStudent.firstName)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {earnedStickers.map((sticker) => {
          const Icon = sticker.icon
          return (
            <div
              key={sticker.id}
              className="flex flex-col items-center gap-3 rounded-2xl bg-surface p-5 text-center"
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-8 w-8" aria-hidden />
              </span>
              <span className="text-small font-semibold leading-tight text-foreground">
                {t(sticker.labelKey)}
              </span>
            </div>
          )
        })}

        {locked.map((sticker) => (
          <div
            key={sticker.id}
            className={cn(
              'flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-border-strong p-5 text-center',
            )}
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-surface text-muted-foreground">
              <Lock className="h-7 w-7" aria-hidden />
            </span>
            <span className="text-small font-medium leading-tight text-muted-foreground">
              {t(sticker.labelKey)}
            </span>
          </div>
        ))}
      </div>

      <p className="text-small text-muted-foreground">{t('erlCollectRest')}</p>
    </div>
  )
}
