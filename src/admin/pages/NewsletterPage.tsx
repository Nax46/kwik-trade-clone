import { useQuery } from '@tanstack/react-query'
import { api } from '../../api'
import { MobileRecordCard } from '../components/ui/MobileRecordCard'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { formatDate } from '../utils/format'

type Subscriber = {
  _id: string
  email: string
  isActive: boolean
  subscribedAt: string
}

export function NewsletterPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'newsletter'],
    queryFn: () =>
      api.admin.newsletter({ limit: 50 }) as Promise<{
        items: Subscriber[]
      }>,
  })

  return (
    <div className="min-w-0">
      <AdminPageHeader title="Newsletter subscribers" description="Manage email list from the website." />
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading && <p className="p-4 text-sm text-slate-500">Loading…</p>}

        {!isLoading && data?.items.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-slate-500">
            No subscribers yet. Newsletter signups from the website will appear here.
          </p>
        )}

        {!isLoading && data && data.items.length > 0 && (
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-500">
                  <th className="px-4 py-3 text-left font-semibold sm:px-6">Email</th>
                  <th className="px-4 py-3 text-left font-semibold sm:px-6">Status</th>
                  <th className="px-4 py-3 text-left font-semibold sm:px-6">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((s) => (
                  <tr key={s._id} className="border-b border-slate-50">
                    <td className="px-4 py-3 sm:px-6">{s.email}</td>
                    <td className="px-4 py-3 sm:px-6">{s.isActive ? 'Active' : 'Unsubscribed'}</td>
                    <td className="px-4 py-3 sm:px-6">{formatDate(s.subscribedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && data && data.items.length > 0 && (
          <ul className="space-y-3 p-4 md:hidden" role="list">
            {data.items.map((s) => (
              <li key={s._id}>
                <MobileRecordCard
                  fields={[
                    { label: 'Status', value: s.isActive ? 'Active' : 'Unsubscribed' },
                    { label: 'Subscribed', value: formatDate(s.subscribedAt) },
                  ]}
                >
                  <p className="mb-3 break-all text-base font-semibold text-slate-900">{s.email}</p>
                </MobileRecordCard>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
