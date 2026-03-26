import type { NewsArticle } from '../../types/news'

type NewsCardProps = {
  article: NewsArticle
  onOpen: (article: NewsArticle) => void
}

function formatDate(dateISO: string) {
  return new Intl.DateTimeFormat('en-BW', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateISO))
}

function NewsCard({ article, onOpen }: NewsCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(article)}
      className="group grid w-full grid-cols-[112px_1fr] gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 sm:grid-cols-[132px_1fr]"
    >
      <div className={`h-full min-h-24 rounded-xl bg-gradient-to-br ${article.imageThemeClass}`} aria-hidden="true" />
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 normal-case text-slate-700">{article.category}</span>
          <span className="normal-case">{formatDate(article.dateISO)}</span>
        </div>
        <h3 className="text-base font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-[#BF1F5A]">
          {article.title}
        </h3>
        <p className="text-sm text-slate-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
          {article.summary}
        </p>
        <span className="inline-flex items-center text-xs font-semibold text-[#BF1F5A]">{article.readTime}</span>
      </div>
    </button>
  )
}

export default NewsCard
