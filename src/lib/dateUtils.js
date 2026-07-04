export function formatDisplayDate(date = new Date()) {
  return date.toLocaleDateString('en-CA')
}

export function formatDisplayDateZh(date = new Date()) {
  return date.toLocaleDateString('zh-CN')
}

export function formatDateTime(isoString) {
  const date = new Date(isoString)
  return date.toLocaleString('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  })
}

export function getTodayRange() {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  return { start: start.toISOString(), end: end.toISOString() }
}

export function toDatetimeLocalValue(date = new Date()) {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
