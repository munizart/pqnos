import Cart from './Cart'
import { collapse } from './formatter'
import { PaymentMethod } from './PaymentMethod'

/**
 * @param { Cart } cart
 * @param { PaymentMethod } paymentMethod
 */
export const serialize = (cart, paymentMethod) => {
  const cartEntries = Array.from(cart.addedProducts.entries())
  const biggestPID = Math.max(...cartEntries.map(([p]) => String(p.id).length))
  const productLines = cartEntries
    .map(([p, q]) =>
      '• '
        .concat(`${q}`)
        .concat('× (c. ')
        .concat(`${p.id}`.padStart(biggestPID))
        .concat(') ')
        .concat(collapse(p.name, 20))
    )
    .join('\n')

  const paymentLines = paymentMethod.formatedPayment(cart.totalPrice)
  return 'Olá, segue meu pedido:\n'
    .concat(productLines)
    .concat(`\n${paymentLines}`)
}
