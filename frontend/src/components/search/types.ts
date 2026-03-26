export const FILTER_OPTIONS = [
  'All',
  'Spectrum Licence',
  'Dealer',
  'System & Services',
  'Type Approval',
] as const

export type FilterType = (typeof FILTER_OPTIONS)[number]

export type ResultStatus = 'Active' | 'Pending' | 'Expired'

export interface SearchRecord {
  id: string
  title: string
  company: string
  type: Exclude<FilterType, 'All'>
  status: ResultStatus
  tags: string[]
}

export interface Suggestion {
  id: string
  value: string
  category: string
  filterType: Exclude<FilterType, 'All'>
}
