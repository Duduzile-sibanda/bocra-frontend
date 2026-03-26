import type { NewsArticle } from '../types/news'

export const latestUpdatesMock: NewsArticle[] = [
  {
    id: 'licensing-requirements-2026',
    category: 'Licensing',
    title: 'New Licensing Requirements Published for 2026 Applications',
    dateISO: '2026-02-18',
    summary:
      'BOCRA has published updated licensing requirements with clarified eligibility, documentation standards, and revised processing expectations for applicants.',
    readTime: '4 min read',
    imageAlt: 'Licensing update graphic',
    imageThemeClass: 'from-blue-700 via-blue-600 to-cyan-500',
    content: [
      'BOCRA has released revised licensing requirements to improve clarity for applicants across regulated sectors.',
      'The update provides clearer documentation requirements, a simplified submission checklist, and refined application validation criteria.',
      'Applicants are encouraged to review the updated requirements before submission to reduce processing delays and improve first-time compliance outcomes.',
    ],
  },
  {
    id: 'complaints-process-improvement',
    category: 'Complaints',
    title: 'Consumer Complaint Handling Timeline Updated',
    dateISO: '2026-01-29',
    summary:
      'A refined complaint workflow introduces clearer status milestones and tighter response coordination between service providers and BOCRA teams.',
    readTime: '3 min read',
    imageAlt: 'Consumer complaint handling illustration',
    imageThemeClass: 'from-rose-700 via-rose-600 to-orange-500',
    content: [
      'BOCRA has strengthened its complaint handling process with more visible status milestones for consumers.',
      'The revised timeline supports faster triage, clearer escalation paths, and improved accountability for provider responses.',
      'Consumers can continue using existing submission channels while benefiting from improved progress visibility and turnaround management.',
    ],
  },
  {
    id: 'public-notice-service-disruptions',
    category: 'Public Notice',
    title: 'Public Notice on Temporary Service Disruptions in Select Areas',
    dateISO: '2026-03-03',
    summary:
      'Operators have advised BOCRA of temporary service interruptions in selected regions due to planned infrastructure maintenance windows.',
    readTime: '2 min read',
    imageAlt: 'Public notice announcement graphic',
    imageThemeClass: 'from-slate-700 via-slate-600 to-slate-400',
    content: [
      'BOCRA has received notifications of temporary service disruptions in select areas linked to planned maintenance activity.',
      'The maintenance windows are intended to strengthen network resilience and improve service quality in the medium term.',
      'Affected users are advised to monitor operator advisories and support channels for area-specific restoration updates.',
    ],
  },
  {
    id: 'spectrum-management-briefing',
    category: 'Regulation Update',
    title: 'Spectrum Management Announcement for Coordination Improvements',
    dateISO: '2026-02-07',
    summary:
      'A new regulatory briefing outlines enhancements to spectrum coordination procedures to support efficient allocation and reduced interference.',
    readTime: '5 min read',
    imageAlt: 'Spectrum management update graphic',
    imageThemeClass: 'from-emerald-700 via-emerald-600 to-teal-500',
    content: [
      'BOCRA has issued a spectrum management update to improve allocation transparency and coordination workflows.',
      'The update focuses on reducing harmful interference, improving assignment predictability, and supporting sector growth.',
      'Stakeholders are encouraged to review the procedural guidance and align technical submissions with the revised expectations.',
    ],
  },
]
