import type { ReactNode } from 'react'

/**
 * Every screen opens the same way: title, one line of context, actions on the
 * inline end. Keeping this in one place is what stops 94 screens drifting.
 */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-heading font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle ? <p className="mt-1 text-small text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-none items-center gap-2">{actions}</div> : null}
    </header>
  )
}

export function Page({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[1180px] space-y-5 p-6">{children}</div>
}
