import { Booking } from '../models/Booking.js'

const WORK_START = 9
const WORK_END = 18
const SLOT_MINUTES = 30

export function generateTimeSlots(): string[] {
  const slots: string[] = []
  for (let hour = WORK_START; hour < WORK_END; hour++) {
    slots.push(`${String(hour).padStart(2, '0')}:00`)
    slots.push(`${String(hour).padStart(2, '0')}:30`)
  }
  return slots
}

export async function getAvailableSlots(date: string): Promise<string[]> {
  const all = generateTimeSlots()
  const booked = await Booking.find({
    date,
    status: { $in: ['pending', 'approved'] },
  }).select('timeSlot')
  const taken = new Set(booked.map((b) => b.timeSlot))
  return all.filter((s) => !taken.has(s))
}
