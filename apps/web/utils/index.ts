export function formatCurrency(
  num: number,
  options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  },
) {
  return new Intl.NumberFormat("en-US", options).format(num)
}

export function generateUUID() {
  return crypto.randomUUID()
}
