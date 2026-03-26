import Section from '../components/Section'
import styles from './Page.module.css'

function InternetPage() {
  return (
    <Section title="Internet">
      <p className={styles.careersIntroText}>
        The preamble of the Communications Regulatory Authority Act 2012 indicates that BOCRA is responsible for
        regulation of the communications sector in Botswana, including the Internet and Information and Communications
        Technologies (ICTs).
      </p>
      <p className={styles.careersIntroText}>
        BOCRA facilitates growth of the Internet market as part of its role in promoting uptake of ICTs. Use of
        smartphones has contributed to increased access to mobile internet, especially among youth.
      </p>
      <p className={styles.careersIntroText}>
        To improve internet performance, BOCRA issued Guidelines on Minimum Requirements for Internet Connectivity in
        Hospitality Facilities. These guidelines set minimum service standards and bandwidth requirements for both
        hospitality facilities and service providers.
      </p>

      <h2 className={styles.careersSubheading}>Wholesale Internet Bandwidth Prices</h2>
      <p className={styles.careersIntroText}>
        Wholesale internet bandwidth prices and tariffs have been declining. This decline is influenced by acquisition
        of internet bandwidth capacity through the East Africa Sub Marine System (EASSy) and West Africa Cable System
        (WACS) undersea cable systems, and aligns with international trends.
      </p>
      <p className={styles.careersIntroText}>
        As a converged regulator, BOCRA is responsible for regulatory oversight of broadcasting, internet, postal and
        telecommunications services.
      </p>
    </Section>
  )
}

export default InternetPage
