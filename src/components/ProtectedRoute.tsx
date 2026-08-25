import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <p className="text-center">Loading…</p>
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />

  return <Outlet />
}
