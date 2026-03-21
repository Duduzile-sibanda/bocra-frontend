export type Project = {
  id: number
  title: string
  summary: string
  status: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Digital Licensing Portal',
    summary:
      'A unified platform for online applications, tracking, and notifications.',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'National Compliance Dashboard',
    summary: 'A data dashboard for inspection outcomes and enforcement insights.',
    status: 'Planning',
  },
  {
    id: 3,
    title: 'Consumer Awareness Campaign',
    summary: 'Public outreach focused on licensing rights and complaint channels.',
    status: 'Active',
  },
]
