import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
      <header className={styles.header}>
        <div className={styles.headerGrain} />
        <h1>BOCRA Digital Service Platform - Admin Dashboard</h1>
        <p>Welcome, Admin. Manage the platform efficiently.</p>
      </header>

      <nav className={styles.nav}>
        <a href="#complaints">Complaint Management</a>
        <a href="#licensing">Licensing Management</a>
        <a href="#content">Content Management</a>
        <a href="#users">User Management</a>
        <a href="#notifications">Notifications</a>
        <a href="#analytics">Analytics</a>
      </nav>

      <div className={styles.container}>
        <div className={styles.stats}>
          <article className={styles.stat}>
            <h3>Pending Complaints</h3>
            <p>{stats.pendingComplaints}</p>
          </article>
          <article className={styles.stat}>
            <h3>Active Licenses</h3>
            <p>{stats.activeLicenses}</p>
          </article>
          <article className={styles.stat}>
            <h3>Published Content</h3>
            <p>{stats.publishedContent}</p>
          </article>
        </div>

        <div className={styles.dashboardGrid}>
          <section id="complaints" className={styles.dashboardSection}>
            <h2>Complaint Management</h2>
            <p>
              As an admin, you can review and update the status of complaints submitted by
              citizens and licensees. This includes:
            </p>
            <ul>
              <li>Viewing all submitted complaints with details and evidence.</li>
              <li>
                Updating complaint status (e.g., from &apos;Submitted&apos; to &apos;Under
                Review&apos;, &apos;Resolved&apos;, or &apos;Rejected&apos;).
              </li>
              <li>Assigning complaints to specific staff members for handling.</li>
              <li>Communicating updates to users via the notifications system.</li>
            </ul>
            <p>
              This module ensures timely resolution of public concerns and maintains
              transparency in the complaint process.
            </p>
            <Link className={styles.button} to="/admin/complaints">
              Manage Complaints
            </Link>
          </section>

          <section id="licensing" className={styles.dashboardSection}>
            <h2>Licensing Management</h2>
            <p>Manage license applications submitted by users. Your responsibilities include:</p>
            <ul>
              <li>Reviewing application details and supporting documents.</li>
              <li>Approving or rejecting applications based on compliance.</li>
              <li>Tracking application status and updating users accordingly.</li>
              <li>Generating and issuing licenses upon approval.</li>
            </ul>
            <p>
              This ensures efficient processing of licensing requests and supports business
              operations in the communications sector.
            </p>
            <Link className={styles.button} to="/admin/licensing">
              Manage Licenses
            </Link>
          </section>

          <section id="content" className={styles.dashboardSection}>
            <h2>Content Management System (CMS)</h2>
            <p>Create, edit, and delete content to keep the public informed. Key functions:</p>
            <ul>
              <li>Publishing regulations, advisories, and announcements.</li>
              <li>Categorizing content for easy search and retrieval.</li>
              <li>Updating existing content to reflect changes in policies.</li>
              <li>Managing multimedia content like images and documents.</li>
            </ul>
            <p>
              This module empowers admins to maintain an up-to-date knowledge portal for users.
            </p>
            <Link className={styles.button} to="/admin/content">
              Manage Content
            </Link>
          </section>

          <section id="users" className={styles.dashboardSection}>
            <h2>User Management</h2>
            <p>Oversee user accounts and roles to ensure secure access. Tasks include:</p>
            <ul>
              <li>Registering new admin or staff accounts.</li>
              <li>Assigning roles (Citizen, Licensee, Admin) with appropriate permissions.</li>
              <li>Monitoring user activities and enforcing role-based access control.</li>
              <li>Handling user support requests and account issues.</li>
            </ul>
            <p>This maintains system security and proper user segmentation.</p>
            <Link className={styles.button} to="/admin/users">
              Manage Users
            </Link>
          </section>

          <section id="notifications" className={styles.dashboardSection}>
            <h2>Notifications System</h2>
            <p>Send updates and alerts to users. Capabilities:</p>
            <ul>
              <li>
                Sending notifications for complaint status changes or application updates.
              </li>
              <li>Broadcasting system announcements and public advisories.</li>
              <li>Allowing users to mark notifications as read.</li>
              <li>Integrating with email or in-app notification channels.</li>
            </ul>
            <p>
              This keeps users engaged and informed about their interactions with the
              platform.
            </p>
            <Link className={styles.button} to="/admin/notifications">
              Manage Notifications
            </Link>
          </section>

          <section id="analytics" className={styles.dashboardSection}>
            <h2>Analytics and Dashboard</h2>
            <p>View system performance and usage statistics. Features:</p>
            <ul>
              <li>
                Monitoring key metrics like complaint resolution times and application
                volumes.
              </li>
              <li>Generating reports on user engagement and service usage.</li>
              <li>Identifying trends to improve platform efficiency.</li>
              <li>Accessing data analytics for decision-making.</li>
            </ul>
            <p>This provides insights to optimize the digital transformation efforts.</p>
            <Link className={styles.button} to="/admin/analytics">
              View Analytics
            </Link>
          </section>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2026 BOCRA Digital Service Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default AdminHomePage
