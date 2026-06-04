import { useQuery } from '@tanstack/react-query'
import { api } from '../../api'
import { AdminPageHeader } from '../components/ui/PageHeader'
import { formatDate } from '../utils/format'

export function NewsletterPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'newsletter'],
    queryFn: () =>
      api.admin.newsletter({ limit: 50 }) as Promise<{
        items: Array<{ _id: string; email: string; isActive: boolean; subscribedAt: string }>
      }>,
  })

  return (
    <div>
      <AdminPageHeader title="Newsletter subscribers" description="Manage email list from the website." />
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading && <p className="p-4 text-sm">Loading…</p>}
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-slate-500">
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && data?.items.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                  No subscribers yet. Newsletter signups from the website will appear here.
                </td>
              </tr>
            )}
            {data?.items.map((s) => (
              <tr key={s._id} className="border-b border-slate-50">
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">{s.isActive ? 'Active' : 'Unsubscribed'}</td>
                <td className="px-4 py-3">{formatDate(s.subscribedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
