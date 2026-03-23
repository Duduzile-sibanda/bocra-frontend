import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './AdminHomePage.module.css'
import bocraLogo from '../../assets/logo1.svg'

type AdminStats = {
  pendingComplaints: number
  activeLicenses: number
  publishedContent: number
}

const initialStats: AdminStats = {
  pendingComplaints: 15,
  activeLicenses: 120,
  publishedContent: 45,
}

function AdminHomePage() {
  const [stats, setStats] = useState<AdminStats>(initialStats)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setStats({
        pendingComplaints: Math.floor(Math.random() * 20) + 10,
        activeLicenses: Math.floor(Math.random() * 50) + 100,
        publishedContent: Math.floor(Math.random() * 20) + 40,
      })
    }, 10_000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <div className={styles.page}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        <div className={styles.logoContainer}>
          <img src={bocraLogo} alt="BOCRA Logo" className={styles.logo} />
        </div>

        <nav className={styles.sidebarNav}>
          <Link to="/admin" className={styles.navItem} title="Dashboard">
            <span className={styles.icon}>📊</span>
            <span className={styles.label}>Dashboard</span>
          </Link>
          <Link to="/admin/analytics" className={styles.navItem} title="Analytics">
            <span className={styles.icon}>📈</span>
            <span className={styles.label}>Analytics</span>
          </Link>
          <Link to="/admin/complaints" className={styles.navItem} title="Complaints">
            <span className={styles.icon}>⚠️</span>
            <span className={styles.label}>Complaints</span>
          </Link>
          <Link to="/admin/licensing" className={styles.navItem} title="Licensing">
            <span className={styles.icon}>📜</span>
            <span className={styles.label}>Licensing</span>
          </Link>
          <Link to="/admin/content" className={styles.navItem} title="Content">
            <span className={styles.icon}>📝</span>
            <span className={styles.label}>Content</span>
          </Link>
          <Link to="/admin/notifications" className={styles.navItem} title="Notifications">
            <span className={styles.icon}>🔔</span>
            <span className={styles.label}>Notifications</span>
          </Link>
          <Link to="/admin/users" className={styles.navItem} title="Users">
            <span className={styles.icon}>👥</span>
            <span className={styles.label}>Users</span>
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.settingsContainer}>
            <button 
              className={styles.settingsBtn} 
              title="Settings"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              ⚙️
            </button>
            {settingsOpen && (
              <div className={styles.settingsMenu}>
                <Link to="/admin" className={styles.menuItem}>
                  👤 Profile
                </Link>
                <Link to="/admin" className={styles.menuItem}>
                  🔧 Preferences
                </Link>
                <button 
                  className={styles.menuItem}
                  onClick={() => {
                    alert('Logging out...')
                    // Add actual logout logic here
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topBar}>
          <button
            className={styles.menuToggle}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Sidebar"
          >
            ☰
          </button>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <div className={styles.headerFiller} />
        </header>

        <div className={styles.contentContainer}>
          <section className={styles.welcomeSection}>
            <h2>Welcome to the Admin Dashboard</h2>
            <p>Manage all aspects of the BOCRA Digital Service Platform efficiently and effectively.</p>
          </section>

          <div className={styles.statsContainer}>
            <article className={styles.statCard}>
              <div className={styles.statIcon}>⚠️</div>
              <div className={styles.statContent}>
                <h3>Pending Complaints</h3>
                <p className={styles.statValue}>{stats.pendingComplaints}</p>
              </div>
            </article>
            <article className={styles.statCard}>
              <div className={styles.statIcon}>📜</div>
              <div className={styles.statContent}>
                <h3>Active Licenses</h3>
                <p className={styles.statValue}>{stats.activeLicenses}</p>
              </div>
            </article>
            <article className={styles.statCard}>
              <div className={styles.statIcon}>📝</div>
              <div className={styles.statContent}>
                <h3>Published Content</h3>
                <p className={styles.statValue}>{stats.publishedContent}</p>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminHomePage
