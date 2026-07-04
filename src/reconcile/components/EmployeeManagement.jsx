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
      setError('Username, name, and password are required.')
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
      setError('Please select an employee to delete.')
      return
    }

    if (!window.confirm('Delete this employee and all their records?')) return

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
      <h2 className="mb-4 text-xl font-semibold">Employee Management</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => setShowAddForm(true)} className="btn-brand">
          Add Employee
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={!selectedId || saving}
          className="rounded-lg border border-red-300 px-4 py-2 font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:border-red-800 dark:hover:bg-red-950"
        >
          Delete Employee
        </button>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {showAddForm && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
          <h3 className="mb-3 font-medium">Add Employee</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              placeholder="Commission Rate (e.g. 0.5)"
              value={form.commissionRate}
              onChange={(e) => setForm({ ...form, commissionRate: e.target.value })}
              className="rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={handleSave} disabled={saving} className="btn-brand">
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-slate-500">Loading employees…</p>
      ) : employees.length === 0 ? (
        <p className="text-slate-500">No employees yet. Add one to get started.</p>
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
                  {(Number(employee.commission_rate) * 100).toFixed(0)}% commission
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
