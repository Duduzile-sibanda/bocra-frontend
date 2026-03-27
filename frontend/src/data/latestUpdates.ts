import type { NewsArticle } from '../types/news'
import buildingImage from '../assets/building.jpg'
import newsImage from '../assets/news.jpg'
import signboardImage from '../assets/signboard.jpg'
import updatesImage from '../assets/updates.jpg'

export const latestUpdatesMock: NewsArticle[] = [
  {
    id: 'licensing-requirements-2026',
    category: 'Licensing',
    title: 'New Licensing Requirements Published for 2026 Applications',
    dateISO: '2026-02-18',
    summary:
      'BOCRA has published updated licensing requirements with clarified eligibility, documentation standards, and revised processing expectations for applicants.',
    readTime: '8 min read',
    imageAlt: 'BOCRA updates image',
    imageSrc: updatesImage,
    content: [
      'BOCRA has released revised licensing requirements to improve clarity for applicants across regulated sectors.',
      'The update provides clearer documentation requirements, a simplified submission checklist, and refined application validation criteria.',
      'Applicants are encouraged to review the updated requirements before submission to reduce processing delays and improve first-time compliance outcomes.',
      'Under the revised framework, applicants are expected to provide complete organisational details, ownership declarations, and operational contact points aligned with the current licensing category they are applying for.',
      'Technical submissions should now include clearer service scope descriptions, proposed coverage plans, and supporting compliance statements. BOCRA has also aligned terminology across forms to reduce interpretation errors during pre-assessment.',
      'The Authority has introduced a staged review sequence that helps applicants understand where an application is in the process, including initial completeness checks, technical review, legal and policy validation, and final determination.',
      'Where applications are incomplete, BOCRA may issue a structured clarification request. Applicants are advised to respond within the indicated timelines and ensure all requested supporting materials are attached in one consolidated resubmission.',
      'These revisions form part of BOCRA’s broader service-improvement programme aimed at increasing predictability, reducing avoidable processing delays, and supporting stronger compliance readiness for new and existing market participants.',
      'Applicants should review all published guidance notes and submission templates before filing. This includes any sector-specific schedules for telecommunications, broadcasting, internet-related services, or postal licensing categories.',
      'BOCRA will continue to engage stakeholders through public briefings and official updates as implementation progresses, with further clarifications to be issued where required to support smooth adoption.',
    ],
  },
  {
    id: 'complaints-process-improvement',
    category: 'Complaints',
    title: 'Consumer Complaint Handling Timeline Updated',
    dateISO: '2026-01-29',
    summary:
      'A refined complaint workflow introduces clearer status milestones and tighter response coordination between service providers and BOCRA teams.',
    readTime: '7 min read',
    imageAlt: 'BOCRA signboard',
    imageSrc: signboardImage,
    content: [
      'BOCRA has strengthened its complaint handling process with more visible status milestones for consumers.',
      'The revised timeline supports faster triage, clearer escalation paths, and improved accountability for provider responses.',
      'Consumers can continue using existing submission channels while benefiting from improved progress visibility and turnaround management.',
      'The refreshed process introduces clearer phase labels, including submission received, assessment in progress, provider engagement, resolution proposal, and closure. This structure is intended to reduce uncertainty while complaints are being reviewed.',
      'At intake stage, BOCRA now applies a standardised triage method to classify complaints by urgency, service impact, and evidence completeness. This helps route cases to the correct review stream more efficiently.',
      'Service providers are required to respond within specified windows once a complaint is escalated for formal response. BOCRA will monitor timeliness and may request corrective follow-up where responses are incomplete or unclear.',
      'Consumers are encouraged to include supporting references such as account details, incident timelines, prior communication records, and any available screenshots or documents to support faster case progression.',
      'In cases requiring additional verification, BOCRA may request supplementary information from either party before issuing a determination or recommending remedial action.',
      'The revised model also supports better reporting and performance tracking by enabling more consistent measurement of acknowledgement times, response turnaround, and closure outcomes across complaint categories.',
      'This process update aligns with BOCRA’s objective of improving consumer protection outcomes while strengthening transparency and accountability in communications service delivery.',
    ],
  },
  {
    id: 'public-notice-service-disruptions',
    category: 'Public Notice',
    title: 'Public Notice on Temporary Service Disruptions in Select Areas',
    dateISO: '2026-03-03',
    summary:
      'Operators have advised BOCRA of temporary service interruptions in selected regions due to planned infrastructure maintenance windows.',
    readTime: '6 min read',
    imageAlt: 'News headline visual',
    imageSrc: newsImage,
    content: [
      'BOCRA has received notifications of temporary service disruptions in select areas linked to planned maintenance activity.',
      'The maintenance windows are intended to strengthen network resilience and improve service quality in the medium term.',
      'Affected users are advised to monitor operator advisories and support channels for area-specific restoration updates.',
      'Operators have indicated that the planned work includes network optimisation activities, infrastructure upgrades, and routine preventive maintenance on selected transmission paths.',
      'During these windows, users may experience intermittent connectivity, reduced data throughput, delayed message delivery, or temporary voice service instability depending on local network topology and redundancy arrangements.',
      'BOCRA has directed operators to implement appropriate customer notification protocols and to provide restoration updates through official communication channels, including websites, social media pages, and contact centres.',
      'Priority service restoration should be applied to high-impact zones where feasible, with technical teams expected to maintain escalation pathways for incidents that exceed expected maintenance durations.',
      'Consumers are encouraged to verify outage advisories directly with their service providers and to report prolonged or unexplained disruption through established support channels.',
      'BOCRA will continue monitoring service restoration progress and may require additional reporting where outages materially affect end users beyond planned maintenance expectations.',
      'The Authority appreciates public cooperation during scheduled maintenance periods, which are essential for sustaining long-term reliability and service quality improvements.',
    ],
  },
  {
    id: 'spectrum-management-briefing',
    category: 'Regulation Update',
    title: 'Spectrum Management Announcement for Coordination Improvements',
    dateISO: '2026-02-07',
    summary:
      'A new regulatory briefing outlines enhancements to spectrum coordination procedures to support efficient allocation and reduced interference.',
    readTime: '9 min read',
    imageAlt: 'BOCRA offices',
    imageSrc: buildingImage,
    content: [
      'BOCRA has issued a spectrum management update to improve allocation transparency and coordination workflows.',
      'The update focuses on reducing harmful interference, improving assignment predictability, and supporting sector growth.',
      'Stakeholders are encouraged to review the procedural guidance and align technical submissions with the revised expectations.',
      'The new guidance introduces clearer pre-coordination requirements for applicants seeking spectrum access in contested or technically sensitive bands.',
      'Applicants are expected to provide more detailed engineering information, including transmission characteristics, geographic coverage assumptions, and coexistence mitigation measures where relevant.',
      'BOCRA has also refined parts of the assignment lifecycle to improve consistency from initial application review through technical analysis, coordination, conditional approval, and formal assignment issuance.',
      'For existing licensees, the update outlines expectations related to spectrum use efficiency, interference reporting, and proactive engagement in coordination activities that may affect neighboring assignments.',
      'The Authority will continue applying evidence-based assessments to minimize harmful interference and to protect critical services while supporting innovation and wider sector development.',
      'Where cross-border coordination is required, BOCRA will engage with relevant regional mechanisms and counterpart authorities in line with applicable frameworks and technical procedures.',
      'Stakeholders should ensure that submissions are complete, accurate, and aligned with published templates to reduce avoidable back-and-forth during technical evaluation.',
      'This announcement supports BOCRA’s broader objective of modern, transparent spectrum governance that balances consumer interests, industry certainty, and efficient use of a limited national resource.',
    ],
  },
]
