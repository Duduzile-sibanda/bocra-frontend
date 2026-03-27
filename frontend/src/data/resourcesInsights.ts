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
    id: 'resource-local-content-guidelines-draft',
    title: 'Draft Discussion Paper: Local Content Guidelines',
    description: 'Draft policy discussion paper on local content guidelines for stakeholder review and comment.',
    category: 'Regulations',
    contentType: 'PDF',
    updatedAt: '2025-11-01',
    href: 'https://www.bocra.org.bw/sites/default/files/documents/DRAFT_DISCUSSION_PAPER_-_LOCAL_CONTENT_GUIDELINES.pdf',
  },
  {
    id: 'resource-emf-guidelines-2024',
    title: 'BOCRA Electromagnetic Guidelines 2024 (V5)',
    description: 'Guidelines on electromagnetic fields exposure and compliance requirements.',
    category: 'Regulations',
    contentType: 'Guide',
    updatedAt: '2024-12-10',
    href: 'https://www.bocra.org.bw/sites/default/files/documents/BOCRA_Electromagnetic_Guidelines_2024_V5_Online.pdf',
  },
  {
    id: 'resource-uasf-youth-hackathon',
    title: 'UASF Youth Hackathon',
    description: 'Official BOCRA notice and details for the UASF Youth Hackathon initiative.',
    category: 'Public Notices',
    contentType: 'Notice',
    updatedAt: '2025-09-05',
    href: 'https://www.bocra.org.bw/sites/default/files/documents/UASF%20YOUTH%20HACKATHON.pdf',
  },
  {
    id: 'resource-type-approval-publication',
    title: 'BOCRA Type Approval Publication',
    description: 'Reference publication on type approval requirements and related compliance information.',
    category: 'Regulations',
    contentType: 'PDF',
    updatedAt: '2025-08-12',
    href: 'https://www.bocra.org.bw/sites/default/files/documents/BOCRA_TYPE_APPROVAL_PUBLICATION.pdf',
  },
  {
    id: 'resource-kyc-form-fy-25-26',
    title: 'KYC Form FY 25/26',
    description: 'Know Your Customer form and requirements for current compliance cycle submissions.',
    category: 'Licensing',
    contentType: 'PDF',
    updatedAt: '2025-07-01',
    href: 'https://www.bocra.org.bw/sites/default/files/documents/KYC_FORM_FY_25_26.pdf',
  },
  {
    id: 'resource-digital-services-bill-draft',
    title: 'Digital Services Bill (Revised Draft) June 2025',
    description: 'Revised draft bill for digital services, published for public reference.',
    category: 'Regulations',
    contentType: 'PDF',
    updatedAt: '2025-06-15',
    href: 'https://www.bocra.org.bw/sites/default/files/documents/Digital_Services_Bill_%28revised_draft%29June2025_0.pdf',
  },
  {
    id: 'resource-cybersecurity-bill-draft-2025',
    title: 'Draft Cybersecurity Bill 2025 (AG Comments)',
    description: 'Draft cybersecurity bill document with Attorney General comments.',
    category: 'Regulations',
    contentType: 'PDF',
    updatedAt: '2025-05-28',
    href: 'https://www.bocra.org.bw/sites/default/files/documents/Draft_Cybersecurity_Bill_2025_AG_Comments.pdf',
  },
  {
    id: 'resource-baseline-security-requirements',
    title: 'Baseline Security Requirements',
    description: 'Baseline requirements to support secure and resilient communications services.',
    category: 'Consumer Guides',
    contentType: 'Guide',
    updatedAt: '2025-04-20',
    href: 'https://www.bocra.org.bw/sites/default/files/documents/Baseline_Security_Requirements.pdf',
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
    id: 'report-bocra-annual-report-2025',
    title: 'BOCRA 2025 Annual Report',
    description: 'Official annual report covering regulatory performance, programmes, and financial highlights.',
    publishedAt: '2025-12-01',
    href: 'https://www.bocra.org.bw/sites/default/files/documents/BOCRA2025_ANNUAL_REPORT_%28WEB%29_compressed.pdf',
  },
  {
    id: 'report-state-of-icts-botswana',
    title: 'State of ICTs in Botswana',
    description: 'Sector-wide report on ICT developments, trends, and ecosystem performance in Botswana.',
    publishedAt: '2025-10-15',
    href: 'https://www.bocra.org.bw/sites/default/files/documents/BOCRA%20for%20State%20of%20ICTs%20in%20Botswana.pdf',
  },
]
