export default function formatCurrency(value) {
  const n = Math.round(Number(value || 0))
  const s = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `$${s}`
}
