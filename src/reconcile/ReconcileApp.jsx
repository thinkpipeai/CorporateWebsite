import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import EmployeeDashboard from './EmployeeDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { getSession } from '../lib/auth.js'

function ReconcileIndex() {
  const session = getSession()
  if (!session) return <Navigate to="/reconcile/login" replace />
  return (
    <Navigate
      to={session.role === 'admin' ? '/reconcile/admin' : '/reconcile/employee'}
      replace
    />
  )
}

export default function ReconcileApp() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="employee"
        element={
          <ProtectedRoute role="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route index element={<ReconcileIndex />} />
      <Route path="*" element={<Navigate to="/reconcile" replace />} />
    </Routes>
  )
}
