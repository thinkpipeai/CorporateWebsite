import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearSession, getSession } from '../lib/auth.js'
import ReconcileHeader from './components/ReconcileHeader.jsx'
import TodaySummary from './components/TodaySummary.jsx'
import EmployeeManagement from './components/EmployeeManagement.jsx'
import TodayRecords from './components/TodayRecords.jsx'
import Settlement from './components/Settlement.jsx'

const MENU_ITEMS = [
  { id: 'summary', label: '今日汇总' },
  { id: 'employees', label: '员工管理' },
  { id: 'records', label: '今日做工记录' },
  { id: 'settlement', label: '结算' },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('summary')

  const session = getSession()

  function handleLogout() {
    clearSession()
    navigate('/reconcile/login', { replace: true })
  }

  function renderContent() {
    switch (activeTab) {
      case 'summary':
        return <TodaySummary />
      case 'employees':
        return <EmployeeManagement />
      case 'records':
        return <TodayRecords />
      case 'settlement':
        return <Settlement />
      default:
        return <TodaySummary />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <ReconcileHeader name={session?.name ?? '老板'} onLogout={handleLogout} />

      <div className="mx-auto flex max-w-6xl flex-col gap-6 p-4 md:flex-row">
        <aside className="w-full shrink-0 md:w-56">
          <nav className="rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
            <ul className="space-y-1">
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                      activeTab === item.id
                        ? 'bg-brand text-white'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
