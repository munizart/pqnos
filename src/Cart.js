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
    this.addedProducts.set(product, quantity + quantityInCart)
    this.emit('updated', this)
  }

  /**
   * @param { Product } product
   * @param { number } quantity
   */
  remove (product, quantity) {
    const quantityInCart = this.addedProducts.get(product)
    if (quantityInCart !== undefined) {
      const newQuantity = quantityInCart - quantity
      if (newQuantity < 1) {
        this.addedProducts.delete(product)
      } else {
        this.addedProducts.set(product, newQuantity)
      }
      this.emit('updated', this)
    }
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
}
