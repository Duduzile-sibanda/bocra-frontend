import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './AdminUsersPage.module.css'

type UserRole = 'admin' | 'staff' | 'user'
type UserStatus = 'active' | 'inactive'

type UserItem = {
  id: string
  name: string
  email: string
  role: UserRole
  roleDisplay: string
  status: UserStatus
  createdDate: string
}

const initialUsers: UserItem[] = [
  {
    id: 'USR-001',
    name: 'Admin User',
    email: 'admin@bocra.zm',
    role: 'admin',
    roleDisplay: 'Admin',
    status: 'active',
    createdDate: '2026-01-05',
  },
  {
    id: 'USR-002',
    name: 'John Banda',
    email: 'john.banda@bocra.zm',
    role: 'staff',
    roleDisplay: 'Staff',
    status: 'active',
    createdDate: '2026-01-20',
  },
  {
    id: 'USR-003',
    name: 'Jane Nkomo',
    email: 'jane.nkomo@bocra.zm',
    role: 'staff',
    roleDisplay: 'Staff',
    status: 'active',
    createdDate: '2026-02-10',
  },
  {
    id: 'USR-004',
    name: 'Peter Chikumbutso',
    email: 'peter.c@email.com',
    role: 'user',
    roleDisplay: 'Citizen',
    status: 'active',
    createdDate: '2026-02-15',
  },
  {
    id: 'USR-005',
    name: 'Alice Phiri',
    email: 'alice.phiri@business.zm',
    role: 'user',
    roleDisplay: 'Licensee',
    status: 'inactive',
    createdDate: '2026-03-01',
  },
]

function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [roleFilter, setRoleFilter] = useState<'' | UserRole>('')

  const [modalOpen, setModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userRole, setUserRole] = useState<'' | UserRole>('')
  const [userPassword, setUserPassword] = useState('')

  const filteredUsers = useMemo(() => {
    if (!roleFilter) {
      return users
    }
    return users.filter((user) => user.role === roleFilter)
  }, [roleFilter, users])

  const openCreateModal = () => {
    setIsEditMode(false)
    setCurrentUserId(null)
    setUserName('')
    setUserEmail('')
    setUserRole('')
    setUserPassword('')
    setModalOpen(true)
  }

  const editUser = (id: string) => {
    const item = users.find((user) => user.id === id)
    if (!item) {
      return
    }
    setIsEditMode(true)
    setCurrentUserId(id)
    setUserName(item.name)
    setUserEmail(item.email)
    setUserRole(item.role)
    setUserPassword('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const saveUser = () => {
    if (!userName || !userEmail || !userRole) {
      window.alert('Please fill in all required fields')
      return
    }

    if (isEditMode && currentUserId) {
      setUsers((previous) =>
        previous.map((user) =>
          user.id === currentUserId
            ? {
                ...user,
                name: userName,
                email: userEmail,
                role: userRole,
                roleDisplay:
                  userRole === 'admin' ? 'Admin' : userRole === 'staff' ? 'Staff' : 'Citizen',
              }
            : user,
        ),
      )
      window.alert(`User ${currentUserId} updated successfully!`)
      closeModal()
      return
    }

    const maxId = users.reduce((max, user) => {
      const idNumber = Number.parseInt(user.id.replace('USR-', ''), 10)
      return Number.isNaN(idNumber) ? max : Math.max(max, idNumber)
    }, 0)
    const newId = `USR-${String(maxId + 1).padStart(3, '0')}`
    const dateString = new Date().toISOString().split('T')[0]

    const newUser: UserItem = {
      id: newId,
      name: userName,
      email: userEmail,
      role: userRole,
      roleDisplay: userRole === 'admin' ? 'Admin' : userRole === 'staff' ? 'Staff' : 'Citizen',
      status: 'active',
      createdDate: dateString,
    }
    setUsers((previous) => [newUser, ...previous])
    window.alert(`New user "${userName}" created successfully with ID: ${newId}`)
    closeModal()
  }

  const deactivateUser = (id: string) => {
    const confirmed = window.confirm(`Deactivate user ${id}?`)
    if (!confirmed) {
      return
    }
    setUsers((previous) =>
      previous.map((user) => (user.id === id ? { ...user, status: 'inactive' } : user)),
    )
    window.alert(`User ${id} has been deactivated`)
  }

  const activateUser = (id: string) => {
    setUsers((previous) =>
      previous.map((user) => (user.id === id ? { ...user, status: 'active' } : user)),
    )
    window.alert(`User ${id} has been activated`)
  }

  const filterUsers = () => {
    window.alert(`Found ${filteredUsers.length} user(s) with role: ${roleFilter || 'All'}`)
  }

  return (
    <div className={styles.contentContainer}>
      <div className={styles.headerRow}>
        <h1>User Management</h1>
      </div>

      <div className={styles.container}>
        <div className={styles.actionSection}>
          <button type="button" className={styles.button} onClick={openCreateModal}>
            + Add New User
          </button>
        </div>

        <div className={styles.filterSection}>
          <label htmlFor="roleFilter">Filter by Role:</label>
          <select
            id="roleFilter"
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value as '' | UserRole)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="user">Citizen/User</option>
          </select>
          <button type="button" className={styles.button} onClick={filterUsers}>
            Filter
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`${styles.roleBadge} ${styles[user.role]}`}>
                    {user.roleDisplay}
                  </span>
                </td>
                <td>
                  <span className={`${styles.status} ${styles[user.status]}`}>
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{user.createdDate}</td>
                <td>
                  <button type="button" className={styles.button} onClick={() => editUser(user.id)}>
                    Edit
                  </button>
                  {user.status === 'active' ? (
                    <button
                      type="button"
                      className={`${styles.button} ${styles.buttonDanger}`}
                      onClick={() => deactivateUser(user.id)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button type="button" className={styles.button} onClick={() => activateUser(user.id)}>
                      Activate
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
            <h2>{isEditMode ? 'Edit User' : 'Add New User'}</h2>
            <form>
              <div className={styles.formGroup}>
                <label htmlFor="userName">Full Name:</label>
                <input
                  id="userName"
                  type="text"
                  placeholder="Enter full name"
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="userEmail">Email:</label>
                <input
                  id="userEmail"
                  type="email"
                  placeholder="Enter email address"
                  value={userEmail}
                  onChange={(event) => setUserEmail(event.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="userRole">Role:</label>
                <select
                  id="userRole"
                  value={userRole}
                  onChange={(event) => setUserRole(event.target.value as '' | UserRole)}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="staff">Staff</option>
                  <option value="user">Citizen/User</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="userPassword">Password:</label>
                <input
                  id="userPassword"
                  type="password"
                  placeholder="Enter password"
                  value={userPassword}
                  onChange={(event) => setUserPassword(event.target.value)}
                />
              </div>
              <button type="button" className={styles.button} onClick={saveUser}>
                Save User
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

export default AdminUsersPage
