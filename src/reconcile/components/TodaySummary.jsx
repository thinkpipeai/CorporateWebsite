import { useEffect, useState } from 'react'
import { fetchTodaySummary } from '../../lib/reconcileApi.js'
import { formatMoney } from '../labels.js'

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-brand">{value}</p>
    </div>
  )
}

export default function TodaySummary() {
  const [summary, setSummary] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setSummary(await fetchTodaySummary())
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p className="text-slate-500">加载汇总中…</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!summary) return null

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">今日汇总</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="今日营业额" value={formatMoney(summary.totalRevenue)} />
        <StatCard label="今日记录数" value={summary.totalRecords} />
        <StatCard label="今日上班人数" value={summary.employeesToday} />
      </div>
    </div>
  )
}
