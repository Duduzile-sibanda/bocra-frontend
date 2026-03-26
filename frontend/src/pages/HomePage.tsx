import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Section from '../components/Section'
import LatestUpdatesSection from '../components/latest-updates/LatestUpdatesSection'
import FAQSection from '../components/faq/FAQSection'
import ResourcesInsightsSection from '../components/resources-insights/ResourcesInsightsSection'
import buildingImage from '../assets/building.jpg'
import bocraLogo from '../assets/bocra.png'
import styles from './Page.module.css'

type QuickLinkItem = {
  title: string
  description: string
  to: string
}

const QUICK_LINKS: QuickLinkItem[] = [
  {
    title: 'Licensing',
    description:
      'Review licensing requirements, eligibility criteria, fees, and practical submission guidance before starting your application.',
    to: '/licensing',
  },
  {
    title: 'Complaints',
    description:
      'Understand complaint channels, resolution timelines, and escalation options for unresolved communications service issues.',
    to: '/complaints',
  },
  {
    title: 'Tenders',
    description:
      'Browse current procurement opportunities, submission requirements, and key deadline dates for BOCRA tender notices.',
    to: '/tenders',
  },
  {
    title: 'News & Media',
    description:
      'Read official updates, announcements, and public communications on regulatory activities and sector developments.',
    to: '/about',
  },
  {
    title: 'Internet',
    description:
      'Explore internet market growth, connectivity quality expectations, and sector guidance for service performance.',
    to: '/internet',
  },
  {
    title: 'Broadcasting',
    description:
      'Find broadcasting regulatory information, compliance obligations, and updates relevant to broadcasters and audiences.',
    to: '/broadcasting',
  },
  {
    title: 'Telecommunications',
    description:
      'Access telecommunications regulation highlights, licensing pathways, and industry framework updates in one place.',
    to: '/telecommunications',
  },
  {
    title: 'Postal',
    description:
      'View postal service licensing categories, market structure, and public postal operator requirements and obligations.',
    to: '/postal',
  },
]

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemCount = QUICK_LINKS.length

  const visibleItems = useMemo(() => {
    const normalize = (index: number) => (index + itemCount) % itemCount
    return [-1, 0, 1].map((offset) => {
      const index = normalize(activeIndex + offset)
      return {
        card: QUICK_LINKS[index],
        index,
        isCenter: offset === 0,
      }
    })
  }, [activeIndex, itemCount])

  const goPrev = () => setActiveIndex((current) => (current - 1 + itemCount) % itemCount)
  const goNext = () => setActiveIndex((current) => (current + 1) % itemCount)

  return (
    <>
      <section
        className={styles.homeHero}
        style={{
          backgroundImage: `linear-gradient(rgba(8, 20, 36, 0.5), rgba(8, 20, 36, 0.5)), url(${buildingImage})`,
        }}
      >
        <div className={styles.homeHeroBrand}>
          <img className={styles.homeHeroLogo} src={bocraLogo} alt="BOCRA logo" />
          <h1 className={styles.homeHeroTitle}>Botswana Communications Regulatory Authority</h1>
        </div>
      </section>

      <Section title="Home" subtitle="Access high-priority services and information quickly.">
        <div className={styles.quickLinksShell}>
          <div className={styles.quickLinksCarousel}>
            <button className={styles.carouselControl} onClick={goPrev} aria-label="Show previous quick link">
              {'<'}
            </button>
            <div className={styles.carouselTrack}>
              {visibleItems.map(({ card, index, isCenter }) => (
                <div
                  className={`${styles.carouselSlide} ${isCenter ? styles.carouselSlideCenter : ''}`}
                  key={`${card.title}-${index}`}
                >
                  <Card title={card.title} className={styles.homeCarouselCard}>
                    <p className={styles.muted}>{card.description}</p>
                    <p className={styles.cardActionWrap}>
                      <Link to={card.to} className={styles.cardActionLink}>
                        Open {card.title} to read more <span aria-hidden="true">{'->'}</span>
                      </Link>
                    </p>
                  </Card>
                </div>
              ))}
            </div>
            <button className={styles.carouselControl} onClick={goNext} aria-label="Show next quick link">
              {'>'}
            </button>
          </div>
          <div className={styles.carouselDots} aria-label="Quick links carousel pagination">
            {QUICK_LINKS.map((item, index) => (
              <button
                key={item.title}
                className={`${styles.carouselDot} ${index === activeIndex ? styles.carouselDotActive : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.title}`}
              />
            ))}
          </div>
        </div>
      </Section>

      <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] mt-14 bg-[#0b3a66] py-20">
        <div className="mx-auto w-[min(1120px,92%)]">
          <LatestUpdatesSection />
        </div>
      </div>

      <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] bg-white py-24">
        <div className="mx-auto w-[min(1120px,92%)]">
          <FAQSection />
        </div>
      </div>

      <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] bg-[#0b3a66] py-24">
        <div className="mx-auto w-[min(1120px,92%)]">
          <ResourcesInsightsSection />
        </div>
      </div>

      <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-t border-slate-200 bg-white py-16">
        <div className="mx-auto w-[min(1120px,92%)] rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">Need More Assistance?</p>
              <p className="mt-1 text-slate-700">Reach BOCRA support services or submit your request through our official channels.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/complaints"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#BF1F5A] px-4 py-2 text-sm font-semibold !text-white visited:!text-white hover:!text-white transition hover:bg-[#a8194c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF1F5A] focus-visible:ring-offset-2"
              >
                File a Complaint
              </Link>
              <Link
                to="/licensing"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
              >
                Licensing Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
