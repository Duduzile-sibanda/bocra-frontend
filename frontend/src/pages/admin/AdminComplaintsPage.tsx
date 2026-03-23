import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './AdminComplaintsPage.module.css'

type ComplaintStatus = 'submitted' | 'under-review' | 'resolved' | 'rejected'

type Complaint = {
  id: string
  complainantName: string
  title: string
  submittedDate: string
  status: ComplaintStatus
}

const complaintsData: Complaint[] = [
  {
    id: '001',
    complainantName: 'John Mwale',
    title: 'Poor Network Signal',
    submittedDate: '2026-03-15',
    status: 'submitted',
  },
  {
    id: '002',
    complainantName: 'Jane Banda',
    title: 'Billing Error',
    submittedDate: '2026-03-14',
    status: 'under-review',
  },
  {
    id: '003',
    complainantName: 'Peter Chikumbutso',
    title: 'License Application Delay',
    submittedDate: '2026-03-10',
    status: 'resolved',
  },
  {
    id: '004',
    complainantName: 'Alice Phiri',
    title: 'Fraudulent Activity Report',
    submittedDate: '2026-03-12',
    status: 'submitted',
  },
  {
    id: '005',
    complainantName: 'Robert Nkomo',
    title: 'Service Not Received',
    submittedDate: '2026-03-08',
    status: 'rejected',
  },
]

const statusLabel: Record<ComplaintStatus, string> = {
  submitted: 'Submitted',
  'under-review': 'Under Review',
  resolved: 'Resolved',
  rejected: 'Rejected',
}

function AdminComplaintsPage() {
  const [statusFilter, setStatusFilter] = useState<'' | ComplaintStatus>('')
  const [modalOpen, setModalOpen] = useState(false)
  const [currentComplaintId, setCurrentComplaintId] = useState<string | null>(null)
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('submitted')
  const [adminNotes, setAdminNotes] = useState('')

  const filteredComplaints = useMemo(() => {
    if (!statusFilter) {
      return complaintsData
    }
    return complaintsData.filter((complaint) => complaint.status === statusFilter)
  }, [statusFilter])

  const onUpdateComplaint = (id: string) => {
    setCurrentComplaintId(id)
    setNewStatus('submitted')
    setAdminNotes('')
    setModalOpen(true)
  }

  const onCloseModal = () => {
    setModalOpen(false)
  }

  const onSaveUpdate = () => {
    if (!currentComplaintId) {
      return
    }
    window.alert(
      `Complaint ${currentComplaintId} updated to status: ${newStatus}\nNotes: ${adminNotes}`,
    )
    onCloseModal()
  }

  const onViewDetails = (id: string) => {
    window.alert(`Viewing details for complaint #${id}`)
  }

  const onFilterComplaints = () => {
    const statusText = statusFilter ? statusLabel[statusFilter] : 'All'
    window.alert(`Found ${filteredComplaints.length} complaint(s) with status: ${statusText}`)
  }

  const onResetFilter = () => {
    setStatusFilter('')
    window.alert('Filter reset - showing all complaints')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Complaint Management</h1>
        <Link to="/admin" className={styles.backButton}>
          {'\u2190'} Back to Dashboard
        </Link>
      </header>

      <div className={styles.container}>
        <section className={styles.filterSection}>
          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as '' | ComplaintStatus)}
          >
            <option value="">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="under-review">Under Review</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
          <button type="button" className={styles.button} onClick={onFilterComplaints}>
            Filter
          </button>
          <button type="button" className={styles.button} onClick={onResetFilter}>
            Reset
          </button>
        </section>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Complainant Name</th>
              <th>Title</th>
              <th>Submitted Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.complainantName}</td>
                <td>{complaint.title}</td>
                <td>{complaint.submittedDate}</td>
                <td>
                  <span className={`${styles.status} ${styles[complaint.status]}`}>
                    {statusLabel[complaint.status]}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => onUpdateComplaint(complaint.id)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => onViewDetails(complaint.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className={styles.modal} onClick={onCloseModal} role="presentation">
          <div className={styles.modalContent} onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.closeButton} onClick={onCloseModal}>
              {'\u00D7'}
            </button>
            <h2>Update Complaint Status</h2>
            <label>
              Complaint ID: <span>{currentComplaintId}</span>
            </label>
            <br />
            <br />
            <label htmlFor="newStatus">New Status:</label>
            <br />
            <select
              id="newStatus"
              value={newStatus}
              onChange={(event) => setNewStatus(event.target.value as ComplaintStatus)}
            >
              <option value="submitted">Submitted</option>
              <option value="under-review">Under Review</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
            <br />
            <br />
            <label htmlFor="adminNotes">Admin Notes:</label>
            <br />
            <textarea
              id="adminNotes"
              rows={4}
              cols={50}
              placeholder="Enter your notes here..."
              value={adminNotes}
              onChange={(event) => setAdminNotes(event.target.value)}
            />
            <br />
            <br />
            <button type="button" className={styles.button} onClick={onSaveUpdate}>
              Save Update
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonDanger}`}
              onClick={onCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p>&copy; 2026 BOCRA Digital Service Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default AdminComplaintsPage
