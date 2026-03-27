export type ResourceCategory =
  | 'Licensing'
  | 'Regulations'
  | 'Public Notices'
  | 'Reports'
  | 'Consumer Guides'

export type ResourceContentType = 'PDF' | 'Guide' | 'Notice' | 'Report'

export interface ResourceItem {
  id: string
  title: string
  description: string
  category: ResourceCategory
  contentType: ResourceContentType
  updatedAt: string
  href: string
}

export interface InsightStat {
  id: string
  label: string
  value: string
  subtext: string
}

export interface FeaturedReport {
  id: string
  title: string
  description: string
  publishedAt: string
  href: string
}
