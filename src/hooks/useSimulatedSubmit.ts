import { useCallback, useState } from 'react'

const DEFAULT_DELAY_MS = 1400

export function useSimulatedSubmit(delayMs = DEFAULT_DELAY_MS) {
  const [isLoading, setIsLoading] = useState(false)

  const simulateSubmit = useCallback(
    async (callback?: () => void) => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, delayMs))
      setIsLoading(false)
      callback?.()
    },
    [delayMs],
  )

  return { isLoading, simulateSubmit }
}
