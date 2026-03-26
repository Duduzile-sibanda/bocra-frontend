import type { NewsArticle } from '../../types/news'

type FeaturedNewsCardProps = {
  article: NewsArticle
  onOpen: (article: NewsArticle) => void
  onHoverChange: (isHovered: boolean) => void
}

function formatDate(dateISO: string) {
  return new Intl.DateTimeFormat('en-BW', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateISO))
}

function FeaturedNewsCard({ article, onOpen, onHoverChange }: FeaturedNewsCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(article)}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="group w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
    >
      <img
        src={article.imageSrc}
        alt={article.imageAlt}
        className="h-56 w-full object-cover md:h-64"
        loading="lazy"
      />
      <div className="space-y-3 p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-wide text-slate-600">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">{article.category}</span>
          <span>{formatDate(article.dateISO)}</span>
          <span>{article.readTime}</span>
        </div>
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-[#BF1F5A]">
          {article.title}
        </h3>
        <p className="text-slate-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
          {article.summary}
        </p>
        <span className="inline-flex items-center text-sm font-semibold text-[#BF1F5A]">Read more</span>
      </div>
    </button>
  )
}

export default FeaturedNewsCard
