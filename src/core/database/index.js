const postgres = require('pg')

const config = {
  user : process.env.DATABASE_USERNAME,
  password : process.env.DATABASE_PASSWORD,
  database : process.env.DATABASE_NAME,
  host : process.env.DATABASE_HOST,
  port : process.env.DATABASE_PORT
}

const pool = new postgres.Pool(config)

pool.query('SELECT NOW()')
  .then(res => {
    console.log(`Database Connected to DB NAME: ${process.env.DATABASE_NAME} and PORT: ${process.env.DATABASE_PORT}`)
  })
  .catch(err => {
    console.error(err.message);
  })
  


const cleanUp = () => {
  pool.end(() => {
    console.log('pool has end');
  })
}

module.exports = {pool, cleanUp}