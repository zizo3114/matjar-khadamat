import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'

export function ProtectedRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export function GuestRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (session) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
