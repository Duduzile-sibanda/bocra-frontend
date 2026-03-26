export type FAQCategory = 'Licensing' | 'Complaints' | 'General'

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: FAQCategory
}

export const faqItems: FAQItem[] = [
  {
    id: 'file-complaint',
    category: 'Complaints',
    question: 'How do I file a complaint?',
    answer:
      'Go to the Complaints page, complete the complaint form with your contact details and issue description, then submit. You will receive a reference number for follow-up.',
  },
  {
    id: 'track-complaint',
    category: 'Complaints',
    question: 'How can I track my complaint status?',
    answer:
      'Use the Track Complaint service and enter your complaint reference ID. The system will show the latest status, review stage, and any actions required from you.',
  },
  {
    id: 'licence-documents',
    category: 'Licensing',
    question: 'What documents are required for a licence application?',
    answer:
      'Required documents vary by licence type, but commonly include a completed application form, company registration documents, technical details, and supporting compliance information.',
  },
  {
    id: 'processing-time',
    category: 'Licensing',
    question: 'How long does licence processing take?',
    answer:
      'Processing times depend on application completeness and licence category. BOCRA advises applicants to submit complete documentation to avoid delays and speed up review.',
  },
  {
    id: 'public-notices-regulations',
    category: 'General',
    question: 'Where can I find public notices and regulations?',
    answer:
      'Public notices, regulatory updates, and related announcements are available in the website updates and relevant service pages, including Licensing and Legislation sections.',
  },
  {
    id: 'contact-support',
    category: 'General',
    question: 'How do I contact BOCRA for support?',
    answer:
      'You can reach BOCRA through official support channels listed in the website footer, including email and contact office details. For service issues, you may also file a complaint online.',
  },
]
