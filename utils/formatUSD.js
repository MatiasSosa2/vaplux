export default function formatUSD(value) {
  const num = Number(value)
  if (Number.isNaN(num)) return 'USD -'
  const hasDecimals = !Number.isInteger(num)
  return 'USD ' + num.toLocaleString('es-AR', {
    minimumFractionDigits: hasDecimals ? 1 : 0,
    maximumFractionDigits: 2
  })
}
