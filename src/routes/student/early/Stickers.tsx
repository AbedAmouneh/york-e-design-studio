import { Award, BookOpen, Calculator, Lock, Shapes, Sparkles, Star, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { earlyStudent } from '@/data/student'

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

export const earnedStickers = [
  { id: 's1', label: 'Counted to 100', icon: Calculator },
  { id: 's2', label: 'Read 5 stories', icon: BookOpen },
  { id: 's3', label: 'Three stars', icon: Star },
  { id: 's4', label: 'Every day this week', icon: Sun },
  { id: 's5', label: 'Shapes expert', icon: Shapes },
  { id: 's6', label: 'Tried again', icon: Sparkles },
  { id: 's7', label: 'First finish', icon: Award },
]

const locked = [
  { id: 's8', label: 'Read 10 stories' },
  { id: 's9', label: 'Counted to 200' },
  { id: 's10', label: 'Two weeks in a row' },
]

export function EarlyStickers() {
  return (
    <div className="space-y-6 pb-4">
      <div className="space-y-1">
        <h1 className="text-heading font-semibold text-foreground">My stickers</h1>
        <p className="text-body text-muted-foreground">
          You have {earnedStickers.length} stickers, {earlyStudent.firstName}
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
                {sticker.label}
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
              {sticker.label}
            </span>
          </div>
        ))}
      </div>

      <p className="text-small text-muted-foreground">
        Keep going to collect the rest.
      </p>
    </div>
  )
}
