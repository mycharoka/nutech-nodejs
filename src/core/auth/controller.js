const router = require('express').Router()
const Service = require('./service')

router.post('/login', async(req, res) => {
  let result = await Service.login(req.body)
  res.json(result)
})

module.exports = router