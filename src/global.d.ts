declare namespace JSX {
  export type Element = string
}

declare type SerializablePaymentMethod =
  | {
      tag: 'CashPaymentMethod'
    }
  | {
      tag: 'InstallmentPaymentMethod'
      onShipping: boolean
      name: string
      preposition: 'em' | 'por'
      network: string
      parcels: number
      tax: number
    }
  | {
      onShipping: boolean
      name: string
      preposition: 'em' | 'por'
    }

declare interface SerializableProduct {
  name: string
  price: number
  description: string
  id: string
  imageLink: string
}

declare interface SerializableShop {
  products: SerializableProduct[]
  paymentMethods: SerializablePaymentMethod[]
  name: string
  description: string
  metatags?: string[]
}
