import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer.jsx'
import styles from './App.module.css'
import AboutPage from './pages/AboutPage'
import CareersPage from './pages/CareersPage'
import ComplaintsPage from './pages/ComplaintsPage'
import HomePage from './pages/HomePage'
import LegislationPage from './pages/LegislationPage'
import LicensingPage from './pages/LicensingPage'
import ProjectsPage from './pages/ProjectsPage'
import TendersPage from './pages/TendersPage'

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tenders" element={<TendersPage />} />
          <Route path="/licensing" element={<LicensingPage />} />
          <Route path="/legislation" element={<LegislationPage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
