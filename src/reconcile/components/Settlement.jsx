import { useEffect, useState } from 'react'
import { fetchAllSettlements, fetchSettlementForToday, generateSettlement } from '../../lib/reconcileApi.js'
import { formatDisplayDate } from '../../lib/dateUtils.js'

function SettlementDetail({ data }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
      <div className="mb-4 flex flex-wrap gap-4 text-sm">
        <span>
          <strong>Date:</strong> {data.date}
        </span>
        <span>
          <strong>Total Revenue:</strong> ${Number(data.total_revenue).toFixed(2)}
        </span>
        <span>
          <strong>Records:</strong> {data.total_records}
        </span>
      </div>
      {data.employees?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-3 py-2 font-medium">Employee</th>
                <th className="px-3 py-2 font-medium">Records</th>
                <th className="px-3 py-2 font-medium">Gross</th>
                <th className="px-3 py-2 font-medium">Rate</th>
                <th className="px-3 py-2 font-medium">Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {data.employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td className="px-3 py-2">{employee.name}</td>
                  <td className="px-3 py-2">{employee.record_count}</td>
                  <td className="px-3 py-2">${Number(employee.gross).toFixed(2)}</td>
                  <td className="px-3 py-2">{(Number(employee.commission_rate) * 100).toFixed(0)}%</td>
                  <td className="px-3 py-2 font-medium text-brand">
                    ${Number(employee.earnings).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-slate-500">No employee activity for this day.</p>
      )}
    </div>
  )
}

export default function Settlement() {
  const [todaySettlement, setTodaySettlement] = useState(null)
  const [history, setHistory] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  async function load() {
    try {
      setLoading(true)
      setError('')
      const [today, all] = await Promise.all([fetchSettlementForToday(), fetchAllSettlements()])
      setTodaySettlement(today)
      setHistory(all.filter((item) => item.settlement_date !== formatDisplayDate()))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleGenerate() {
    try {
      setGenerating(true)
      setError('')
      const result = await generateSettlement()
      setTodaySettlement(result)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Settlement</h2>
        <button type="button" onClick={handleGenerate} disabled={generating} className="btn-brand">
          {generating ? 'Generating…' : 'Generate Settlement'}
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading ? (
        <p className="text-slate-500">Loading settlement…</p>
      ) : todaySettlement ? (
        <div className="mb-8">
          <h3 className="mb-3 font-medium">Today ({formatDisplayDate()})</h3>
          <SettlementDetail data={todaySettlement.data} />
        </div>
      ) : (
        <p className="mb-8 text-slate-500">
          No settlement for today yet. Click &quot;Generate Settlement&quot; to calculate.
        </p>
      )}

      {history.length > 0 && (
        <div>
          <h3 className="mb-3 font-medium">Previous Settlements</h3>
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id}>
                <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {item.settlement_date}
                </p>
                <SettlementDetail data={item.data} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
