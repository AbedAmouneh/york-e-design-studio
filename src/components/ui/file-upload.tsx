import { useId, useRef, useState, type DragEvent } from 'react'
import { FileUp, Paperclip, X } from 'lucide-react'
import { useLocale } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { FieldError } from '@/components/ui/input'

/**
 * File upload.
 *
 * A real `<input type="file">` behind a drop zone, not a styled div that only
 * answers to a mouse. The bulk import screen drew its own zone and accepted
 * nothing at all, which looked finished in a screenshot and failed the moment
 * anyone tried it.
 *
 * Three things a hand drawn drop zone usually misses, all handled here:
 *
 *   Keyboard. The whole control is a label wrapping a real input, so Tab
 *   reaches it and Space opens the file dialog, with no key handler of our
 *   own. Drag and drop is an addition on top, never the only way in.
 *
 *   Rejection. A file of the wrong type or over the size limit is named and
 *   explained rather than silently dropped. Silently dropping is how a person
 *   ends up believing they have uploaded their spreadsheet.
 *
 *   The list. Chosen files are listed with their size and a remove button.
 *   Without it the only evidence of a successful choice is the file name
 *   inside a native control, which is invisible once the zone is restyled.
 *
 * It holds files in state and does not send them anywhere, which is correct
 * for the studio and the one thing to change first in the real build.
 */

function formatSize(bytes: number, locale: 'en' | 'ar') {
  // Matches the tags in `lib/utils`, which explain the choice of country.
  const tag = locale === 'ar' ? 'ar-LB-u-nu-latn' : 'en-GB'
  const kb = bytes / 1024
  if (kb < 1024) return `${new Intl.NumberFormat(tag, { maximumFractionDigits: 0 }).format(kb)} KB`
  return `${new Intl.NumberFormat(tag, { maximumFractionDigits: 1 }).format(kb / 1024)} MB`
}

export function FileUpload({
  accept,
  /** Human readable, for the hint line. The `accept` string is for the browser, not the reader. */
  acceptHint,
  multiple = false,
  maxBytes,
  disabled = false,
  className,
}: {
  accept?: string
  acceptHint?: string
  multiple?: boolean
  maxBytes?: number
  disabled?: boolean
  className?: string
}) {
  const { t, locale } = useLocale()
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [rejected, setRejected] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const matchesAccept = (file: File) => {
    if (!accept) return true
    return accept.split(',').some((rule) => {
      const pattern = rule.trim().toLowerCase()
      if (!pattern) return false
      if (pattern.startsWith('.')) return file.name.toLowerCase().endsWith(pattern)
      if (pattern.endsWith('/*')) return file.type.startsWith(pattern.slice(0, -1))
      return file.type.toLowerCase() === pattern
    })
  }

  const take = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return
    const list = Array.from(incoming)

    const wrongType = list.find((file) => !matchesAccept(file))
    if (wrongType) {
      setRejected(t('fuWrongType').replace('{n}', wrongType.name))
      return
    }

    const tooBig = maxBytes ? list.find((file) => file.size > maxBytes) : undefined
    if (tooBig && maxBytes) {
      setRejected(
        t('fuTooBig')
          .replace('{n}', tooBig.name)
          .replace('{s}', formatSize(maxBytes, locale)),
      )
      return
    }

    setRejected(null)
    setFiles((current) => (multiple ? [...current, ...list] : list.slice(0, 1)))
  }

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setDragging(false)
    if (disabled) return
    take(event.dataTransfer.files)
  }

  const remove = (index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index))
    // Clearing the input matters: without it, choosing the same file again
    // fires no change event and the person thinks the control is broken.
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={cn('min-w-0 space-y-2', className)}>
      <label
        htmlFor={inputId}
        onDragOver={(event) => {
          event.preventDefault()
          if (!disabled) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          'flex cursor-pointer flex-col items-center gap-2 rounded border border-dashed px-6 py-8 text-center transition-colors',
          'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background',
          dragging ? 'border-foreground bg-muted' : 'border-border-strong bg-surface',
          disabled && 'cursor-not-allowed opacity-50',
          rejected && 'border-danger',
        )}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(event) => take(event.target.files)}
          className="sr-only"
        />
        <FileUp className="h-5 w-5 text-muted-foreground" aria-hidden />
        <span className="text-small font-medium text-foreground">{t('fuDropHere')}</span>
        <span className="text-caption text-muted-foreground">
          {acceptHint ? `${acceptHint} · ` : ''}
          {maxBytes ? t('fuMaxSize').replace('{s}', formatSize(maxBytes, locale)) : null}
        </span>
      </label>

      {rejected ? <FieldError>{rejected}</FieldError> : null}

      {files.length > 0 ? (
        <ul className="space-y-1.5">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-2.5 rounded border border-border bg-background px-3 py-2"
            >
              <Paperclip className="h-3.5 w-3.5 flex-none text-muted-foreground" aria-hidden />
              <span className="min-w-0 flex-1 truncate text-small text-foreground">
                {file.name}
              </span>
              <span className="tabular flex-none text-caption text-muted-foreground">
                {formatSize(file.size, locale)}
              </span>
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex-none rounded p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="h-3.5 w-3.5" aria-hidden />
                <span className="sr-only">{t('fuRemove').replace('{n}', file.name)}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
