import { useQuery } from '@tanstack/react-query'
import { api } from '../../api'
import type { DashboardData } from '../types/dashboard'

const POLL_MS = 30_000

export function useDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => api.admin.dashboard() as Promise<DashboardData>,
    refetchInterval: POLL_MS,
    refetchIntervalInBackground: true,
  })
}
