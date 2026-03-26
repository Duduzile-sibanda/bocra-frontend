import type { FeaturedReport, InsightStat, ResourceCategory, ResourceItem } from '../types/resourcesInsights'

export const RESOURCE_CATEGORIES: Array<'All' | ResourceCategory> = [
  'All',
  'Licensing',
  'Regulations',
  'Public Notices',
  'Reports',
  'Consumer Guides',
]

export const featuredResources: ResourceItem[] = [
  {
    id: 'resource-licensing-framework-2026',
    title: 'Licensing Framework Update 2026',
    description: 'Updated framework outlining licensing scope, application standards, and compliance responsibilities.',
    category: 'Licensing',
    contentType: 'PDF',
    updatedAt: '2026-02-21',
    href: '/licensing',
  },
  {
    id: 'resource-qos-regulatory-guideline',
    title: 'Quality of Service Regulatory Guideline',
    description: 'Formal guidance on performance thresholds and operator reporting obligations across key service areas.',
    category: 'Regulations',
    contentType: 'Guide',
    updatedAt: '2026-01-19',
    href: '/legislation',
  },
  {
    id: 'resource-maintenance-public-notice',
    title: 'Public Notice: Planned Network Maintenance',
    description: 'Advisory for temporary service interruptions and expected restoration windows by location.',
    category: 'Public Notices',
    contentType: 'Notice',
    updatedAt: '2026-03-04',
    href: '/broadcasting',
  },
  {
    id: 'resource-consumer-rights-guide',
    title: 'Consumer Rights and Complaint Escalation Guide',
    description: 'Step-by-step practical guide for lodging complaints and escalating unresolved service issues.',
    category: 'Consumer Guides',
    contentType: 'Guide',
    updatedAt: '2026-02-02',
    href: '/complaints',
  },
  {
    id: 'resource-sector-performance-annual',
    title: 'Annual Sector Performance Statistical Digest',
    description: 'Annual statistical publication covering licensing, service quality, access trends, and market indicators.',
    category: 'Reports',
    contentType: 'Report',
    updatedAt: '2026-01-31',
    href: '/about',
  },
]

export const keyInsightStats: InsightStat[] = [
  { id: 'stat-active-licences', label: 'Active Licences', value: '1,284', subtext: 'Across all regulated segments' },
  { id: 'stat-complaints-resolved', label: 'Complaints Resolved', value: '92%', subtext: 'Resolution rate this quarter' },
  { id: 'stat-public-notices', label: 'Public Notices Issued', value: '47', subtext: 'Official notices this year' },
  { id: 'stat-response-time', label: 'Average Response Time', value: '3.4 days', subtext: 'Initial response SLA average' },
]

export const featuredReports: FeaturedReport[] = [
  {
    id: 'report-annual-performance',
    title: 'Annual Sector Performance Report',
    description:
      'Comprehensive annual view of Botswana communications sector outcomes, compliance trends, and service performance.',
    publishedAt: '2026-01-31',
    href: '/about',
  },
  {
    id: 'report-quarterly-complaints',
    title: 'Quarterly Consumer Complaints Overview',
    description:
      'Quarterly analysis of complaint categories, operator response quality, and improvements in consumer handling.',
    publishedAt: '2026-03-08',
    href: '/complaints',
  },
]
