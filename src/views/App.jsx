import React, { useCallback, useEffect, useState } from 'react'
import { Header } from './header'
import { ProductList } from './product-list'
import { CartIndicator } from './cart-indicator'

function getStoreName () {
  const params = new URLSearchParams(window.location.search)
  return params.get('k')
}

export function App () {
  // CONST
  const { cart } = window.shop

  // HOOKS
  const [page, setPage] = useState('home')
  const [renderN, forceRender] = useState(0)
  const goToCartCallback = useCallback(() => {
    setPage('cart')
  }, [setPage])

  useEffect(() => {
    const eventName = 'updated'
    cart.addListener(eventName, updateRenderCallback)
    return () => {
      cart.removeListener(eventName, updateRenderCallback)
    }
  }, [cart])

  const updateRenderCallback = () => {
    console.log({ renderN })
    forceRender(x => x + Math.random())
  }
  console.log({ renderN, page })

  // RENDER
  switch (page) {
    case 'home':
      return <Home goToCart={goToCartCallback} />
    default:
      return <>Page not found</>
  }
}

/**
 * @param { HomeProp } param0
 */
function Home ({ goToCart }) {
  const { products, name, cart } = window.shop
  return (
    <>
      <Header name={name} />
      <div className='content'>
        <ProductList products={products} />
      </div>
      <CartIndicator items={cart.totalItems} onClick={goToCart} />
    </>
  )
}
