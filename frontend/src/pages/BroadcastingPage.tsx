import Section from '../components/Section'
import styles from './Page.module.css'

function BroadcastingPage() {
  return (
    <Section title="Broadcasting">
      <p className={styles.careersIntroText}>
        The CRA Act mandates BOCRA to regulate all broadcasting, subscription management services and re-broadcasting
        activities, save for state broadcasting. BOCRA therefore regulates Yarona FM, Duma FM, Gabz FM and eBotswana.
      </p>
      <p className={styles.careersIntroText}>
        Commercial radio stations namely Yarona, Duma and Gabz FM are available in most major towns and villages in
        Botswana. These stations have extended access through online transmission, making them accessible worldwide.
      </p>
      <p className={styles.careersIntroText}>
        eBotswana television station is currently available in Gaborone and surrounding villages within a 60 km
        radius through terrestrial broadcasting. eBotswana is expected to introduce satellite broadcasting to achieve
        national coverage.
      </p>
      <p className={styles.careersIntroText}>
        Broadcasters are required to promote music tracks by local artists, and broadcaster licences specify a
        required percentage of local content compliance.
      </p>
      <p className={styles.careersIntroText}>
        National Broadcasting Board Audience Survey for the Broadcasting Sector in Botswana:
        <br />
        <a
          href="https://www.bocra.org.bw/sites/default/files/NBB_Audience_Survey_Report_Volume_I.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Open Survey Report (PDF)
        </a>
      </p>
    </Section>
  )
}

export default BroadcastingPage
