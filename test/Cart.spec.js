import fc from 'fast-check'
import Cart from '../src/Cart'
import Product from '../src/Product'

const catalog = fc.oneof(
  fc.constant(new Product('chaleira', 10000, '', '', '')),
  fc.constant(new Product('pente', 4500, '', '', '')),
  fc.constant(new Product('fita isolante', 980, '', '', '')),
  fc.constant(new Product('lanterna', 3499, '', '', ''))
)

class PriceModel {
  constructor () {
    /**
     * @memberof PriceModel#
     * @type { Product[] }
     */
    this.prods = []
  }

  /**
   * @param { Product } p
   * @param { number } qtd
   */
  add (p, qtd) {
    const buffer = new Array(qtd)
    buffer.fill(p)
    this.prods = this.prods.concat(buffer)
  }

  /**
   * @param { Product } p
   * @param { number } qtd
   */
  remove (p, qtd) {
    while (this.prods.includes(p) && qtd > 0) {
      this.prods.splice(this.prods.indexOf(p), 1)
      qtd--
    }
  }

  get totalPrice () {
    return this.prods.reduceRight((acc, { price }) => acc + price, 0)
  }
}

class AddProductCommand {
  /**
   * @param { Product } product
   * @param { number } quantity
   */
  constructor (product, quantity) {
    this.product = product
    this.quantity = quantity
  }

  check () {
    return true
  }

  /**
   *
   * @param { PriceModel } model
   * @param { Cart } real
   */
  run (model, real) {
    real.add(this.product, this.quantity)
    model.add(this.product, this.quantity)
    if (model.totalPrice !== real.totalPrice) {
      console.log(model, real)
    }
    expect(real.totalPrice).toBe(model.totalPrice)
  }

  toString () {
    return `add(${this.product.price} × ${this.quantity})`
  }
}

class RemoveProductCommand {
  /**
   * @param { Product } product
   * @param { number } quantity
   */
  constructor (product, quantity) {
    this.product = product
    this.quantity = quantity
  }

  /**
   * @param { PriceModel } model
   */
  check (model) {
    return model.prods.includes(this.product)
  }

  /**
   *
   * @param { PriceModel } model
   * @param { Cart } real
   */
  run (model, real) {
    real.remove(this.product, this.quantity)
    model.remove(this.product, this.quantity)
    // expect(real.totalPrice).toBe(model.totalPrice)
  }

  toString () {
    return `remove(${this.product.price} × ${this.quantity})`
  }
}

describe('cart module', () => {
  describe('Model-based test', () => {
    it('price', () => {
      const prods = {}

      fc.assert(
        fc.property(
          fc.commands(
            [
              fc
                .tuple(fc.nat(10).filter(Boolean), catalog)
                .map(([qtd, prod]) => new AddProductCommand(prod, qtd)),
              fc
                .tuple(fc.nat(10).filter(Boolean), catalog)
                .map(([qtd, prod]) => new RemoveProductCommand(prod, qtd))
            ],
            100
          ),
          cmds => {
            fc.modelRun(
              () => ({
                model: new PriceModel(),
                real: new Cart()
              }),
              cmds
            )
          }
        )
      )
    })
  })
})
