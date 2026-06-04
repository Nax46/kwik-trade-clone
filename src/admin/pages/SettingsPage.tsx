import { Loader2, Save } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../api'
import { AdminInput } from '../components/ui/AdminInput'
import { AdminTextarea } from '../components/ui/AdminTextarea'
import { AdminPageHeader } from '../components/ui/PageHeader'

type SettingsForm = {
  phone: string
  email: string
  address: string
  tagline: string
  seo: { siteTitle: string; siteDescription: string; ogImage?: string }
  socialLinks: Array<{ label: string; href: string; icon?: string }>
}

export function SettingsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['settings', 'public'],
    queryFn: () => api.getPublicSettings() as Promise<SettingsForm>,
  })
  const [form, setForm] = useState<SettingsForm | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    setMessage(null)
    try {
      await api.admin.updateSettings(form)
      setMessage('Settings saved.')
    } finally {
      setSaving(false)
    }
  }

  if (isLoading || !form) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader title="Website settings" description="Contact info, SEO, and social links." />
      {message && (
        <p className="mb-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</p>
      )}
      <form onSubmit={handleSave} className="max-w-3xl space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-900">Contact</h2>
          <AdminInput label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <AdminInput label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <AdminInput label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <AdminInput label="Tagline" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-slate-900">SEO</h2>
          <AdminInput
            label="Site title"
            value={form.seo.siteTitle}
            onChange={(e) => setForm({ ...form, seo: { ...form.seo, siteTitle: e.target.value } })}
          />
          <AdminTextarea
            label="Site description"
            value={form.seo.siteDescription}
            onChange={(e) => setForm({ ...form, seo: { ...form.seo, siteDescription: e.target.value } })}
          />
        </section>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving…' : 'Save settings'}
        </button>
      </form>
    </div>
  )
}
