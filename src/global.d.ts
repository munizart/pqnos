import Cart from './Cart'
import { Shop } from './Shop'
declare global {
  interface HomeProp {
    goToCart: () => void
  }

  interface Window {
    shop: Shop
  }

  type SerializablePaymentMethod =
    | {
        tag: 'CashPaymentMethod'
      }
    | {
        onShipping: boolean
        name: string
      }

  interface SerializableProduct {
    name: string
    price: number
    description: string
    id: string
    imageLink: string
  }

  interface SerializableShop {
    products: SerializableProduct[]
    paymentMethods: SerializablePaymentMethod[]
    name: string
    description: string
    whatsappNumber: {
      ddd: string
      phone: string
    }
  }

  interface AppState {
    page: string
    cart: Cart
  }

  type AppAction =
    | {
        type: 'UpdatePage'
        payload: string
      }
    | {
        type: 'UpdateCart'
        payload: Cart
      }
}
