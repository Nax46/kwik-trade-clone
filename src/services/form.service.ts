import { api } from './api'

export type GenericFormPayload = {
  formType: string
  fields: Record<string, string>
}

export type GenericFormApiResponse = {
  success: boolean
  message: string
}

export async function submitGenericForm(
  payload: GenericFormPayload,
): Promise<GenericFormApiResponse> {
  const { data } = await api.post<GenericFormApiResponse>('/forms', payload)
  return data
}
