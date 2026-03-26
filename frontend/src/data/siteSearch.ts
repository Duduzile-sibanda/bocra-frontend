import { aboutSections } from './about'
import { jobs } from './careers'
import { complaintSections } from './complaints'
import { projects } from './projects'
import { tenders } from './tenders'

export type SiteSearchEntry = {
  id: string
  title: string
  description: string
  section: string
  path: string
  keywords: string[]
}

const CORE_PAGES: SiteSearchEntry[] = [
  {
    id: 'page-home',
    title: 'Home',
    description: 'Landing page with quick links to Licensing, Complaints, and Tenders.',
    section: 'Pages',
    path: '/',
    keywords: ['home', 'quick links', 'landing'],
  },
  {
    id: 'page-about',
    title: 'About BOCRA',
    description: 'Organization profile, history, leadership, and strategic direction.',
    section: 'Pages',
    path: '/about',
    keywords: ['about', 'profile', 'history', 'leadership', 'board'],
  },
  {
    id: 'page-licensing',
    title: 'Licensing',
    description: 'License categories, application details, upload flow, and tracking.',
    section: 'Pages',
    path: '/licensing',
    keywords: ['licensing', 'application', 'type approval', 'verification', 'tracking'],
  },
  {
    id: 'page-complaints',
    title: 'Complaints',
    description: 'Consumer rights and complaint handling guidance with filing options.',
    section: 'Pages',
    path: '/complaints',
    keywords: ['complaints', 'consumer rights', 'service quality', 'register complaint'],
  },
  {
    id: 'page-careers',
    title: 'Careers',
    description: 'Current opportunities, roles, and recruitment information.',
    section: 'Pages',
    path: '/careers',
    keywords: ['careers', 'jobs', 'vacancies'],
  },
  {
    id: 'page-projects',
    title: 'Projects',
    description: 'Strategic projects and program workstreams.',
    section: 'Pages',
    path: '/projects',
    keywords: ['projects', 'digital', 'infrastructure'],
  },
  {
    id: 'page-tenders',
    title: 'Tenders',
    description: 'Procurement opportunities, deadlines, and tender notices.',
    section: 'Pages',
    path: '/tenders',
    keywords: ['tenders', 'procurement', 'deadline', 'notice'],
  },
  {
    id: 'page-postal',
    title: 'Postal',
    description: 'Postal sector regulation, licensing categories, and market structure.',
    section: 'Pages',
    path: '/postal',
    keywords: ['postal', 'courier', 'public postal operator', 'licence'],
  },
  {
    id: 'page-internet',
    title: 'Internet',
    description: 'Internet regulation, connectivity guidelines, and bandwidth trends.',
    section: 'Pages',
    path: '/internet',
    keywords: ['internet', 'ict', 'connectivity', 'bandwidth'],
  },
  {
    id: 'page-broadcasting',
    title: 'Broadcasting',
    description: 'Broadcasting oversight, market coverage, and local content obligations.',
    section: 'Pages',
    path: '/broadcasting',
    keywords: ['broadcasting', 'radio', 'television', 'local content'],
  },
  {
    id: 'page-telecommunications',
    title: 'Telecommunications',
    description: 'Telecommunications market structure, licensing, and sector reforms.',
    section: 'Pages',
    path: '/telecommunications',
    keywords: ['telecommunications', 'pto', 'vans', 'bofinet', 'btcl'],
  },
  {
    id: 'page-legislation',
    title: 'Legislation',
    description: 'Legal and regulatory references for the communications sector.',
    section: 'Pages',
    path: '/legislation',
    keywords: ['legislation', 'regulation', 'law'],
  },
]

const ABOUT_ENTRIES: SiteSearchEntry[] = aboutSections.map((section) => ({
  id: `about-${section.id}`,
  title: section.heading,
  description: section.summary,
  section: 'About',
  path: `/about#${section.id}`,
  keywords: section.bullets.slice(0, 4),
}))

const JOB_ENTRIES: SiteSearchEntry[] = jobs.map((job) => ({
  id: `job-${job.id}`,
  title: job.title,
  description: `${job.description} (${job.location}, ${job.type})`,
  section: 'Careers',
  path: '/careers',
  keywords: [job.category, job.location, job.type],
}))

const PROJECT_ENTRIES: SiteSearchEntry[] = projects.map((project) => ({
  id: `project-${project.id}`,
  title: project.title,
  description: `${project.summary} Status: ${project.status}.`,
  section: 'Projects',
  path: '/projects',
  keywords: [project.status],
}))

const TENDER_ENTRIES: SiteSearchEntry[] = tenders.map((tender) => ({
  id: `tender-${tender.id}`,
  title: tender.title,
  description: `Status: ${tender.status}. Deadline: ${tender.deadline}.`,
  section: 'Tenders',
  path: '/tenders',
  keywords: [tender.status, tender.deadline],
}))

const COMPLAINT_ENTRIES: SiteSearchEntry[] = complaintSections.map((section) => ({
  id: `complaint-${section.id}`,
  title: section.heading,
  description: section.intro[0] ?? 'Complaint section details.',
  section: 'Complaints',
  path: `/complaints#${section.id}`,
  keywords: section.formComplaintTypes ?? [],
}))

export const SITE_SEARCH_INDEX: SiteSearchEntry[] = [
  ...CORE_PAGES,
  ...ABOUT_ENTRIES,
  ...JOB_ENTRIES,
  ...PROJECT_ENTRIES,
  ...TENDER_ENTRIES,
  ...COMPLAINT_ENTRIES,
]
