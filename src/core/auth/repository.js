const { pool } = require("../database")

async function authQuery(body) {
  const query = 'SELECT * FROM users WHERE username = $1'
  const values = [body.username]
  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (error) {
    throw error
  }
}

module.exports = {
  authQuery
}