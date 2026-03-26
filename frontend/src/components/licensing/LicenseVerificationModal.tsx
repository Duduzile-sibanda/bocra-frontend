import { useEffect, useMemo, useRef, useState } from 'react'
import ActionButton from '../ui/ActionButton'
import LicenseVerificationSearch, { type LicenseTypeFilter } from './LicenseVerificationSearch'

type LicenseRecord = {
  licenseNo: string
  type: Exclude<LicenseTypeFilter, 'All'>
  clientName: string
  expiryDate: string
  status: string
}

type LicenseVerificationModalProps = {
  isOpen: boolean
  onClose: () => void
}

const PAGE_SIZE = 10
const ANIMATION_MS = 180
const LAST_QUERY_KEY = 'bocra_license_verification_last_query'

const MOCK_LICENSES: LicenseRecord[] = [
  { licenseNo: 'LIC-2026-000101', type: 'Spectrum Licence', clientName: 'Kalahari Networks', expiryDate: '2028-01-31', status: 'Active' },
  { licenseNo: 'LIC-2026-000102', type: 'Dealer', clientName: 'Signal Trade Botswana', expiryDate: '2027-11-15', status: 'Active' },
  { licenseNo: 'LIC-2026-000103', type: 'Type Approval', clientName: 'Telequip Imports', expiryDate: '2027-09-30', status: 'Active' },
  { licenseNo: 'LIC-2026-000104', type: 'System and Services', clientName: 'Northern Cell Connect', expiryDate: '2026-12-01', status: 'Pending Renewal' },
  { licenseNo: 'LIC-2026-000105', type: 'Spectrum Licence', clientName: 'Delta Wireless', expiryDate: '2025-08-17', status: 'Expired' },
  { licenseNo: 'LIC-2026-000106', type: 'Dealer', clientName: 'Gaborone Radio Mart', expiryDate: '2027-03-09', status: 'Active' },
  { licenseNo: 'LIC-2026-000107', type: 'System and Services', clientName: 'Savanna Data Systems', expiryDate: '2028-06-20', status: 'Active' },
  { licenseNo: 'LIC-2026-000108', type: 'Type Approval', clientName: 'Orbit Comms Africa', expiryDate: '2027-02-12', status: 'Active' },
  { licenseNo: 'LIC-2026-000109', type: 'Spectrum Licence', clientName: 'Makgadikgadi Mining Radio', expiryDate: '2026-05-30', status: 'Suspended' },
  { licenseNo: 'LIC-2026-000110', type: 'Dealer', clientName: 'RadioCore Botswana', expiryDate: '2027-07-01', status: 'Active' },
  { licenseNo: 'LIC-2026-000111', type: 'Type Approval', clientName: 'TechCert Distributors', expiryDate: '2028-02-28', status: 'Active' },
  { licenseNo: 'LIC-2026-000112', type: 'System and Services', clientName: 'BO Cellular Infrastructure', expiryDate: '2026-09-19', status: 'Active' },
  { licenseNo: 'LIC-2026-000113', type: 'Spectrum Licence', clientName: 'Rural Broadcast Relay', expiryDate: '2027-12-11', status: 'Active' },
  { licenseNo: 'LIC-2026-000114', type: 'Dealer', clientName: 'Tswana Electronics', expiryDate: '2025-10-22', status: 'Expired' },
  { licenseNo: 'LIC-2026-000115', type: 'Type Approval', clientName: 'Beacon Device Supplies', expiryDate: '2027-04-16', status: 'Active' },
  { licenseNo: 'LIC-2026-000116', type: 'System and Services', clientName: 'Southern Link Services', expiryDate: '2028-08-14', status: 'Active' },
  { licenseNo: 'LIC-2026-000117', type: 'Spectrum Licence', clientName: 'Okavango Communications', expiryDate: '2026-11-03', status: 'Pending Renewal' },
  { licenseNo: 'LIC-2026-000118', type: 'Dealer', clientName: 'Prime Dealer Hub', expiryDate: '2027-01-25', status: 'Active' },
  { licenseNo: 'LIC-2026-000119', type: 'Type Approval', clientName: 'RegTest Labs Botswana', expiryDate: '2028-05-30', status: 'Active' },
  { licenseNo: 'LIC-2026-000120', type: 'System and Services', clientName: 'National Service Grid', expiryDate: '2026-06-10', status: 'Active' },
  { licenseNo: 'LIC-2026-000121', type: 'Spectrum Licence', clientName: 'Airlink Botswana', expiryDate: '2028-10-07', status: 'Active' },
  { licenseNo: 'LIC-2026-000122', type: 'Dealer', clientName: 'City Signal Suppliers', expiryDate: '2027-02-04', status: 'Active' },
  { licenseNo: 'LIC-2026-000123', type: 'Type Approval', clientName: 'Universal Device Traders', expiryDate: '2026-12-31', status: 'Active' },
  { licenseNo: 'LIC-2026-000124', type: 'System and Services', clientName: 'Spectrum Utility Services', expiryDate: '2025-12-08', status: 'Expired' },
]

