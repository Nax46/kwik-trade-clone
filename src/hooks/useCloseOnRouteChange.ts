import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Calls `onClose` when the route pathname changes. */
export function useCloseOnRouteChange(onClose: () => void) {
  const { pathname } = useLocation()

  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only pathname changes should close
  }, [pathname])
}
