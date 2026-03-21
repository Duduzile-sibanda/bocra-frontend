export type Tender = {
  id: number
  title: string
  status: 'Open' | 'Closed' | 'Awarded'
  deadline: string
}

export const tenders: Tender[] = [
  {
    id: 1,
    title: 'Supply and Installation of Data Center Equipment',
    status: 'Open',
    deadline: '20 May 2026',
  },
  {
    id: 2,
    title: 'Enterprise Cybersecurity Audit Services',
    status: 'Open',
    deadline: '28 May 2026',
  },
  {
    id: 3,
    title: 'Office Renovation and Space Optimization',
    status: 'Awarded',
    deadline: '12 March 2026',
  },
]
