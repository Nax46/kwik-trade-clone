import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

type UseInViewOnceOptions = {
  threshold?: number
  rootMargin?: string
}

export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOnceOptions = {},
): { ref: RefObject<T | null>; isInView: boolean } {
  const { threshold = 0.2, rootMargin = '0px' } = options
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [isInView, rootMargin, threshold])

  return { ref, isInView }
}
