import { useEffect, useRef, useState } from 'react'
import { HiMiniCheck, HiMiniChevronDown } from 'react-icons/hi2'
import type { FilterType } from './types'

export interface FilterDropdownProps {
  label?: string
  options: readonly FilterType[]
  selected: FilterType[]
  onChange: (values: FilterType[]) => void
}

function FilterDropdown({ label = 'Filter by type', options, selected, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOption = (option: FilterType) => {
    if (option === 'All') {
      onChange(['All'])
      return
    }

    const withoutAll = selected.filter((value) => value !== 'All')
    const alreadySelected = withoutAll.includes(option)
    const next = alreadySelected
      ? withoutAll.filter((value) => value !== option)
      : [...withoutAll, option]

    onChange(next.length > 0 ? next : ['All'])
  }

  const selectedLabel = selected.includes('All') ? 'All types' : `${selected.length} selected`

  return (
    <div className="relative" ref={rootRef}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <button
        type="button"
        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:border-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedLabel}</span>
        <HiMiniChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {isOpen ? (
        <div
          className="absolute left-0 right-0 z-20 mt-2 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-800"
          role="listbox"
          aria-label={label}
          aria-multiselectable="true"
        >
          <ul className="space-y-1">
            {options.map((option) => {
              const isChecked = selected.includes(option)
              return (
                <li key={option}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isChecked}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                      isChecked
                        ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-200'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700'
                    }`}
                    onClick={() => toggleOption(option)}
                  >
                    <span>{option}</span>
                    {isChecked ? <HiMiniCheck className="h-4 w-4" aria-hidden="true" /> : null}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default FilterDropdown
