import { MapPin } from 'lucide-react'
import { FadeIn } from '../common/FadeIn'
import { COMPANY } from '../../data/siteContent'

export function MapPlaceholder() {
  return (
    <FadeIn>
      <div className="card-surface overflow-hidden">
        <div className="flex aspect-[21/9] min-h-[240px] flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-brand-50">
          <MapPin className="h-10 w-10 text-brand-400" />
          <p className="mt-3 text-sm font-medium text-slate-600">Map placeholder</p>
          <p className="mt-1 max-w-md px-4 text-center text-xs text-slate-500">{COMPANY.address}</p>
        </div>
        <p className="border-t border-slate-100 px-4 py-3 text-center text-xs text-slate-500">
          Interactive map integration available upon deployment.
        </p>
      </div>
    </FadeIn>
  )
}
