const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: "./upload",
  filename: (req, file, callback) => {
    // console.log(file)
    let formatName = file.originalname.toLowerCase().split(' ').join('-')
    return callback(null, formatName)
  }
})

const upload = multer({
  storage: storage,
  limits: {fileSize: 100000},
  fileFilter: (req, file, callback) => {
    // const whitelist = ['.jpeg', '.png', '.jpg']
    // console.log(whitelist.includes(path.extname(file.originalname)));
    if (file.mimetype == 'image/png' || file.mimetype =='image/jpg' || file.mimetype == 'image/jpeg') {
      console.log('KESINI DONG');
      // return callback(new Error("Only JPG, PNG, or JPEG Allow!"))
      callback(null, true)
    } else {
      req.fileValidation = "Files not allowed"
  
      return callback(null, false)
    }
    // console.log('GAKENA');
    // if (whitelist.includes(path.extname(file.originalname))) {
    //   callback(null, true)
    // }

  },
}).single('image')

// console.log(upload);

module.exports = {upload}