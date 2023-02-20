require('dotenv').config()

const http = require('http')

const {createApp} = require('./server')

const app = createApp()
const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log('SERVER START !!!')
  console.log(`Server listening at...${process.env.BASE_URL}:${process.env.PORT}/`);
})
