import { useState } from 'react'
import styles from './AdminLicensingPage.module.css'

type LicenseStatus = 'pending' | 'approved' | 'rejected' | 'issued'
type LicenseAction = 'approve' | 'reject' | null

type LicenseApplication = {
  id: string
  applicantName: string
  licenseType: string
  submissionDate: string
  status: LicenseStatus
}

const applications: LicenseApplication[] = [
  {
    id: 'LIC-001',
    applicantName: 'Zamtel Communications',
    licenseType: 'Network Operator',
    submissionDate: '2026-03-10',
    status: 'pending',
  },
  {
    id: 'LIC-002',
    applicantName: 'MTN Zambia',
    licenseType: 'Mobile Service Provider',
    submissionDate: '2026-03-05',
    status: 'approved',
  },
  {
    id: 'LIC-003',
    applicantName: 'Airtel Zambia',
    licenseType: 'Mobile Service Provider',
    submissionDate: '2026-03-08',
    status: 'issued',
  },
  {
    id: 'LIC-004',
    applicantName: 'Tech Solutions Ltd',
    licenseType: 'Data Center Provider',
    submissionDate: '2026-03-12',
    status: 'rejected',
  },
  {
    id: 'LIC-005',
    applicantName: 'Digital Innovations',
    licenseType: 'Telecom Consultant',
    submissionDate: '2026-03-01',
    status: 'pending',
  },
]

const statusLabel: Record<LicenseStatus, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  issued: 'Issued',
}

function AdminLicensingPage() {
  const [statusFilter, setStatusFilter] = useState<'' | LicenseStatus>('')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<LicenseAction>(null)
  const [currentApplicationId, setCurrentApplicationId] = useState<string | null>(null)
  const [comments, setComments] = useState('')

  const openApproveModal = (id: string) => {
    setCurrentAction('approve')
    setCurrentApplicationId(id)
    setComments('')
    setModalOpen(true)
  }

  const openRejectModal = (id: string) => {
    setCurrentAction('reject')
    setCurrentApplicationId(id)
    setComments('')
    setModalOpen(true)
  }

  const issueLicense = (id: string) => {
    window.alert(`License for application ${id} has been issued successfully!`)
  }

  const renewLicense = (id: string) => {
    window.alert(`Renewal process for license ${id} initiated.`)
  }

  const viewDetails = (id: string) => {
    window.alert(`Viewing detailed information for application ${id}`)
  }

  const viewReason = (id: string) => {
    window.alert(
      `Rejection reason for ${id}: Application does not meet regulatory requirements.`,
    )
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const confirmAction = () => {
    if (!currentAction || !currentApplicationId) {
      return
    }

    if (currentAction === 'approve') {
      window.alert(`Application ${currentApplicationId} approved.\nNotes: ${comments}`)
    } else if (currentAction === 'reject') {
      window.alert(`Application ${currentApplicationId} rejected.\nReason: ${comments}`)
    }

    closeModal()
  }

  const filterLicenses = () => {
    window.alert(`Filtering applications by status: ${statusFilter || 'All'}`)
  }

  const resetFilter = () => {
    setStatusFilter('')
    window.alert('Filter reset')
  }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.headerRow}>
        <h1>Licensing Management</h1>
      </div>

      <div className={styles.container}>
        <section className={styles.filterSection}>
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as '' | LicenseStatus)}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="issued">Issued</option>
          </select>
          <button type="button" className={styles.button} onClick={filterLicenses}>
            Filter
          </button>
          <button type="button" className={styles.button} onClick={resetFilter}>
            Reset
          </button>
        </section>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Applicant Name</th>
              <th>License Type</th>
              <th>Submission Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.applicantName}</td>
                <td>{application.licenseType}</td>
                <td>{application.submissionDate}</td>
                <td>
                  <span className={`${styles.status} ${styles[application.status]}`}>
                    {statusLabel[application.status]}
                  </span>
                </td>
                <td>
                  {application.status === 'pending' && (
                    <>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.buttonSuccess}`}
                        onClick={() => openApproveModal(application.id)}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.buttonDanger}`}
                        onClick={() => openRejectModal(application.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {application.status === 'approved' && (
                    <>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => issueLicense(application.id)}
                      >
                        Issue License
                      </button>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => viewDetails(application.id)}
                      >
                        View
                      </button>
                    </>
                  )}

                  {application.status === 'issued' && (
                    <>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => viewDetails(application.id)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => renewLicense(application.id)}
                      >
                        Renew
                      </button>
                    </>
                  )}

                  {application.status === 'rejected' && (
                    <button
                      type="button"
                      className={styles.button}
                      onClick={() => viewReason(application.id)}
                    >
                      View Reason
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className={styles.modal} onClick={closeModal} role="presentation">
          <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.closeButton} onClick={closeModal}>
              {'\u00D7'}
            </button>
            <h2>
              {currentAction === 'approve'
                ? 'Approve License Application'
                : 'Reject License Application'}
            </h2>
            <label>
              Application ID: <span>{currentApplicationId}</span>
            </label>
            <br />
            <br />
            <label htmlFor="comments">
              {currentAction === 'approve' ? 'Approval Notes:' : 'Rejection Reason:'}
            </label>
            <br />
            <textarea
              id="comments"
              rows={4}
              cols={50}
              placeholder="Enter your comments here..."
              value={comments}
              onChange={(event) => setComments(event.target.value)}
            />
            <br />
            <br />
            <button
              type="button"
              className={`${styles.button} ${
                currentAction === 'approve' ? styles.buttonSuccess : styles.buttonDanger
              }`}
              onClick={confirmAction}
            >
              {currentAction === 'approve' ? 'Approve' : 'Reject'}
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonDanger}`}
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminLicensingPage
