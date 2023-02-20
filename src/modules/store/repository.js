const { pool } = require("../../core/database")


async function storeQuery(body, file) {
  const query = 'INSERT INTO tbl_store(nama_barang, harga_beli, harga_jual, stok, url_photo, tgl_input) VALUES($1, $2, $3, $4, $5, CURRENT_TIMESTAMP::TIMESTAMP(0)) RETURNING *'
  const values = [body.nama_barang, body.harga_beli, body.harga_jual, body.stok, file.photopath]
  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (error) {
    throw error
  }
}

async function searchByIdQuery(params) {
  const query = 'SELECT * FROM tbl_store WHERE id = $1'
  const values = [params]
  try {
    const result = await pool.query(query, values)
    // console.log('res > ', result.rows[0]);
    return result.rows[0]
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function deleteQuery(params) {
  const query = 'DELETE FROM tbl_store WHERE id = $1'
  const values = [params]
  try {
    const result = await pool.query(query, values)
    console.log('res >> ', result);
    if (result.rows.length > 1) {
      return {
        message: "Deleted!"
      }
    }
    return {
      message: "Data not exist"
    }
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function updateQuery(id, body) {
  const query = 'UPDATE tbl_store SET nama_barang = $1, harga_barang = $2, harga_jual = $3, stok = $4, tgl_update = CURRENT_TIMESTAMP::TIMESTAMP(0) WHERE id = $5 RETURNING *'
  const values = [body.nama_barang, body.harga_barang, body.harga_jual, body.stok, id]
  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (error) {
    throw error
  }
}

module.exports = {
  storeQuery,
  searchByIdQuery,
  deleteQuery,
  updateQuery
}