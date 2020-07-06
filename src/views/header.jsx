import React from 'react'

/**
 * @param { Object } arg0
 * @param { string } arg0.name
 */
export function Header ({ name }) {
  return (
    <header className='pqnos-header'>
      <div className='pqnos-header-content'>
        <h1>{name}</h1>
        <p className='right'>por PQNos</p>
      </div>
    </header>
  )
}
