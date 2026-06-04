import { Bell, Check, CheckCheck, Trash2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCloseOnEscape } from '../../../hooks/useCloseOnEscape'
import { useAdminNotifications } from '../../hooks/useAdminNotifications'
import { formatRelativeTime } from '../../utils/format'

const typeLabels: Record<string, string> = {
  lead: 'Lead',
  booking: 'Booking',
  newsletter: 'Newsletter',
  contact: 'Contact',
  blog_comment: 'Comment',
}

export function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const {
    notifications,
    unreadCount,
    isLoading,
    markRead,
    markAllRead,
    deleteNotification,
    clearAll,
    isMarkingAll,
    isClearing,
  } = useAdminNotifications()

  useCloseOnEscape(open, () => setOpen(false))

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  const handleOpenItem = (id: string, link?: string, read?: boolean) => {
    if (!read) markRead(id)
    setOpen(false)
    if (link) navigate(link)
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-label={unreadCount ? `${unreadCount} unread notifications` : 'Notifications'}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 flex w-[min(100vw-1.5rem,380px)] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-elevated"
          role="dialog"
          aria-label="Notifications"
        >
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h2 className="font-semibold text-slate-900">Notifications</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              aria-label="Close notifications"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-slate-100 px-3 py-2">
            <button
              type="button"
              disabled={isMarkingAll || unreadCount === 0}
              onClick={markAllRead}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-50 disabled:opacity-50"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
            <button
              type="button"
              disabled={isClearing || notifications.length === 0}
              onClick={clearAll}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear all
            </button>
          </div>

          <div className="max-h-[min(60dvh,400px)] overflow-y-auto overscroll-contain">
            {isLoading ? (
              <p className="px-4 py-8 text-center text-sm text-slate-500">Loading…</p>
            ) : notifications.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-slate-500">No notifications yet.</p>
            ) : (
              <ul role="list">
                {notifications.map((n) => (
                  <li
                    key={n._id}
                    className={`border-b border-slate-50 last:border-0 ${!n.read ? 'bg-brand-50/40' : ''}`}
                  >
                    <button
                      type="button"
                      onClick={() => handleOpenItem(n._id, n.link, n.read)}
                      className="w-full px-4 py-3 text-left hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-600">
                          {typeLabels[n.type] ?? n.type}
                        </span>
                        <span className="shrink-0 text-[10px] text-slate-400">
                          {formatRelativeTime(n.createdAt)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm font-medium text-slate-900">{n.title}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-slate-600">{n.message}</p>
                    </button>
                    <div className="flex gap-1 px-4 pb-2">
                      {!n.read && (
                        <button
                          type="button"
                          onClick={() => markRead(n._id)}
                          className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-slate-600 hover:bg-slate-100"
                        >
                          <Check className="h-3 w-3" />
                          Mark read
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteNotification(n._id)}
                        className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
