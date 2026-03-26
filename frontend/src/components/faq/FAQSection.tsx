import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { faqItems, type FAQCategory } from '../../data/faqs'

type FilterKey = 'All' | FAQCategory

function FAQSection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All')
  const [query, setQuery] = useState('')
  const [openItemId, setOpenItemId] = useState<string>(faqItems[0]?.id ?? '')

  const filters: FilterKey[] = ['All', 'Licensing', 'Complaints', 'General']

  const visibleFaqs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return faqItems.filter((item) => {
      const filterMatch = activeFilter === 'All' || item.category === activeFilter
      const queryMatch =
        normalizedQuery.length === 0 ||
        item.question.toLowerCase().includes(normalizedQuery) ||
        item.answer.toLowerCase().includes(normalizedQuery)
      return filterMatch && queryMatch
    })
  }, [activeFilter, query])

  const toggleItem = (id: string) => {
    setOpenItemId((current) => (current === id ? '' : id))
  }

  return (
    <section aria-labelledby="faq-heading">
      <div className="space-y-8">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700">
            Support
          </span>
          <h2 id="faq-heading" className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="max-w-3xl text-slate-700">
            Find quick answers to common questions about licensing, complaints, and regulatory services.
          </p>
        </div>

        <div className="space-y-4 border-y-2 border-slate-300 py-4 sm:py-5">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 ${
                  activeFilter === filter
                    ? 'border-[#BF1F5A] bg-[#BF1F5A] text-white'
                    : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <label className="block">
            <span className="sr-only">Search FAQs</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-500 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <div className="max-h-[184px] divide-y divide-slate-200 overflow-y-auto">
            {visibleFaqs.length > 0 ? (
              visibleFaqs.map((item) => {
                const isOpen = openItemId === item.id
                const panelId = `faq-panel-${item.id}`
                const buttonId = `faq-button-${item.id}`
                return (
                  <article key={item.id} className="min-h-[88px] overflow-hidden py-1">
                    <h3>
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggleItem(item.id)}
                        className={`flex w-full items-center justify-between gap-3 px-1 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-inset ${
                          isOpen ? 'bg-transparent' : 'bg-transparent'
                        }`}
                      >
                        <span className="text-base font-bold tracking-tight text-slate-900">{item.question}</span>
                        <span
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-lg font-semibold text-slate-700 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        >
                          {isOpen ? '-' : '+'}
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-1 pb-4 text-sm text-slate-700">{item.answer}</p>
                      </div>
                    </div>
                  </article>
                )
              })
            ) : (
              <p className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
                No FAQs found for this filter. Try another category or search term.
              </p>
            )}
          </div>

          <div className="pt-1">
            <p className="text-sm font-semibold text-slate-900">Still need help?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="mailto:info@bocra.org.bw"
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
              >
                Contact Support
              </a>
              <Link
                to="/complaints"
                className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#BF1F5A] px-3.5 text-sm font-semibold !text-white visited:!text-white hover:!text-white transition hover:bg-[#a8194c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF1F5A] focus-visible:ring-offset-2"
              >
                File a Complaint
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
