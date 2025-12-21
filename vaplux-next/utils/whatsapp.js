export function buildCheckoutText(items, total) {
  const lines = items.map(p => `- ${p.name} x${p.qty} = $${(p.price * p.qty).toLocaleString('es-AR')}`)
  lines.push(`\nTotal: $${total.toLocaleString('es-AR')}`)
  return `Hola! Quiero confirmar esta compra:\n${lines.join('\n')}`
}

export function openWhatsApp(items, total) {
  const text = encodeURIComponent(buildCheckoutText(items, total))
  const url = `https://wa.me/5491112345678?text=${text}`
  window.open(url, '_blank')
}
