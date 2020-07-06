import { EventEmitter } from 'events'
import Product from './Product'
import { formatCentsToBRLString } from './formatter'

export default class Cart extends EventEmitter {
  constructor () {
    super()
    /** @type { Map<Product, number> } */
    this.addedProducts = new Map()
  }

  /**
   * @param { Product } product
   * @param { number } quantity
   * @returns { void }
   */
  add (product, quantity) {
    const quantityInCart = this.addedProducts.get(product) || 0
    this.setQuantity(product, quantity + quantityInCart)
  }

  /**
   * @param { Product } product
   * @param { number } quantity
   */
  remove (product, quantity) {
    const quantityInCart = this.addedProducts.get(product)
    if (quantityInCart !== undefined) {
      const newQuantity = quantityInCart - quantity
      this.setQuantity(product, newQuantity)
    }
  }

  /**
   *
   * @param { Product } product
   * @param { number } quantity
   */
  setQuantity (product, quantity) {
    if (quantity < 1) {
      this.addedProducts.delete(product)
    } else {
      this.addedProducts.set(product, quantity)
    }
    this.emit('updated', this)
  }

  get totalPrice () {
    return Array.from(this.addedProducts.entries()).reduce(
      (sum, [p, q]) => sum + p.price * q,
      0
    )
  }

  get formatedTotal () {
    return formatCentsToBRLString(this.totalPrice)
  }

  get totalItems () {
    return Array.from(this.addedProducts.values()).reduce((a, b) => a + b, 0)
  }
}
