import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  FileQuestion,
  Image,
  PenLine,
  Play,
  Shapes,
  Volume2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { courses } from '@/data/seed'
import type { StringKey } from '@/i18n'
import type { ActivityKind } from '@/types'

/**
 * Opening an activity, Grade 3 and above.
 *
 * The hole this fills: a student could browse a course and never open
 * anything in it, while a six year old in the early tier could. Everything
 * else in the upper tier assumed a learner who only ever takes quizzes.
 *
 * Full screen with no sidebar, for the same reason as the quiz runner. A
 * student working through a lesson should not be one stray click from the
 * gradebook, and the thing they are reading deserves the whole window.
 *
 * Three controls are persistent along the bottom, because a learner always
 * needs them and should never have to scroll to find them: where they are in
 * the activity, a way back and forward, and a way to say they have finished.
 *
 * Read aloud sits on the content rather than in a settings page. Text to
 * speech is in the launch accessibility requirements and the profile screen
 * already offers it as a preference, but a preference buried two screens away
 * is not the same as a speaker icon next to the paragraph a student cannot
 * decode today.
 */

const kindIcon: Record<ActivityKind, typeof Play> = {
  lesson: Play,
  'interactive-book': BookOpen,
  quiz: FileQuestion,
  manipulative: Shapes,
  assignment: PenLine,
}

const kindLabel: Record<ActivityKind, StringKey> = {
  lesson: 'stuKindLesson',
  'interactive-book': 'stuKindBook',
  quiz: 'stuKindQuiz',
  manipulative: 'stuKindManipulative',
  assignment: 'stuKindAssignment',
}

interface Step {
  id: string
  title: string
  body: string
  /** Only the book spreads carry one. */
  caption?: string
}

