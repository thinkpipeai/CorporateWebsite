import { useEffect, useState } from 'react'
import { fetchTodayRecords } from '../../lib/reconcileApi.js'
import { formatDateTime } from '../../lib/dateUtils.js'
import { formatMoney, formatPayment, formatService } from '../labels.js'

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

  if (loading) return <p className="text-slate-500">加载记录中…</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">今日做工记录</h2>
      {records.length === 0 ? (
        <p className="text-slate-500">今日暂无记录。</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-4 py-3 font-medium">时间</th>
                {employeeName && <th className="px-4 py-3 font-medium">员工</th>}
                <th className="px-4 py-3 font-medium">项目</th>
                <th className="px-4 py-3 font-medium">支付方式</th>
                <th className="px-4 py-3 font-medium">金额</th>
                <th className="px-4 py-3 font-medium">小费</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {records.map((record) => (
                <tr key={record.id}>
                  <td className="px-4 py-3">{formatDateTime(record.date)}</td>
                  {employeeName && (
                    <td className="px-4 py-3">{record.employees?.name ?? '—'}</td>
                  )}
                  <td className="px-4 py-3">{formatService(record.service)}</td>
                  <td className="px-4 py-3">{formatPayment(record.payment)}</td>
                  <td className="px-4 py-3">{formatMoney(record.amount)}</td>
                  <td className="px-4 py-3">{formatMoney(record.tip)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
