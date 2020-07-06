import { formatCentsToBRLString } from './formatter'
/**
 * @typedef { 'em' | 'por' } Preposition
 */

export class PaymentMethod {
  /**
   * @param { boolean } onShipping
   * @param { string } name
   */
  constructor (onShipping, name) {
    this.onShipping = onShipping
    this.name = name
  }

  /**
   * @param { number } _
   */
  formatedPayment (_) {
    return `Pagamento${this.onShipping ? ' na entrega' : ''}: ${this.name}.`
  }

  /**
   * @param { SerializablePaymentMethod } serializable
   */
  static fromSerializablePayment (serializable) {
    if ('tag' in serializable) {
      return new CashPaymentMethod()
    }
    return new PaymentMethod(serializable.onShipping, serializable.name)
  }
}

export class CashPaymentMethod extends PaymentMethod {
  constructor () {
    super(true, 'dinheiro')
  }

  /**
   * @param { number } changeCents
   */
  setChange (changeCents) {
    this.changeCents = changeCents
  }

  /**
   * @param { number } _
   */
  formatedPayment (_) {
    if (this.changeCents !== undefined) {
      return super
        .formatedPayment(_)
        .concat('Troco para ')
        .concat(formatCentsToBRLString(this.changeCents))
    } else {
      return super.formatedPayment(_)
    }
  }
}
