import { useEffect, useMemo, useRef, useState, type KeyboardEventHandler } from 'react'
import SearchInput from './SearchInput'
import FilterDropdown from './FilterDropdown'
import SuggestionsList, { type SuggestionListItem } from './SuggestionsList'
import ResultsContainer from './ResultsContainer'
import { BASE_SUGGESTIONS, MOCK_RECORDS, TRENDING_SEARCHES } from './mockData'
import { FILTER_OPTIONS, type FilterType, type SearchRecord } from './types'

const DEBOUNCE_MS = 300
const PAGE_SIZE = 6

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function levenshteinDistance(a: string, b: string) {
  if (!a.length) {
    return b.length
  }
  if (!b.length) {
    return a.length
  }

  const matrix = Array.from({ length: b.length + 1 }, () => Array(a.length + 1).fill(0))

  for (let i = 0; i <= a.length; i += 1) {
    matrix[0][i] = i
  }
  for (let j = 0; j <= b.length; j += 1) {
    matrix[j][0] = j
  }

  for (let j = 1; j <= b.length; j += 1) {
    for (let i = 1; i <= a.length; i += 1) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator,
      )
    }
  }

  return matrix[b.length][a.length]
}

function getStatusRank(status: SearchRecord['status']) {
  if (status === 'Pending') {
    return 0
  }
  if (status === 'Active') {
    return 1
  }
  return 2
}

