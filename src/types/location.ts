export interface AppearanceLocation {
  id: string
  venue_name: string
  address: string
  event_date: string // ISO date, e.g. "2026-09-05"
  start_time: string // "17:00"
  end_time: string // "21:00"
  notes: string | null
  created_at: string
}

export type NewAppearanceLocation = Omit<AppearanceLocation, 'id' | 'created_at'>
