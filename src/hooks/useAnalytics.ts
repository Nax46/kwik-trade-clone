import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../api'

const VISITOR_KEY = 'twm_visitor_id'

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(VISITOR_KEY, id)
  }
  return id
}

export function useAnalytics() {
  const location = useLocation()

  useEffect(() => {
    const seenKey = `twm_seen_${location.pathname}`
    const isUnique = !sessionStorage.getItem(seenKey)
    if (isUnique) sessionStorage.setItem(seenKey, '1')

    void api.trackVisit({
      path: location.pathname,
      visitorId: getVisitorId(),
      isUnique,
    }).catch(() => {
      /* analytics should not break UX */
    })
  }, [location.pathname])
}
