import React from 'react'
import Cart from '../Cart'
import Product from '../Product'

/**
 * @param { Object } arg0
 * @param { Product } arg0.prod
 */
export function ProductC ({ prod }) {
  const { cart } = window.shop
  const quantity = cart.addedProducts.get(prod) || 0
  console.log(quantity)

  return (
    <div className='product'>
      <img src={prod.imageLink} alt={prod.name} className='product-image' />
      <h2 className='product-title'>{prod.name}</h2>
      <div className='product-details'>
        <p className='product-description'>{prod.description}</p>
        <span className='product-price'>{prod.formatedPrice}</span>
        <div className='quantity-selector'>
          <span
            className='product-btn-quantitity'
            data-action='minus'
            onClick={() => {
              cart.remove(prod, 1)
            }}
          >
            -
          </span>
          <input
            className='product-input-quantitity'
            type='number'
            id='pid-quantity'
            value={quantity}
            min={0}
            max={99}
            onChange={ev => {
              cart.setQuantity(prod, ev.target.valueAsNumber)
            }}
          />
          <span
            className='product-btn-quantitity'
            data-action='plus'
            onClick={() => {
              console.log('add', prod)
              cart.add(prod, 1)
            }}
          >
            +
          </span>
        </div>
      </div>
      <div className='product-padder'></div>
    </div>
  )
}
