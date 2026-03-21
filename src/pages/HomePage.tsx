import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Section from '../components/Section'
import buildingImage from '../assets/building.jpg'
import styles from './Page.module.css'

function HomePage() {
  return (
    <>
      <section
        className={styles.homeHero}
        style={{
          backgroundImage: `linear-gradient(rgba(8, 20, 36, 0.5), rgba(8, 20, 36, 0.5)), url(${buildingImage})`,
        }}
      >
        <h1 className={styles.homeHeroTitle}>
          Botswana Communications Regulatory Authority
        </h1>
      </section>

      <Section
        title="Quick Links"
        subtitle="Access high-priority services and information quickly."
      >
        <div className={styles.gridThree}>
          <Card title="Licensing">
            <p className={styles.muted}>
              View licensing requirements, fees, and application guidance.
            </p>
            <p>
              <Link to="/licensing">Go to Licensing</Link>
            </p>
          </Card>
          <Card title="Complaints">
            <p className={styles.muted}>
              Submit consumer complaints for review and regulatory action.
            </p>
            <p>
              <Link to="/complaints">Go to Complaints</Link>
            </p>
          </Card>
          <Card title="Tenders">
            <p className={styles.muted}>
              Browse current procurement opportunities and deadlines.
            </p>
            <p>
              <Link to="/tenders">Go to Tenders</Link>
            </p>
          </Card>
        </div>
      </Section>
    </>
  )
}

export default HomePage
