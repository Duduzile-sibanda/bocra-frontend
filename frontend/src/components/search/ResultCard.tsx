import type { ResultStatus } from './types'

export interface ResultCardProps {
  id: string
  title: string
  subtitle: string
  type: string
  status: ResultStatus
}

const statusClass: Record<ResultStatus, string> = {
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200',
  Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200',
  Expired: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200',
}

function ResultCard({ id, title, subtitle, type, status }: ResultCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900/70">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-300">{subtitle}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
          {type}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[status]}`}>{status}</span>
        <span className="text-xs text-slate-400">Ref: {id}</span>
      </div>
    </article>
  )
}

export default ResultCard
