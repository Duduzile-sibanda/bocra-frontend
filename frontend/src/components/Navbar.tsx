import { useEffect, useMemo, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { HiOutlineBars3, HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2'
import Button from './Button'
import styles from './Navbar.module.css'
import logo from '../assets/bocra.png'
import { SITE_SEARCH_INDEX } from '../data/siteSearch'
import { rankSiteSearchEntries } from '../utils/siteSearchRanking'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Projects', to: '/projects' },
  { label: 'Tenders', to: '/tenders' },
  { label: 'Licensing', to: '/licensing' },
  { label: 'Documents', to: '/legislation' },
  { label: 'Complaints', to: '/complaints' },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.linkBase} ${isActive ? styles.linkActive : styles.linkDefault}`.trim()

function Navbar() {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const searchWrapperRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 220)
    return () => window.clearTimeout(timer)
  }, [searchQuery])

  const results = useMemo(
    () => rankSiteSearchEntries(SITE_SEARCH_INDEX, debouncedSearchQuery, 8),
    [debouncedSearchQuery],
  )

  useEffect(() => {
    setActiveIndex((prev) => (prev >= results.length ? -1 : prev))
  }, [results.length])

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const openResult = (path: string) => {
    navigate(path)
    setIsSearchOpen(false)
    setIsMobileMenuOpen(false)
    setSearchQuery('')
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <NavLink className={styles.brand} end to="/">
          <img alt="BOCRA Logo" className={styles.logo} src={logo} />
        </NavLink>

        <button
          type="button"
          className={styles.mobileMenuButton}
          aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? (
            <HiOutlineXMark className={styles.searchIcon} aria-hidden="true" />
          ) : (
            <HiOutlineBars3 className={styles.searchIcon} aria-hidden="true" />
          )}
        </button>

        <div className={`${styles.rightGroup} ${isMobileMenuOpen ? styles.rightGroupOpen : ''}`.trim()}>
          <nav className={styles.navLinks} aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                className={navLinkClass}
                end
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
              >
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
                  placeholder="Search across pages, services, jobs, tenders..."
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
                      if (event.key === 'Enter') {
                        const selected = results[activeIndex] ?? results[0]
                        if (selected) {
                          event.preventDefault()
                          openResult(selected.path)
                        }
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
            <Button
              label="BSA Portal"
              to="/admin"
              variant="primary"
              className={styles.portalButton}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
