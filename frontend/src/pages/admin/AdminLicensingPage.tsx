import { Link } from 'react-router-dom'
import { SearchContainer } from '../../components/search'

function AdminLicensingPage() {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 rounded-2xl bg-slate-900 px-5 py-4 text-white shadow-lg shadow-slate-400/20 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Admin Dashboard</p>
          <h1 className="text-xl font-semibold sm:text-2xl">Licensing Management</h1>
        </div>
        <Link
          to="/admin"
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          {'\u2190'} Back to Dashboard
        </Link>
      </header>

      <SearchContainer />
    </div>
  )
}

export default AdminLicensingPage
