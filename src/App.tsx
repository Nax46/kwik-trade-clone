import { QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { ToastProvider } from './context/ToastContext'
import { queryClient } from './lib/queryClient'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <AdminAuthProvider>
            <AppRoutes />
          </AdminAuthProvider>
        </ToastProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
