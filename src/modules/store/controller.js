const router = require('express').Router()
const { upload } = require('../../middlewares/savePhoto')
const Service = require('./service')
const repo = require('./repository')
const { pool } = require('../../core/database')
const authUser = require('../../core/auth/auth')

router.post('/items', authUser(),(req, res) => {
  // console.log('req file > ', req.file);
  upload(req, res, async (err) => {
    if (err) {
      res.json({
        message: "File above 100kb!"
      })
    }
    else if (req.fileValidation) {
      res.json({
        message: "Only .jpg, .png, and .jpeg allowed!"
      })  
    }
    let result = await Service.save(req.body, req.file)
    res.json(result)
  })
})

router.get('/items', authUser(), async(req, res) => {
  let {page} = req.query
  let data = []
  let offset = 0

  if(req.query.limit && req.query.page) {
    offset = (req.query.page - 1) * req.query.limit
  }

  let values = [req.query.limit, offset]
  try {
    if(req.query.search) {
      const query = `SELECT * FROM tbl_store WHERE LOWER (nama_barang) LIKE LOWER('%${req.query.search}%') ORDER BY tgl_input DESC LIMIT $1 OFFSET $2` 

      let result = await pool.query(query, values)
      data.push({
        data: result.rows,
        page,
        total: result.rows.length
      })

      return res.json(data)
    }

    const query = `SELECT * FROM tbl_store ORDER BY tgl_input DESC LIMIT $1 OFFSET $2`
    let result = await pool.query(query, values)
    data.push({
      data: result.rows,
      page,
      total: result.rows.length
    })
    return res.json(data)
  } catch (error) {
    return res.json({
      message: error.message
    })
  }
})

router.get('/items', authUser(), async(req, res) => {
  const query = "SELECT * FROM tbl_store ORDER BY tgl_input DESC"
  try {
    const result = await pool.query(query)
    return res.json({
      data: result.rows
    })
  } catch (error) {
    return res.json({
      message: error.message
    })
  }
})

router.get('/items/:id', authUser(), async(req, res) => {
  let result = await repo.searchByIdQuery(req.params.id)
  res.json(result)
})

router.put('/items/:id', authUser(), async(req, res) => {
  let result = await Service.update(req.params.id, req.body)
  res.json(result)
})

router.delete('/items/:id', authUser(), async(req, res) => {
  let result = await repo.deleteQuery(req.params.id)
  res.json(result)
})


module.exports = router