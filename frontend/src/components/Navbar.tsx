import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import Button from './Button'
import styles from './Navbar.module.css'
import logo from '../assets/logo1.svg'
import { SITE_SEARCH_INDEX } from '../data/siteSearch'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Projects', to: '/projects' },
  { label: 'Tenders', to: '/tenders' },
  { label: 'Licensing', to: '/licensing' },
  { label: 'Legislation', to: '/legislation' },
  { label: 'Complaints', to: '/complaints' },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.linkBase} ${isActive ? styles.linkActive : styles.linkDefault}`.trim()

function Navbar() {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const searchWrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const results = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    if (!normalizedQuery) {
      return SITE_SEARCH_INDEX.slice(0, 6)
    }

    return SITE_SEARCH_INDEX.map((entry) => {
      const title = entry.title.toLowerCase()
      const description = entry.description.toLowerCase()
      const keywordText = entry.keywords.join(' ').toLowerCase()
      let score = 0

      if (title.includes(normalizedQuery)) score += 4
      if (description.includes(normalizedQuery)) score += 2
      if (keywordText.includes(normalizedQuery)) score += 3

      return { entry, score }
    })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
      .slice(0, 8)
      .map((item) => item.entry)
  }, [searchQuery])

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus()
    } else {
      setActiveIndex(-1)
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchWrapperRef.current?.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const openResult = (path: string) => {
    navigate(path)
    setIsSearchOpen(false)
    setSearchQuery('')
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <NavLink className={styles.brand} end to="/">
          <img alt="BOCRA Logo" className={styles.logo} src={logo} />
        </NavLink>

        <div className={styles.rightGroup}>
          <nav className={styles.navLinks} aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.label} className={navLinkClass} end to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.searchWrap} ref={searchWrapperRef}>
            <button
              type="button"
              className={styles.searchTrigger}
              aria-label="Open site search"
              aria-expanded={isSearchOpen}
              aria-controls="navbar-site-search"
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              <HiOutlineMagnifyingGlass className={styles.searchIcon} aria-hidden="true" />
              <span>Search</span>
            </button>

            {isSearchOpen ? (
              <div id="navbar-site-search" className={styles.searchPopover} role="dialog" aria-label="Site search">
                <div className={styles.searchInputRow}>
                  <HiOutlineMagnifyingGlass className={styles.searchIcon} aria-hidden="true" />
                  <input
                    ref={inputRef}
                    type="search"
                    value={searchQuery}
                    placeholder="Search pages, services, jobs, tenders..."
                    className={styles.searchInput}
                    onChange={(event) => {
                      setSearchQuery(event.target.value)
                      setActiveIndex(-1)
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1))
                      }
                      if (event.key === 'ArrowUp') {
                        event.preventDefault()
                        setActiveIndex((prev) => Math.max(prev - 1, 0))
                      }
                      if (event.key === 'Enter' && results[activeIndex]) {
                        event.preventDefault()
                        openResult(results[activeIndex].path)
                      }
                    }}
                  />
                  <button
                    type="button"
                    className={styles.clearSearch}
                    aria-label="Clear search input"
                    onClick={() => {
                      setSearchQuery('')
                      inputRef.current?.focus()
                    }}
                  >
                    <HiOutlineXMark className={styles.searchIcon} aria-hidden="true" />
                  </button>
                </div>

                <ul className={styles.searchResults} role="listbox" aria-label="Search results">
                  {results.length > 0 ? (
                    results.map((entry, index) => (
                      <li key={entry.id} role="presentation">
                        <button
                          type="button"
                          role="option"
                          aria-selected={activeIndex === index}
                          className={`${styles.searchResultItem} ${
                            activeIndex === index ? styles.searchResultItemActive : ''
                          }`}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => openResult(entry.path)}
                        >
                          <span className={styles.searchResultTitle}>{entry.title}</span>
                          <span className={styles.searchResultMeta}>{entry.section}</span>
                          <span className={styles.searchResultDescription}>{entry.description}</span>
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className={styles.searchEmptyState}>No results found. Try a different keyword.</li>
                  )}
                </ul>
              </div>
            ) : null}
          </div>

          <div className={styles.cta}>
            <Button label="BSA Portal" to="/admin" variant="primary" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
