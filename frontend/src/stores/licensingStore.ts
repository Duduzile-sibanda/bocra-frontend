import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type LicensingStore = {
  selectedLicenseId: string
  isUploadOpen: boolean
  isVerificationOpen: boolean
  isTrackingOpen: boolean
  isSubmittingUpload: boolean
  isSuccessOpen: boolean
  trackingId: string
  setSelectedLicenseId: (licenseId: string) => void
  openUpload: () => void
  closeUpload: () => void
  openVerification: () => void
  closeVerification: () => void
  openTracking: () => void
  closeTracking: () => void
  startUploadSubmit: () => void
  finishUploadSubmit: (trackingId: string) => void
  closeSuccess: () => void
}

export const useLicensingStore = create<LicensingStore>()(
  persist(
    (set) => ({
      selectedLicenseId: '',
      isUploadOpen: false,
      isVerificationOpen: false,
      isTrackingOpen: false,
      isSubmittingUpload: false,
      isSuccessOpen: false,
      trackingId: '',
      setSelectedLicenseId: (licenseId) => set({ selectedLicenseId: licenseId }),
      openUpload: () => set({ isUploadOpen: true }),
      closeUpload: () => set({ isUploadOpen: false }),
      openVerification: () => set({ isVerificationOpen: true }),
      closeVerification: () => set({ isVerificationOpen: false }),
      openTracking: () => set({ isTrackingOpen: true }),
      closeTracking: () => set({ isTrackingOpen: false }),
      startUploadSubmit: () => set({ isSubmittingUpload: true }),
      finishUploadSubmit: (trackingId) =>
        set({
          trackingId,
          isUploadOpen: false,
          isSuccessOpen: true,
          isSubmittingUpload: false,
        }),
      closeSuccess: () => set({ isSuccessOpen: false }),
    }),
    {
      name: 'bocra_licensing_store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        selectedLicenseId: state.selectedLicenseId,
      }),
    },
  ),
)
