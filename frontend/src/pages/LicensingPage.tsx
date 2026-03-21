import Button from '../components/Button'
import Card from '../components/Card'
import Section from '../components/Section'
import styles from './Page.module.css'

function LicensingPage() {
  return (
    <>
      <section className={styles.hero}>
        <h1>Licensing</h1>
        <p>
          Access licensing requirements, applicable fees, and the online
          application pathway.
        </p>
      </section>

      <Section title="Licensing Services">
        <div className={styles.gridThree}>
          <Card title="Licensing Info">
            <p className={styles.muted}>
              Review eligibility criteria, required documents, and processing
              timelines for each license category.
            </p>
          </Card>
          <Card title="License Fees">
            <p className={styles.muted}>
              Standard application, renewal, and administrative fees are
              published for transparency and planning.
            </p>
          </Card>
          <div id="apply">
            <Card title="Apply for License">
              <p className={styles.muted}>
                Begin a new application using the official licensing workflow.
              </p>
              <Button label="Application Portal (Coming Soon)" variant="primary" />
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}

export default LicensingPage
