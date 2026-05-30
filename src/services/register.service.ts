import { submitGenericForm } from './form.service'

export type RegisterEmailPayload = {
  fullName: string
  email: string
  phone: string
}

export type RegisterApiResponse = {
  success: boolean
  message: string
}

export async function registerUserEmail(
  data: RegisterEmailPayload,
): Promise<RegisterApiResponse> {
  return submitGenericForm({
    formType: 'Register',
    fields: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
    },
  })
}
