import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/**
 * The number card used at the top of every role's landing screen.
 *
 * Lifted out of the school admin overview once the teacher screens needed the
 * same thing. One definition means the display figure is the same size and
 * weight whichever role you are looking at, which matters on the canvas where
 * the roles sit side by side.
 */
export function StatCard({
  label,
  value,
  hint,
  emphasis,
}: {
  label: string
  value: string
  hint?: string
  emphasis?: boolean
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="text-small text-muted-foreground">{label}</span>
        {emphasis ? <Badge variant="warning">!</Badge> : null}
      </div>
      <p className="tabular mt-2 text-display font-semibold leading-none text-foreground">{value}</p>
      {hint ? <p className="mt-1.5 text-caption text-muted-foreground">{hint}</p> : null}
    </Card>
  )
}
