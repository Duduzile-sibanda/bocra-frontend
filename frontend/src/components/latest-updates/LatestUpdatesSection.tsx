import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { latestUpdatesMock } from '../../data/latestUpdates'
import type { NewsArticle } from '../../types/news'
import FeaturedNewsCard from './FeaturedNewsCard'
import NewsCard from './NewsCard'
import NewsDetailsModal from './NewsDetailsModal'

const ROTATION_INTERVAL_MS = 6000

function LatestUpdatesSection() {
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [isFeaturedHovered, setIsFeaturedHovered] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  const articles = latestUpdatesMock
  const totalArticles = articles.length
  const featuredArticle = articles[featuredIndex]

  const sideArticles = useMemo(() => {
    const nextItems: NewsArticle[] = []
    for (let step = 1; step <= 3; step += 1) {
      nextItems.push(articles[(featuredIndex + step) % totalArticles])
    }
    return nextItems
  }, [articles, featuredIndex, totalArticles])

  useEffect(() => {
    if (isFeaturedHovered || totalArticles <= 1) return

    const timer = window.setInterval(() => {
      setFeaturedIndex((current) => (current + 1) % totalArticles)
    }, ROTATION_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [isFeaturedHovered, totalArticles])

  if (!featuredArticle) return null

  return (
    <>
      <section aria-labelledby="latest-updates-heading">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-2">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white ring-1 ring-white/30">
              Newsroom
            </span>
            <h2 id="latest-updates-heading" className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Latest Updates
            </h2>
          </div>
          <Link
            to="/about"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white bg-white px-4 py-2 text-sm font-semibold text-[#0b3a66] transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b3a66]"
          >
            View all news
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="space-y-3">
            <div className="relative transition-all duration-300 ease-out">
              <div key={featuredArticle.id} className="transition-opacity duration-300">
                <FeaturedNewsCard
                  article={featuredArticle}
                  onOpen={setSelectedArticle}
                  onHoverChange={setIsFeaturedHovered}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 px-1">
              {articles.map((article, index) => (
                <button
                  key={article.id}
                  type="button"
                  onClick={() => setFeaturedIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === featuredIndex ? 'w-6 bg-[#BF1F5A]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Show featured story ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {sideArticles.map((article) => (
              <NewsCard key={article.id} article={article} onOpen={setSelectedArticle} />
            ))}
          </div>
        </div>
      </section>

      <NewsDetailsModal article={selectedArticle} isOpen={Boolean(selectedArticle)} onClose={() => setSelectedArticle(null)} />
    </>
  )
}

export default LatestUpdatesSection
