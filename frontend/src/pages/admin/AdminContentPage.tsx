import { useMemo, useState } from 'react'
import styles from './AdminContentPage.module.css'

type ContentStatus = 'published' | 'draft' | 'archived'
type ContentCategory = 'regulations' | 'advisories' | 'announcements' | 'procedures'

type ContentItem = {
  id: string
  title: string
  category: ContentCategory
  createdDate: string
  status: ContentStatus
  body?: string
}

const initialContent: ContentItem[] = [
  {
    id: 'CNT-001',
    title: 'Telecommunications Regulations 2024',
    category: 'regulations',
    createdDate: '2026-02-15',
    status: 'published',
  },
  {
    id: 'CNT-002',
    title: 'Network Quality of Service Advisory',
    category: 'advisories',
    createdDate: '2026-03-01',
    status: 'published',
  },
  {
    id: 'CNT-003',
    title: 'System Maintenance Announcement',
    category: 'announcements',
    createdDate: '2026-03-18',
    status: 'draft',
  },
  {
    id: 'CNT-004',
    title: 'License Application Procedures',
    category: 'procedures',
    createdDate: '2026-02-20',
    status: 'published',
  },
  {
    id: 'CNT-005',
    title: 'Spectrum Allocation Guidelines',
    category: 'regulations',
    createdDate: '2026-01-10',
    status: 'archived',
  },
]

const categoryLabel: Record<ContentCategory, string> = {
  regulations: 'Regulations',
  advisories: 'Advisories',
  announcements: 'Announcements',
  procedures: 'Procedures',
}

const statusLabel: Record<ContentStatus, string> = {
  published: 'Published',
  draft: 'Draft',
  archived: 'Archived',
}

function AdminContentPage() {
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContent)
  const [categoryFilter, setCategoryFilter] = useState<'' | ContentCategory>('')

  const [modalOpen, setModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentContentId, setCurrentContentId] = useState<string | null>(null)

  const [formTitle, setFormTitle] = useState('')
  const [formCategory, setFormCategory] = useState<'' | ContentCategory>('')
  const [formBody, setFormBody] = useState('')
  const [formStatus, setFormStatus] = useState<'draft' | 'published'>('draft')

  const filteredItems = useMemo(() => {
    if (!categoryFilter) {
      return contentItems
    }
    return contentItems.filter((item) => item.category === categoryFilter)
  }, [contentItems, categoryFilter])

  const openCreateModal = () => {
    setIsEditMode(false)
    setCurrentContentId(null)
    setFormTitle('')
    setFormCategory('')
    setFormBody('')
    setFormStatus('draft')
    setModalOpen(true)
  }

  const editContent = (id: string) => {
    const item = contentItems.find((entry) => entry.id === id)
    if (!item) {
      return
    }
    setIsEditMode(true)
    setCurrentContentId(id)
    setFormTitle(item.title)
    setFormCategory(item.category)
    setFormBody(item.body ?? 'Content loaded...')
    setFormStatus(item.status === 'archived' ? 'draft' : item.status)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const saveContent = () => {
    if (!formTitle || !formCategory) {
      window.alert('Please fill in all required fields')
      return
    }

    if (isEditMode && currentContentId) {
      setContentItems((previous) =>
        previous.map((item) =>
          item.id === currentContentId
            ? {
                ...item,
                title: formTitle,
                category: formCategory,
                status: formStatus,
                body: formBody,
              }
            : item,
        ),
      )
      window.alert(`Content ${currentContentId} updated successfully!`)
      closeModal()
      return
    }

    const maxId = contentItems.reduce((max, item) => {
      const num = Number.parseInt(item.id.replace('CNT-', ''), 10)
      return Number.isNaN(num) ? max : Math.max(max, num)
    }, 0)
    const newId = `CNT-${String(maxId + 1).padStart(3, '0')}`
    const dateString = new Date().toISOString().split('T')[0]

    const newItem: ContentItem = {
      id: newId,
      title: formTitle,
      category: formCategory,
      createdDate: dateString,
      status: formStatus,
      body: formBody,
    }

    setContentItems((previous) => [newItem, ...previous])
    window.alert(`New content "${formTitle}" created successfully with ID: ${newId}`)
    closeModal()
  }

  const deleteContent = (id: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete content ${id}?`)
    if (!confirmed) {
      return
    }
    setContentItems((previous) => previous.filter((item) => item.id !== id))
    window.alert(`Content ${id} deleted successfully!`)
  }

  const filterContent = () => {
    const categoryText = categoryFilter ? categoryLabel[categoryFilter] : 'All'
    window.alert(`Found ${filteredItems.length} content item(s) with category: ${categoryText}`)
  }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.headerRow}>
        <h1>Content Management System</h1>
      </div>

      <div className={styles.container}>
        <section className={styles.actionSection}>
          <button type="button" className={styles.button} onClick={openCreateModal}>
            + Create New Content
          </button>
        </section>

        <section className={styles.filterSection}>
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select
            id="categoryFilter"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value as '' | ContentCategory)}
          >
            <option value="">All Categories</option>
            <option value="regulations">Regulations</option>
            <option value="advisories">Advisories</option>
            <option value="announcements">Announcements</option>
            <option value="procedures">Procedures</option>
          </select>
          <button type="button" className={styles.button} onClick={filterContent}>
            Filter
          </button>
        </section>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Created Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{categoryLabel[item.category]}</td>
                <td>{item.createdDate}</td>
                <td>
                  <span className={`${styles.status} ${styles[item.status]}`}>
                    {statusLabel[item.status]}
                  </span>
                </td>
                <td>
                  <button type="button" className={styles.button} onClick={() => editContent(item.id)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.buttonDanger}`}
                    onClick={() => deleteContent(item.id)}
                  >
                    Delete
                  </button>
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
            <h2>{isEditMode ? 'Edit Content' : 'Create New Content'}</h2>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="contentTitle">Title:</label>
                <input
                  id="contentTitle"
                  type="text"
                  placeholder="Enter content title"
                  value={formTitle}
                  onChange={(event) => setFormTitle(event.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contentCategory">Category:</label>
                <select
                  id="contentCategory"
                  value={formCategory}
                  onChange={(event) => setFormCategory(event.target.value as '' | ContentCategory)}
                >
                  <option value="">Select Category</option>
                  <option value="regulations">Regulations</option>
                  <option value="advisories">Advisories</option>
                  <option value="announcements">Announcements</option>
                  <option value="procedures">Procedures</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contentBody">Content:</label>
                <textarea
                  id="contentBody"
                  placeholder="Enter your content here..."
                  value={formBody}
                  onChange={(event) => setFormBody(event.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contentStatus">Status:</label>
                <select
                  id="contentStatus"
                  value={formStatus}
                  onChange={(event) => setFormStatus(event.target.value as 'draft' | 'published')}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <button type="button" className={styles.button} onClick={saveContent}>
                Save Content
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

export default AdminContentPage
