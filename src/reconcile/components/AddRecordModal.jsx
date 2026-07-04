import { useState } from 'react'
import { createRecord } from '../../lib/reconcileApi.js'
import { toDatetimeLocalValue } from '../../lib/dateUtils.js'

const SERVICES = ['Massage', 'Cupping', 'Acupuncture']
const PAYMENTS = ['Cash', 'Check', 'Card']

export default function AddRecordModal({ employeeId, onClose, onSaved }) {
  const [form, setForm] = useState({
    date: toDatetimeLocalValue(),
    service: 'Massage',
    payment: 'Cash',
    amount: '',
    tip: '0',
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (!form.amount) {
      setError('Amount is required.')
      return
    }

    try {
      setSaving(true)
      setError('')
      await createRecord({
        employeeId,
        date: form.date,
        service: form.service,
        payment: form.payment,
        amount: Number(form.amount),
        tip: Number(form.tip || 0),
      })
      onSaved()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <h3 className="mb-4 text-lg font-semibold">Add Record</h3>

        <div className="space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block text-slate-600 dark:text-slate-400">Date & Time</span>
            <input
              type="datetime-local"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-slate-600 dark:text-slate-400">Service</span>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
            >
              {SERVICES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-slate-600 dark:text-slate-400">Payment</span>
            <select
              value={form.payment}
              onChange={(e) => setForm({ ...form, payment: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
            >
              {PAYMENTS.map((payment) => (
                <option key={payment} value={payment}>
                  {payment}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-slate-600 dark:text-slate-400">Amount</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block text-slate-600 dark:text-slate-400">Tip</span>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.tip}
              onChange={(e) => setForm({ ...form, tip: e.target.value })}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
            />
          </label>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-600"
          >
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={saving} className="btn-brand">
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
