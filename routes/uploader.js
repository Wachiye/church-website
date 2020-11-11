const express = require("express");

const uploaderController = require("../controllers/uploader");
var multer  = require('multer');
var parser = multer({ dest: 'church-test/' });


const router = express.Router();

router.post("/upload",parser.single("file"), uploaderController.upload);

module.exports = router;