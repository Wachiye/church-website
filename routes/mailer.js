const express = require("express");
const mailerController = require("../controllers/mailer");
const { verify } = require("../middleware/auth");
const router = express.Router();

router.post("/api/mail", mailerController.sendEmail);

module.exports = router;