function LicenseVerificationModal({ isOpen, onClose }: LicenseVerificationModalProps) {
  const [isMounted, setIsMounted] = useState<boolean>(isOpen)
  const [isVisible, setIsVisible] = useState<boolean>(isOpen)
  const [query, setQuery] = useState<string>('')
  const [selectedType, setSelectedType] = useState<LicenseTypeFilter>('All')
  const [results, setResults] = useState<LicenseRecord[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [inputError, setInputError] = useState<string>('')
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

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
    const savedQuery = window.localStorage.getItem(LAST_QUERY_KEY)
    if (savedQuery) setQuery(savedQuery)
  }, [isOpen])

  useEffect(() => {
    window.localStorage.setItem(LAST_QUERY_KEY, query)
  }, [query])

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

  const totalResults = results.length
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE))
  const normalizedPage = Math.min(currentPage, totalPages)

  const paginatedResults = useMemo(() => {
    const start = (normalizedPage - 1) * PAGE_SIZE
    return results.slice(start, start + PAGE_SIZE)
  }, [normalizedPage, results])

  const startIndex = totalResults === 0 ? 0 : (normalizedPage - 1) * PAGE_SIZE + 1
  const endIndex = Math.min(normalizedPage * PAGE_SIZE, totalResults)

  const handleSearch = async () => {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      setInputError('Please enter a license number or customer name.')
      return
    }

    setInputError('')
    setError('')
    setIsLoading(true)
    setHasSearched(true)
    setCurrentPage(1)

    await new Promise((resolve) => window.setTimeout(resolve, 850))

    if (trimmedQuery.toLowerCase() === 'error') {
      setIsLoading(false)
      setResults([])
      setError('Something went wrong. Please try again.')
      return
    }

    const queryLower = trimmedQuery.toLowerCase()
    const filtered = MOCK_LICENSES.filter((row) => {
      const matchesQuery =
        row.licenseNo.toLowerCase().includes(queryLower) || row.clientName.toLowerCase().includes(queryLower)
      const matchesType = selectedType === 'All' ? true : row.type === selectedType
      return matchesQuery && matchesType
    })

    setResults(filtered)
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
        aria-labelledby="license-verification-modal-title"
        className={`flex h-[min(92vh,860px)] w-full max-w-6xl flex-col rounded-2xl bg-white p-6 shadow-2xl transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 id="license-verification-modal-title" className="text-2xl font-bold tracking-tight text-slate-900">
              License Verification Results
            </h2>
            <p className="mt-1 text-sm text-slate-600">Search and verify license information.</p>
          </div>
          <ActionButton onClick={onClose} variant="secondary">
            Close
          </ActionButton>
        </div>

        <LicenseVerificationSearch
          query={query}
          selectedType={selectedType}
          error={inputError}
          isSubmitting={isLoading}
          onQueryChange={setQuery}
          onTypeChange={setSelectedType}
          onSubmit={handleSearch}
        />

        <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          Search query: <span className="font-semibold text-slate-900">{query.trim() || 'Not searched yet'}</span>
        </div>

        <div className="mt-4 flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {isLoading ? <div className="p-6 text-sm text-slate-700">Searching...</div> : null}

          {!isLoading && error ? <div className="p-6 text-sm text-red-700">{error}</div> : null}

          {!isLoading && !error && hasSearched && totalResults === 0 ? (
            <div className="p-6 text-sm text-slate-700">No results found. Try a different search.</div>
          ) : null}

          {!isLoading && !error && totalResults > 0 ? (
            <div className="flex h-full flex-col">
              <div className="overflow-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-slate-100 text-slate-800">
                    <tr>
                      <th className="px-4 py-3 font-semibold">License No</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Client Name</th>
                      <th className="px-4 py-3 font-semibold">Expiry Date</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedResults.map((row, index) => (
                      <tr key={row.licenseNo} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                        <td className="px-4 py-3 text-slate-800">{row.licenseNo}</td>
                        <td className="px-4 py-3 text-slate-700">{row.type}</td>
                        <td className="px-4 py-3 text-slate-700">{row.clientName}</td>
                        <td className="px-4 py-3 text-slate-700">{row.expiryDate}</td>
                        <td className="px-4 py-3 text-slate-700">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-auto border-t border-slate-200 px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-slate-600">
                    Showing {startIndex}-{endIndex} of {totalResults} results
                  </p>

                  <div className="flex items-center gap-2">
                    <ActionButton
                      variant="secondary"
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      disabled={normalizedPage === 1}
                    >
                      Previous
                    </ActionButton>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1
                        const isActive = page === normalizedPage
                        return (
                          <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border px-2 text-sm font-semibold transition ${
                              isActive
                                ? 'border-slate-900 bg-slate-900 text-white'
                                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                            }`}
                            aria-label={`Go to page ${page}`}
                          >
                            {page}
                          </button>
                        )
                      })}
                    </div>

                    <ActionButton
                      variant="secondary"
                      onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                      disabled={normalizedPage === totalPages}
                    >
                      Next
                    </ActionButton>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default LicenseVerificationModal
