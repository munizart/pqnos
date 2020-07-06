/**
 *
 * @param { string } serializedCart
 * @param { object } whatsappData
 * @param { string } whatsappData.phone
 */
export function checkout (serializedCart, whatsappData) {
  return `https://api.whatsapp.com/send?phone=${encodeURIComponent(
    whatsappData.phone
  )}&text=${encodeURIComponent(serializedCart)}`
}
