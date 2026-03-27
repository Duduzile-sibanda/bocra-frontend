import { HiMiniXMark } from 'react-icons/hi2'

export interface SuggestionItemProps {
  id: string
  text: string
  query: string
  category: string
  isActive: boolean
  isRecent?: boolean
  onSelect: (id: string) => void
  onRemoveRecent?: (id: string) => void
}

function SuggestionItem({
  id,
  text,
  query,
  category,
  isActive,
  isRecent = false,
  onSelect,
  onRemoveRecent,
}: SuggestionItemProps) {
  const safeQuery = query.trim().toLowerCase()
  const matchIndex = safeQuery ? text.toLowerCase().indexOf(safeQuery) : -1
  const prefix = matchIndex >= 0 ? text.slice(0, matchIndex) : text
  const highlight = matchIndex >= 0 ? text.slice(matchIndex, matchIndex + safeQuery.length) : ''
  const suffix = matchIndex >= 0 ? text.slice(matchIndex + safeQuery.length) : ''

  return (
    <li role="presentation">
      <div
        className={`group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
          isActive ? 'bg-cyan-50 text-slate-900 dark:bg-slate-700/80' : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
        }`}
      >
        <button
          id={id}
          role="option"
          aria-selected={isActive}
          className="min-w-0 flex-1 text-left"
          onClick={() => onSelect(id)}
          type="button"
        >
          <p className="truncate text-sm font-medium">
            {prefix}
            {highlight ? <mark className="rounded bg-cyan-200/70 px-0.5 text-slate-900">{highlight}</mark> : null}
            {suffix}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">{category}</p>
        </button>

        {isRecent && onRemoveRecent ? (
          <button
            aria-label={`Remove recent search ${text}`}
            className="rounded-full p-1 text-slate-400 transition hover:bg-white hover:text-rose-500 dark:hover:bg-slate-600"
            onClick={() => onRemoveRecent(id)}
            type="button"
          >
            <HiMiniXMark className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </li>
  )
}

export default SuggestionItem
