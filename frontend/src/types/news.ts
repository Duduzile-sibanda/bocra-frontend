export interface NewsArticle {
  id: string
  category: 'Licensing' | 'Complaints' | 'Public Notice' | 'Consumer Advisory' | 'Regulation Update'
  title: string
  dateISO: string
  summary: string
  readTime: string
  imageAlt: string
  imageThemeClass: string
  content: string[]
}
