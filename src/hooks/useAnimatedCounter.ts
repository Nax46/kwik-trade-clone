import { useEffect, useState } from 'react'

type UseAnimatedCounterOptions = {
  end: number
  duration?: number
  enabled?: boolean
  decimals?: number
}

export function useAnimatedCounter({
  end,
  duration = 2000,
  enabled = true,
  decimals = 0,
}: UseAnimatedCounterOptions) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return

    let frameId = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(Number((end * eased).toFixed(decimals)))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [decimals, duration, enabled, end])

  return value
}
