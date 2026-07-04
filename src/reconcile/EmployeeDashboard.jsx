import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clearSession, getSession } from '../lib/auth.js'
import { fetchEmployeeTodayRecords } from '../lib/reconcileApi.js'
import { formatDateTime } from '../lib/dateUtils.js'
import ReconcileHeader from './components/ReconcileHeader.jsx'
import AddRecordModal from './components/AddRecordModal.jsx'
import { formatMoney, formatPayment, formatService } from './labels.js'

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
      <ReconcileHeader name={session?.name ?? '员工'} onLogout={handleLogout} />

      <main className="mx-auto max-w-3xl p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">今日记录</h2>
          <button type="button" onClick={() => setShowAddModal(true)} className="btn-brand">
            添加记录
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          {loading ? (
            <p className="text-slate-500">加载记录中…</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : records.length === 0 ? (
            <p className="text-slate-500">今日暂无记录，点击「添加记录」录入第一笔服务。</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800">
                  <tr>
                    <th className="px-3 py-2 font-medium">时间</th>
                    <th className="px-3 py-2 font-medium">项目</th>
                    <th className="px-3 py-2 font-medium">支付方式</th>
                    <th className="px-3 py-2 font-medium">金额</th>
                    <th className="px-3 py-2 font-medium">小费</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td className="px-3 py-2">{formatDateTime(record.date)}</td>
                      <td className="px-3 py-2">{formatService(record.service)}</td>
                      <td className="px-3 py-2">{formatPayment(record.payment)}</td>
                      <td className="px-3 py-2">{formatMoney(record.amount)}</td>
                      <td className="px-3 py-2">{formatMoney(record.tip)}</td>
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
