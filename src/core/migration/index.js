const {client} = require('./db')
const auth = require('../auth/migration')
const store = require('../../modules/store/migration')

let migration = async () => {
  try {
    await client.connect()
    await auth.migration(client)
    await store.migration(client)
    await client.end()
  } catch (error) {
    console.error('migration error:',error.message)
    await client.end()
  }
}

migration()