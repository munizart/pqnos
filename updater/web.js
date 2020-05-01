const fs = require('fs')
const git = require('simple-git/promise')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const validShopName = /^[\w_]+$/

const { GIT_REMOTE_PASS, GIT_REMOTE_URL, GIT_REMOTE_USER } = process.env

app.use(
  cors({
    origin: 'pqnos.com.br'
  })
)

const gitS = git('..').silent()
const gitSReady = gitS
  .addRemote(`https://${GIT_REMOTE_USER}:${GIT_REMOTE_PASS}@${GIT_REMOTE_URL}`)
  .then(() => gitS.addConfig('user.name', 'pqnos updater'))
  .then(() => gitS.addConfig('user.email', 'contato@pqnos.com.br'))

app.use(bodyParser.json())

app.post('/:shop/data', (req, res) => {
  if (validShopName.test(req.params.shop)) {
    fs.writeFile(
      `../shop-data/${req.params.shop}`,
      JSON.stringify(req.body, null, 2),
      function (err) {
        if (err) {
          res.sendStatus(500)
        }

        gitSReady
          .then(() => gitS.add(`shop-data/${req.params.shop}`))
          .then(() => gitS.commit(`Updating ${req.params.shop}`))
      }
    )
  } else {
    res.sendStatus(401)
  }
})
