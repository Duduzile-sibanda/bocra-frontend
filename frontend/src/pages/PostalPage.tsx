import Section from '../components/Section'
import styles from './Page.module.css'

function PostalPage() {
  return (
    <Section title="Postal">
      <p className={styles.careersIntroText}>
        The CRA Act, 2012 ushered in a new dawn of regulation for the postal sector as BOCRA assumed the mandate of
        supervising the provision of postal services in Botswana. The CRA Act prohibits any person from providing
        postal services without a valid licence issued by BOCRA. The Authority is also mandated to ensure provision of
        safe, reliable, efficient and affordable postal services throughout Botswana.
      </p>
      <p className={styles.careersIntroText}>
        In line with this, the Authority has prepared the ground for regulation of postal services by putting in place
        regulatory instruments and tools that allow ease of market entry and support innovation for the provision of
        varied postal service offerings. These include the Postal Sector Licensing Framework and Licence Application
        Requirements for licensing of courier service providers.
      </p>

      <h2 className={styles.careersSubheading}>Current Market Structure</h2>
      <p className={styles.careersIntroText}>
        The Botswana postal market comprises of two main categories of postal services:
      </p>
      <ol className={styles.careersBullets}>
        <li>
          Ordinary Mail Services or Universal Postal Services: these are mail services provided nationwide under the
          same conditions for all citizens and customers and delivered into the P.O. Box. These services are only
          provided by the Designated Public Postal Operator.
        </li>
        <li>
          Courier Services or Value-added Services: these are services provided on a commercial basis and delivered
          directly to the addressee. These services are mainly provided by courier service providers, while the
          Designated Public Postal Operator can also provide them commercially.
        </li>
      </ol>

      <h2 className={styles.careersSubheading}>Licensing of Postal Operators</h2>
      <p className={styles.careersIntroText}>
        The licensing framework for the Postal Sector in Botswana comprises two licence categories:
      </p>
      <ol className={styles.careersBullets}>
        <li>
          Public Postal Operator Licence: issued to only one postal service provider designated by the Minister
          responsible for the Communications Sector. The licence is valid for fifteen (15) years and may be renewed
          upon expiry. The current Designated Public Postal Operator is Botswana Postal Services Limited.
        </li>
        <li>
          Commercial Postal Operator Licence: issued to operators providing courier or value-added services.
          Applications are open at any time with no cap on operator numbers. The licence is valid for ten (10) years
          and may be renewed upon expiry.
        </li>
      </ol>

      <h2 className={styles.careersSubheading}>Postal Service Operators Offering Interconnection</h2>
      <h2 className={styles.careersSubheading}>Designation of a Public Postal Operator</h2>
      <p className={styles.careersIntroText}>
        Pursuant to Section 67 of the CRA Act, the Minister responsible for Communications shall, on recommendation of
        the Authority, designate one postal service provider as a Public Postal Operator. A Public Postal Operator
        carries universal service obligations aimed at ensuring that, as far as practicable, postal services reach all
        inhabitants of Botswana, including areas that are not commercially viable.
      </p>
    </Section>
  )
}

export default PostalPage
