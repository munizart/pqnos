import React from 'react'

function itemText (i = 0) {
  if (i > 1) {
    return `Seu carrinho contem ${i} itens.`
  } else if (i === 1) {
    return 'Seu carrinho contem um item.'
  } else {
    return 'Seu carrinho está vazio.'
  }
}

/**
 * @param { Object } param0
 * @param { number } [param0.items=0]
 * @param { React.MouseEventHandler<HTMLSpanElement> } param0.onClick
 */
export function CartIndicator ({ items = 0, onClick }) {
  return (
    <>
      <div className='cart-indicator'>
        <div className='container'>
          {itemText(items)}
          {Boolean(items) && (
            <span className='btn-send' onClick={onClick}>
              ver
            </span>
          )}
        </div>
      </div>
      <div className='cart-indicator-padder'></div>
    </>
  )
}
