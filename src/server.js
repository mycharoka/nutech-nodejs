require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan')

const {registeredRouter} = require('./router')

const createApp = () => {
  const app = express()

  app.use(cors())
  app.use(bodyParser.json())
  app.use(morgan('common'))

  app.use('/photo', express.static('upload/'))

  registeredRouter(app)

  return app
}

module.exports = {
  createApp
}
