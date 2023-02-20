const repo = require('./repository')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function login(body) {
  try {
    const validateUser = await repo.authQuery(body)
    if (!validateUser) {
      return {
        message: "Wrong username or password!"
      }
    }

    const validUser = await bcrypt.compare(body.password, validateUser.password)
    if (!validUser) {
      return {
        message: "Wrong username or password!"
      }
    }

    const payload = {
      user: {
        id: validateUser.id,
        role: validateUser.role
      }
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"})

    return {
      data: {
        token: `Bearer ${token}`
      },
      message: 'Token created!'
    }
  } catch (error) {
    return {
      message: error.message
    }
  }
}

module.exports = {
  login
}