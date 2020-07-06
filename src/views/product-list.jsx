import React from 'react'
import Product from '../Product'
import { ProductC } from './product'
function Divisor () {
  return <hr className='divisor' />
}

/**
 * @param { Object } arg0
 * @param { Product[] } arg0.products
 */
export function ProductList ({ products }) {
  return (
    <section>
      <div className='section-products'>
        {products.map((product, index) => (
          <div key={`product-${product.id}`}>
            {Boolean(index) && <Divisor />}
            <ProductC prod={product} />
          </div>
        ))}
      </div>
    </section>
  )
}
