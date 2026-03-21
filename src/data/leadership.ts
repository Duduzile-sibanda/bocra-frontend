export type Leader = {
  id: number
  name: string
  role: string
}

export const boardDirectors: Leader[] = [
  { id: 1, name: 'Ms. K. Mothibi', role: 'Board Chairperson' },
  { id: 2, name: 'Dr. L. Ncube', role: 'Vice Chairperson' },
  { id: 3, name: 'Mr. T. Molefe', role: 'Board Member' },
  { id: 4, name: 'Ms. R. Phiri', role: 'Board Member' },
]

export const executiveManagement: Leader[] = [
  { id: 1, name: 'Mr. P. Dlamini', role: 'Chief Executive Officer' },
  { id: 2, name: 'Ms. J. Khumalo', role: 'Director, Licensing' },
  { id: 3, name: 'Mr. S. Moagi', role: 'Director, Compliance' },
  { id: 4, name: 'Ms. A. Moyo', role: 'Director, Corporate Services' },
]
