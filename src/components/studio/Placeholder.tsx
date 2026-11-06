import { Construction } from 'lucide-react'

/**
 * A named but undesigned screen. Every frame in the inventory gets one of
 * these from the start, so a reviewer can see that a screen is planned rather
 * than forgotten.
 */
export function Placeholder({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mx-auto max-w-[1180px] p-6">
      <div className="flex min-h-[360px] flex-col items-center justify-center gap-3 rounded border border-dashed border-border-strong bg-background p-10 text-center">
        <Construction className="h-6 w-6 text-muted-foreground" aria-hidden />
        <h2 className="text-subheading font-semibold text-foreground">{title}</h2>
        <p className="max-w-[46ch] text-small text-muted-foreground">
          {note ?? 'Planned in the screen inventory. Not designed yet.'}
        </p>
      </div>
    </div>
  )
}
