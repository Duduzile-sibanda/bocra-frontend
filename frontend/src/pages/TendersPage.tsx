import Section from '../components/Section'
import { tenders } from '../data/tenders'
import styles from './Page.module.css'

function getStatusClass(status: string) {
  if (status === 'Open') return `${styles.status} ${styles.open}`
  if (status === 'Closed') return `${styles.status} ${styles.closed}`
  return `${styles.status} ${styles.awarded}`
}

function TendersPage() {
  return (
    <>
      <section className={styles.hero}>
        <h1>Tenders</h1>
        <p>
          Official procurement notices, status updates, and submission
          deadlines.
        </p>
      </section>

      <Section title="Tender Notices">
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {tenders.map((tender) => (
                <tr key={tender.id}>
                  <td>{tender.title}</td>
                  <td>
                    <span className={getStatusClass(tender.status)}>
                      {tender.status}
                    </span>
                  </td>
                  <td>{tender.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  )
}

export default TendersPage
