import type { SearchRecord, Suggestion } from './types'

export const TRENDING_SEARCHES = [
  '5G spectrum renewal',
  'Dealer license renewals',
  'Type approval expiring soon',
  'System audit pending',
  'Cross-border gateway licenses',
]

export const MOCK_RECORDS: SearchRecord[] = [
  {
    id: 'L-001',
    title: 'National 5G Spectrum Renewal',
    company: 'Botswana Mobile One',
    type: 'Spectrum Licence',
    status: 'Pending',
    tags: ['5g', 'renewal', 'national'],
  },
  {
    id: 'L-002',
    title: 'Regional Broadcast Spectrum Permit',
    company: 'Kalahari Broadcast Group',
    type: 'Spectrum Licence',
    status: 'Active',
    tags: ['broadcast', 'regional', 'permit'],
  },
  {
    id: 'L-003',
    title: 'Dealer Distribution Authority',
    company: 'ComAxis Distributors',
    type: 'Dealer',
    status: 'Active',
    tags: ['distribution', 'dealer'],
  },
  {
    id: 'L-004',
    title: 'Enterprise Telecom Equipment Dealer',
    company: 'Nexa Telecom Supplies',
    type: 'Dealer',
    status: 'Expired',
    tags: ['enterprise', 'equipment'],
  },
  {
    id: 'L-005',
    title: 'Managed Core Network Services',
    company: 'PulseWave Systems',
    type: 'System & Services',
    status: 'Active',
    tags: ['core network', 'managed'],
  },
  {
    id: 'L-006',
    title: 'National Fiber Operations Service',
    company: 'BlueGrid Infrastructure',
    type: 'System & Services',
    status: 'Pending',
    tags: ['fiber', 'national', 'operations'],
  },
  {
    id: 'L-007',
    title: 'Rugged Router Type Approval',
    company: 'AridLink Technologies',
    type: 'Type Approval',
    status: 'Active',
    tags: ['router', 'rugged'],
  },
  {
    id: 'L-008',
    title: 'Satellite Modem Type Approval',
    company: 'SkyReach Devices',
    type: 'Type Approval',
    status: 'Expired',
    tags: ['satellite', 'modem'],
  },
  {
    id: 'L-009',
    title: 'Public Safety Spectrum Allocation',
    company: 'GovCom Networks',
    type: 'Spectrum Licence',
    status: 'Active',
    tags: ['public safety', 'allocation'],
  },
  {
    id: 'L-010',
    title: 'Dealer Compliance Re-Certification',
    company: 'Delta Signal Trade',
    type: 'Dealer',
    status: 'Pending',
    tags: ['compliance', 'recertification'],
  },
  {
    id: 'L-011',
    title: 'Cloud Contact Platform Services',
    company: 'NovaVoice Systems',
    type: 'System & Services',
    status: 'Active',
    tags: ['cloud', 'contact center'],
  },
  {
    id: 'L-012',
    title: 'IoT Gateway Device Approval',
    company: 'SandByte Electronics',
    type: 'Type Approval',
    status: 'Pending',
    tags: ['iot', 'gateway'],
  },
]

export const BASE_SUGGESTIONS: Suggestion[] = MOCK_RECORDS.map((record) => ({
  id: `s-${record.id}`,
  value: `${record.title} - ${record.company}`,
  category: record.type,
  filterType: record.type,
}))

