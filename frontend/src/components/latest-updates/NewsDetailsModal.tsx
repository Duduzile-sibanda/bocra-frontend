import { useEffect, useRef } from 'react'
import type { NewsArticle } from '../../types/news'

type NewsDetailsModalProps = {
  article: NewsArticle | null
  isOpen: boolean
  onClose: () => void
}

function formatDate(dateISO: string) {
  return new Intl.DateTimeFormat('en-BW', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateISO))
}

function NewsDetailsModal({ article, isOpen, onClose }: NewsDetailsModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    lastFocusedRef.current = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      lastFocusedRef.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen || !article) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 transition-opacity"
      onClick={(event) => {
        if (event.currentTarget === event.target) onClose()
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="news-details-title"
        className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <img src={article.imageSrc} alt={article.imageAlt} className="h-56 w-full object-cover sm:h-64" />
        <div className="max-h-[calc(92vh-224px)] space-y-4 overflow-y-auto p-6 sm:max-h-[calc(92vh-256px)] sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-slate-600">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{article.category}</span>
              <span>{formatDate(article.dateISO)}</span>
              <span>{article.readTime}</span>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
              aria-label="Close news details"
            >
              X
            </button>
          </div>

          <h2 id="news-details-title" className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {article.title}
          </h2>

          <div className="space-y-3 text-slate-700">
            {article.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetailsModal
