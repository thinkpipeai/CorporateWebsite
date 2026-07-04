import { useEffect, useState } from 'react'
import { fetchAllSettlements, fetchSettlementForToday, generateSettlement } from '../../lib/reconcileApi.js'
import { formatDisplayDate, formatDisplayDateZh } from '../../lib/dateUtils.js'
import { formatMoney } from '../labels.js'

function SettlementDetail({ data }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
      <div className="mb-4 flex flex-wrap gap-4 text-sm">
        <span>
          <strong>日期：</strong> {data.date}
        </span>
        <span>
          <strong>总营业额：</strong> {formatMoney(data.total_revenue)}
        </span>
        <span>
          <strong>记录数：</strong> {data.total_records}
        </span>
      </div>
      {data.employees?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-3 py-2 font-medium">员工</th>
                <th className="px-3 py-2 font-medium">记录数</th>
                <th className="px-3 py-2 font-medium">总额</th>
                <th className="px-3 py-2 font-medium">分成比例</th>
                <th className="px-3 py-2 font-medium">应得款</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {data.employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td className="px-3 py-2">{employee.name}</td>
                  <td className="px-3 py-2">{employee.record_count}</td>
                  <td className="px-3 py-2">{formatMoney(employee.gross)}</td>
                  <td className="px-3 py-2">{(Number(employee.commission_rate) * 100).toFixed(0)}%</td>
                  <td className="px-3 py-2 font-medium text-brand">
                    {formatMoney(employee.earnings)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-slate-500">当日无员工做工记录。</p>
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
        <h2 className="text-xl font-semibold">结算</h2>
        <button type="button" onClick={handleGenerate} disabled={generating} className="btn-brand">
          {generating ? '结算中…' : '生成结算'}
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {loading ? (
        <p className="text-slate-500">加载结算数据中…</p>
      ) : todaySettlement ? (
        <div className="mb-8">
          <h3 className="mb-3 font-medium">今日（{formatDisplayDateZh()}）</h3>
          <SettlementDetail data={todaySettlement.data} />
        </div>
      ) : (
        <p className="mb-8 text-slate-500">
          今日尚未结算。点击「生成结算」计算当日分成。
        </p>
      )}

      {history.length > 0 && (
        <div>
          <h3 className="mb-3 font-medium">历史结算</h3>
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id}>
                <p className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {formatDisplayDateZh(new Date(`${item.settlement_date}T12:00:00`))}
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
