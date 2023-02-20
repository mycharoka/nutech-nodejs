const jwt = require('jsonwebtoken')

module.exports = function(accessRole = ['admin']) {
  return function(req, res, next) {
    const authHeader = req.header("Authorization")

    if (!authHeader) {
      return res.status(401).json({
        msg: "No Token, authorization denied!"
      })
    }

    const token = authHeader.slice(7, authHeader.length)
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      if(!accessRole.includes(decoded.user.role)) {
        return res.status(401).json({
          msg: "Unauthorized Role!"
        })
      }

      req.user = decoded.user
      next()
      
    } catch (error) {
      res.status(401).json({
        msg: "Token is not valid"
      })
    }
  }
}