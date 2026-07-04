import { Navigate } from 'react-router-dom'
import { getSession } from '../../lib/auth.js'

export default function ProtectedRoute({ children, role }) {
  const session = getSession()

  if (!session) {
    return <Navigate to="/reconcile/login" replace />
  }

  if (role && session.role !== role) {
    return <Navigate to={session.role === 'admin' ? '/reconcile/admin' : '/reconcile/employee'} replace />
  }

  return children
}
