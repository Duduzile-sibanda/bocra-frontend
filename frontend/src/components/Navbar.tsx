import { NavLink } from 'react-router-dom'
import Button from './Button'
import SearchBar from './SearchBar'
import styles from './Navbar.module.css'
import logo from '../assets/logo1.svg'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Projects', to: '/projects' },
  { label: 'Tenders', to: '/tenders' },
  { label: 'Licensing', to: '/licensing' },
  { label: 'Legislation', to: '/legislation' },
  { label: 'Complaints', to: '/complaints' },
  { label: 'Admin', to: '/admin' },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `${styles.linkBase} ${isActive ? styles.linkActive : styles.linkDefault}`.trim()

function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <NavLink className={styles.brand} end to="/">
          <img alt="BOCRA Logo" className={styles.logo} src={logo} />
        </NavLink>

        <nav className={styles.navLinks} aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.label} className={navLinkClass} end to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.searchContainer}>
          <SearchBar />
        </div>

        <div className={styles.cta}>
          <Button label="Apply for License" to="/licensing#apply" variant="primary" />
        </div>
      </div>
    </header>
  )
}

export default Navbar
