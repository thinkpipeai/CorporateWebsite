import { formatDisplayDate } from '../../lib/dateUtils.js'

export default function ReconcileHeader({ name, onLogout }) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Welcome, {name}
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
          <span>{formatDisplayDate()}</span>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
