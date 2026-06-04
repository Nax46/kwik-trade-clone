import { interestedServices } from './siteContent'

export const consultationTopics = interestedServices

/** YYYY-MM-DD in local timezone (avoids UTC shift from toISOString). */
export function toLocalDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getAvailableDates(count = 14): Date[] {
  const dates: Date[] = []
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)

  while (dates.length < count) {
    cursor.setDate(cursor.getDate() + 1)
    dates.push(new Date(cursor))
  }

  return dates
}

export function formatConsultationDate(date: Date): string {
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatConsultationSummary(date: string, slot: string): string {
  return `${date} at ${slot} IST`
}
