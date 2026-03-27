import type { SiteSearchEntry } from '../data/siteSearch'

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const tokenize = (value: string) => normalize(value).split(' ').filter(Boolean)

const levenshtein = (a: string, b: string) => {
  if (a === b) return 0
  if (!a.length) return b.length
  if (!b.length) return a.length

  const rows = b.length + 1
  const cols = a.length + 1
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0))

  for (let i = 0; i < cols; i += 1) matrix[0][i] = i
  for (let j = 0; j < rows; j += 1) matrix[j][0] = j

  for (let j = 1; j < rows; j += 1) {
    for (let i = 1; i < cols; i += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j - 1][i] + 1,
        matrix[j][i - 1] + 1,
        matrix[j - 1][i - 1] + cost,
      )
    }
  }

  return matrix[rows - 1][cols - 1]
}

const hasFuzzyWordMatch = (wordPool: string[], token: string) => {
  if (token.length < 5) return false
  return wordPool.some((word) => Math.abs(word.length - token.length) <= 1 && levenshtein(word, token) <= 1)
}

type RankedEntry = {
  entry: SiteSearchEntry
  score: number
  coverage: number
}

export function rankSiteSearchEntries(entries: SiteSearchEntry[], query: string, max = 8): SiteSearchEntry[] {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) {
    return entries.slice(0, max)
  }

  const queryTokens = tokenize(normalizedQuery)

  const ranked: RankedEntry[] = entries
    .map((entry) => {
      const title = normalize(entry.title)
      const description = normalize(entry.description)
      const keywords = normalize(entry.keywords.join(' '))
      const combinedWords = tokenize(`${title} ${description} ${keywords}`)

      let score = 0
      let coverage = 0

      if (title === normalizedQuery) score += 120
      if (title.includes(normalizedQuery)) score += 80
      if (keywords.includes(normalizedQuery)) score += 60
      if (description.includes(normalizedQuery)) score += 35

      for (const token of queryTokens) {
        let tokenMatched = false

        if (title.split(' ').includes(token)) {
          score += 24
          tokenMatched = true
        } else if (title.split(' ').some((word) => word.startsWith(token))) {
          score += 18
          tokenMatched = true
        } else if (title.includes(token)) {
          score += 12
          tokenMatched = true
        }

        if (keywords.split(' ').includes(token)) {
          score += 16
          tokenMatched = true
        } else if (keywords.includes(token)) {
          score += 10
          tokenMatched = true
        }

        if (description.includes(token)) {
          score += 7
          tokenMatched = true
        }

        if (!tokenMatched && hasFuzzyWordMatch(combinedWords, token)) {
          score += 8
          tokenMatched = true
        }

        if (tokenMatched) coverage += 1
      }

      return { entry, score, coverage }
    })
    .filter((item) => item.score > 0 && item.coverage > 0)
    .sort((a, b) => b.score - a.score || b.coverage - a.coverage || a.entry.title.localeCompare(b.entry.title))

  return ranked.slice(0, max).map((item) => item.entry)
}

