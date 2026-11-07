import { useState } from 'react'
import { Hand, HelpCircle, MousePointerClick, Volume2, VolumeX } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { StringKey } from '@/i18n'

/**
 * Help, K1 to Grade 3.
 *
 * A six year old cannot read a FAQ, cannot search, and will not describe a
 * problem in words an adult would recognise. So help at this age is three
 * pictures for the three things that actually go wrong on a tablet, and one
 * large button for the thing that actually solves them in a classroom, which
 * is a teacher walking over.
 *
 * Asking the teacher is the primary action and sits first, not last. Putting
 * the self service answers above it would be the adult pattern, where the
 * child is expected to exhaust the options before bothering anyone. In a
 * classroom the adult is two metres away and that is the right first move.
 *
 * Nothing here counts anything, and nothing here suggests the child did
 * something wrong. A mis-tap is a mis-tap, not a mistake.
 */

const problems: Array<{
  id: string
  labelKey: StringKey
  answerKey: StringKey
  icon: typeof VolumeX
}> = [
  { id: 'sound', labelKey: 'erlNoSound', answerKey: 'erlNoSoundHelp', icon: VolumeX },
  { id: 'stuck', labelKey: 'erlStuck', answerKey: 'erlStuckHelp', icon: HelpCircle },
  {
    id: 'mistap',
    labelKey: 'erlTappedByMistake',
    answerKey: 'erlTappedByMistakeHelp',
    icon: MousePointerClick,
  },
]

export function EarlyHelp() {
  const { t } = useLocale()
  const [handUp, setHandUp] = useState(false)
  const [openProblem, setOpenProblem] = useState<string | null>(null)

  return (
    <div className="space-y-6 pb-4">
      <div className="space-y-1">
        <h1 className="text-heading font-semibold text-foreground">{t('erlHelpTitle')}</h1>
        <div className="flex items-center gap-3">
          <p className="text-body text-muted-foreground">{t('erlHelpIntro')}</p>
          {/*
            The same speaker the child already knows from doing an activity.
            A help page a child cannot read is not help.
          */}
          <button
            type="button"
            aria-label={t('erlReadThisToMe')}
            className="grid h-11 w-11 flex-none place-items-center rounded-full bg-primary/10 text-primary"
          >
            <Volume2 className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {/*
        The teacher button is the biggest thing on the screen and stays at the
        top whether or not the hand is already up, so a child who taps it twice
        is never confused about whether it worked.
      */}
      {handUp ? (
        <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 flex-none place-items-center rounded-full bg-primary-foreground text-primary">
              <Hand className="h-8 w-8" aria-hidden />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-subheading font-semibold">
                {t('erlTeacherIsComing')}
              </span>
              <span className="mt-1 block text-body opacity-80">
                {t('erlTeacherIsComingBody')}
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setHandUp(false)}
            className="mt-5 rounded-full bg-primary-foreground px-8 py-3.5 text-body font-semibold text-primary"
          >
            {t('erlIAmOkayNow')}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setHandUp(true)}
          className="flex w-full items-center gap-4 rounded-2xl bg-primary p-6 text-start text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          <span className="grid h-16 w-16 flex-none place-items-center rounded-full bg-primary-foreground text-primary">
            <Hand className="h-8 w-8" aria-hidden />
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block text-subheading font-semibold">{t('erlAskTeacher')}</span>
            <span className="mt-1 block text-body opacity-80">{t('erlAskTeacherBody')}</span>
          </span>
        </button>
      )}

      {/*
        Three problems, no more. A longer list is a reading task, and the
        child who needs this page is the one least able to do a reading task.
        The answer opens in place rather than on another screen, because a
        child who navigates away loses the thing they were stuck on.
      */}
      <div className="grid gap-3 sm:grid-cols-3">
        {problems.map((problem) => {
          const Icon = problem.icon
          const open = openProblem === problem.id
          return (
            <div key={problem.id} className="space-y-3">
              <button
                type="button"
                onClick={() => setOpenProblem(open ? null : problem.id)}
                className={cn(
                  'flex w-full flex-col items-center gap-3 rounded-2xl p-5 text-center transition-colors',
                  open ? 'bg-primary/10' : 'bg-surface hover:bg-primary/10',
                )}
              >
                <span
                  className={cn(
                    'grid h-16 w-16 place-items-center rounded-full',
                    open ? 'bg-primary text-primary-foreground' : 'bg-background text-primary',
                  )}
                >
                  <Icon className="h-8 w-8" aria-hidden />
                </span>
                <span className="text-body font-semibold leading-tight text-foreground">
                  {t(problem.labelKey)}
                </span>
              </button>

              {open ? (
                <div className="space-y-3 rounded-2xl bg-surface p-5">
                  <p className="text-body leading-relaxed text-foreground">
                    {t(problem.answerKey)}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpenProblem(null)}
                    className="rounded-full bg-primary px-7 py-3 text-body font-semibold text-primary-foreground"
                  >
                    {t('erlOkay')}
                  </button>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <p className="text-small text-muted-foreground">{t('erlAskingIsOkay')}</p>
    </div>
  )
}
