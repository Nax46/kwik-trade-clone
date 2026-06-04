import { motion } from 'framer-motion'

type PageLoaderProps = {
  fullScreen?: boolean
}

export function PageLoader({ fullScreen = true }: PageLoaderProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? 'min-h-[50vh] py-24' : 'py-12'
      }`}
      role="status"
      aria-label="Loading"
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand-600 border-r-indigo-600" />
        </div>
        <p className="text-sm font-medium text-slate-500">Loading…</p>
      </motion.div>
    </div>
  )
}
