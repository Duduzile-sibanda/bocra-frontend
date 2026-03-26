import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { ComplaintFormValues, ComplaintRecord } from '../types/complaints'
import {
  getComplaintByTrackingId as findComplaintByTrackingIdInStorage,
  submitComplaint as submitComplaintToStorage,
} from '../utils/complaintsStorage'

type ComplaintsStore = {
  lastTrackingId: string
  trackingSeedId: string
  selectedRecord: ComplaintRecord | null
  latestTrackingId: string
  isSuccessOpen: boolean
  submitComplaint: (values: ComplaintFormValues) => Promise<ComplaintRecord>
  getComplaintByTrackingId: (trackingId: string) => Promise<ComplaintRecord | null>
  findComplaintByTrackingId: (trackingId: string) => Promise<ComplaintRecord | null>
  setSelectedRecord: (record: ComplaintRecord | null) => void
  setTrackingSeedId: (trackingId: string) => void
  closeSuccessModal: () => void
  resetSubmissionFlow: () => void
}

export const useComplaintsStore = create<ComplaintsStore>()(
  persist(
    (set) => ({
      lastTrackingId: '',
      trackingSeedId: '',
      selectedRecord: null,
      latestTrackingId: '',
      isSuccessOpen: false,
      submitComplaint: async (values) => {
        const record = await submitComplaintToStorage(values)
        set({
          lastTrackingId: record.trackingId,
          trackingSeedId: record.trackingId,
          latestTrackingId: record.trackingId,
          selectedRecord: record,
          isSuccessOpen: true,
        })
        return record
      },
      getComplaintByTrackingId: (trackingId) => findComplaintByTrackingIdInStorage(trackingId),
      findComplaintByTrackingId: async (trackingId) => {
        const record = await findComplaintByTrackingIdInStorage(trackingId)
        if (record) {
          set({
            selectedRecord: record,
            trackingSeedId: record.trackingId,
            lastTrackingId: record.trackingId,
          })
        }
        return record
      },
      setSelectedRecord: (record) => set({ selectedRecord: record }),
      setTrackingSeedId: (trackingId) => set({ trackingSeedId: trackingId }),
      closeSuccessModal: () => set({ isSuccessOpen: false }),
      resetSubmissionFlow: () =>
        set({
          isSuccessOpen: false,
          latestTrackingId: '',
        }),
    }),
    {
      name: 'bocra_complaints_store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        lastTrackingId: state.lastTrackingId,
      }),
    },
  ),
)
