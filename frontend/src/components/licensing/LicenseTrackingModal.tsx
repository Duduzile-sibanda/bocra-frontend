import { useEffect, useRef, useState, type FormEvent } from 'react'
import ActionButton from '../ui/ActionButton'

type SubmissionRecord = {
  trackingId: string
  email: string
  clientName: string
  licenseType: string
  submittedAt: string
  status: string
}

type LicenseTrackingModalProps = {
  isOpen: boolean
  onClose: () => void
}

const ANIMATION_MS = 180
const LAST_APPLICATION_KEY = 'lastApplication'

const MOCK_SUBMISSIONS: SubmissionRecord[] = [
  {
    trackingId: 'LIC-2026-48291',
    email: 'licensing@kalahari.co.bw',
    clientName: 'Kalahari Networks',
    licenseType: 'Spectrum Licence',
    submittedAt: '2026-02-10',
    status: 'Under Review',
  },
  {
    trackingId: 'LIC-2026-57321',
    email: 'admin@radiomart.co.bw',
    clientName: 'Gaborone Radio Mart',
    licenseType: 'Dealer',
    submittedAt: '2026-01-18',
    status: 'Approved',
  },
]

function LicenseTrackingModal({ isOpen, onClose }: LicenseTrackingModalProps) {
  const [isMounted, setIsMounted] = useState<boolean>(isOpen)
  const [isVisible, setIsVisible] = useState<boolean>(isOpen)
  const [trackingId, setTrackingId] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [trackingError, setTrackingError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [result, setResult] = useState<SubmissionRecord | null>(null)

  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      const raf = requestAnimationFrame(() => setIsVisible(true))
      return () => cancelAnimationFrame(raf)
    }
    setIsVisible(false)
    const timeout = window.setTimeout(() => setIsMounted(false), ANIMATION_MS)
    return () => window.clearTimeout(timeout)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const savedApplication = window.localStorage.getItem(LAST_APPLICATION_KEY)
    if (!savedApplication) return
    try {
      const parsed = JSON.parse(savedApplication) as { trackingId?: string; email?: string }
      if (parsed.trackingId) setTrackingId(parsed.trackingId)
      if (parsed.email) setEmail(parsed.email)
    } catch {
      // Ignore malformed values.
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    const focusFirst = () => {
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(selector)
      if (nodes && nodes.length > 0) nodes[0].focus()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(selector)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    focusFirst()
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [isOpen, onClose])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTrackingId = trackingId.trim()
    const trimmedEmail = email.trim().toLowerCase()
    const nextTrackingError = trimmedTrackingId ? '' : 'Tracking ID is required.'
    const nextEmailError = !trimmedEmail
      ? 'Email is required.'
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
        ? 'Please enter a valid email address.'
        : ''

    setTrackingError(nextTrackingError)
    setEmailError(nextEmailError)
    setError('')
    setResult(null)

    if (nextTrackingError || nextEmailError) return

    setIsLoading(true)
    await new Promise((resolve) => window.setTimeout(resolve, 800))

    const fromLocalStorage = (() => {
      const raw = window.localStorage.getItem(LAST_APPLICATION_KEY)
      if (!raw) return null
      try {
        const parsed = JSON.parse(raw) as { trackingId?: string; email?: string; licenseType?: string }
        if (!parsed.trackingId || !parsed.email) return null
        return {
          trackingId: parsed.trackingId,
          email: parsed.email.toLowerCase(),
          clientName: 'Latest Application',
          licenseType: parsed.licenseType ?? 'Not provided',
          submittedAt: new Date().toISOString().slice(0, 10),
          status: 'Submitted',
        } satisfies SubmissionRecord
      } catch {
        return null
      }
    })()

    const dataset = fromLocalStorage ? [fromLocalStorage, ...MOCK_SUBMISSIONS] : MOCK_SUBMISSIONS
    const match =
      dataset.find(
        (item) =>
          item.trackingId.toLowerCase() === trimmedTrackingId.toLowerCase() &&
          item.email.toLowerCase() === trimmedEmail,
      ) ?? null

    if (!match) {
      setError('Invalid tracking ID or email. Please check and try again.')
      setIsLoading(false)
      return
    }

    setResult(match)
    setIsLoading(false)
  }

  if (!isMounted) return null

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
        aria-labelledby="license-tracking-modal-title"
        className={`w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 id="license-tracking-modal-title" className="text-2xl font-bold tracking-tight text-slate-900">
              Track License Application
            </h2>
            <p className="mt-1 text-sm text-slate-600">Enter your tracking ID and email to check application status.</p>
          </div>
          <ActionButton onClick={onClose} variant="secondary">
            Close
          </ActionButton>
        </div>

        <form className="grid gap-3" onSubmit={handleSubmit}>
          <div className="grid gap-1.5">
            <label htmlFor="tracking-id" className="text-sm font-medium text-slate-900">
              Tracking ID
            </label>
            <input
              id="tracking-id"
              type="text"
              value={trackingId}
              onChange={(event) => setTrackingId(event.target.value)}
              placeholder="LIC-2026-12345"
              className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 transition focus-visible:outline-none focus-visible:ring-2 ${
                trackingError
                  ? 'border-red-400 bg-red-50 focus-visible:ring-red-300'
                  : 'border-slate-300 bg-white focus-visible:ring-slate-300'
              }`}
            />
            {trackingError ? <p className="text-sm text-red-700">{trackingError}</p> : null}
          </div>

          <div className="grid gap-1.5">
            <label htmlFor="tracking-email" className="text-sm font-medium text-slate-900">
              Email
            </label>
            <input
              id="tracking-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 transition focus-visible:outline-none focus-visible:ring-2 ${
                emailError
                  ? 'border-red-400 bg-red-50 focus-visible:ring-red-300'
                  : 'border-slate-300 bg-white focus-visible:ring-slate-300'
              }`}
            />
            {emailError ? <p className="text-sm text-red-700">{emailError}</p> : null}
          </div>

          <div className="mt-2">
            <ActionButton type="submit" disabled={isLoading}>
              {isLoading ? 'Checking...' : 'Check Status'}
            </ActionButton>
          </div>
        </form>

        {error ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        ) : null}

        {result ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-semibold text-slate-900">Application Result</h3>
            <dl className="mt-3 grid gap-2 text-sm text-slate-700">
              <div className="flex justify-between gap-4">
                <dt className="font-medium text-slate-900">Tracking ID</dt>
                <dd>{result.trackingId}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-medium text-slate-900">Email</dt>
                <dd>{result.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-medium text-slate-900">Client</dt>
                <dd>{result.clientName}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-medium text-slate-900">License Type</dt>
                <dd>{result.licenseType}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-medium text-slate-900">Submitted</dt>
                <dd>{result.submittedAt}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="font-medium text-slate-900">Status</dt>
                <dd>{result.status}</dd>
              </div>
            </dl>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default LicenseTrackingModal
