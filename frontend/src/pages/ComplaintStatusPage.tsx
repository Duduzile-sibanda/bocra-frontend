import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ComplaintStatusResultSection from '../components/complaints/ComplaintStatusResultSection'
import { getComplaintByTrackingId } from '../utils/complaintsStorage'

function ComplaintStatusPage() {
  const { trackingId } = useParams()
  const decodedTrackingId = trackingId ? decodeURIComponent(trackingId) : ''
  const [record, setRecord] = useState<Awaited<ReturnType<typeof getComplaintByTrackingId>>>(null)
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(decodedTrackingId))
  const [loadError, setLoadError] = useState<string>('')

  useEffect(() => {
    if (!decodedTrackingId) return

    let isActive = true
    setIsLoading(true)
    setLoadError('')

    getComplaintByTrackingId(decodedTrackingId)
      .then((nextRecord) => {
        if (!isActive) return
        setRecord(nextRecord)
      })
      .catch((error) => {
        if (!isActive) return
        const fallback = 'Unable to load complaint status right now. Please try again.'
        setLoadError(error instanceof Error && error.message ? error.message : fallback)
      })
      .finally(() => {
        if (!isActive) return
        setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [decodedTrackingId])

  if (!trackingId) {
    return (
      <div className="py-8 md:py-10">
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-xl font-bold text-red-900">Reference ID Missing</h1>
          <p className="mt-2 text-sm text-red-800">
            A complaint reference ID is required to view complaint status.
          </p>
          <Link className="mt-4 inline-block font-semibold text-blue-700 hover:text-blue-800" to="/complaints/track">
            Back to Track Complaint
          </Link>
        </section>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="py-8 md:py-10">
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h1 className="text-xl font-bold text-slate-900">Loading Complaint Status</h1>
          <p className="mt-2 text-sm text-slate-700">
            Fetching status for reference ID <span className="font-mono">{decodedTrackingId}</span>.
          </p>
        </section>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="py-8 md:py-10">
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-xl font-bold text-red-900">Unable to Load Complaint</h1>
          <p className="mt-2 text-sm text-red-800">{loadError}</p>
          <Link className="mt-4 inline-block font-semibold text-blue-700 hover:text-blue-800" to="/complaints/track">
            Back to Track Complaint
          </Link>
        </section>
      </div>
    )
  }

  if (!record) {
    return (
      <div className="py-8 md:py-10">
        <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <h1 className="text-xl font-bold text-red-900">Complaint Not Found</h1>
          <p className="mt-2 text-sm text-red-800">
            No complaint was found for reference ID <span className="font-mono">{decodedTrackingId}</span>.
          </p>
          <Link className="mt-4 inline-block font-semibold text-blue-700 hover:text-blue-800" to="/complaints/track">
            Try another reference ID
          </Link>
        </section>
      </div>
    )
  }

  return (
    <div className="py-8 md:py-10">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6">
        <p className="text-sm text-slate-700 md:text-base">
          Want to check another complaint?{' '}
          <Link className="font-semibold text-blue-700 hover:text-blue-800" to="/complaints/track">
            Track Complaint
          </Link>
          .
        </p>
      </div>
      <ComplaintStatusResultSection record={record} />
    </div>
  )
}

export default ComplaintStatusPage
