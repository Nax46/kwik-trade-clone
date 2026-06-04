import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../api'
import type { AdminNotification } from '../types/dashboard'

const POLL_MS = 30_000

export function useAdminNotifications() {
  const qc = useQueryClient()

  const query = useQuery({
    queryKey: ['admin', 'notifications'],
    queryFn: () =>
      api.admin.notifications() as Promise<{
        items: AdminNotification[]
        unreadCount: number
      }>,
    refetchInterval: POLL_MS,
    refetchIntervalInBackground: true,
  })

  const invalidate = () => void qc.invalidateQueries({ queryKey: ['admin', 'notifications'] })

  const markRead = useMutation({
    mutationFn: (id: string) => api.admin.markNotificationRead(id),
    onSuccess: invalidate,
  })

  const markAllRead = useMutation({
    mutationFn: () => api.admin.markAllNotificationsRead(),
    onSuccess: invalidate,
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.admin.deleteNotification(id),
    onSuccess: invalidate,
  })

  const clearAll = useMutation({
    mutationFn: () => api.admin.clearAllNotifications(),
    onSuccess: invalidate,
  })

  return {
    notifications: query.data?.items ?? [],
    unreadCount: query.data?.unreadCount ?? 0,
    isLoading: query.isLoading,
    markRead: markRead.mutate,
    markAllRead: () => markAllRead.mutate(),
    deleteNotification: remove.mutate,
    clearAll: () => clearAll.mutate(),
    isMarkingAll: markAllRead.isPending,
    isClearing: clearAll.isPending,
  }
}
