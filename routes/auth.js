const express = require("express");
const authController = require("../controllers/auth");
const {verify} = require("../middleware/auth");
const router = express.Router();

//validate user login
router.post("/login",  authController.login);
//logout
router.post("/logout", verify, authController.logout);

//change password
router.post("/pwd/edit", verify, authController.changePassword);

module.exports = router;