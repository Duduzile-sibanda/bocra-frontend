import { useEffect, useMemo, useRef, useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import SuccessModal from '../components/complaints/SuccessModal'
import LicenseTrackingModal from '../components/licensing/LicenseTrackingModal'
import LicenseVerificationModal from '../components/licensing/LicenseVerificationModal'
import UploadModal, { type UploadPayload } from '../components/licensing/UploadModal'
import ActionButton from '../components/ui/ActionButton'

type LicenseOption = {
  id: string
  name: string
  description: string
  requirements: string[]
  formUrl?: string
  infoOnly?: boolean
  detailIntro?: string[]
  detailSections?: Array<{
    heading: string
    points: string[]
  }>
  detailNotes?: string[]
}

const LICENSE_OPTIONS: LicenseOption[] = [
  {
    id: 'aircraft-radio-licence',
    name: 'Aircraft Radio Licence',
    description:
      'Required for operation of radio equipment installed in aircraft for aviation communication.',
    requirements: [
      'Completed BOCRA aircraft radio application form',
      'Company registration certificate',
      'Proof of aircraft ownership or authorization',
      'Valid operator identification document',
    ],
    formUrl:
      'https://www.bocra.org.bw/sites/default/files/Licence%20files/Aircraft%20Radio%20Licence%20Application.pdf',
  },
  {
    id: 'amateur-radio-licence',
    name: 'Amateur Radio License',
    description:
      'For licensed amateur operators using radio spectrum for non-commercial experimental and personal communication.',
    requirements: [
      'Completed BOCRA amateur radio application form',
      'Copy of identity document',
      'Technical competency evidence (if applicable)',
      'Station and equipment details',
    ],
    formUrl:
      'https://www.bocra.org.bw/sites/default/files/Licence%20files/Amateur%20%20Application%20Form.pdf',
  },
  {
    id: 'broadcasting-licence',
    name: 'Broadcasting Licence',
    description:
      'For entities providing radio or television broadcasting services to the public.',
    requirements: [
      'Completed BOCRA broadcasting application form',
      'Programming and content proposal',
      'Ownership and governance disclosures',
      'Technical transmission plan',
    ],
    infoOnly: true,
  },
  {
    id: 'cellular-licence',
    name: 'Cellular Licence',
    description:
      'For mobile network operators providing public cellular communication services.',
    requirements: [
      'Completed BOCRA cellular application form',
      'Network rollout and coverage plan',
      'Spectrum requirement statement',
      'Financial and operational capability evidence',
    ],
    formUrl:
      'https://www.bocra.org.bw/sites/default/files/Licence%20files/Cellular%20Licence%20Application.pdf',
  },
  {
    id: 'citizen-band-radio-licence',
    name: 'Citizen Band Radio Licence',
    description:
      'For use of approved citizen band radio devices for short-range personal or business communications.',
    requirements: [
      'Completed BOCRA citizen band radio application form',
      'Copy of identity document',
      'Equipment details',
      'Compliance declaration',
    ],
    formUrl:
      'https://www.bocra.org.bw/sites/default/files/Licence%20files/Citizen%20Band%20Radio%20Licence%20Application.pdf',
  },
  {
    id: 'point-to-multipoint',
    name: 'Point to Multipoint',
    description:
      'For radio systems that transmit from one central point to multiple receiving points.',
    requirements: [
      'Completed BOCRA point-to-multipoint application form',
      'Technical design and link budget',
      'Coverage and site information',
      'Interference management plan',
    ],
    formUrl:
      'https://www.bocra.org.bw/sites/default/files/Licence%20files/Point-to-Multipoint%20Licence%20Application.pdf',
  },
  {
    id: 'point-to-point',
    name: 'Point to Point',
    description:
      'For dedicated radio links between two fixed locations for communication backhaul or data transport.',
    requirements: [
      'Completed BOCRA point-to-point application form',
      'Coordinates and path profile',
      'Equipment technical specifications',
      'Frequency coordination details',
    ],
    formUrl:
      'https://www.bocra.org.bw/sites/default/files/Licence%20files/Point-To-Point%20Application.pdf',
  },
  {
    id: 'private-radio-communication-licence',
    name: 'Private Radio Communication Licence',
    description:
      'For private organizations operating internal radio communication systems for business operations.',
    requirements: [
      'Completed BOCRA private radio application form',
      'Organization registration documents',
      'Operational use-case description',
      'Equipment and frequency requirement details',
    ],
    formUrl:
      'https://www.bocra.org.bw/sites/default/files/Licence%20files/Private%20Radio%20Application%20Form.pdf',
  },
  {
    id: 'radio-dealers-licence',
    name: 'Radio Dealers Licence',
    description:
      'For businesses importing, distributing, or selling radio communication equipment.',
    requirements: [
      'Completed BOCRA radio dealer application form',
      'Business registration certificate',
      'List of radio equipment categories',
      'Compliance and standards declaration',
    ],
    infoOnly: true,
    detailIntro: [
      'Any business involved in supplying and installing telecommunications equipment for clients must be licensed as a radio dealer in Botswana.',
      'The licence enables a company to import, sell, and/or install radio communications equipment in Botswana.',
      'To protect consumers, BOCRA verifies that the company can adequately sell and support telecommunications equipment.',
    ],
    detailSections: [
      {
        heading: 'Particulars of the Applicant',
        points: [
          'Provide a complete ownership profile of the company, listing all directors and their equity holding in Pula.',
          'State whether the applicant is a member of a group and, where applicable, provide ownership details from the ultimate parent company to the applicant.',
          'For juristic persons, disclose the legal nature of the entity (private/public company, close corporation, trust, or partnership).',
        ],
      },
      {
        heading: 'Technical Information',
        points: [
          'Provide detailed information on technical experience and capability for BOCRA to assess radio dealer competence.',
          'Provide a list of all test instruments used for installation and maintenance of radio equipment.',
          'Provide profiles of technical staff.',
        ],
      },
      {
        heading: 'Financial Information',
        points: [
          'Disclose the capacity and resources available to trade in radio equipment.',
          'BOCRA may request written proof for any disclosed particulars.',
        ],
      },
    ],
  },
  {
    id: 'radio-frequency-licence',
    name: 'Radio Frequency Licence',
    description:
      'For assignment and authorized use of specific radio frequency spectrum resources.',
    requirements: [
      'Completed BOCRA radio frequency application form',
      'Requested frequency band details',
      'Technical parameters and purpose of use',
      'Interference mitigation plan',
    ],
    infoOnly: true,
  },
  {
    id: 'type-approval-licence',
    name: 'Type Approval Licence',
    description:
      'For approval of communication equipment models before importation, sale, or deployment in Botswana.',
    requirements: [
      'Completed BOCRA type approval application form',
      'Equipment technical specifications',
      'Test reports and certification documents',
      'Manufacturer authorization letter (where applicable)',
    ],
    formUrl:
      'https://www.bocra.org.bw/sites/default/files/Licence%20files/Type%20Approval%20Application.pdf',
    infoOnly: true,
    detailIntro: [
      'BOCRA’s mandate to type-approve equipment is provided in the Telecommunications Act of 1996, Section 21, and Part IV of the Telecommunications Regulations of 1997.',
      'Type approval is required for all telecommunications and radio-communications equipment.',
      'BOCRA handles equipment type approvals, maintains a type approval register, and develops relevant guidelines and regulations.',
    ],
    detailSections: [
      {
        heading: 'Why Type Approval Is Required',
        points: [
          'To prevent technical harm to public networks by ensuring conformance to prescribed standards.',
          'To control electromagnetic emissions within prescribed levels and improve safety for networks, personnel, and users.',
          'To ensure interoperability across networks.',
        ],
      },
      {
        heading: 'Recognition of External Certificates',
        points: [
          'BOCRA may recognize type approval certificates and test reports from foreign authorities and testing laboratories, especially within ITU Region 1.',
        ],
      },
    ],
    detailNotes: [
      'Licence file: Type Approval Application.pdf',
      'Licence file: Type Approval Guidelines.pdf',
    ],
  },
  {
    id: 'satellite-service-licence',
    name: 'Satellite Service Licence',
    description:
      'For providers offering communication services through satellite systems and related earth station operations.',
    requirements: [
      'Completed BOCRA satellite service application form',
      'Service architecture and coverage details',
      'Satellite/earth station technical parameters',
      'Regulatory compliance declaration',
    ],
    formUrl:
      'https://www.bocra.org.bw/sites/default/files/Licence%20files/Satelllite%20Service%20Application%20Form.pdf',
  },
  {
    id: 'vans-licence',
    name: 'VANS Licence',
    description:
      'For Value Added Network Services providers offering enhanced communication services over existing networks.',
    requirements: [
      'Completed BOCRA VANS application form',
      'Service description and architecture',
      'Customer service and complaint handling process',
      'Business registration documents',
    ],
    infoOnly: true,
    detailIntro: ['Applicants should furnish BOCRA with the following information:'],
    detailSections: [
      {
        heading: 'Particulars of the Applicant',
        points: [
          'Provide certified copy of certificate of incorporation or certificate of registration.',
          'Provide full ownership profile including shareholders, nationalities, physical/postal addresses, and shareholding percentages, with certified supporting forms.',
          'Disclose company directorship with certified statutory forms, including close company documents where applicable.',
          'Indicate whether the company is part of a group and provide ownership profile from ultimate parent to applicant.',
          'Disclose whether the company is private or public under the Companies Act.',
          'Provide registered office details in Botswana with certified supporting forms and contact details.',
        ],
      },
      {
        heading: 'Business Plan (3 Years)',
        points: [
          'Explain how the applicant differs from existing market players.',
          'Describe services to be offered and expected market benefits.',
          'Describe aftersales support structures for customers.',
          'Define target market.',
          'Provide service pricing model.',
          'Provide 3-year cash flow and income statement projections.',
          'Provide statement of commitment including planned commencement date.',
          'Provide proof of funding.',
        ],
      },
      {
        heading: 'Technical Information',
        points: [
          'Provide full network configuration/diagram and technical description of network and equipment.',
          'Describe all interfaces within the network.',
          'Describe major core equipment and resources required from BOCRA (such as number blocks and spectrum).',
          'Provide brief CVs proving technical experience and managerial capability of key personnel.',
          'Indicate expected job creation and transfer of skills to local personnel.',
        ],
      },
      {
        heading: 'Applicable VANS Fees',
        points: [
          'Initial licence fee upon licensing: P10,000.',
          'Annual licence fee: P3,000.',
          'All licence fees attract 12% VAT.',
          'Spectrum fees are based on spectrum requirements and assessed case-by-case.',
          'BOCRA may revise fees from time to time.',
          'Licence validity period: 15 years.',
        ],
      },
    ],
  },
]

function generateTrackingId(): string {
  return `LIC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
}

async function sendEmail(email: string, trackingId: string): Promise<void> {
  // Mock email dispatch to simulate confirmation delivery.
  await new Promise((resolve) => window.setTimeout(resolve, 500))
  console.info(`Mock email sent to ${email} for tracking ID ${trackingId}`)
}

type IntroSectionProps = {
  onGetStarted: () => void
  onOpenVerification: () => void
  onOpenTracking: () => void
}

function IntroSection({ onGetStarted, onOpenVerification, onOpenTracking }: IntroSectionProps) {
  return (
    <div className="w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:max-h-[78svh] md:overflow-y-auto md:p-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Licensing</h1>
      <h2 className="mt-3 text-lg font-semibold text-slate-800 md:text-2xl">BOCRA Licensees</h2>

      <div className="mt-5 space-y-4 text-sm leading-relaxed text-slate-700 md:text-base">
        <p>
          BOCRA is mandated by Sec 6 (h) of the CRA Act to process applications for and issue, licences, permits,
          permissions, concessions and authorities for regulated sectors being telecommunications, Internet, radio
          communications, broadcasting and postal.
        </p>
        <h3 className="pt-2 text-base font-semibold text-slate-900 [font-family:var(--font-body)] md:text-lg">
          Licensing Framework (Telecommunications And Broadcasting)
        </h3>
        <p>
          In 2015, BOCRA commissioned a study to review licensing framework and pricing principles for
          telecommunications services. The study culminated with the introduction of a new framework intended to close
          market gaps that have existed in the previous framework and provide a more conducive environment for market
          growth and improvement of the welfare of the society taking into account convergence of technologies and
          evolution to Next Generation Networks.
        </p>
        <p>
          The framework has primary objective to achieve Efficiency of Convergence where multiple services are
          delivered on single network or platform embracing convergence of networks, services and technologies. It
          also aims to achieve Technology neutrality where licensed networks are not distinguished by technology but
          capability to deliver multiple and multimedia products. The framework further aims to achieve Ease of market
          entry and increased competition; Consumer choice; Diversification, Open Access as well as Economic
          Inclusion.
        </p>
        <p>
          The licensing framework covers broadcasting systems, broadcasting service, subscription management services,
          electronic communications, telecommunication service and telecommunication systems under broad areas of
          System license, Service license, Broadcasting and Re-broadcasting Licenses as provided for in the CRA Act.
        </p>
        <p>The framework provides for three major licensing categories being:</p>
        <p>
          Network Facilities Provider (NFP) where licensees own, operate or provide any form of physical
          infrastructure used principally for carrying service and applications and content. The infrastructure may
          include fixed links, radio communication transmitters, satellites and satellites station, submarine cable,
          fibre/copper cable, towers, switches, base stations. The facilities are for own use or for availing to
          other licensed operators on commercial basis. Private Telecommunications Networks fall in this category and
          are further specified in the appropriate license type to distinguish them from major networks.
        </p>
        <h3 className="pt-2 text-base font-semibold text-slate-900 [font-family:var(--font-body)] md:text-lg">
          Services And Applications Provider (SAP)
        </h3>
        <p>
          SAPs are non-infrastructure based service providers that provide all forms of services and applications to
          end users using infrastructure of the Network Facilities Provider. The services and applications may be based
          on speech, sound, data, text and images and they deliver a specific function to the end user. The services
          and applications shall not be for broadcasting purposes.
        </p>
        <h3 className="pt-2 text-base font-semibold text-slate-900 [font-family:var(--font-body)] md:text-lg">
          Content Services Provider (CSP)
        </h3>
        <p>
          CSP licensee provides content material in the form of speech or other sounds, text, data, images, whether
          still or moving solely for broadcasting (TV and radio) and other information services including Subscription
          TV. NB, State broadcasters do not require license to operate.
        </p>
        <h3 className="pt-2 text-base font-semibold text-slate-900 [font-family:var(--font-body)] md:text-lg">
          Licensing Framework (Postal Services)
        </h3>
        <p>
          In August 2015 BOCRA conducted a study to assess the postal market and develop appropriate licensing
          framework. Following conclusion of the study, BOCRA introduced a licensing framework that provides for two
          licensing categories for the postal sector as follows:
        </p>
        <p>
          The Designated Postal Operator (DPO) licence. The licence category provides for a postal operator to be
          designated to carry universal postal service obligations.
        </p>
        <p>
          The Commercial Postal Operator (CPO) licence. The licence category provides for postal operators which
          provide value-added services.
        </p>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-5">
        <p className="text-sm text-slate-700 md:text-base">Ready to apply? Continue to start the licensing flow.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <ActionButton onClick={onGetStarted}>Get Started</ActionButton>
          <ActionButton onClick={onOpenVerification} variant="secondary">
            License Verification
          </ActionButton>
          <ActionButton onClick={onOpenTracking} variant="secondary">
            Track Application
          </ActionButton>
        </div>
      </div>
    </div>
  )
}

type LicenseSelectionSectionProps = {
  licenses: LicenseOption[]
  selectedLicenseId: string
  onSelect: (license: LicenseOption) => void
}

function LicenseSelectionSection({ licenses, selectedLicenseId, onSelect }: LicenseSelectionSectionProps) {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Select a License Category</h2>
      <p className="mt-4 max-w-4xl text-base text-slate-700 md:text-lg">
        The Botswana Communications Regulatory Authority (BOCRA) is responsible for planning and managing the radio
        frequency spectrum in Botswana. It is responsible for compliance with licensing requirements and investigating
        complaints of interference to services.
      </p>
      <p className="mt-3 max-w-4xl text-sm text-slate-700 md:text-base">The scope of the BOCRA&apos;s role includes:</p>
      <ul className="mt-2 grid gap-1 md:ml-5">
        <li className="list-disc text-sm text-slate-700 md:text-base">spectrum planning;</li>
        <li className="list-disc text-sm text-slate-700 md:text-base">frequency allocation;</li>
        <li className="list-disc text-sm text-slate-700 md:text-base">apparatus licensing; and</li>
        <li className="list-disc text-sm text-slate-700 md:text-base">frequency assignment and coordination.</li>
      </ul>
      <p className="mt-3 max-w-4xl text-sm text-slate-700 md:text-base">
        To begin the licence application process download the application form below, fill-in and submit to BOCRA with
        all relevant documentation.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {licenses.map((license) => {
          const isSelected = selectedLicenseId === license.id
          return (
            <article
              key={license.id}
              className={`rounded-2xl border bg-white p-6 shadow-sm transition ${
                isSelected ? 'border-slate-500 ring-1 ring-slate-300' : 'border-slate-200'
              }`}
            >
              <h3 className="text-lg font-semibold text-slate-900">{license.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">{license.description}</p>
              <div className="mt-5">
                <ActionButton onClick={() => onSelect(license)} variant={isSelected ? 'primary' : 'secondary'}>
                  {license.infoOnly
                    ? isSelected
                      ? 'Selected (View Application Details)'
                      : 'Select & View Application Details'
                    : isSelected
                      ? 'Selected & Download Again'
                      : 'Select & Download Application Form'}
                </ActionButton>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

type LicenseDetailSectionProps = {
  selectedLicense: LicenseOption | undefined
  onProceedToUpload: () => void
  onOpenSelection: () => void
}

function LicenseDetailSection({ selectedLicense, onProceedToUpload, onOpenSelection }: LicenseDetailSectionProps) {
  if (!selectedLicense) {
    return (
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">License Details</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
          Select a license category first to view application details.
        </p>
        <div className="mt-7">
          <ActionButton onClick={onOpenSelection}>Go to License Selection</ActionButton>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{selectedLicense.name}</h2>
      <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">{selectedLicense.description}</p>

      {selectedLicense.detailIntro?.length ? (
        <div className="mt-6 grid gap-3">
          {selectedLicense.detailIntro.map((line) => (
            <p key={line} className="text-sm leading-relaxed text-slate-700 md:text-base">
              {line}
            </p>
          ))}
        </div>
      ) : null}

      <div className="mt-7">
        <h3 className="text-lg font-semibold text-slate-900">Application Requirements</h3>
        {selectedLicense.detailSections?.length ? (
          <div className="mt-4 grid gap-5">
            {selectedLicense.detailSections.map((section) => (
              <div key={section.heading}>
                <h4 className="text-base font-semibold text-slate-900 md:text-lg">{section.heading}</h4>
                <ul className="mt-2 grid gap-2 md:ml-5">
                  {section.points.map((point) => (
                    <li key={point} className="list-disc text-sm leading-relaxed text-slate-700 md:text-base">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="mt-3 grid gap-2 md:ml-5">
            {selectedLicense.requirements.map((item) => (
              <li key={item} className="list-disc text-sm leading-relaxed text-slate-700 md:text-base">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedLicense.detailNotes?.length ? (
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900 md:text-base">Additional Documents</p>
          <ul className="mt-2 grid gap-1 md:ml-5">
            {selectedLicense.detailNotes.map((note) => (
              <li key={note} className="list-disc text-sm text-slate-700 md:text-base">
                {note}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {selectedLicense.formUrl ? (
        <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm leading-relaxed text-slate-700 md:text-base">
            Application form is available online for this licence.
          </p>
          <div className="mt-3">
            <a
              href={selectedLicense.formUrl}
              download
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            >
              Download Application Form (PDF)
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm leading-relaxed text-slate-700 md:text-base">
            This licence does not currently have a downloadable application form online. Use the above requirements and
            submit the complete application package to BOCRA through their official licensing channels.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <ActionButton onClick={onProceedToUpload}>Continue to Upload</ActionButton>
        <ActionButton onClick={onOpenSelection} variant="secondary">
          Back to License Selection
        </ActionButton>
      </div>
    </div>
  )
}

type UploadSectionProps = {
  selectedLicense: LicenseOption | undefined
  onOpenUpload: () => void
  onOpenSelection: () => void
  onOpenTracking: () => void
}

function UploadSection({ selectedLicense, onOpenUpload, onOpenSelection, onOpenTracking }: UploadSectionProps) {
  return (
    <div className="w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
      <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">Upload Completed Application</h2>
      <p className="mt-4 text-base leading-relaxed text-slate-700 md:text-lg">
        Submit your completed PDF form and contact details. You will receive a tracking ID after submission.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-900 md:text-base">Selected License</p>
        <p className="mt-1 text-sm text-slate-700 md:text-base">
          {selectedLicense ? selectedLicense.name : 'No license selected yet.'}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <ActionButton onClick={onOpenUpload} disabled={!selectedLicense}>
          Open Upload Form
        </ActionButton>
        <ActionButton onClick={onOpenTracking} variant="secondary">
          Track Application
        </ActionButton>
        {!selectedLicense ? (
          <ActionButton onClick={onOpenSelection} variant="secondary">
            Choose License First
          </ActionButton>
        ) : null}
      </div>
    </div>
  )
}

function LicensingPage() {
  const [selectedLicenseId, setSelectedLicenseId] = useState<string>('')
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false)
  const [isVerificationOpen, setIsVerificationOpen] = useState<boolean>(false)
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false)
  const [isSubmittingUpload, setIsSubmittingUpload] = useState<boolean>(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false)
  const [trackingId, setTrackingId] = useState<string>('')
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const selectedLicense = useMemo(
    () => LICENSE_OPTIONS.find((license) => license.id === selectedLicenseId),
    [selectedLicenseId],
  )

  const showDetailSection = Boolean(selectedLicense?.infoOnly)

  const sections = useMemo(
    () =>
      showDetailSection
        ? [
            { id: 'intro', label: 'Intro' },
            { id: 'selection', label: 'Select' },
            { id: 'detail', label: 'Details' },
            { id: 'upload', label: 'Upload' },
          ]
        : [
            { id: 'intro', label: 'Intro' },
            { id: 'selection', label: 'Select' },
            { id: 'upload', label: 'Upload' },
          ],
    [showDetailSection],
  )

  const containerRef = useRef<HTMLDivElement | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const totalSections = sections.length
  const detailIndex = sections.findIndex((section) => section.id === 'detail')
  const uploadIndex = sections.findIndex((section) => section.id === 'upload')

  useEffect(() => {
    const storedLicenseId = window.localStorage.getItem('bocra_selected_license_id')
    if (storedLicenseId && LICENSE_OPTIONS.some((license) => license.id === storedLicenseId)) {
      setSelectedLicenseId(storedLicenseId)
    }
  }, [])

  useEffect(() => {
    if (!selectedLicenseId) {
      window.localStorage.removeItem('bocra_selected_license_id')
      return
    }
    window.localStorage.setItem('bocra_selected_license_id', selectedLicenseId)
  }, [selectedLicenseId])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scrollToSection = (index: number) => {
    const container = containerRef.current
    if (!container) return

    const nextIndex = Math.min(Math.max(index, 0), totalSections - 1)
    const offset = isMobile ? nextIndex * container.clientHeight : nextIndex * container.clientWidth

    container.scrollTo({
      top: isMobile ? offset : 0,
      left: isMobile ? 0 : offset,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const size = isMobile ? container.clientHeight : container.clientWidth
      const position = isMobile ? container.scrollTop : container.scrollLeft
      const index = Math.round(position / Math.max(size, 1))
      setActiveIndex(Math.min(Math.max(index, 0), totalSections - 1))
    }

    const handleWheel = (event: WheelEvent) => {
      if (isMobile) return
      event.preventDefault()
      container.scrollBy({ left: event.deltaY + event.deltaX, behavior: 'smooth' })
    }

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      touchStartRef.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (!touchStartRef.current) return

      const touch = event.changedTouches[0]
      const deltaX = touchStartRef.current.x - touch.clientX
      const deltaY = touchStartRef.current.y - touch.clientY
      const threshold = 40

      if (isMobile) {
        if (Math.abs(deltaY) > threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
          scrollToSection(activeIndex + (deltaY > 0 ? 1 : -1))
        }
      } else if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
        scrollToSection(activeIndex + (deltaX > 0 ? 1 : -1))
      }

      touchStartRef.current = null
    }

    // Sync visible chapter to progress dots and provide wheel/touch chapter navigation.
    handleScroll()
    container.addEventListener('scroll', handleScroll, { passive: true })
    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeIndex, isMobile, totalSections])

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, totalSections - 1))
  }, [totalSections])

  const handleSelectLicense = (license: LicenseOption) => {
    setSelectedLicenseId(license.id)

    if (license.formUrl && !license.infoOnly) {
      const link = document.createElement('a')
      link.href = license.formUrl
      link.download = ''
      link.rel = 'noopener'
      document.body.appendChild(link)
      link.click()
      link.remove()
      scrollToSection(uploadIndex)
      return
    }

    if (license.infoOnly && detailIndex >= 0) {
      scrollToSection(detailIndex)
      return
    }

    scrollToSection(uploadIndex)
  }

  const handleUploadSubmit = async (payload: UploadPayload) => {
    setIsSubmittingUpload(true)

    // Simulate server processing before returning a tracking reference.
    await new Promise((resolve) => window.setTimeout(resolve, 1200))

    const nextTrackingId = generateTrackingId()
    await sendEmail(payload.email, nextTrackingId)
    window.localStorage.setItem(
      'lastApplication',
      JSON.stringify({
        trackingId: nextTrackingId,
        email: payload.email,
        licenseType: selectedLicense?.name ?? 'Not provided',
      }),
    )
    setTrackingId(nextTrackingId)
    setIsUploadOpen(false)
    setIsSuccessOpen(true)
    setIsSubmittingUpload(false)
  }

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={`w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] ${
          isMobile
            ? 'h-[100svh] overflow-y-auto overflow-x-hidden snap-y snap-mandatory'
            : 'h-[100svh] overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex'
        } scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        <section
          className={`snap-start min-w-[100vw] h-screen ${
            isMobile ? 'w-full overflow-y-auto bg-slate-100' : 'w-screen shrink-0 bg-slate-100'
          }`}
        >
          <div className="mx-auto flex min-h-full w-full max-w-6xl items-center px-6 py-14 md:px-10 md:py-16">
            <IntroSection
              onGetStarted={() => scrollToSection(1)}
              onOpenVerification={() => setIsVerificationOpen(true)}
              onOpenTracking={() => setIsTrackingOpen(true)}
            />
          </div>
        </section>

        <section
          className={`snap-start min-w-[100vw] h-screen ${
            isMobile
              ? 'w-full overflow-y-auto bg-slate-200/70'
              : 'w-screen shrink-0 overflow-y-auto bg-slate-200/70'
          }`}
        >
          <div className="mx-auto flex min-h-full w-full max-w-6xl items-start px-6 py-14 pb-24 md:px-10 md:py-16 md:pb-24">
            <LicenseSelectionSection
              licenses={LICENSE_OPTIONS}
              selectedLicenseId={selectedLicenseId}
              onSelect={handleSelectLicense}
            />
          </div>
        </section>

        {showDetailSection ? (
          <section
            className={`snap-start min-w-[100vw] h-screen ${
              isMobile ? 'w-full overflow-y-auto bg-slate-100' : 'w-screen shrink-0 bg-slate-100'
            }`}
          >
            <div className="mx-auto flex min-h-full w-full max-w-6xl items-center px-6 py-14 md:px-10 md:py-16">
              <LicenseDetailSection
                selectedLicense={selectedLicense?.infoOnly ? selectedLicense : undefined}
                onProceedToUpload={() => scrollToSection(uploadIndex)}
                onOpenSelection={() => scrollToSection(1)}
              />
            </div>
          </section>
        ) : null}

        <section
          id="apply"
          className={`snap-start min-w-[100vw] h-screen ${
            isMobile ? 'w-full overflow-y-auto bg-slate-200/70' : 'w-screen shrink-0 bg-slate-200/70'
          }`}
        >
          <div className="mx-auto flex min-h-full w-full max-w-6xl items-center px-6 py-14 md:px-10 md:py-16">
            <UploadSection
              selectedLicense={selectedLicense}
              onOpenUpload={() => setIsUploadOpen(true)}
              onOpenSelection={() => scrollToSection(1)}
              onOpenTracking={() => setIsTrackingOpen(true)}
            />
          </div>
        </section>
      </div>

      {!isMobile ? (
        <div className="pointer-events-none fixed inset-x-0 top-1/2 z-30 mx-auto flex w-full max-w-[98vw] -translate-y-1/2 justify-between px-3">
          <button
            type="button"
            onClick={() => scrollToSection(activeIndex - 1)}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={activeIndex === 0}
            aria-label="Go to previous section"
          >
            <FiArrowLeft />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection(activeIndex + 1)}
            className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={activeIndex === totalSections - 1}
            aria-label="Go to next section"
          >
            <FiArrowRight />
          </button>
        </div>
      ) : null}

      <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full border border-slate-300/80 bg-white/90 px-4 py-2 shadow-lg backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {sections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollToSection(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  activeIndex === index ? 'bg-slate-900 scale-110' : 'bg-slate-400 hover:bg-slate-500'
                }`}
                aria-label={`Go to ${section.label} section`}
              />
            ))}
          </div>
          <p className="text-xs font-semibold tracking-wide text-slate-700">
            {activeIndex + 1}/{totalSections}
          </p>
        </div>
      </div>

      <UploadModal
        isOpen={isUploadOpen}
        isSubmitting={isSubmittingUpload}
        selectedLicenseName={selectedLicense?.name ?? ''}
        onClose={() => setIsUploadOpen(false)}
        onSubmit={handleUploadSubmit}
      />

      <LicenseVerificationModal isOpen={isVerificationOpen} onClose={() => setIsVerificationOpen(false)} />
      <LicenseTrackingModal isOpen={isTrackingOpen} onClose={() => setIsTrackingOpen(false)} />

      <SuccessModal
        isOpen={isSuccessOpen}
        trackingId={trackingId}
        title="Application Submitted Successfully"
        message="Your application has been submitted. A confirmation has been sent to your email. Use your email and tracking ID to check status."
        onClose={() => setIsSuccessOpen(false)}
        onSubmitAnother={() => {
          setIsSuccessOpen(false)
          scrollToSection(1)
        }}
        submitAnotherLabel="Submit Another Application"
      />
    </div>
  )
}

export default LicensingPage
