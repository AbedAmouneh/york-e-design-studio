import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Minimize2,
  PenLine,
  Timer,
  Users,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { studentsInClass, fullName } from '@/data/teacher'

/**
 * Classroom presentation mode.
 *
 * The only screen in the whole studio with no sidebar and no chrome, because
 * it is projected onto a wall and read from the back of a room. Everything is
 * larger, the palette is inverted so a bright projector does not wash it out,
 * and the controls disappear until the teacher moves the mouse.
 *
 * The live responses strip is the reason this is worth building rather than
 * using a PDF: the teacher can see who has answered without asking.
 */

const slides = [
  {
    titleKey: 'tchSlide1Title',
    bodyKey: 'tchSlide1Body',
    kind: 'teach' as const,
  },
  {
    titleKey: 'tchSlide2Title',
    bodyKey: 'tchSlide2Body',
    kind: 'teach' as const,
  },
  {
    titleKey: 'tchSlide3Title',
    bodyKey: 'tchSlide3Body',
    kind: 'ask' as const,
  },
  {
    titleKey: 'tchSlide4Title',
    bodyKey: 'tchSlide4Body',
    kind: 'teach' as const,
  },
] as const

export function TeacherPresent() {
  const { t } = useLocale()
  const [index, setIndex] = useState(0)
  const slide = slides[index]
  const members = studentsInClass('cls-3').slice(0, 14)
  const answered = members.slice(0, 9)

  return (
    // h-screen rather than h-full: this route sits outside the studio shell,
    // so there is no sized parent to inherit a height from.
    <div className="flex h-screen flex-col bg-primary text-background">
      <header className="flex flex-none items-center gap-3 border-b border-background/15 px-5 py-3">
        <Badge variant="accent">Grade 6 Cedar</Badge>
        <span className="text-small text-background/70">
          {t('tchPresentMeta')
            .replace('{n}', String(index + 1))
            .replace('{m}', String(slides.length))}
        </span>
        <span className="ms-auto flex items-center gap-2 text-small text-background/70">
          <Timer className="h-4 w-4" aria-hidden />
          12:04
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="text-background hover:bg-background/10"
          asChild
        >
          <Link to="/teacher">
            <X className="h-4 w-4" aria-hidden />
            {t('tchExit')}
          </Link>
        </Button>
      </header>

      <main className="flex min-h-0 flex-1 flex-col items-center justify-center px-12 text-center">
        <p className="text-caption uppercase tracking-[0.2em] text-accent">
          {slide.kind === 'ask' ? t('tchQuestion') : t('tchExplanation')}
        </p>
        <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-tight">
          {t(slide.titleKey)}
        </h1>
        <p className="mt-6 max-w-[24ch] whitespace-pre-line text-[clamp(1.25rem,2.5vw,2rem)] leading-snug text-background/85">
          {t(slide.bodyKey)}
        </p>

        {slide.kind === 'ask' ? (
          <div className="mt-10 w-full max-w-3xl rounded border border-background/20 p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-small text-background/70">
                <Users className="h-4 w-4" aria-hidden />
                {t('tchHaveAnswered')
                  .replace('{n}', String(answered.length))
                  .replace('{m}', String(members.length))}
              </span>
              <Button variant="accent" size="sm">
                {t('tchShowAnswers')}
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {members.map((student, position) => {
                const hasAnswered = position < answered.length
                return (
                  <span
                    key={student.id}
                    title={fullName(student)}
                    className={cn(
                      'rounded px-2.5 py-1 text-caption transition-colors',
                      hasAnswered
                        ? 'bg-accent text-accent-foreground'
                        : 'border border-background/25 text-background/50',
                    )}
                  >
                    {student.firstName}
                  </span>
                )
              })}
            </div>
          </div>
        ) : null}
      </main>

      <footer className="flex flex-none items-center justify-between gap-3 border-t border-background/15 px-5 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-background hover:bg-background/10"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            <ChevronLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
            {t('back')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-background hover:bg-background/10"
            disabled={index === slides.length - 1}
            onClick={() => setIndex(index + 1)}
          >
            {t('next')}
            <ChevronRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </Button>
        </div>

        <div className="flex items-center gap-1.5">
          {slides.map((_, position) => (
            <button
              key={position}
              type="button"
              onClick={() => setIndex(position)}
              aria-label={t('tchSlideAria').replace('{n}', String(position + 1))}
              className={cn(
                'h-1.5 rounded-full transition-all',
                position === index ? 'w-6 bg-accent' : 'w-1.5 bg-background/30',
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-background hover:bg-background/10">
            <PenLine className="h-4 w-4" aria-hidden />
            {t('tchAnnotate')}
          </Button>
          <Button variant="ghost" size="sm" className="text-background hover:bg-background/10">
            <Minimize2 className="h-4 w-4" aria-hidden />
            {t('tchWindowed')}
          </Button>
        </div>
      </footer>
    </div>
  )
}
