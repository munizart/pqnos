import Cart from './Cart'
import Product from './Product'
import { PaymentMethod, CashPaymentMethod } from './PaymentMethod'

export class Shop {
  /**
   * @param { string } name
   * @param { Product[] } products
   * @param { PaymentMethod[] } paymentMethods
   * @param { string } description
   * @param { string[] } [metatags]
   */
  constructor (name, products, paymentMethods, description, metatags) {
    this.name = name
    this.cart = new Cart()
    this.products = products
    this.paymentMethods = paymentMethods
    this.description = description
    this.metatags = metatags
  }

  /**
   * @param { number } changeCents
   */
  setChange (changeCents) {
    this.paymentMethods.forEach(p => {
      if (p instanceof CashPaymentMethod) {
        p.setChange(changeCents)
      }
    })
  }

  /**
   * @param { SerializableShop } serializableShop
   */
  static fromSerializableShop (serializableShop) {
    const products = serializableShop.products.map(
      Product.fromSerializableProduct
    )
    const paymentMethods = serializableShop.paymentMethods.map(
      PaymentMethod.fromSerializablePayment
    )
    return new Shop(
      serializableShop.name,
      products,
      paymentMethods,
      serializableShop.description,
      serializableShop.metatags
    )
  }
}
