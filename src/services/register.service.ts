import { api } from '../api'

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
  await api.createLead({
    name: data.fullName,
    email: data.email,
    phone: data.phone,
    message: 'Account registration request',
    source: 'registration',
  })
  return { success: true, message: 'Registration received. We will be in touch shortly.' }
}
