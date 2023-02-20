let migration = async client => {
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS tbl_store(id serial PRIMARY KEY, nama_barang VARCHAR UNIQUE NOT NULL, harga_beli INT, harga_jual INT, stok INT, url_photo TEXT, tgl_input TIMESTAMP WITHOUT TIME ZONE, tgl_update TIMESTAMP WITHOUT TIME ZONE)"
      )
    console.log('Table tbl_store migrated!');
  } catch (error) {
    console.error('Error migration table tbl_store: ', error.message);
  }
}

module.exports = {
  migration
}