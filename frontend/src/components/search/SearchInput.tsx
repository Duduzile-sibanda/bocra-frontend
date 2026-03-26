import type { KeyboardEvent } from 'react'
import { HiMiniMagnifyingGlass, HiMiniMicrophone, HiMiniXMark } from 'react-icons/hi2'

export interface SearchInputProps {
  id: string
  value: string
  placeholder: string
  listboxId: string
  isSuggestionsOpen: boolean
  activeDescendant?: string
  onChange: (value: string) => void
  onClear: () => void
  onFocus: () => void
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  onVoiceClick?: () => void
}

function SearchInput({
  id,
  value,
  placeholder,
  listboxId,
  isSuggestionsOpen,
  activeDescendant,
  onChange,
  onClear,
  onFocus,
  onKeyDown,
  onVoiceClick,
}: SearchInputProps) {
  return (
    <div className="relative flex items-center gap-2 rounded-2xl border border-slate-300/80 bg-white/90 px-4 py-3 shadow-sm transition-all duration-300 focus-within:-translate-y-0.5 focus-within:border-cyan-400/80 focus-within:shadow-lg focus-within:ring-4 focus-within:ring-cyan-100 dark:border-slate-600 dark:bg-slate-900/70 dark:focus-within:ring-cyan-900/40">
      <HiMiniMagnifyingGlass className="h-6 w-6 flex-shrink-0 text-cyan-600 dark:text-cyan-300" aria-hidden="true" />

      <input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        className="w-full border-none bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-400 sm:text-lg"
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={isSuggestionsOpen}
        aria-controls={listboxId}
        aria-autocomplete="list"
        aria-activedescendant={activeDescendant}
      />

      <div className="flex items-center gap-1">
        {onVoiceClick ? (
          <button
            aria-label="Voice search (mock)"
            className="rounded-full p-2 text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-600 dark:hover:bg-slate-700 dark:hover:text-cyan-300"
            onClick={onVoiceClick}
            type="button"
          >
            <HiMiniMicrophone className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : null}

        <button
          aria-label="Clear search input"
          className={`rounded-full p-2 transition ${
            value
              ? 'text-slate-500 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-slate-700'
              : 'pointer-events-none text-slate-300'
          }`}
          onClick={onClear}
          type="button"
        >
          <HiMiniXMark className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default SearchInput
