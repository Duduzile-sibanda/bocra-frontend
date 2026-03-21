import Section from '../components/Section'
import { jobs } from '../data/careers'
import styles from './Page.module.css'

function CareersPage() {
  return (
    <>
      <section className={styles.hero}>
        <h1>Careers</h1>
        <p>
          Join a purpose-driven institution shaping policy, compliance, and
          public service delivery.
        </p>
      </section>

      <Section title="Current Opportunities">
        <ul className={styles.list}>
          {jobs.map((job) => (
            <li className={styles.listItem} key={job.id}>
              <div className={styles.row}>
                <strong>{job.title}</strong>
                <span>{job.closingDate}</span>
              </div>
              <p className={styles.muted}>
                {job.department} • {job.location}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

export default CareersPage
