import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { IconType } from 'react-icons'
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineDocumentText,
  HiOutlineEnvelopeOpen,
  HiOutlineGlobeAlt,
  HiOutlineNewspaper,
  HiOutlineRadio,
  HiOutlineShieldCheck,
} from 'react-icons/hi2'
import Card from '../components/Card'
import Section from '../components/Section'
import LatestUpdatesSection from '../components/latest-updates/LatestUpdatesSection'
import FAQSection from '../components/faq/FAQSection'
import ResourcesInsightsSection from '../components/resources-insights/ResourcesInsightsSection'
import cellTowerImage from '../assets/cell tower.jpeg'
import bocraLogo from '../assets/bocra.png'
import styles from './Page.module.css'

type QuickLinkItem = {
  title: string
  description: string
  to: string
  ctaLabel: string
  icon: IconType
}

const QUICK_LINKS: QuickLinkItem[] = [
  {
    title: 'Licensing',
    description:
      'Review licensing requirements, eligibility criteria, fees, and practical submission guidance before starting your application.',
    to: '/licensing',
    ctaLabel: 'View Licensing',
    icon: HiOutlineShieldCheck,
  },
  {
    title: 'Complaints',
    description:
      'Understand complaint channels, resolution timelines, and escalation options for unresolved communications service issues.',
    to: '/complaints',
    ctaLabel: 'See Complaints',
    icon: HiOutlineChatBubbleBottomCenterText,
  },
  {
    title: 'Tenders',
    description:
      'Browse current procurement opportunities, submission requirements, and key deadline dates for BOCRA tender notices.',
    to: '/tenders',
    ctaLabel: 'View Tenders',
    icon: HiOutlineDocumentText,
  },
  {
    title: 'News & Media',
    description:
      'Read official updates, announcements, and public communications on regulatory activities and sector developments.',
    to: '/about',
    ctaLabel: 'View News',
    icon: HiOutlineNewspaper,
  },
  {
    title: 'Internet',
    description:
      'Explore internet market growth, connectivity quality expectations, and sector guidance for service performance.',
    to: '/internet',
    ctaLabel: 'Explore Internet',
    icon: HiOutlineGlobeAlt,
  },
  {
    title: 'Broadcasting',
    description:
      'Find broadcasting regulatory information, compliance obligations, and updates relevant to broadcasters and audiences.',
    to: '/broadcasting',
    ctaLabel: 'View Broadcasting',
    icon: HiOutlineRadio,
  },
  {
    title: 'Telecommunications',
    description:
      'Access telecommunications regulation highlights, licensing pathways, and industry framework updates in one place.',
    to: '/telecommunications',
    ctaLabel: 'Explore Telecom',
    icon: HiOutlineRadio,
  },
  {
    title: 'Postal',
    description:
      'View postal service licensing categories, market structure, and public postal operator requirements and obligations.',
    to: '/postal',
    ctaLabel: 'Explore Postal',
    icon: HiOutlineEnvelopeOpen,
  },
]

function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false)
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

  useEffect(() => {
    if (!isServicesModalOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsServicesModalOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isServicesModalOpen])

  return (
    <>
      <section className={styles.homeHero}>
        <div className={styles.homeHeroContent}>
          <img className={styles.homeHeroLogo} src={bocraLogo} alt="BOCRA logo" />
          <h1 className={styles.homeHeroTitle}>Botswana Communications Regulatory Authority</h1>
          <p className={styles.homeHeroEyebrow}>Regulating Botswana&apos;s Digital Future</p>
          <div className={styles.homeHeroActions}>
            <button
              type="button"
              className={styles.homeHeroCta}
              onClick={() => setIsServicesModalOpen(true)}
            >
              Explore Services
            </button>
          </div>
        </div>
        <div className={styles.homeHeroMedia}>
          <img
            className={styles.homeHeroImage}
            src={cellTowerImage}
            alt="Telecommunications tower infrastructure"
          />
        </div>
      </section>

      <Section title="Popular Services" subtitle="Access essential BOCRA services, guidance, and public information quickly.">
        <div className={styles.servicesSectionShell}>
          <div className={styles.quickLinksShell}>
          <div className={styles.quickLinksCarousel}>
            <button className={styles.carouselControl} onClick={goPrev} aria-label="Show previous quick link">
              {'<'}
            </button>
            <div className={styles.carouselTrack}>
              {visibleItems.map(({ card, index, isCenter }) => {
                const ServiceIcon = card.icon
                return (
                  <div
                    className={`${styles.carouselSlide} ${isCenter ? styles.carouselSlideCenter : ''}`}
                    key={`${card.title}-${index}`}
                  >
                    <Card
                      title={card.title}
                      className={`${styles.homeCarouselCard} ${isCenter ? styles.homeCarouselCardActive : styles.homeCarouselCardSide}`}
                    >
                      <span className={styles.cardIconWrap}>
                        <ServiceIcon className={styles.cardIcon} />
                      </span>
                      <p className={styles.muted}>{card.description}</p>
                      <p className={styles.cardActionWrap}>
                        <Link to={card.to} className={styles.cardActionLink}>
                          {card.ctaLabel} <span className={styles.cardActionArrow} aria-hidden="true">→</span>
                        </Link>
                      </p>
                    </Card>
                  </div>
                )
              })}
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

      <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-t border-slate-200 bg-slate-50/60 py-14 sm:py-16">
        <div className="mx-auto w-[min(1120px,92%)] rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-[0_10px_26px_rgba(15,42,71,0.06)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-extrabold tracking-tight text-slate-900">Need more assistance?</p>
              <p className="mt-1.5 max-w-2xl text-slate-700">
                Reach BOCRA support services or submit your request through our official channels.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 sm:justify-end">
              <Link
                to="/complaints"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0b3a66] px-4 py-2 text-sm font-semibold !text-white visited:!text-white hover:!text-white transition-all duration-200 hover:bg-[#082e51] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3a66] focus-visible:ring-offset-2"
              >
                Contact Support
              </Link>
              <Link
                to="/about"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#0b3a66]/35 bg-white px-4 py-2 text-sm font-semibold text-[#0b3a66] transition-all duration-200 hover:border-[#0b3a66]/55 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3a66] focus-visible:ring-offset-2"
              >
                View Help Channels
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isServicesModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4"
          role="presentation"
          onClick={(event) => {
            if (event.currentTarget === event.target) {
              setIsServicesModalOpen(false)
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="services-modal-title"
            className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <h2 id="services-modal-title" className="text-xl font-extrabold tracking-tight text-slate-900">
                Explore BOCRA Services
              </h2>
              <button
                type="button"
                onClick={() => setIsServicesModalOpen(false)}
                aria-label="Close services modal"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
              >
                X
              </button>
            </div>

            <div className="max-h-[calc(90vh-74px)] overflow-y-auto p-5 sm:p-6">
              <p className="text-sm text-slate-700">
                Quickly access BOCRA services and information pages. Select a service below to continue.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {QUICK_LINKS.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    onClick={() => setIsServicesModalOpen(false)}
                    className="group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                  >
                    <h3 className="text-base font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-[#BF1F5A]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                      {item.description}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#0b3a66]">Open {item.title} {'->'}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default HomePage
