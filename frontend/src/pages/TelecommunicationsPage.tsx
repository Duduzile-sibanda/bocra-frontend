import Section from '../components/Section'
import styles from './Page.module.css'

function TelecommunicationsPage() {
  return (
    <Section title="Telecommunications">
      <p className={styles.careersIntroText}>
        Under the Communications Regulatory Authority Act 2012, BOCRA has authority to regulate telecommunications
        within national policy guidelines. The telecommunications sector, driven by mobile technology, has experienced
        significant growth in both total number of consumers and service variety.
      </p>
      <p className={styles.careersIntroText}>
        Since competition was introduced in 1998, the Telecommunications/ICT sector has undergone numerous reforms.
        Currently, three Public Telecommunication Operators provide local, international, national and mobile
        services. These are Botswana Telecommunications Limited (BTCL), Mascom Wireless Botswana (Pty) Ltd (Mascom)
        and Orange Botswana (Pty) Ltd (Orange).
      </p>
      <p className={styles.careersIntroText}>
        Another major market player is Botswana Fibre Networks (BoFiNet), issued an interim wholesale licence from 1
        April 2013 and beginning service in October 2013. Other market players include Value Added Network Services
        (VANS) providers.
      </p>
      <p className={styles.careersIntroText}>
        While PTO licences allow mobile and fixed telephony services, Mascom and Orange currently provide mobile
        telephony services (including mobile internet and value-added services), while BTCL provides both fixed and
        mobile telephony plus data network access and connectivity.
      </p>
      <p className={styles.careersIntroText}>
        The private network market is fully liberalised, and VANS may provide services using any technology including
        VSAT. Terminal equipment trade is also liberalised, though radio equipment vendors must be approved by BOCRA,
        consistent with BOCRA&apos;s type-approval mandate.
      </p>
      <p className={styles.careersIntroText}>
        Private Telecommunications Network Licences (PTNL) have also been issued to entities building internal
        business networks.
      </p>
      <p className={styles.careersIntroText}>
        BOCRA reviewed the ICT licensing framework introduced in 2007 and began implementation of a new converged
        framework in September 2015 to support affordability, quality, competitiveness and emerging players.
      </p>
      <p className={styles.careersIntroText}>
        The revised framework has two major licence categories: Network Facilities Provider Licence (NFP) and Services
        and Applications Provider Licence (SAP), compared to the previous PTO, VANS and PTNL model.
      </p>
      <p className={styles.careersIntroText}>
        The market for Internet telephony is also fully liberalised, allowing VANS providers to offer VoIP services.
        The number of PTOs remains restricted to three by policy decision.
      </p>
      <p className={styles.careersIntroText}>
        Following policy decisions on privatization, BTC transitioned into Botswana Telecommunications Corporation
        Limited under the BTC (Transition) Act and Companies Act. BoFiNet was created as the wholesale provider of
        national and international telecommunications infrastructure while BTC remained a retailer.
      </p>
    </Section>
  )
}

export default TelecommunicationsPage
