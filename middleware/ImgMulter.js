const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'ImageUpload/ProductImgUpload');  
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "_" + Math.round(Math.random() * 1E9) + path.extname(file.originalname); 
    cb(null, name);
  }
});

const upload = multer({ storage });

module.exports = upload;