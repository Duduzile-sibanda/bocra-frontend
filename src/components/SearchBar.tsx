import { useState } from 'react'
import type { FormEvent } from 'react'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import styles from './SearchBar.module.css'

function SearchBar() {
  const [query, setQuery] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!query.trim()) {
      return
    }
    console.log('Search query:', query)
  }

  return (
    <form className={styles.search} onSubmit={handleSubmit} role="search">
      <label className={styles.srOnly} htmlFor="site-search">
        Search site
      </label>
      <input
        className={styles.input}
        id="site-search"
        name="site-search"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search"
        type="search"
        value={query}
      />
      <button aria-label="Submit search" className={styles.submit} type="submit">
        <HiOutlineMagnifyingGlass className={styles.icon} aria-hidden="true" />
      </button>
    </form>
  )
}

export default SearchBar
