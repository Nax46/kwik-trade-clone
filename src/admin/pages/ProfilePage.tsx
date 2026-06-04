import { useState } from 'react'
import { api } from '../../api'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { Button } from '../../components/ui/Button'
import { AdminInput } from '../components/ui/AdminInput'
import { AdminPageHeader } from '../components/ui/PageHeader'

export function ProfilePage() {
  const { user, refresh } = useAdminAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [saved, setSaved] = useState(false)

  const save = async () => {
    await api.auth.updateProfile({ name, email })
    await refresh()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <AdminPageHeader title="Profile" description="Update your admin account details." />
      <div className="max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <AdminInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <AdminInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {saved && <p className="text-sm text-emerald-600">Profile updated.</p>}
        <Button type="button" onClick={() => void save()}>
          Save changes
        </Button>
      </div>
    </div>
  )
}
