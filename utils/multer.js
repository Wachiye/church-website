const multer = require("multer");
const path = require("path"); 
// Multer config
module.exports = multer({
  dest:"church-test",
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".pdf" && ext !== ".doc" && ext !== ".txt") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});