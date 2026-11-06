import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Minus, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLocale } from '@/lib/i18n'
import { allFrames, builtCount, frameSections, totalCount, type Frame } from '@/data/frames'

/**
 * The canvas.
 *
 * Every screen side by side, which is the thing a slide deck of screenshots
 * cannot do: you see the whole product at once and the gaps are as visible as
 * the finished parts.
 *
 * Each frame is a real iframe of the running app rather than a picture, so
 * nothing here can drift out of date, and a reviewer can click into any frame
 * and use it. They are loaded only when they scroll into view, because forty
 * two React apps mounting at once is not a review experience.
 *
 * The frame is rendered at 1440 by 900 and scaled down. That keeps every frame
 * at the same desktop breakpoint rather than each one reflowing to whatever
 * width the zoom happens to give it.
 */

const FRAME_W = 1440
const FRAME_H = 900

const zoomSteps = [0.16, 0.22, 0.3, 0.42, 0.6]

export function Canvas() {
  const { locale } = useLocale()
  const [zoomIndex, setZoomIndex] = useState(1)
  const [active, setActive] = useState(frameSections[0].id)
  const zoom = zoomSteps[zoomIndex]

  const scrollRef = useRef<HTMLDivElement>(null)

  const goToSection = (id: string) => {
    setActive(id)
    const target = document.getElementById(`section-${id}`)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex h-full">
      <aside className="flex w-sidebar flex-none flex-col border-e border-border bg-background">
        <div className="flex-none border-b border-border px-4 py-3">
          <p className="text-small font-semibold text-foreground">Frames</p>
          <p className="mt-0.5 text-caption text-muted-foreground">
            {builtCount} of {totalCount} built
          </p>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${(builtCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {frameSections.map((section) => {
            const built = section.frames.filter((frame) => frame.built).length
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => goToSection(section.id)}
                className={cn(
                  'flex w-full items-center gap-2 rounded px-3 py-2 text-start text-small transition-colors',
                  active === section.id
                    ? 'bg-muted font-medium text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <span className="min-w-0 flex-1 truncate">{section.title}</span>
                <span
                  className={cn(
                    'tabular flex-none text-caption',
                    built === section.frames.length ? 'text-success' : 'text-muted-foreground',
                  )}
                >
                  {built}/{section.frames.length}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="flex flex-none items-center gap-2 border-t border-border p-3">
          <Button
            variant="outline"
            size="sm"
            aria-label="Zoom out"
            disabled={zoomIndex === 0}
            onClick={() => setZoomIndex(zoomIndex - 1)}
          >
            <Minus className="h-3.5 w-3.5" aria-hidden />
          </Button>
          <span className="tabular flex-1 text-center text-caption text-muted-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            aria-label="Zoom in"
            disabled={zoomIndex === zoomSteps.length - 1}
            onClick={() => setZoomIndex(zoomIndex + 1)}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
          </Button>
        </div>
      </aside>

      <div ref={scrollRef} className="min-w-0 flex-1 overflow-auto bg-surface-sunken p-6">
        <header className="mb-6">
          <h1 className="text-heading font-semibold text-foreground">York-E 3.0, every screen</h1>
          <p className="mt-1 max-w-[70ch] text-small text-muted-foreground">
            Live frames, not screenshots. Click into any one and use it. Grey frames are screens
            that are planned and not built yet, which is deliberate: the gaps should be as easy to
            see as the finished work.
          </p>
        </header>

        {frameSections.map((section) => (
          <section key={section.id} id={`section-${section.id}`} className="mb-10 scroll-mt-6">
            <div className="mb-3 flex flex-wrap items-baseline gap-3">
              <h2 className="text-subheading font-semibold text-foreground">{section.title}</h2>
              <Badge variant="outline">
                {section.frames.filter((frame) => frame.built).length} of {section.frames.length}
              </Badge>
              <p className="text-small text-muted-foreground">{section.blurb}</p>
            </div>

            <div
              className="flex flex-wrap gap-5"
              style={{ direction: 'ltr' }}
              /* The canvas itself stays left to right even in Arabic. It is a
                 map of the product, not part of the product. */
            >
              {section.frames.map((frame) => (
                <FrameCard key={frame.n} frame={frame} zoom={zoom} locale={locale} />
              ))}
            </div>
          </section>
        ))}

        <p className="pb-10 text-caption text-muted-foreground">
          {allFrames.length} frames in total.
        </p>
      </div>
    </div>
  )
}

function FrameCard({ frame, zoom, locale }: { frame: Frame; zoom: number; locale: string }) {
  const holder = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = holder.current
    if (!node || !frame.built) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [frame.built])

  const width = FRAME_W * zoom
  const height = FRAME_H * zoom

  return (
    <figure className="flex flex-col gap-2" style={{ width }}>
      <div
        ref={holder}
        className={cn(
          'relative overflow-hidden rounded border bg-background',
          frame.built ? 'border-border' : 'border-dashed border-border-strong',
        )}
        style={{ width, height }}
      >
        {frame.built && visible ? (
          <iframe
            // The locale is in the key so flipping to Arabic reloads every
            // frame rather than leaving half the canvas in English.
            key={locale}
            title={frame.title}
            src={`${import.meta.env.BASE_URL}#${frame.path}?bare=1`}
            className="origin-top-left border-0"
            style={{
              width: FRAME_W,
              height: FRAME_H,
              transform: `scale(${zoom})`,
            }}
            loading="lazy"
            tabIndex={-1}
          />
        ) : frame.built ? (
          <div className="grid h-full place-items-center">
            <span className="text-caption text-muted-foreground">Loading</span>
          </div>
        ) : (
          <div className="grid h-full place-items-center px-3 text-center">
            <span className="text-caption text-muted-foreground">Not built yet</span>
          </div>
        )}
      </div>

      <figcaption className="flex items-start gap-2">
        <span className="tabular flex-none text-caption text-muted-foreground">{frame.n}</span>
        <span className="min-w-0 flex-1 leading-tight">
          <span
            className={cn(
              'block truncate text-caption font-medium',
              frame.built ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {frame.title}
          </span>
          {frame.note ? (
            <span className="block truncate text-caption text-muted-foreground">{frame.note}</span>
          ) : null}
        </span>
        {frame.proposed ? <Badge variant="warning">Proposed</Badge> : null}
        {frame.built ? (
          <a
            href={`${import.meta.env.BASE_URL}#${frame.path}`}
            target="_blank"
            rel="noreferrer"
            className="flex-none text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Open ${frame.title}`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        ) : null}
      </figcaption>
    </figure>
  )
}
