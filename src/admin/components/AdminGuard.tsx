import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { PageLoader } from '../../components/layout/PageLoader'

export function AdminGuard() {
  const { user, loading } = useAdminAuth()
  const location = useLocation()

  if (loading) return <PageLoader />
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }
  return <Outlet />
}
