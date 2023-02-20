const bcrypt = require('bcryptjs')

let migration = async client => {
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS users(id serial PRIMARY KEY, username VARCHAR UNIQUE NOT NULL, password VARCHAR NOT NULL, name VARCHAR, role VARCHAR)"
    )

    const username = process.env.ADMIN_USERNAME
    const password = process.env.ADMIN_PASSWORD

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    let query = "INSERT INTO users(username, password, name, role) VALUES ($1, $2, $3, $4) RETURNING *"
    let values = [username, hashPassword, "admin", "admin"]

    let res = await client.query(query, values)

    if (res) {
      console.log({username, password});
      console.log("User Admin Successfully Created!");
    }
  } catch (error) {
    console.error("Error migration table users: ",error.message);
  }
}

module.exports = {migration}