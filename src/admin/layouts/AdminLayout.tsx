import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useCloseOnEscape } from '../../hooks/useCloseOnEscape'
import { useCloseOnRouteChange } from '../../hooks/useCloseOnRouteChange'
import { AdminSidebar } from '../components/layout/AdminSidebar'
import { AdminTopbar } from '../components/layout/AdminTopbar'

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  useBodyScrollLock(sidebarOpen)
  useCloseOnEscape(sidebarOpen, closeSidebar)
  useCloseOnRouteChange(closeSidebar)

  return (
    <div className="flex min-h-svh overflow-x-hidden bg-slate-50">
      <AdminSidebar open={sidebarOpen} onClose={closeSidebar} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopbar sidebarOpen={sidebarOpen} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
