export type Job = {
  id: number
  title: string
  department: string
  location: string
  closingDate: string
}

export const jobs: Job[] = [
  {
    id: 1,
    title: 'Licensing Officer',
    department: 'Licensing',
    location: 'Gaborone',
    closingDate: '30 April 2026',
  },
  {
    id: 2,
    title: 'Legal and Policy Analyst',
    department: 'Legal Affairs',
    location: 'Gaborone',
    closingDate: '07 May 2026',
  },
  {
    id: 3,
    title: 'Compliance Inspector',
    department: 'Compliance',
    location: 'Francistown',
    closingDate: '15 May 2026',
  },
]
