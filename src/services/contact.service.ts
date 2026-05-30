import type { ContactFormValues } from '../lib/validations/contact'
import { submitGenericForm } from './form.service'

export type ContactApiResponse = {
  success: boolean
  message: string
}

export async function submitContactForm(
  data: ContactFormValues,
): Promise<ContactApiResponse> {
  return submitGenericForm({
    formType: 'Contact',
    fields: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    },
  })
}
