import { useEffect, useRef, useState, type FormEvent } from 'react'
import ActionButton from '../ui/ActionButton'
import InputField from '../ui/InputField'

export type UploadPayload = {
  fullName: string
  email: string
  phone: string
  file: File
}

type UploadModalProps = {
  isOpen: boolean
  isSubmitting: boolean
  selectedLicenseName: string
  onClose: () => void
  onSubmit: (payload: UploadPayload) => Promise<void>
}

type FormErrors = {
  fullName?: string
  email?: string
  phone?: string
  file?: string
}

const ANIMATION_MS = 180
const MAX_FILE_SIZE_MB = 5
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

function isPdfFile(file: File): boolean {
  const lowerName = file.name.toLowerCase()
  return file.type === 'application/pdf' || lowerName.endsWith('.pdf')
}

function UploadModal({ isOpen, isSubmitting, selectedLicenseName, onClose, onSubmit }: UploadModalProps) {
  const [isMounted, setIsMounted] = useState<boolean>(isOpen)
  const [isVisible, setIsVisible] = useState<boolean>(isOpen)
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})

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

    setFullName('')
    setEmail('')
    setPhone('')
    setFile(null)
    setErrors({})
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
        if (!isSubmitting) onClose()
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
  }, [isOpen, isSubmitting, onClose])

  if (!isMounted) return null

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {}

    if (fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!/^\+?[0-9()\-\s]{7,20}$/.test(phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.'
    }

    if (!file) {
      nextErrors.file = 'Please upload your completed PDF form.'
    } else if (!isPdfFile(file)) {
      nextErrors.file = 'Only PDF files are accepted.'
    } else if (file.size > MAX_FILE_SIZE_BYTES) {
      nextErrors.file = `File size must be ${MAX_FILE_SIZE_MB}MB or less.`
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0 || !file) return

    await onSubmit({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      file,
    })
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-200 ${
        isVisible ? 'bg-slate-900/45 opacity-100' : 'bg-slate-900/0 opacity-0'
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose()
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
        className={`w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <h2 id="upload-modal-title" className="text-2xl font-bold tracking-tight text-slate-900">
          Upload Completed Form
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {selectedLicenseName || 'Selected license'} application submission details.
        </p>

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <InputField
            id="license-full-name"
            label="Full Name"
            value={fullName}
            onChange={setFullName}
            required
            error={errors.fullName}
            placeholder="Enter your full legal name"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              id="license-email"
              label="Email"
              inputType="email"
              value={email}
              onChange={setEmail}
              required
              error={errors.email}
              placeholder="name@example.com"
            />
            <InputField
              id="license-phone"
              label="Phone Number"
              inputType="tel"
              value={phone}
              onChange={setPhone}
              required
              error={errors.phone}
              placeholder="+267 000 0000"
            />
          </div>

          <div className="grid gap-1.5">
            <label className="text-sm font-medium text-slate-900" htmlFor="license-file-upload">
              File Upload (PDF only)
              <span className="ml-1 text-red-700">*</span>
            </label>
            <input
              id="license-file-upload"
              type="file"
              accept="application/pdf,.pdf"
              className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 transition focus-visible:outline-none focus-visible:ring-2 ${
                errors.file
                  ? 'border-red-400 bg-red-50 focus-visible:ring-red-300'
                  : 'border-slate-300 bg-white focus-visible:ring-slate-300'
              }`}
              onChange={(event) => {
                const nextFile = event.target.files?.[0] ?? null
                setFile(nextFile)
              }}
              aria-invalid={Boolean(errors.file)}
              aria-describedby="license-file-help"
            />
            <p id="license-file-help" className={`text-xs ${errors.file ? 'text-red-700' : 'text-slate-600'}`}>
              {errors.file ? errors.file : `Upload completed PDF form (max ${MAX_FILE_SIZE_MB}MB)`}
            </p>
            {file ? <p className="text-xs text-slate-600">Selected file: {file.name}</p> : null}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <ActionButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </ActionButton>
            <ActionButton type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </ActionButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadModal
