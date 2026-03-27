import { type FormEvent, useEffect, useState } from 'react'
import type { ComplaintRecord } from '../../types/complaints'
import { getComplaintByTrackingId } from '../../utils/complaintsStorage'
import ActionButton from '../ui/ActionButton'
import InputField from '../ui/InputField'

type TrackComplaintSectionProps = {
  initialTrackingId?: string
  onFound: (record: ComplaintRecord) => void
  onInvalidId: () => void
  onNotFound: (trackingId: string) => void
  onLookupError?: (message: string) => void
}

function TrackComplaintSection({
  initialTrackingId = '',
  onFound,
  onInvalidId,
  onNotFound,
  onLookupError,
}: TrackComplaintSectionProps) {
  const [trackingId, setTrackingId] = useState<string>(initialTrackingId)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setTrackingId(initialTrackingId)
  }, [initialTrackingId])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalized = trackingId.trim()

    if (!normalized) {
      onInvalidId()
      return
    }

    setIsLoading(true)
    try {
      const record = await getComplaintByTrackingId(normalized)
      if (!record) {
        onNotFound(normalized)
        return
      }
      onFound(record)
    } catch (error) {
      const fallback = 'Unable to retrieve complaint status right now. Please try again.'
      onLookupError?.(error instanceof Error && error.message ? error.message : fallback)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Track Complaint</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
        Enter your complaint reference ID to check the latest status.
      </p>

      <form className="mt-6 grid max-w-xl gap-4" noValidate onSubmit={onSubmit}>
        <InputField
          id="track-complaint-id"
          label="Reference ID"
          value={trackingId}
          onChange={setTrackingId}
          required
          placeholder="Complaint reference ID (e.g. 123)"
        />
        <div>
          <ActionButton isLoading={isLoading} type="submit">
            Check Status
          </ActionButton>
        </div>
      </form>
    </section>
  )
}

export default TrackComplaintSection
