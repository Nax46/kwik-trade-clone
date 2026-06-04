import { isAxiosError } from 'axios'

type ApiErrorBody = {
  message?: string
  success?: boolean
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const body = error.response?.data as ApiErrorBody | undefined
    if (body?.message) return body.message
    if (error.response?.status === 409) return 'This slot is no longer available. Please choose another time.'
    if (error.response?.status === 400) return 'Please check your entries and try again.'
  }
  if (error instanceof Error && error.message) return error.message
  return fallback
}
