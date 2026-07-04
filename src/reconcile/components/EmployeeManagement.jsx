import { useEffect, useState } from 'react'
import { createEmployee, deleteEmployee, fetchEmployees } from '../../lib/reconcileApi.js'

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [form, setForm] = useState({ username: '', name: '', password: '', commissionRate: '0.5' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  async function loadEmployees() {
    try {
      setLoading(true)
      setError('')
      const data = await fetchEmployees()
      setEmployees(data)
      if (selectedId && !data.some((employee) => employee.id === selectedId)) {
        setSelectedId(null)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  async function handleSave() {
    if (!form.username || !form.name || !form.password) {
      setError('请填写用户名、姓名和密码。')
      return
    }

    try {
      setSaving(true)
      setError('')
      await createEmployee({
        name: form.name,
        username: form.username,
        password: form.password,
        commissionRate: Number(form.commissionRate),
      })
      setForm({ username: '', name: '', password: '', commissionRate: '0.5' })
      setShowAddForm(false)
      await loadEmployees()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!selectedId) {
      setError('请先选择要删除的员工。')
      return
    }

    if (!window.confirm('确定删除该员工及其所有做工记录吗？')) return

    try {
      setSaving(true)
      setError('')
      await deleteEmployee(selectedId)
      setSelectedId(null)
      await loadEmployees()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">员工管理</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setShowAddForm(true)} className="btn-brand">
          添加员工
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={!selectedId || saving}
          className="rounded-lg border border-red-300 px-4 py-2 font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:hover:bg-red-950"
        >
          删除员工
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {showAddForm && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
          <h3 className="mb-3 font-medium">添加员工</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              placeholder="用户名"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
            <input
              placeholder="姓名"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
            <input
              type="password"
              placeholder="密码"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              placeholder="分成比例（如 0.5 表示 50%）"
              value={form.commissionRate}
              onChange={(e) => setForm({ ...form, commissionRate: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={handleSave} disabled={saving} className="btn-brand">
              保存
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-600"
            >
              取消
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">加载员工列表中…</p>
      ) : employees.length === 0 ? (
        <p className="text-slate-500">暂无员工，请点击「添加员工」创建。</p>
      ) : (
        <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-700 dark:border-slate-700">
          {employees.map((employee) => (
            <li key={employee.id}>
              <button
                type="button"
                onClick={() => setSelectedId(employee.id === selectedId ? null : employee.id)}
                className={`flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                  selectedId === employee.id ? 'bg-brand-light/40 dark:bg-brand/10' : ''
                }`}
              >
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-slate-500">@{employee.username}</p>
                </div>
                <span className="text-sm text-slate-500">
                  分成 {(Number(employee.commission_rate) * 100).toFixed(0)}%
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
