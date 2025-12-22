import { bulkPricingMap } from '@/data/bulkPricing'

export function getBulkTiers(product) {
  const tiers = Array.isArray(product?.bulkPricing) && product.bulkPricing.length > 0
    ? product.bulkPricing
    : (bulkPricingMap[product?.slug] || [])
  return tiers
}

export function getDisplayUsdPrice(product) {
  const tiers = getBulkTiers(product)
  if (!Array.isArray(tiers) || tiers.length === 0) return null
  const one = tiers.find(t => (t.qty || t.quantity) === 1)
  const target = one || tiers.slice().sort((a,b) => (a.qty||a.quantity) - (b.qty||b.quantity))[0]
  return target?.priceUSD ?? target?.usd ?? null
}
