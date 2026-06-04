import { Calendar, Check, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import {
  formatConsultationDate,
  getAvailableDates,
  toLocalDateString,
} from '../../data/consultation'
import { Skeleton } from '../ui/Skeleton'

type TimeSlotPickerProps = {
  selectedDate: string
  selectedSlot: string
  onDateChange: (isoDate: string) => void
  onSlotChange: (slot: string) => void
  mode?: 'both' | 'date' | 'time'
}

const availableDates = getAvailableDates(14)

function SlotSkeleton() {
  return (
    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-11 rounded-xl" />
      ))}
    </div>
  )
}

export function TimeSlotPicker({
  selectedDate,
  selectedSlot,
  onDateChange,
  onSlotChange,
  mode = 'both',
}: TimeSlotPickerProps) {
  const [slots, setSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [slotsError, setSlotsError] = useState(false)

  useEffect(() => {
    if (!selectedDate || mode === 'date') {
      setSlots([])
      return
    }
    setLoadingSlots(true)
    setSlotsError(false)
    void api
      .getBookingSlots(selectedDate)
      .then((res) => setSlots(res.slots))
      .catch(() => {
        setSlots([])
        setSlotsError(true)
      })
      .finally(() => setLoadingSlots(false))
  }, [selectedDate, mode])

  const showDate = mode === 'both' || mode === 'date'
  const showTime = mode === 'both' || mode === 'time'

  return (
    <div className="space-y-6">
      {showDate && (
        <fieldset>
          <legend className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Calendar className="h-4 w-4 text-brand-600" aria-hidden />
            Select a date
          </legend>
          <div
            className="mt-3 grid grid-cols-2 gap-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
            role="radiogroup"
            aria-label="Consultation date"
          >
            {availableDates.map((date) => {
              const iso = toLocalDateString(date)
              const isSelected = selectedDate === iso
              return (
                <button
                  key={iso}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    console.log('Date clicked', iso, { selectedDate, willSelect: iso })
                    onDateChange(iso)
                  }}
                  className={`selection-card flex min-h-[44px] items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-medium ${
                    isSelected ? 'selection-card-selected' : 'selection-card-unselected'
                  }`}
                >
                  <span>{formatConsultationDate(date)}</span>
                  {isSelected && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                      <Check className="h-3 w-3" aria-hidden />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </fieldset>
      )}

      {showTime && selectedDate && (
        <fieldset>
          <legend className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Clock className="h-4 w-4 text-brand-600" aria-hidden />
            Select a time (IST, 30 min)
          </legend>
          {loadingSlots ? (
            <SlotSkeleton />
          ) : slotsError ? (
            <p className="alert-error mt-3" role="alert">
              Could not load slots. Please try again or pick another date.
            </p>
          ) : slots.length === 0 ? (
            <p className="mt-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
              No slots available for this date. Please choose another day.
            </p>
          ) : (
            <div
              className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              role="radiogroup"
              aria-label="Consultation time"
            >
              {slots.map((slot) => {
                const isSelected = selectedSlot === slot
                return (
                  <button
                    key={slot}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => onSlotChange(slot)}
                    className={`min-h-[44px] rounded-xl border px-2 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      isSelected
                        ? 'selection-card-selected border-2'
                        : 'selection-card-unselected border'
                    }`}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          )}
        </fieldset>
      )}

      {showTime && !selectedDate && mode === 'time' && (
        <p className="text-sm text-slate-500">Go back to select a date first.</p>
      )}
    </div>
  )
}
