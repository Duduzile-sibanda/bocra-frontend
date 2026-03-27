import type { ComplaintFormValues, ComplaintRecord, ComplaintStatus } from '../types/complaints'

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, '') ??
  'http://127.0.0.1:8000/api'

type BackendComplaintStatus = 'pending' | 'under_review' | 'resolved' | 'rejected'

type TrackComplaintResponse = {
  reference: number | string
  title: string
  category: string
  status: BackendComplaintStatus
  priority: 'low' | 'medium' | 'high'
  submitted_at: string
  timeline: Array<{
    id?: number
    complaint_id: number
    status: BackendComplaintStatus
    comments: string | null
    created_at: string
  }>
}

type SubmitComplaintResponse = {
  success: boolean
  message: string
  reference: number | string
  status: BackendComplaintStatus
}

const statusMessages: Record<ComplaintStatus, string> = {
  Submitted: 'Your complaint has been logged and is awaiting assignment.',
  'In Review': 'Our team is reviewing your complaint and may contact you for more details.',
  Resolved: 'Your complaint has been resolved. Thank you for your patience.',
  Rejected: 'Your complaint was closed without approval. Contact support for clarification.',
}

const backendCategoryMap: Record<string, 'network' | 'billing' | 'technical' | 'general'> = {
  Billing: 'billing',
  'Internet Speed': 'network',
  'Quality of Service': 'network',
  'Radio Interference': 'technical',
  Research: 'general',
  Licencing: 'general',
  'Policy and Regulation': 'general',
  Standards: 'general',
  Numbering: 'technical',
  ccTLD: 'technical',
  Broadcasting: 'general',
}

const toUiStatus = (status: BackendComplaintStatus): ComplaintStatus => {
  if (status === 'under_review') return 'In Review'
  if (status === 'resolved') return 'Resolved'
  if (status === 'rejected') return 'Rejected'
  return 'Submitted'
}

const toApiError = async (response: Response): Promise<string> => {
  try {
    const parsed = (await response.json()) as { message?: string }
    if (parsed?.message) return parsed.message
  } catch {
    // Ignore parse errors and return generic text.
  }
  return `Request failed with status ${response.status}`
}

const withNetworkErrorHandling = (error: unknown): never => {
  if (error instanceof TypeError) {
    throw new Error(
      'Cannot reach the BOCRA API. Confirm backend is running and CORS allows http://localhost:5173.',
    )
  }
  throw error
}

const safeFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  try {
    return await fetch(input, init)
  } catch (error) {
    return withNetworkErrorHandling(error)
  }
}

export const ensureComplaintSeedData = () => {
  // No-op now that complaints come from the backend API.
}

export const submitComplaint = async (
  values: ComplaintFormValues,
): Promise<ComplaintRecord> => {
  const title = `${values.category} complaint - ${values.company}`.slice(0, 255)
  const description = `Company: ${values.company}\n\n${values.complaint}`
  const backendCategory = backendCategoryMap[values.category] ?? 'general'

  const response = await safeFetch(`${API_BASE_URL}/complaints`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: values.name,
      email: values.email,
      phone_number: values.phone,
      category: backendCategory,
      title,
      description,
      priority: 'medium',
    }),
  })

  if (!response.ok) {
    throw new Error(await toApiError(response))
  }

  const payload = (await response.json()) as SubmitComplaintResponse
  const trackingId = String(payload.reference)
  const status = toUiStatus(payload.status)

  return {
    trackingId,
    name: values.name,
    email: values.email,
    company: values.company,
    phone: values.phone,
    category: values.category,
    complaint: values.complaint,
    submittedAt: new Date().toISOString(),
    status,
    statusMessage: statusMessages[status],
  }
}

export const getComplaintByTrackingId = async (
  trackingId: string,
): Promise<ComplaintRecord | null> => {
  const normalized = trackingId.trim()
  if (!normalized) return null

  const response = await safeFetch(
    `${API_BASE_URL}/complaints/track/${encodeURIComponent(normalized)}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(await toApiError(response))
  }

  const payload = (await response.json()) as TrackComplaintResponse
  const status = toUiStatus(payload.status)
  const latestComment =
    payload.timeline
      ?.slice()
      .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))[0]?.comments ?? ''

  return {
    trackingId: String(payload.reference),
    name: '',
    email: '',
    company: '',
    phone: '',
    category: payload.category,
    complaint: payload.title,
    submittedAt: payload.submitted_at,
    status,
    statusMessage: latestComment || statusMessages[status],
  }
}
