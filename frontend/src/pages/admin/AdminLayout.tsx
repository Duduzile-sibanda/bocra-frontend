import { useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import styles from '../../pages/admin/AdminLayout.module.css'
import bocraLogo from '../../assets/logo1.svg'
import buildingBg from '../../assets/BUILDING.JPG'

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const navigate = useNavigate()

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
                <Link to="/admin" className={styles.menuItem}>👤 Profile</Link>
                <Link to="/admin" className={styles.menuItem}>🔧 Preferences</Link>
                <button 
                  className={styles.menuItem}
                  onClick={() => {
                    alert('Logging out...')
                    navigate('/')
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <main 
        className={styles.mainContent}
        style={{ 
          backgroundImage: `linear-gradient(rgba(240, 247, 255, 0.88), rgba(240, 247, 255, 0.88)), url(${buildingBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <header className={styles.topBar}>
          <button
            className={styles.menuToggle}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Sidebar"
          >
            ☰
          </button>
          <h1 className={styles.pageTitle}>Admin Control Center</h1>
          <div className={styles.headerFiller} />
          <div className={styles.topBarActions}>
            <div className={styles.userBadge}>
              <span>System Admin</span>
              <div className={styles.avatarCircle}>SA</div>
            </div>
          </div>
        </header>
        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout