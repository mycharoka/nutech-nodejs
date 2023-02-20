const repo = require('./repository')

async function save(body, file) {
  console.log('body > ', body);
  console.log('file di service > ', file);
  
  const saveData = {
    nama_barang: body.nama_barang,
    harga_beli: parseInt(body.harga_beli),
    harga_jual: parseInt(body.harga_jual),
    stok: parseInt(body.stok)
  }
  const savePhoto = {
    originalname: `${file.originalname}`,
    photopath: `${process.env.BASE_URL}:${process.env.PORT}/photo/${file.filename}`
  }

  try {
    console.log('save data >> ', saveData);
    const store = await repo.storeQuery(body, savePhoto)
    console.log(store);
    if (store) return {
      message: "Data Stored!"
    }
  } catch (error) {
    return {
      message: error.message
    }
  }
}

async function update(id, body) {
  try {
    const validateData = await repo.searchByIdQuery(id)
    console.log(validateData);

    if (validateData) {
      const update = await repo.updateQuery(id, body)
      if (update) {
        return {
          message: "Data Updated!"
        }
      }
    }
    return {
      message: "Data not exist!"
    }
  } catch (error) {
    return {
      message: error.message
    }
  }
}

module.exports = {
  save,
  update
}