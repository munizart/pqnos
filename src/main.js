import React from 'react'
import { render } from 'react-dom'
import { App } from './views/App'
import { Shop } from './Shop'

const params = new URLSearchParams(window.location.search)
fetch(`https://vault.pqnos.com.br/${params.get('k')}.json`)
  .then(res => res.json())
  .then(shop => {
    window.shop = Shop.fromSerializableShop(shop)
    console.log(window.shop)
    const app = window.document.getElementById('app')
    if (app) {
      render(<App />, app)
    }
  })
