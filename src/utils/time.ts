export function formatTime(time24: string): string {
  if (!time24) return '';
  const [hourStr, minStr] = time24.split(':');
  if (!hourStr || !minStr) return time24;
  
  // If it already contains AM/PM, just return it
  if (time24.toLowerCase().includes('am') || time24.toLowerCase().includes('pm')) {
    return time24;
  }
  
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  
  return `${hour}:${minStr} ${ampm}`;
}
