import { useMemo, useState } from 'react'
import styles from './AdminNotificationsPage.module.css'

type NotificationType = 'announcement' | 'update' | 'alert'
type NotificationStatus = 'sent' | 'scheduled' | 'pending'
type NotificationRecipient = 'all' | 'citizens' | 'licensees' | 'staff'
type SendSchedule = 'now' | 'scheduled'

type NotificationItem = {
  id: string
  type: NotificationType
  message: string
  recipientsText: string
  sentDate: string
  status: NotificationStatus
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'NOT-001',
    type: 'announcement',
    message: 'New regulations effective March 25, 2026',
    recipientsText: 'All Users',
    sentDate: '2026-03-20',
    status: 'sent',
  },
  {
    id: 'NOT-002',
    type: 'update',
    message: 'Your complaint #001 has been updated to Under Review',
    recipientsText: '1 User',
    sentDate: '2026-03-19',
    status: 'sent',
  },
  {
    id: 'NOT-003',
    type: 'alert',
    message: 'Scheduled system maintenance on March 25, 2:00 PM UTC',
    recipientsText: 'All Users',
    sentDate: '2026-03-22',
    status: 'scheduled',
  },
  {
    id: 'NOT-004',
    type: 'update',
    message: 'Your license application #LIC-002 has been approved',
    recipientsText: '1 User',
    sentDate: '2026-03-18',
    status: 'sent',
  },
  {
    id: 'NOT-005',
    type: 'announcement',
    message: 'Holiday closure: Office will be closed on April 1',
    recipientsText: 'All Users',
    sentDate: '2026-03-25',
    status: 'pending',
  },
]

const typeLabel: Record<NotificationType, string> = {
  announcement: 'Announcement',
  update: 'Status Update',
  alert: 'Alert',
}

