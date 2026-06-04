import { api } from '../api'
import type { ContactFormValues } from '../lib/validations/contact'

export type ContactApiResponse = {
  success: boolean
  message: string
}

export async function submitContactForm(
  data: ContactFormValues,
): Promise<ContactApiResponse> {
  await api.submitContact({ ...data, source: 'contact' })
  return { success: true, message: 'Thank you. We will contact you soon.' }
}
