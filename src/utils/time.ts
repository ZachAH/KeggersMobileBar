/**
 * Utilities for formatting dates and times for Keggers Mobile Bar events.
 * All public stops operate in US Central Time (America/Chicago).
 */

export function getCentralTodayDateString(): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return formatter.format(new Date())
}

/**
 * Safely formats an ISO date string (e.g. "2026-10-18")
 * into a human-readable date in Central Time without UTC day-shift bugs.
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const cleanDate = dateStr.split('T')[0]
  const parts = cleanDate.split('-')
  if (parts.length !== 3) return dateStr

  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const day = parseInt(parts[2], 10)

  if (isNaN(year) || isNaN(month) || isNaN(day)) return dateStr

  // By using new Date(year, month, day), we create a local date at 00:00:00,
  // preventing the UTC midnight shift.
  const date = new Date(year, month, day)

  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/**
 * Formats a 24-hour time string ("17:00") or 12-hour string into "5:00 PM".
 * Strips unwanted seconds and ensures 12-hour format with AM/PM.
 */
export function formatTime(timeStr: string): string {
  if (!timeStr) return ''
  const trimmed = timeStr.trim()

  // If it already contains AM/PM, normalize spacing and return
  const ampmMatch = trimmed.match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*([ap]m)(?:\s*(?:cst|cdt|ct))?$/i)
  if (ampmMatch) {
    const [, h, m, ampm] = ampmMatch
    return `${parseInt(h, 10)}:${m} ${ampm.toUpperCase()}`
  }

  // Handle 24-hour time "HH:mm" or "HH:mm:ss"
  const [hourStr, minStr] = trimmed.split(':')
  if (!hourStr || !minStr) return trimmed

  let hour = parseInt(hourStr, 10)
  if (isNaN(hour)) return trimmed

  const ampm = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12
  if (hour === 0) hour = 12

  const cleanMin = minStr.slice(0, 2)
  return `${hour}:${cleanMin} ${ampm}`
}

/**
 * Formats a start and end time range with the CST timezone suffix.
 * e.g. "5:00 PM–9:00 PM CST"
 */
export function formatTimeRange(startTime: string, endTime: string): string {
  const start = formatTime(startTime)
  const end = formatTime(endTime)

  if (start && end) {
    return `${start}–${end} CST`
  }
  if (start) {
    return `${start} CST`
  }
  if (end) {
    return `${end} CST`
  }
  return ''
}

/**
 * Splits locations into upcoming and past based on today's Central Time date.
 * - Upcoming: ordered from closest upcoming date to furthest (ascending).
 * - Past / Completed: ordered from most recent completed to oldest (descending).
 * - allSorted: combined list from current dates to oldest completed.
 */
export function splitLocationsByDate<T extends { event_date: string; start_time?: string }>(
  locations: T[] | null | undefined,
): {
  upcoming: T[]
  past: T[]
  allSorted: T[]
} {
  if (!locations || !Array.isArray(locations)) {
    return { upcoming: [], past: [], allSorted: [] }
  }

  const todayStr = getCentralTodayDateString()

  const upcoming = locations
    .filter((loc) => (loc.event_date ? loc.event_date.split('T')[0] : '') >= todayStr)
    .sort(
      (a, b) =>
        (a.event_date || '').localeCompare(b.event_date || '') ||
        (a.start_time || '').localeCompare(b.start_time || ''),
    )

  const past = locations
    .filter((loc) => (loc.event_date ? loc.event_date.split('T')[0] : '') < todayStr)
    .sort(
      (b, a) =>
        (b.event_date || '').localeCompare(a.event_date || '') ||
        (b.start_time || '').localeCompare(a.start_time || ''),
    )

  return { upcoming, past, allSorted: [...upcoming, ...past] }
}
