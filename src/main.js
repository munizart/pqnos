import { serialize } from './CartSerializer'
import { checkout } from './checkout-methods/whatsapp'
import Product from './Product'
import { Shop } from './Shop'

const anchor = document.getElementById('link')
const pre = document.getElementById('cart')
const shop = document.getElementById('shop')

console.log([
  new Product('tecladinho lindinho 2k20', 202000, '', 'VS1K', ''),
  new Product('chaleira', 10000, '', '1', ''),
  new Product('chaleira', 2000, '', 'F0FAD', '')
])

if (shop instanceof HTMLTextAreaElement) {
  const onInputed = () => {
    /** @type { SerializableShop } */
    const serializeableShop = JSON.parse(shop.value)
    const shopModel = Shop.fromSerializableShop(serializeableShop)
    shopModel.products.forEach((p, i) => shopModel.cart.add(p, 2 ** i))

    const serializedCart = serialize(
      shopModel.cart,
      shopModel.paymentMethods[0]
    )
    const phones = {
      camila: '5548999793480',
      artur: '5548988416111'
    }
    if (pre && anchor instanceof HTMLAnchorElement) {
      anchor.href = checkout(serializedCart, { phone: phones.camila })
      pre.innerHTML = serializedCart
    }
  }
  shop.addEventListener('input', onInputed)

  shop.addEventListener('change', () => {
    shop.value = JSON.stringify(JSON.parse(shop.value), null, 2)
  })

  onInputed()
}
