export const SERVICE_LABELS = {
  Massage: '按摩',
  Cupping: '拔罐',
  Acupuncture: '针灸',
}

export const PAYMENT_LABELS = {
  Cash: '现金',
  Check: '支票',
  Card: '刷卡',
}

export const SERVICE_OPTIONS = Object.entries(SERVICE_LABELS).map(([value, label]) => ({
  value,
  label,
}))

export const PAYMENT_OPTIONS = Object.entries(PAYMENT_LABELS).map(([value, label]) => ({
  value,
  label,
}))

export function formatService(value) {
  return SERVICE_LABELS[value] ?? value
}

export function formatPayment(value) {
  return PAYMENT_LABELS[value] ?? value
}

export function formatMoney(amount) {
  return `¥${Number(amount).toFixed(2)}`
}
