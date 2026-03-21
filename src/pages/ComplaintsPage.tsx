import Button from '../components/Button'
import Section from '../components/Section'
import styles from './Page.module.css'

function ComplaintsPage() {
  return (
    <>
      <section className={styles.hero}>
        <h1>Complaints</h1>
        <p>
          Submit complaints related to services, operators, or consumer rights.
          Our team will review and respond through formal channels.
        </p>
      </section>

      <Section title="Submit a Complaint">
        <form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required type="text" />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" required type="email" />
          </div>

          <div className={styles.field}>
            <label htmlFor="complaint">Complaint</label>
            <textarea id="complaint" name="complaint" required />
          </div>

          <div className={styles.field}>
            <label htmlFor="fileUpload">File Upload</label>
            <input id="fileUpload" name="fileUpload" type="file" />
          </div>

          <Button label="Submit Complaint" type="submit" variant="primary" />
        </form>
      </Section>
    </>
  )
}

export default ComplaintsPage
