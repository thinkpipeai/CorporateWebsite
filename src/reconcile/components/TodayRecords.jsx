import { useEffect, useState } from 'react'
import { fetchTodayRecords } from '../../lib/reconcileApi.js'
import { formatDateTime } from '../../lib/dateUtils.js'

export default function TodayRecords({ employeeName = true }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setRecords(await fetchTodayRecords())
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p className="text-slate-500">Loading records…</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Today&apos;s Service Records</h2>
      {records.length === 0 ? (
        <p className="text-slate-500">No records for today yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 font-medium">Time</th>
                {employeeName && <th className="px-4 py-3 font-medium">Employee</th>}
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Tip</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {records.map((record) => (
                <tr key={record.id}>
                  <td className="px-4 py-3">{formatDateTime(record.date)}</td>
                  {employeeName && (
                    <td className="px-4 py-3">{record.employees?.name ?? '—'}</td>
                  )}
                  <td className="px-4 py-3">{record.service}</td>
                  <td className="px-4 py-3">{record.payment}</td>
                  <td className="px-4 py-3">${Number(record.amount).toFixed(2)}</td>
                  <td className="px-4 py-3">${Number(record.tip).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
