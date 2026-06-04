import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type FadeInProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
}

export function FadeIn({ children, delay = 0, className = '', ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
