const registeredRouter = app => {
  app.get("/api/check", async (req, res) => {
    return res.json({msg : "KALO INI KE HIT ARTINYA SI API BISA"})
  })
  app.use("/api/auth", require('./core/auth/controller'))
  app.use("/api/store", require('./modules/store/controller'))
}

module.exports = {
  registeredRouter
}