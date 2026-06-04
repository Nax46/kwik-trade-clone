import { isAxiosError } from 'axios'
import { apiClient, type ApiResponse } from './client'

async function unwrap<T>(promise: Promise<{ data: ApiResponse<T> }>): Promise<T> {
  try {
    const { data } = await promise
    if (!data.success) throw new Error(data.message ?? 'Request failed')
    return data.data
  } catch (error) {
    if (isAxiosError(error)) {
      const body = error.response?.data as ApiResponse<unknown> | undefined
      throw new Error(body?.message ?? error.message)
    }
    throw error
  }
}

export const api = {
  health: () => unwrap(apiClient.get('/health')),

  getPublicSettings: () => unwrap(apiClient.get('/settings/public')),

  trackVisit: (body: { path: string; visitorId?: string; isUnique?: boolean }) =>
    unwrap(apiClient.post('/analytics/track', body)),

  submitContact: (body: Record<string, unknown>) =>
    unwrap(apiClient.post('/contact', body)),

  createLead: (body: Record<string, unknown>) =>
    unwrap(apiClient.post('/leads', body)),

  getBookingSlots: (date: string) =>
    unwrap<{ date: string; slots: string[] }>(apiClient.get('/bookings/availability', { params: { date } })),

  createBooking: (body: Record<string, unknown>) =>
    unwrap(apiClient.post('/bookings', body)),

  subscribeNewsletter: (email: string) =>
    unwrap(apiClient.post('/newsletter', { email })),

  unsubscribeNewsletter: (email: string) =>
    unwrap(apiClient.post('/newsletter/unsubscribe', { email })),

  getBlogs: (params?: Record<string, unknown>) =>
    unwrap(apiClient.get('/blogs', { params: { status: 'published', ...params } })),

  getBlog: (slug: string) => unwrap(apiClient.get(`/blogs/${slug}`)),

  getInsights: (params?: Record<string, unknown>) =>
    unwrap(apiClient.get('/insights', { params })),

  getInsight: (slug: string) => unwrap(apiClient.get(`/insights/${slug}`)),

  getResources: () => unwrap(apiClient.get('/resources')),

  getTestimonials: () => unwrap(apiClient.get('/testimonials')),

  auth: {
    login: (email: string, password: string) =>
      unwrap<{ token: string; user: { id: string; name: string; email: string } }>(
        apiClient.post('/auth/login', { email, password }),
      ),
    me: () => unwrap(apiClient.get('/auth/me')),
    logout: () => unwrap(apiClient.post('/auth/logout')),
    forgotPassword: (email: string) => unwrap(apiClient.post('/auth/forgot-password', { email })),
    resetPassword: (token: string, password: string) =>
      unwrap(apiClient.post('/auth/reset-password', { token, password })),
    updateProfile: (body: { name?: string; email?: string }) =>
      unwrap(apiClient.patch('/auth/profile', body)),
  },

  admin: {
    dashboard: () => unwrap(apiClient.get('/admin/dashboard')),
    analytics: (days = 30) => unwrap(apiClient.get('/admin/analytics', { params: { days } })),
    leads: (params?: Record<string, unknown>) => unwrap(apiClient.get('/admin/leads', { params })),
    updateLead: (id: string, body: Record<string, unknown>) =>
      unwrap(apiClient.patch(`/admin/leads/${id}`, body)),
    deleteLead: (id: string) => unwrap(apiClient.delete(`/admin/leads/${id}`)),
    bookings: (params?: Record<string, unknown>) =>
      unwrap(apiClient.get('/admin/bookings', { params })),
    updateBooking: (id: string, body: Record<string, unknown>) =>
      unwrap(apiClient.patch(`/admin/bookings/${id}`, body)),
    blogs: (params?: Record<string, unknown>) => unwrap(apiClient.get('/admin/blogs', { params })),
    createBlog: (body: Record<string, unknown>) => unwrap(apiClient.post('/admin/blogs', body)),
    updateBlog: (id: string, body: Record<string, unknown>) =>
      unwrap(apiClient.patch(`/admin/blogs/${id}`, body)),
    deleteBlog: (id: string) => unwrap(apiClient.delete(`/admin/blogs/${id}`)),
    insights: (params?: Record<string, unknown>) =>
      unwrap(apiClient.get('/admin/insights', { params })),
    createInsight: (body: Record<string, unknown>) =>
      unwrap(apiClient.post('/admin/insights', body)),
    updateInsight: (id: string, body: Record<string, unknown>) =>
      unwrap(apiClient.patch(`/admin/insights/${id}`, body)),
    deleteInsight: (id: string) => unwrap(apiClient.delete(`/admin/insights/${id}`)),
    resources: () => unwrap(apiClient.get('/admin/resources')),
    createResource: (body: Record<string, unknown>) =>
      unwrap(apiClient.post('/admin/resources', body)),
    updateResource: (id: string, body: Record<string, unknown>) =>
      unwrap(apiClient.patch(`/admin/resources/${id}`, body)),
    deleteResource: (id: string) => unwrap(apiClient.delete(`/admin/resources/${id}`)),
    testimonials: () => unwrap(apiClient.get('/admin/testimonials')),
    createTestimonial: (body: Record<string, unknown>) =>
      unwrap(apiClient.post('/admin/testimonials', body)),
    updateTestimonial: (id: string, body: Record<string, unknown>) =>
      unwrap(apiClient.patch(`/admin/testimonials/${id}`, body)),
    deleteTestimonial: (id: string) => unwrap(apiClient.delete(`/admin/testimonials/${id}`)),
    newsletter: (params?: Record<string, unknown>) =>
      unwrap(apiClient.get('/admin/newsletter', { params })),
    updateSettings: (body: Record<string, unknown>) =>
      unwrap(apiClient.patch('/admin/settings', body)),
    notifications: () =>
      unwrap<{ items: unknown[]; unreadCount: number }>(
        apiClient.get('/admin/notifications'),
      ),
    markNotificationRead: (id: string) =>
      unwrap<{ unreadCount: number }>(apiClient.patch(`/admin/notifications/${id}/read`)),
    markAllNotificationsRead: () =>
      unwrap<{ unreadCount: number }>(apiClient.patch('/admin/notifications/read-all')),
    deleteNotification: (id: string) =>
      unwrap<{ unreadCount: number }>(apiClient.delete(`/admin/notifications/${id}`)),
    clearAllNotifications: () =>
      unwrap<{ unreadCount: number }>(apiClient.delete('/admin/notifications')),
  },
}
