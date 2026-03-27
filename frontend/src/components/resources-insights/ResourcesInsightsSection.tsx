import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiClock, FiFileText, FiSearch, FiUsers, FiX } from 'react-icons/fi'
import { HiOutlineMegaphone } from 'react-icons/hi2'
import { RESOURCE_CATEGORIES, featuredReports, featuredResources, keyInsightStats } from '../../data/resourcesInsights'
import type { ResourceCategory, ResourceItem } from '../../types/resourcesInsights'

type CategoryFilter = 'All' | ResourceCategory
type SortMode = 'alpha' | 'date'

const PAGE_SIZE = 8
const statIcons = [FiFileText, FiUsers, HiOutlineMegaphone, FiClock]

function formatDate(dateISO: string) {
  return new Intl.DateTimeFormat('en-BW', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateISO))
}

function CompactResourceRow({ item, onSelect }: { item: ResourceItem; onSelect: () => void }) {
  return (
    <Link
      to={item.href}
      onClick={onSelect}
      className="group flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
    >
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-700">
        <FiFileText />
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="rounded-full bg-[#BF1F5A]/10 px-2 py-0.5 font-semibold text-[#8f1642]">{item.contentType}</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">{item.category}</span>
          <span className="font-semibold text-slate-500">{formatDate(item.updatedAt)}</span>
        </div>
        <h4 className="truncate text-sm font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#BF1F5A]">
          {item.title}
        </h4>
        <p className="mt-0.5 text-xs text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden">
          {item.description}
        </p>
      </div>
    </Link>
  )
}

function ResourcesInsightsSection() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All')
  const [sortMode, setSortMode] = useState<SortMode>('date')
  const [currentPage, setCurrentPage] = useState(1)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)

  const sortedAndFilteredResources = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const filtered = featuredResources
      .filter((item) => (activeCategory === 'All' ? true : item.category === activeCategory))
      .filter((item) => {
        if (!normalizedQuery) return true
        const target = `${item.title} ${item.description} ${item.category} ${item.contentType}`.toLowerCase()
        return target.includes(normalizedQuery)
      })

    const sorted = [...filtered].sort((a, b) => {
      if (sortMode === 'alpha') {
        return a.title.localeCompare(b.title)
      }
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })

    return sorted
  }, [activeCategory, query, sortMode])

  const pageCount = Math.max(1, Math.ceil(sortedAndFilteredResources.length / PAGE_SIZE))
  const currentPageResources = sortedAndFilteredResources.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  useEffect(() => {
    setCurrentPage(1)
  }, [query, activeCategory, sortMode])

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount)
    }
  }, [currentPage, pageCount])

  return (
    <section aria-labelledby="resources-insights-heading">
      <div className="rounded-3xl bg-[#0b3a66] p-6 shadow-sm sm:p-8">
        <header className="max-w-3xl space-y-2">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white ring-1 ring-white/30">
            Public Resource Hub
          </span>
        <h2 id="resources-insights-heading" className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Documents &amp; Legislation
        </h2>
          <p className="text-slate-100">
            Search public resources, browse official notices, and explore key sector statistics.
          </p>
        </header>

        <div className="mt-7 space-y-8">
          <div className="flex">
            <button
              type="button"
              onClick={() => setIsResourcesOpen(true)}
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b3a66]"
            >
              View resources
            </button>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {keyInsightStats.map((stat, index) => {
              const Icon = statIcons[index]
              return (
                <article key={stat.id} className="space-y-1">
                  <span className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-white/10 text-white">
                    <Icon className="h-9 w-9" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">{stat.label}</p>
                  <p className="text-3xl font-extrabold tracking-tight text-white">{stat.value}</p>
                  <p className="text-sm text-slate-200">{stat.subtext}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>

      {isResourcesOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsResourcesOpen(false)
          }}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resources-modal-title"
            className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <h3 id="resources-modal-title" className="text-xl font-extrabold tracking-tight text-slate-900">
                Resource Library
              </h3>
              <button
                type="button"
                aria-label="Close resources modal"
                onClick={() => setIsResourcesOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
              >
                <FiX />
              </button>
            </div>

            <div className="max-h-[calc(92vh-72px)] overflow-y-auto p-5 sm:p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_220px_210px]">
                  <label className="relative block">
                    <span className="sr-only">Search public resources</span>
                    <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search documents, reports, notices, and guides"
                      className="h-11 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                  </label>

                  <label className="block">
                    <span className="sr-only">Filter by category</span>
                    <select
                      value={activeCategory}
                      onChange={(event) => setActiveCategory(event.target.value as CategoryFilter)}
                      className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    >
                      {RESOURCE_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="sr-only">Sort resources</span>
                    <select
                      value={sortMode}
                      onChange={(event) => setSortMode(event.target.value as SortMode)}
                      className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    >
                      <option value="date">Sort by date</option>
                      <option value="alpha">Sort alphabetically</option>
                    </select>
                  </label>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <p>
                      Showing {currentPageResources.length} of {sortedAndFilteredResources.length} resources
                    </p>
                    <p>
                      Page {currentPage} of {pageCount}
                    </p>
                  </div>

                  <div className="grid gap-2">
                    {currentPageResources.length > 0 ? (
                      currentPageResources.map((item) => (
                        <CompactResourceRow key={item.id} item={item} onSelect={() => setIsResourcesOpen(false)} />
                      ))
                    ) : (
                      <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                        No resources found for this filter. Try a different category or keyword.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-3">
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                      disabled={currentPage === 1}
                      className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                      disabled={currentPage === pageCount}
                      className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>

                <div className="space-y-3 border-t border-slate-200 pt-5">
                  <h4 className="text-lg font-extrabold tracking-tight text-slate-900">Featured Reports</h4>
                  <div className="grid gap-2">
                    {featuredReports.map((report) => (
                      <Link
                        key={report.id}
                        to={report.href}
                        onClick={() => setIsResourcesOpen(false)}
                        className="group rounded-lg border border-slate-200 bg-white px-3 py-3 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Published {formatDate(report.publishedAt)}
                        </p>
                        <h5 className="mt-0.5 text-sm font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#BF1F5A]">
                          {report.title}
                        </h5>
                        <p className="mt-0.5 text-xs text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden">
                          {report.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default ResourcesInsightsSection
