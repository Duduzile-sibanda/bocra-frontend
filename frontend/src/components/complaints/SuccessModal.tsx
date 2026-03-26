import { useEffect, useRef, useState } from 'react'
import { FiCheck, FiCheckCircle, FiCopy } from 'react-icons/fi'
import ActionButton from '../ui/ActionButton'

type SuccessModalProps = {
  isOpen: boolean
  onClose: () => void
  trackingId: string
  onTrackComplaint?: () => void
  onSubmitAnother?: () => void
  title?: string
  message?: string
  trackActionLabel?: string
  submitAnotherLabel?: string
}

const ANIMATION_MS = 180

function SuccessModal({
  isOpen,
  onClose,
  trackingId,
  onTrackComplaint,
  onSubmitAnother,
  title = 'Complaint Submitted Successfully',
  message = 'Please save this reference ID to track your complaint',
  trackActionLabel = 'Track Complaint',
  submitAnotherLabel = 'Submit Another',
}: SuccessModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const [isMounted, setIsMounted] = useState<boolean>(isOpen)
  const [isVisible, setIsVisible] = useState<boolean>(isOpen)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      setIsCopied(false)
      const raf = requestAnimationFrame(() => setIsVisible(true))
      return () => cancelAnimationFrame(raf)
    }

    setIsVisible(false)
    const timeout = window.setTimeout(() => setIsMounted(false), ANIMATION_MS)
    return () => window.clearTimeout(timeout)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null

    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    const focusFirstElement = () => {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector)
      if (focusable && focusable.length > 0) focusable[0].focus()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return
      // Keep keyboard focus inside the dialog while it is open.
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector)
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const current = document.activeElement as HTMLElement | null

      if (event.shiftKey && current === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    focusFirstElement()
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [isOpen, onClose])

  if (!isMounted) return null

  const fallbackCopy = (value: string) => {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const copied = document.execCommand('copy')
    document.body.removeChild(textarea)
    return copied
  }

  const handleCopyTrackingId = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(trackingId)
      } else {
        const copied = fallbackCopy(trackingId)
        if (!copied) throw new Error('Fallback copy failed')
      }
      setIsCopied(true)
      window.setTimeout(() => setIsCopied(false), 1400)
    } catch {
      setIsCopied(false)
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-200 ${
        isVisible ? 'bg-slate-900/45 opacity-100' : 'bg-slate-900/0 opacity-0'
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-modal-title"
        className={`w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex items-start gap-3">
          <FiCheckCircle aria-hidden="true" className="mt-0.5 h-7 w-7 text-green-600" />
          <div className="w-full">
            <h2 id="success-modal-title" className="text-xl font-bold text-slate-900">
              {title}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{message}</p>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
              <p className="font-mono text-sm font-semibold text-green-800">{trackingId}</p>
              <button
                type="button"
                onClick={handleCopyTrackingId}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-green-300 bg-white text-green-800 transition hover:bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300"
                aria-label={isCopied ? 'Tracking ID copied' : 'Copy tracking ID'}
                title={isCopied ? 'Copied' : 'Copy tracking ID'}
              >
                {isCopied ? <FiCheck /> : <FiCopy />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {onTrackComplaint ? (
            <ActionButton onClick={onTrackComplaint} variant="primary">
              {trackActionLabel}
            </ActionButton>
          ) : null}
          {onSubmitAnother ? (
            <ActionButton onClick={onSubmitAnother} variant="secondary">
              {submitAnotherLabel}
            </ActionButton>
          ) : null}
          <ActionButton onClick={onClose} variant="secondary">
            Close
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
