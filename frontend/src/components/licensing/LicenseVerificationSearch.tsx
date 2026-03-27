import { useEffect, useRef, type FormEvent } from 'react'
import ActionButton from '../ui/ActionButton'

export type LicenseTypeFilter = 'All' | 'Spectrum Licence' | 'Dealer' | 'System and Services' | 'Type Approval'

type LicenseVerificationSearchProps = {
  query: string
  selectedType: LicenseTypeFilter
  error?: string
  isSubmitting?: boolean
  onQueryChange: (value: string) => void
  onTypeChange: (value: LicenseTypeFilter) => void
  onSubmit: () => void
}

const LICENSE_FILTER_OPTIONS: LicenseTypeFilter[] = [
  'All',
  'Spectrum Licence',
  'Dealer',
  'System and Services',
  'Type Approval',
]

function LicenseVerificationSearch({
  query,
  selectedType,
  error,
  isSubmitting = false,
  onQueryChange,
  onTypeChange,
  onSubmit,
}: LicenseVerificationSearchProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="mx-auto grid w-full max-w-4xl gap-3" onSubmit={handleSubmit}>
      <label htmlFor="license-verification-query" className="text-sm font-semibold text-slate-900">
        Verify License
      </label>

      <input
        ref={inputRef}
        id="license-verification-query"
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search by License Number or Customer Name"
        className={`w-full rounded-lg border px-3 py-2.5 text-sm text-slate-900 transition focus-visible:outline-none focus-visible:ring-2 ${
          error
            ? 'border-red-400 bg-red-50 focus-visible:ring-red-300'
            : 'border-slate-300 bg-white focus-visible:ring-slate-300'
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'license-verification-error' : undefined}
      />

      <div className="grid gap-3 md:grid-cols-[minmax(0,240px)_auto] md:items-end">
        <div className="grid gap-1.5">
          <label htmlFor="license-verification-type" className="text-sm font-medium text-slate-900">
            License Type
          </label>
          <select
            id="license-verification-type"
            value={selectedType}
            onChange={(event) => onTypeChange(event.target.value as LicenseTypeFilter)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            {LICENSE_FILTER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <ActionButton type="submit" isLoading={isSubmitting}>
          Verify License
        </ActionButton>
      </div>

      {error ? (
        <p id="license-verification-error" className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  )
}

export default LicenseVerificationSearch
