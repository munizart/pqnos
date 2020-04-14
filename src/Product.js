import { formatCentsToBRLString } from './formatter'

export default class Product {
  /**
   * @param { string } name
   * @param { number } price
   * @param { string } description
   * @param { string } id
   * @param { string } imageLink
   */
  constructor (name, price, description, id, imageLink) {
    this.name = name
    this.price = price
    this.description = description
    this.id = id
    this.imageLink = imageLink
  }

  get formatedPrice () {
    return formatCentsToBRLString(this.price)
  }

  /**
   * @param { SerializableProduct } serializableProduct
   */
  static fromSerializableProduct (serializableProduct) {
    return new Product(
      serializableProduct.name,
      serializableProduct.price,
      serializableProduct.description,
      serializableProduct.id,
      serializableProduct.imageLink
    )
  }
}
