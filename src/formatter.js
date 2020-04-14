/**
 * @param { number } cents
 */
export function formatCentsToBRLString (cents) {
  return (Number(cents) / 10).toLocaleString('pt-BR', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL'
  })
}

/**
 * @param { string } str
 * @param { number } maxLength
 */
export function collapse (str, maxLength) {
  console.log(str, maxLength)
  const copiedStr = str.slice(0, maxLength - 1)
  return `${copiedStr}${copiedStr.length < str.length ? '…' : ''}`
}
