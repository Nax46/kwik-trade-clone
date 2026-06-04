import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import { useEffect } from 'react'

export type ToastVariant = 'success' | 'error'

export type ToastState = {
  id: number
  variant: ToastVariant
  message: string
}

type ToastProps = {
  toast: ToastState | null
  onDismiss: () => void
  duration?: number
}

export function Toast({ toast, onDismiss, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [toast, duration, onDismiss])

  const isSuccess = toast?.variant === 'success'

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 right-4 z-[100] flex flex-col items-center gap-2 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm">
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto flex w-full items-start gap-3 rounded-xl border px-4 py-3 shadow-card sm:w-auto ${
              isSuccess
                ? 'border-emerald-200 bg-white text-emerald-900'
                : 'border-red-200 bg-white text-red-900'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden />
            )}
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              type="button"
              onClick={onDismiss}
              className="shrink-0 rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
