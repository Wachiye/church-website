const express = require("express");
const authController = require("../controllers/auth");
const {verify} = require("../middleware/auth");
const router = express.Router();

//validate user login
router.post("/login",  authController.login);

router.post("/logout", verify, authController.logout);

module.exports = router;