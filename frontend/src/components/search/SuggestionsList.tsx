import SuggestionItem from './SuggestionItem'

export interface SuggestionListItem {
  id: string
  text: string
  category: string
  isRecent?: boolean
}

export interface SuggestionsListProps {
  id: string
  query: string
  recentItems: SuggestionListItem[]
  suggestionItems: SuggestionListItem[]
  activeIndex: number
  onSelect: (id: string) => void
  onRemoveRecent: (id: string) => void
}

function SuggestionsList({
  id,
  query,
  recentItems,
  suggestionItems,
  activeIndex,
  onSelect,
  onRemoveRecent,
}: SuggestionsListProps) {
  const merged = [...recentItems, ...suggestionItems]

  if (merged.length === 0) {
    return null
  }

  return (
    <div
      className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-800/95"
      id={id}
      role="listbox"
      aria-label="Search suggestions"
    >
      {recentItems.length > 0 ? (
        <div className="mb-2 border-b border-slate-200 px-2 pb-2 dark:border-slate-700">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Recent searches</p>
          <ul className="space-y-1">
            {recentItems.map((item, index) => (
              <SuggestionItem
                key={item.id}
                id={item.id}
                text={item.text}
                query={query}
                category={item.category}
                isActive={activeIndex === index}
                isRecent
                onSelect={onSelect}
                onRemoveRecent={onRemoveRecent}
              />
            ))}
          </ul>
        </div>
      ) : null}

      {suggestionItems.length > 0 ? (
        <div className="px-2 pb-1">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Suggestions</p>
          <ul className="space-y-1">
            {suggestionItems.map((item, index) => (
              <SuggestionItem
                key={item.id}
                id={item.id}
                text={item.text}
                query={query}
                category={item.category}
                isActive={activeIndex === recentItems.length + index}
                onSelect={onSelect}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default SuggestionsList
