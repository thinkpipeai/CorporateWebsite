import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearSession, getSession } from '../lib/auth.js'
import { fetchEmployeeTodayRecords } from '../lib/reconcileApi.js'
import { formatDateTime } from '../lib/dateUtils.js'
import ReconcileHeader from './components/ReconcileHeader.jsx'
import AddRecordModal from './components/AddRecordModal.jsx'

export default function EmployeeDashboard() {
  const navigate = useNavigate()
  const session = getSession()
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)

  async function loadRecords() {
    if (!session?.id) return
    try {
      setLoading(true)
      setError('')
      setRecords(await fetchEmployeeTodayRecords(session.id))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRecords()
  }, [session?.id])

  function handleLogout() {
    clearSession()
    navigate('/reconcile/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <ReconcileHeader name={session?.name ?? 'Employee'} onLogout={handleLogout} />

      <main className="mx-auto max-w-3xl p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Today&apos;s Records</h2>
          <button type="button" onClick={() => setShowAddModal(true)} className="btn-brand">
            Add Record
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          {loading ? (
            <p className="text-slate-500">Loading records…</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : records.length === 0 ? (
            <p className="text-slate-500">No records for today. Tap &quot;Add Record&quot; to log your first service.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-3 py-2 font-medium">Time</th>
                    <th className="px-3 py-2 font-medium">Service</th>
                    <th className="px-3 py-2 font-medium">Payment</th>
                    <th className="px-3 py-2 font-medium">Amount</th>
                    <th className="px-3 py-2 font-medium">Tip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td className="px-3 py-2">{formatDateTime(record.date)}</td>
                      <td className="px-3 py-2">{record.service}</td>
                      <td className="px-3 py-2">{record.payment}</td>
                      <td className="px-3 py-2">${Number(record.amount).toFixed(2)}</td>
                      <td className="px-3 py-2">${Number(record.tip).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showAddModal && (
        <AddRecordModal
          employeeId={session.id}
          onClose={() => setShowAddModal(false)}
          onSaved={loadRecords}
        />
      )}
    </div>
  )
}