function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [typeFilter, setTypeFilter] = useState<'' | NotificationType>('')
  const [statusFilter, setStatusFilter] = useState<'' | NotificationStatus>('')

  const [modalOpen, setModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentNotificationId, setCurrentNotificationId] = useState<string | null>(null)

  const [notificationType, setNotificationType] = useState<NotificationType>('announcement')
  const [notificationRecipients, setNotificationRecipients] =
    useState<NotificationRecipient>('all')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [sendSchedule, setSendSchedule] = useState<SendSchedule>('now')
  const [scheduleTime, setScheduleTime] = useState('')

  const filteredNotifications = useMemo(() => {
    return notifications.filter((entry) => {
      const typeOk = typeFilter ? entry.type === typeFilter : true
      const statusOk = statusFilter ? entry.status === statusFilter : true
      return typeOk && statusOk
    })
  }, [notifications, statusFilter, typeFilter])

  const openCreateModal = () => {
    setIsEditMode(false)
    setCurrentNotificationId(null)
    setNotificationType('announcement')
    setNotificationRecipients('all')
    setNotificationMessage('')
    setSendSchedule('now')
    setScheduleTime('')
    setModalOpen(true)
  }

  const editNotification = (id: string) => {
    setIsEditMode(true)
    setCurrentNotificationId(id)
    setNotificationType('alert')
    setNotificationRecipients('all')
    setNotificationMessage('Scheduled system maintenance...')
    setSendSchedule('scheduled')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const sendNotification = () => {
    if (!notificationMessage) {
      window.alert('Please enter a message')
      return
    }

    if (isEditMode && currentNotificationId) {
      window.alert(`Notification ${currentNotificationId} updated successfully!`)
      closeModal()
      return
    }

    window.alert(`Notification sent to ${notificationRecipients}!`)
    const maxId = notifications.reduce((max, item) => {
      const idNum = Number.parseInt(item.id.replace('NOT-', ''), 10)
      return Number.isNaN(idNum) ? max : Math.max(max, idNum)
    }, 0)
    const newNotification: NotificationItem = {
      id: `NOT-${String(maxId + 1).padStart(3, '0')}`,
      type: notificationType,
      message: notificationMessage,
      recipientsText: notificationRecipients === 'all' ? 'All Users' : notificationRecipients,
      sentDate: new Date().toISOString().split('T')[0],
      status: sendSchedule === 'scheduled' ? 'scheduled' : 'sent',
    }
    setNotifications((previous) => [newNotification, ...previous])
    closeModal()
  }

  const viewDetails = (id: string) => {
    window.alert(`Viewing notification ${id} details`)
  }

  const cancelNotification = (id: string) => {
    const confirmed = window.confirm(`Cancel scheduled notification ${id}?`)
    if (!confirmed) {
      return
    }
    window.alert(`Notification ${id} has been cancelled`)
  }

  const deleteNotification = (id: string) => {
    const confirmed = window.confirm(`Delete notification ${id}?`)
    if (!confirmed) {
      return
    }
    setNotifications((previous) => previous.filter((entry) => entry.id !== id))
    window.alert(`Notification ${id} has been deleted`)
  }

  const filterNotifications = () => {
    window.alert(
      `Filtering notifications by type: ${typeFilter || 'All'} and status: ${
        statusFilter || 'All'
      }`,
    )
  }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.headerRow}>
        <h1>Notifications Management</h1>
      </div>

      <div className={styles.container}>
        <div className={styles.actionSection}>
          <button type="button" className={styles.button} onClick={openCreateModal}>
            + Send New Notification
          </button>
        </div>

        <div className={styles.filterSection}>
          <label htmlFor="typeFilter">Filter by Type:</label>
          <select
            id="typeFilter"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value as '' | NotificationType)}
          >
            <option value="">All Types</option>
            <option value="announcement">Announcement</option>
            <option value="update">Status Update</option>
            <option value="alert">Alert</option>
          </select>

          <label htmlFor="statusFilter">Filter by Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as '' | NotificationStatus)}
          >
            <option value="">All Statuses</option>
            <option value="sent">Sent</option>
            <option value="scheduled">Scheduled</option>
            <option value="pending">Pending</option>
          </select>
          <button type="button" className={styles.button} onClick={filterNotifications}>
            Filter
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Message</th>
              <th>Recipients</th>
              <th>Sent Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.id}</td>
                <td>
                  <span className={`${styles.typeBadge} ${styles[notification.type]}`}>
                    {typeLabel[notification.type]}
                  </span>
                </td>
                <td>{notification.message}</td>
                <td>{notification.recipientsText}</td>
                <td>{notification.sentDate}</td>
                <td>
                  <span className={`${styles.status} ${styles[notification.status]}`}>
                    {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                  </span>
                </td>
                <td>
                  {notification.status === 'sent' && (
                    <button
                      type="button"
                      className={styles.button}
                      onClick={() => viewDetails(notification.id)}
                    >
                      View
                    </button>
                  )}
                  {notification.status === 'scheduled' && (
                    <>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => editNotification(notification.id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.buttonDanger}`}
                        onClick={() => cancelNotification(notification.id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {notification.status === 'pending' && (
                    <>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => editNotification(notification.id)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={`${styles.button} ${styles.buttonDanger}`}
                        onClick={() => deleteNotification(notification.id)}
                      >
                        Delete
                      </button>
                    </>
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
            <h2>{isEditMode ? 'Edit Notification' : 'Send New Notification'}</h2>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="notificationType">Type:</label>
                <select
                  id="notificationType"
                  value={notificationType}
                  onChange={(event) => setNotificationType(event.target.value as NotificationType)}
                >
                  <option value="announcement">Announcement</option>
                  <option value="update">Status Update</option>
                  <option value="alert">Alert</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="notificationRecipients">Send To:</label>
                <select
                  id="notificationRecipients"
                  value={notificationRecipients}
                  onChange={(event) =>
                    setNotificationRecipients(event.target.value as NotificationRecipient)
                  }
                >
                  <option value="all">All Users</option>
                  <option value="citizens">Citizens Only</option>
                  <option value="licensees">Licensees Only</option>
                  <option value="staff">Staff Only</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="notificationMessage">Message:</label>
                <textarea
                  id="notificationMessage"
                  placeholder="Enter your notification message here..."
                  value={notificationMessage}
                  onChange={(event) => setNotificationMessage(event.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="sendSchedule">Send Schedule:</label>
                <select
                  id="sendSchedule"
                  value={sendSchedule}
                  onChange={(event) => setSendSchedule(event.target.value as SendSchedule)}
                >
                  <option value="now">Send Immediately</option>
                  <option value="scheduled">Schedule for Later</option>
                </select>
              </div>
              {sendSchedule === 'scheduled' && (
                <div className={styles.formGroup}>
                  <label htmlFor="scheduleTime">Scheduled Time:</label>
                  <input
                    id="scheduleTime"
                    type="datetime-local"
                    value={scheduleTime}
                    onChange={(event) => setScheduleTime(event.target.value)}
                  />
                </div>
              )}
              <button type="button" className={styles.button} onClick={sendNotification}>
                Send Notification
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.buttonDanger}`}
                onClick={closeModal}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminNotificationsPage
