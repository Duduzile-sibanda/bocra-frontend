export interface NewsArticle {
  id: string
  category: 'Licensing' | 'Complaints' | 'Public Notice' | 'Consumer Advisory' | 'Regulation Update'
  title: string
  dateISO: string
  summary: string
  readTime: string
  imageAlt: string
  imageSrc: string
  content: string[]
}
