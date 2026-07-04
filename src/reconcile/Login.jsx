import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setSession } from '../lib/auth.js'
import { checkEmployeesAccessible, login } from '../lib/reconcileApi.js'
import { isSupabaseConfigured } from '../lib/supabase.js'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Reconcile Login | Thinkpipe AI'
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await login(username, password)
      if (!user) {
        const accessible = await checkEmployeesAccessible()
        setError(
          accessible
            ? 'Invalid username or password. Demo account: admin / admin (all lowercase, no spaces).'
            : 'Cannot read employees table. Run supabase/fix-rls.sql in Supabase SQL Editor, then refresh.',
        )
        return
      }

      setSession(user)
      navigate(user.role === 'admin' ? '/reconcile/admin' : '/reconcile/employee', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 text-center">
          <p className="text-sm font-medium text-brand">Thinkpipe AI</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">Reconciliation Platform</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to manage records and settlements</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
            Supabase is not configured. Copy <code className="text-xs">.env.example</code> to{' '}
            <code className="text-xs">.env</code> and add your project credentials.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
              placeholder="admin"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-slate-700 dark:text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800"
              placeholder="••••••"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-brand w-full">
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Demo admin: <span className="font-mono">admin / admin</span>
        </p>

        <p className="mt-4 text-center">
          <Link to="/" className="text-sm text-brand hover:underline">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  )
}
