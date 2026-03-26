import ResultCard, { type ResultCardProps } from './ResultCard'

export interface ResultsContainerProps {
  results: ResultCardProps[]
  isLoading: boolean
  query: string
  totalCount: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function ResultsContainer({
  results,
  isLoading,
  query,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
}: ResultsContainerProps) {
  return (
    <section className="mt-6" aria-live="polite">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{totalCount} results found</p>
        {totalPages > 1 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Prev
            </button>
            <span className="text-xs text-slate-500">
              Page {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-slate-100/80 dark:border-slate-700 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : null}

      {!isLoading && !query.trim() ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-600 dark:bg-slate-800/30">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Start typing to search</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">
            Search licenses, companies, and service categories from the panel above.
          </p>
        </div>
      ) : null}

      {!isLoading && query.trim() && results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-rose-300 bg-rose-50 p-10 text-center dark:border-rose-800 dark:bg-rose-900/20">
          <p className="text-sm font-semibold text-rose-700 dark:text-rose-300">No results found</p>
          <p className="mt-2 text-xs text-rose-600/90 dark:text-rose-300/90">
            Try changing filters, checking spelling, or searching by company name.
          </p>
        </div>
      ) : null}

      {!isLoading && results.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {results.map((result) => (
            <ResultCard key={result.id} {...result} />
          ))}
        </div>
      ) : null}
    </section>
  )
}

export default ResultsContainer
