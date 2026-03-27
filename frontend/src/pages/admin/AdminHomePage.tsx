import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './AdminHomePage.module.css'

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
        <div className={styles.contentContainer}>
          <section className={styles.welcomeSection}>
            <div className={styles.welcomeText}>
              <h2>System Overview</h2>
              <p className={styles.dateDisplay}>
                {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <button className={styles.primaryActionBtn} onClick={() => navigate('/admin/analytics')}>
              📊 Generate Report
            </button>
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

          <div className={styles.dashboardGrid}>
            <section className={styles.infoCard}>
              <h3>Recent System Activity</h3>
              <div className={styles.activityFeed}>
                <div className={styles.activityLine}>
                  <span className={styles.dot} />
                  <p>New license application submitted by <strong>Liquid Intelligent Tech</strong></p>
                  <small>1 hour ago</small>
                </div>
                <div className={styles.activityLine}>
                  <span className={styles.dot} />
                  <p>Complaint #004 status updated to <strong>Resolved</strong></p>
                  <small>3 hours ago</small>
                </div>
                <div className={styles.activityLine}>
                  <span className={styles.dot} />
                  <p>New advisory published: <em>"Network Quality Guidelines 2026"</em></p>
                  <small>Yesterday</small>
                </div>
              </div>
            </section>

            <section className={styles.infoCard}>
              <h3>Quick Navigation</h3>
              <div className={styles.shortcutGrid}>
                <Link to="/admin/complaints" className={styles.shortcut}>Resolve Pending Issues</Link>
                <Link to="/admin/licensing" className={styles.shortcut}>Review Applications</Link>
                <Link to="/admin/content" className={styles.shortcut}>Update Public Portal</Link>
                <Link to="/admin/users" className={styles.shortcut}>Manage Staff Permissions</Link>
              </div>
            </section>
          </div>
        </div>
  )
}

export default AdminHomePage