function SearchContainer() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>(['All'])
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Type approval expiring soon',
    'Dealer compliance',
    'Spectrum renewal',
  ])
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [displayedResults, setDisplayedResults] = useState<SearchRecord[]>([])

  const panelRef = useRef<HTMLDivElement | null>(null)

  const selectedTypeSet = useMemo(() => {
    if (selectedFilters.includes('All')) {
      return null
    }
    return new Set(selectedFilters)
  }, [selectedFilters])

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        setIsSuggestionsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredRecords = useMemo(() => {
    const normalizedQuery = normalize(debouncedQuery)
    return MOCK_RECORDS.filter((record) => {
      if (selectedTypeSet && !selectedTypeSet.has(record.type)) {
        return false
      }

      if (!normalizedQuery) {
        return true
      }

      const haystack = `${record.title} ${record.company} ${record.type} ${record.tags.join(' ')}`
      const tokens = haystack.toLowerCase().split(/\s+/).filter(Boolean)
      if (haystack.toLowerCase().includes(normalizedQuery)) {
        return true
      }

      return tokens.some((token) => levenshteinDistance(token, normalizedQuery) <= 2)
    }).sort((a, b) => {
      const statusDelta = getStatusRank(a.status) - getStatusRank(b.status)
      if (statusDelta !== 0) {
        return statusDelta
      }
      return a.title.localeCompare(b.title)
    })
  }, [debouncedQuery, selectedTypeSet])

  useEffect(() => {
    setIsLoading(true)
    const timer = window.setTimeout(() => {
      setDisplayedResults(filteredRecords)
      setCurrentPage(1)
      setIsLoading(false)
    }, 420)

    return () => window.clearTimeout(timer)
  }, [filteredRecords])

  const suggestionItems = useMemo(() => {
    const normalizedQuery = normalize(query)
    const allowedType = selectedTypeSet

    const contextual = BASE_SUGGESTIONS.filter((suggestion) => {
      if (allowedType && !allowedType.has(suggestion.filterType)) {
        return false
      }
      if (!normalizedQuery) {
        return true
      }
      const lower = suggestion.value.toLowerCase()
      if (lower.includes(normalizedQuery)) {
        return true
      }
      return lower
        .split(/\s+/)
        .filter(Boolean)
        .some((token) => levenshteinDistance(token, normalizedQuery) <= 2)
    }).slice(0, 8)

    return contextual.map((item) => ({
      id: item.id,
      text: item.value,
      category: item.category,
    }))
  }, [query, selectedTypeSet])

  const recentItems = useMemo<SuggestionListItem[]>(
    () =>
      recentSearches.map((item, index) => ({
        id: `recent-${index}`,
        text: item,
        category: 'Recent',
        isRecent: true,
      })),
    [recentSearches],
  )

  const mergedSuggestions = useMemo(() => [...recentItems, ...suggestionItems], [recentItems, suggestionItems])

  const totalPages = Math.max(1, Math.ceil(displayedResults.length / PAGE_SIZE))
  const paginatedResults = displayedResults.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const activeDescendant = mergedSuggestions[activeSuggestionIndex]?.id

  const persistRecentSearch = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }
    setRecentSearches((prev) => [trimmed, ...prev.filter((entry) => entry !== trimmed)].slice(0, 5))
  }

  const applySuggestion = (id: string) => {
    const target = mergedSuggestions.find((item) => item.id === id)
    if (!target) {
      return
    }

    setQuery(target.text)
    setDebouncedQuery(target.text)
    persistRecentSearch(target.text)
    setIsSuggestionsOpen(false)
    setActiveSuggestionIndex(-1)
  }

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (!isSuggestionsOpen && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      setIsSuggestionsOpen(true)
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveSuggestionIndex((prev) => (prev + 1) % Math.max(1, mergedSuggestions.length))
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveSuggestionIndex((prev) => {
        if (prev <= 0) {
          return mergedSuggestions.length - 1
        }
        return prev - 1
      })
    }

    if (event.key === 'Enter') {
      if (activeSuggestionIndex >= 0 && mergedSuggestions[activeSuggestionIndex]) {
        event.preventDefault()
        applySuggestion(mergedSuggestions[activeSuggestionIndex].id)
        return
      }
      persistRecentSearch(query)
      setIsSuggestionsOpen(false)
    }

    if (event.key === 'Escape') {
      setIsSuggestionsOpen(false)
      setActiveSuggestionIndex(-1)
    }
  }

  return (
    <section
      ref={panelRef}
      className="mx-auto mt-8 w-full max-w-5xl rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-cyan-50/40 to-slate-100 p-4 shadow-2xl shadow-slate-300/50 transition-all duration-300 dark:border-slate-700 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 sm:p-6 lg:p-8"
      aria-label="Smart licensing search panel"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
            Licensing Intelligence
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">
            Smart Search Console
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Top trending searches</span>
          {TRENDING_SEARCHES.slice(0, 3).map((trend) => (
            <button
              key={trend}
              type="button"
              onClick={() => {
                setQuery(trend)
                setIsSuggestionsOpen(false)
                persistRecentSearch(trend)
              }}
              className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-cyan-300"
            >
              {trend}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_260px]">
        <div className="relative">
          <SearchInput
            id="licensing-smart-search"
            value={query}
            placeholder="Search licenses, companies, services..."
            listboxId="licensing-search-suggestions"
            isSuggestionsOpen={isSuggestionsOpen}
            activeDescendant={activeDescendant}
            onChange={(value) => {
              setQuery(value)
              setIsSuggestionsOpen(true)
              setActiveSuggestionIndex(-1)
            }}
            onClear={() => {
              setQuery('')
              setDebouncedQuery('')
              setIsSuggestionsOpen(false)
            }}
            onFocus={() => setIsSuggestionsOpen(true)}
            onKeyDown={onKeyDown}
            onVoiceClick={() => window.alert('Voice search is a UI mock in this prototype.')}
          />

          {isSuggestionsOpen ? (
            <SuggestionsList
              id="licensing-search-suggestions"
              query={query}
              recentItems={recentItems}
              suggestionItems={suggestionItems}
              activeIndex={activeSuggestionIndex}
              onSelect={applySuggestion}
              onRemoveRecent={(id) =>
                setRecentSearches((prev) => prev.filter((_, index) => `recent-${index}` !== id))
              }
            />
          ) : null}
        </div>

        <FilterDropdown
          options={FILTER_OPTIONS}
          selected={selectedFilters}
          onChange={(values) => {
            setSelectedFilters(values)
            setIsSuggestionsOpen(false)
          }}
        />
      </div>

      <ResultsContainer
        results={paginatedResults.map((record) => ({
          id: record.id,
          title: record.title,
          subtitle: record.company,
          type: record.type,
          status: record.status,
        }))}
        isLoading={isLoading}
        query={debouncedQuery}
        totalCount={displayedResults.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(Math.min(totalPages, Math.max(1, page)))}
      />
    </section>
  )
}

export default SearchContainer
