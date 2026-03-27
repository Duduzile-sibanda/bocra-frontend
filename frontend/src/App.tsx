import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer.jsx'
import styles from './App.module.css'
import AboutPage from './pages/AboutPage'
import CareersPage from './pages/CareersPage'
import ComplaintStatusPage from './pages/ComplaintStatusPage'
import ComplaintsPage from './pages/ComplaintsPage'
import HomePage from './pages/HomePage'
import LegislationPage from './pages/LegislationPage'
import LicensingPage from './pages/LicensingPage'
import ProjectsPage from './pages/ProjectsPage'
import TendersPage from './pages/TendersPage'
import TrackComplaintPage from './pages/TrackComplaintPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminHomePage from './pages/admin/AdminHomePage'
import AdminAnalyticsPage from './pages/admin/AdminAnalyticsPage'
import AdminComplaintsPage from './pages/admin/AdminComplaintsPage'
import AdminContentPage from './pages/admin/AdminContentPage'
import AdminLicensingPage from './pages/admin/AdminLicensingPage'
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'

function App() {
  const location = useLocation()
  
  // Determine if we are on any admin related page
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <div className={styles.app}>
      {!isAdminPage && <Navbar />}
      <main className={isAdminPage ? "" : styles.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tenders" element={<TendersPage />} />
          <Route path="/licensing" element={<LicensingPage />} />
          <Route path="/legislation" element={<LegislationPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/complaints/track" element={<TrackComplaintPage />} />
          <Route path="/complaints/status/:trackingId" element={<ComplaintStatusPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHomePage />} />
            <Route path="dashboard" element={<AdminHomePage />} />
            <Route path="complaints" element={<AdminComplaintsPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="content" element={<AdminContentPage />} />
            <Route path="licensing" element={<AdminLicensingPage />} />
            <Route path="notifications" element={<AdminNotificationsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </div>
  )
}

export default App