export function StudentLessonPlayer() {
  const { courseId = '', activityId = '' } = useParams()
  const navigate = useNavigate()
  const { t, locale } = useLocale()

  const course = courses.find((item) => item.id === courseId)
  const unit = course?.units.find((item) =>
    item.activities.some((activity) => activity.id === activityId),
  )
  const activity = unit?.activities.find((item) => item.id === activityId)

  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)
  const [reading, setReading] = useState(false)

  /*
   * Built inside the component so the prose follows the locale, the same way
   * the quiz runner builds its questions. A lesson is several short sections
   * rather than one wall of text, because a section is the unit a learner can
   * stop at and come back to.
   */
  const steps: Step[] = useMemo(() => {
    switch (activity?.kind) {
      case 'lesson':
        return [
          { id: 's1', title: t('stuLesson1Title'), body: t('stuLesson1Body') },
          { id: 's2', title: t('stuLesson2Title'), body: t('stuLesson2Body') },
          { id: 's3', title: t('stuLesson3Title'), body: t('stuLesson3Body') },
          { id: 's4', title: t('stuLesson4Title'), body: t('stuLesson4Body') },
        ]
      case 'interactive-book':
        return [
          {
            id: 'p1',
            title: t('stuBook1Title'),
            body: t('stuBook1Body'),
            caption: t('stuBook1Caption'),
          },
          {
            id: 'p2',
            title: t('stuBook2Title'),
            body: t('stuBook2Body'),
            caption: t('stuBook2Caption'),
          },
          {
            id: 'p3',
            title: t('stuBook3Title'),
            body: t('stuBook3Body'),
            caption: t('stuBook3Caption'),
          },
        ]
      case 'manipulative':
        return [{ id: 'm1', title: t('stuToolName'), body: t('stuToolBody') }]
      case 'assignment':
        return [{ id: 'a1', title: t('stuAssignmentWhatToDo'), body: t('stuAssignmentBody') }]
      default:
        return [{ id: 'q1', title: t('stuQuizHereTitle'), body: t('stuQuizHereBody') }]
    }
  }, [activity?.kind, t])

  if (!course || !activity) {
    return (
      <div className="grid h-screen place-items-center bg-surface p-6">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-3 p-6">
            <p className="text-subheading font-semibold text-foreground">
              {t('stuActivityNotFound')}
            </p>
            <p className="text-small text-muted-foreground">{t('stuActivityNotFoundBody')}</p>
            <Button variant="outline" size="sm" asChild>
              <Link to={courseId ? `/student/courses/${courseId}` : '/student/courses'}>
                {t('stuBackToCourse')}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const Icon = kindIcon[activity.kind]
  const step = steps[index]
  const last = index === steps.length - 1
  const courseLink = `/student/courses/${course.id}`

  // Finishing always lands back in the course, so the next thing to do is the
  // first thing a student sees after closing this.
  const finish = () => {
    setDone(true)
    navigate(courseLink)
  }

  return (
    <div className="flex h-screen flex-col bg-surface">
      <header className="flex flex-none flex-wrap items-center gap-4 border-b border-border bg-background px-5 py-3">
        <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-muted text-foreground">
          <Icon className="h-4 w-4" aria-hidden />
        </span>

        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-small font-semibold text-foreground">
            {locale === 'ar' ? activity.titleAr : activity.title}
          </span>
          <span className="block truncate text-caption text-muted-foreground">
            {locale === 'ar' ? course.titleAr : course.title} ·{' '}
            {locale === 'ar' ? unit?.titleAr : unit?.title}
          </span>
        </span>

        <Badge variant="outline" className="flex-none">
          {t(kindLabel[activity.kind])}
        </Badge>

        {/*
          The speaker is in the chrome rather than inline next to every
          paragraph. One control that reads whatever is on screen is simpler
          to explain to a child and does not clutter the prose, and it stays
          in the same place as the student moves through the steps.
        */}
        <Button
          variant={reading ? 'outline' : 'ghost'}
          size="sm"
          aria-pressed={reading}
          onClick={() => setReading(!reading)}
        >
          <Volume2 className={cn('h-3.5 w-3.5', reading && 'text-accent')} aria-hidden />
          {reading ? t('stuStopReading') : t('stuReadAloud')}
        </Button>

        <Button variant="ghost" size="sm" asChild>
          <Link to={courseLink}>{t('stuLeave')}</Link>
        </Button>
      </header>

      <div className="h-1 w-full flex-none bg-muted">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${((index + 1) / steps.length) * 100}%` }}
        />
      </div>

      <main className="min-h-0 flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto max-w-3xl space-y-5">
          {reading ? (
            <p className="flex items-center gap-2 text-caption text-muted-foreground">
              <Volume2 className="h-3.5 w-3.5 text-accent" aria-hidden />
              {t('stuReadingNow')}
            </p>
          ) : null}

          {activity.kind === 'lesson' ? (
            <Card>
              <CardContent className="space-y-4 p-6 lg:p-8">
                <h1 className="text-subheading font-semibold text-foreground">{step.title}</h1>
                <p
                  className={cn(
                    'text-body leading-relaxed text-foreground',
                    // The read aloud highlight is a tint, never a colour that
                    // carries meaning elsewhere in the system.
                    reading && 'rounded bg-accent/10 px-3 py-2',
                  )}
                >
                  {step.body}
                </p>

                {/*
                  A placeholder, labelled with what the figure would show. An
                  empty grey box tells a reviewer nothing about whether the
                  figure earns its space.
                */}
                <figure className="space-y-2">
                  <div className="grid h-56 place-items-center rounded border border-dashed border-border-strong bg-surface">
                    <Image className="h-8 w-8 text-muted-foreground" aria-hidden />
                  </div>
                  <figcaption className="text-caption text-muted-foreground">
                    {t('stuDiagramNote')}
                  </figcaption>
                </figure>
              </CardContent>
            </Card>
          ) : null}

          {activity.kind === 'interactive-book' ? (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="neutral">
                  {t('stuPagesNandM')
                    .replace('{n}', String(index * 2 + 1))
                    .replace('{m}', String(index * 2 + 2))}
                </Badge>
                <span className="min-w-0 flex-1 text-small font-semibold text-foreground">
                  {step.title}
                </span>
              </div>

              {/*
                A real spread, two pages side by side, because that is how the
                printed book these titles come from is read and a learner who
                knows the paper edition should recognise the page they are on.
                It stacks on a narrow screen rather than shrinking to unreadable.
              */}
              <div className="grid gap-3 md:grid-cols-2">
                <Card>
                  <CardContent className="space-y-3 p-6">
                    <span className="block text-caption text-muted-foreground">
                      {t('stuPageN').replace('{n}', String(index * 2 + 1))}
                    </span>
                    <p
                      className={cn(
                        'text-body leading-relaxed text-foreground',
                        reading && 'rounded bg-accent/10 px-3 py-2',
                      )}
                    >
                      {step.body}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="space-y-3 p-6">
                    <span className="block text-caption text-muted-foreground">
                      {t('stuPageN').replace('{n}', String(index * 2 + 2))}
                    </span>
                    <div className="grid h-48 place-items-center rounded border border-dashed border-border-strong bg-surface">
                      <Image className="h-8 w-8 text-muted-foreground" aria-hidden />
                    </div>
                    <p className="text-caption text-muted-foreground">{step.caption}</p>
                  </CardContent>
                </Card>
              </div>

              {/*
                Page turns sit on the book itself as well as in the footer. In
                a book the turn belongs to the page, and a reader reaches for
                the edge of the spread rather than the bottom of the window.
              */}
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={index === 0}
                  onClick={() => setIndex(index - 1)}
                >
                  <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                  {t('stuPreviousPages')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={last}
                  onClick={() => setIndex(index + 1)}
                >
                  {t('stuNextPages')}
                  <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
                </Button>
              </div>
            </div>
          ) : null}

          {activity.kind === 'manipulative' ? (
            <Card>
              <CardContent className="space-y-4 p-6 lg:p-8">
                <h1 className="text-subheading font-semibold text-foreground">{step.title}</h1>
                <p
                  className={cn(
                    'text-body leading-relaxed text-foreground',
                    reading && 'rounded bg-accent/10 px-3 py-2',
                  )}
                >
                  {step.body}
                </p>
                <div className="grid h-72 place-items-center gap-2 rounded border border-dashed border-border-strong bg-surface">
                  <Shapes className="h-8 w-8 text-muted-foreground" aria-hidden />
                  <span className="text-small text-muted-foreground">
                    {t('stuToolPlaceholder')}
                  </span>
                </div>
                {/*
                  Said plainly, because a learner who thinks the tool is being
                  marked will stop experimenting with it, which is the one
                  thing a manipulative exists for.
                */}
                <p className="text-caption text-muted-foreground">{t('stuToolNote')}</p>
              </CardContent>
            </Card>
          ) : null}

          {activity.kind === 'assignment' || activity.kind === 'quiz' ? (
            <Card>
              <CardContent className="space-y-4 p-6 lg:p-8">
                <h1 className="text-subheading font-semibold text-foreground">{step.title}</h1>
                <p
                  className={cn(
                    'text-body leading-relaxed text-foreground',
                    reading && 'rounded bg-accent/10 px-3 py-2',
                  )}
                >
                  {step.body}
                </p>
                {/*
                  Graded work is started from the assignments list, not from
                  here. Two doors into the same attempt is how a student ends
                  up with a timer running on a screen they thought was reading.
                */}
                <p className="text-small text-muted-foreground">{t('stuHandInThereNote')}</p>
                <Button variant="accent" size="sm" asChild>
                  <Link to="/student/assignments">{t('stuOpenInAssignments')}</Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}

          <p className="text-caption text-muted-foreground">{t('stuDoneNote')}</p>
        </div>
      </main>

      <footer className="flex flex-none flex-wrap items-center gap-3 border-t border-border bg-background px-5 py-3">
        <Button
          variant="ghost"
          size="sm"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
          {t('back')}
        </Button>

        {/*
          Dots and a sentence together. The dots are read at a glance, the
          sentence is what a screen reader announces and what a learner needs
          when there are more steps than dots worth counting.
        */}
        <span className="flex min-w-0 flex-1 items-center justify-center gap-3">
          <span className="flex flex-none gap-1.5" aria-hidden>
            {steps.map((item, position) => (
              <span
                key={item.id}
                className={cn(
                  'h-2 w-2 rounded-full',
                  position < index
                    ? 'bg-foreground'
                    : position === index
                      ? 'bg-accent'
                      : 'bg-muted',
                )}
              />
            ))}
          </span>
          <span className="text-caption text-muted-foreground">
            {t('stuStepNofM')
              .replace('{n}', String(index + 1))
              .replace('{m}', String(steps.length))}
          </span>
        </span>

        <Button
          variant={done ? 'outline' : 'ghost'}
          size="sm"
          aria-pressed={done}
          onClick={() => setDone(!done)}
        >
          <Check className={cn('h-3.5 w-3.5', done && 'text-success')} aria-hidden />
          {done ? t('stuMarkedDone') : t('stuMarkAsDone')}
        </Button>

        {last ? (
          <Button variant="accent" size="sm" onClick={finish}>
            {t('stuFinishActivity')}
          </Button>
        ) : (
          <Button variant="accent" size="sm" onClick={() => setIndex(index + 1)}>
            {t('next')}
            <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" aria-hidden />
          </Button>
        )}
      </footer>
    </div>
  )
}
