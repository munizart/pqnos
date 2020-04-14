import { formatCentsToBRLString } from './formatter'
/**
 * @typedef { 'em' | 'por' } Preposition
 */

export class PaymentMethod {
  /**
   * @param { boolean } onShipping
   * @param { string } name
   * @param { Preposition } preposition
   */
  constructor (onShipping, name, preposition = 'em') {
    this.onShipping = onShipping
    this.name = name
    this.preposition = preposition
  }

  /**
   * @param { number } _
   */
  formatedPayment (_) {
    return `Pagarei${this.onShipping ? ' na entrega ' : ' '}${
      this.preposition
    } ${this.name}.`
  }

  /**
   * @param { SerializablePaymentMethod } serializable
   */
  static fromSerializablePayment (serializable) {
    if (!('tag' in serializable)) {
      return new PaymentMethod(
        serializable.onShipping,
        serializable.name,
        serializable.preposition
      )
    }
    if (serializable.tag === 'CashPaymentMethod') {
      return new CashPaymentMethod()
    }

    return new InstallmentPaymentMethod(
      serializable.onShipping,
      serializable.name,
      serializable.preposition,
      serializable.network,
      serializable.parcels,
      serializable.tax
    )
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
        .concat('Preciso de troco para')
        .concat(formatCentsToBRLString(this.changeCents))
    } else {
      return super.formatedPayment(_)
    }
  }
}

export class InstallmentPaymentMethod extends PaymentMethod {
  /**
   * @param { boolean } onShipping
   * @param { string } name
   * @param { Preposition } preposition
   * @param { string } network
   * @param { number } parcels
   * @param { number } tax
   */
  constructor (
    onShipping = true,
    name,
    preposition = 'por',
    network,
    parcels,
    tax = 1
  ) {
    super(onShipping, name, preposition)
    this.network = network
    this.parcels = parcels
    this.tax = tax
  }

  /**
   * @param { number } totalPrice
   */
  formatedPayment (totalPrice) {
    const taxedTotal = Math.ceil(totalPrice * this.tax)
    return (
      super.formatedPayment(totalPrice).slice(0, -1) +
      ` ${this.network} ${
        this.parcels > 1
          ? `${this.tax !== 1 ? 'com' : 'sem'} juros em ${
              this.parcels
            } vezes de ${formatCentsToBRLString(taxedTotal / this.parcels)}`
          : ''
      }.
Total parcelado: ${formatCentsToBRLString(taxedTotal)}.`
    )
  }
}
