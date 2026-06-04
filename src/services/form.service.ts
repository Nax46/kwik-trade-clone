import { api } from '../api'

export type GenericFormPayload = {
  formType: string
  fields: Record<string, string>
}

export type GenericFormApiResponse = {
  success: boolean
  message: string
}

/** Maps legacy generic forms to contact API (MongoDB Lead collection). */
export async function submitGenericForm(
  payload: GenericFormPayload,
): Promise<GenericFormApiResponse> {
  const { fields, formType } = payload
  await api.submitContact({
    name: fields.fullName ?? fields.name ?? 'Website visitor',
    email: fields.email ?? '',
    phone: fields.phone ?? '0000000000',
    message: fields.message ?? `Form: ${formType}`,
    experienceLevel: fields.experienceLevel,
    interestedService: fields.interestedService ?? formType,
    source: 'contact',
  })
  return { success: true, message: 'Submitted successfully' }
}
