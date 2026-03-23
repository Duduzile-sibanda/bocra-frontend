import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './AdminAnalyticsPage.module.css'

type StatCard = {
  title: string
  value: string
  change: string
  changeTone?: 'positive' | 'negative'
}

type ChartBar = {
  label: string
  value: string
  height: string
  color?: string
}

function AdminAnalyticsPage() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const stats: StatCard[] = [
    { title: 'Total Complaints', value: '248', change: '↑ 12% from last month', changeTone: 'positive' },
    { title: 'Resolved Complaints', value: '156', change: '62.9% resolution rate' },
    { title: 'Active Licenses', value: '42', change: '↑ 5 new this month', changeTone: 'positive' },
    { title: 'Pending Applications', value: '18', change: '↑ 2 overdue', changeTone: 'negative' },
    { title: 'Active Users', value: '1,523', change: '↑ 8% growth', changeTone: 'positive' },
    { title: 'Avg Response Time', value: '2.3 days', change: '↓ 0.5 day slower', changeTone: 'negative' },
  ]

  const complaintStatusBars: ChartBar[] = [
    { label: 'Submitted', value: '85', height: '80%' },
    { label: 'In Review', value: '62', height: '60%', color: '#0066cc' },
    { label: 'Resolved', value: '78', height: '75%', color: '#00aa00' },
    { label: 'Rejected', value: '23', height: '40%', color: '#cc0000' },
  ]

  const userRegistrationsBars: ChartBar[] = [
    { label: 'Oct', value: '156', height: '45%', color: '#ffb300' },
    { label: 'Nov', value: '189', height: '55%', color: '#ffb300' },
    { label: 'Dec', value: '234', height: '65%', color: '#ffb300' },
    { label: 'Jan', value: '289', height: '70%', color: '#ffb300' },
    { label: 'Feb', value: '345', height: '80%', color: '#ffb300' },
    { label: 'Mar', value: '410', height: '90%', color: '#ffb300' },
  ]

  const onApplyFilter = () => {
    if (startDate && endDate) {
      window.alert(`Filtering analytics from ${startDate} to ${endDate}`)
      return
    }
    window.alert('Please select both start and end dates')
  }

  const onResetFilter = () => {
    setStartDate('')
    setEndDate('')
    window.alert('Filter reset')
  }

  const onExportReport = () => {
    window.alert('Report exported as PDF. Check your downloads folder.')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Analytics Dashboard</h1>
        <Link to="/admin" className={styles.backButton}>
          {'\u2190'} Back to Dashboard
        </Link>
      </header>

      <div className={styles.container}>
        <section className={styles.dateFilter}>
          <label htmlFor="startDate">Filter by Date Range:</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
          <button type="button" onClick={onApplyFilter}>
            Apply Filter
          </button>
          <button type="button" onClick={onResetFilter}>
            Reset
          </button>
        </section>

        <section className={styles.statsGrid}>
          {stats.map((stat) => (
            <article key={stat.title} className={styles.statCard}>
              <h3>{stat.title}</h3>
              <div className={styles.value}>{stat.value}</div>
              <div
                className={`${styles.change} ${
                  stat.changeTone === 'positive'
                    ? styles.positive
                    : stat.changeTone === 'negative'
                      ? styles.negative
                      : ''
                }`}
              >
                {stat.change}
              </div>
            </article>
          ))}
        </section>

        <section className={styles.chartsContainer}>
          <article className={styles.chartCard}>
            <h3>Complaints by Status</h3>
            <div className={styles.chart}>
              {complaintStatusBars.map((bar) => (
                <div
                  key={bar.label}
                  className={styles.bar}
                  style={{
                    height: bar.height,
                    backgroundColor: bar.color ?? '#005599',
                  }}
                >
                  <span className={styles.barValue}>{bar.value}</span>
                  <span className={styles.barLabel}>{bar.label}</span>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.chartCard}>
            <h3>User Registrations (Last 6 Months)</h3>
            <div className={styles.chart}>
              {userRegistrationsBars.map((bar) => (
                <div
                  key={bar.label}
                  className={styles.bar}
                  style={{
                    height: bar.height,
                    backgroundColor: bar.color ?? '#005599',
                  }}
                >
                  <span className={styles.barValue}>{bar.value}</span>
                  <span className={styles.barLabel}>{bar.label}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className={styles.tableCard}>
          <h3>Top Complaint Categories</h3>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Count</th>
                <th>Percentage</th>
                <th>Avg Resolution Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Poor Network Signal</td>
                <td>78</td>
                <td>31.5%</td>
                <td>2.1 days</td>
                <td>
                  <span className={styles.inProgress}>{'\u2713'} In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Billing Issues</td>
                <td>54</td>
                <td>21.8%</td>
                <td>1.8 days</td>
                <td>
                  <span className={styles.inProgress}>{'\u2713'} In Progress</span>
                </td>
              </tr>
              <tr>
                <td>Service Outages</td>
                <td>42</td>
                <td>16.9%</td>
                <td>3.2 days</td>
                <td>
                  <span className={styles.needsAttention}>{'\u26A0'} Needs Attention</span>
                </td>
              </tr>
              <tr>
                <td>Licensing Delays</td>
                <td>38</td>
                <td>15.3%</td>
                <td>4.5 days</td>
                <td>
                  <span className={styles.needsAttention}>{'\u26A0'} Needs Attention</span>
                </td>
              </tr>
              <tr>
                <td>Other</td>
                <td>36</td>
                <td>14.5%</td>
                <td>2.4 days</td>
                <td>
                  <span className={styles.inProgress}>{'\u2713'} In Progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles.tableCard}>
          <h3>Module Performance Metrics</h3>
          <table>
            <thead>
              <tr>
                <th>Module</th>
                <th>Total Requests</th>
                <th>Avg Response Time</th>
                <th>Success Rate</th>
                <th>Error Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Complaints Management</td>
                <td>2,156</td>
                <td>120ms</td>
                <td>99.2%</td>
                <td>0.8%</td>
              </tr>
              <tr>
                <td>Licensing System</td>
                <td>1,845</td>
                <td>145ms</td>
                <td>98.5%</td>
                <td>1.5%</td>
              </tr>
              <tr>
                <td>Content Management</td>
                <td>3,245</td>
                <td>95ms</td>
                <td>99.8%</td>
                <td>0.2%</td>
              </tr>
              <tr>
                <td>User Management</td>
                <td>1,567</td>
                <td>110ms</td>
                <td>99.5%</td>
                <td>0.5%</td>
              </tr>
            </tbody>
          </table>
          <button type="button" className={styles.exportButton} onClick={onExportReport}>
            {'\uD83D\uDCE5'} Export Report
          </button>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2026 BOCRA Digital Service Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default AdminAnalyticsPage
