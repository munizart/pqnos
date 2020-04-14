import Cart from './Cart'
import { formatCentsToBRLString, collapse } from './formatter'
import { PaymentMethod } from './PaymentMethod'

/**
 * @param { Cart } cart
 * @param { PaymentMethod } paymentMethod
 */
export const serialize = (cart, paymentMethod) => {
  const productLines = Array.from(cart.addedProducts.entries())
    .map(([p, q]) =>
      '\t• '
        .concat(`${q}`)
        .concat(' × (')
        .concat(p.formatedPrice)
        .concat(') ')
        .concat(collapse(p.name, 20))
        .concat(' (Cod. ')
        .concat(`${p.id}`)
        .concat(') :')
        .concat(formatCentsToBRLString(p.price * q))
    )
    .join('\n')

  const paymentLines = paymentMethod.formatedPayment(cart.totalPrice)
  return 'Olá, segue meu pedido:\n'
    .concat(productLines)
    .concat(`\nTotal da compra: ${cart.formatedTotal}`)
    .concat(`\n${paymentLines}`)
}
