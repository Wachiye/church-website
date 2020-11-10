const express = require("express");
const userController = require("../controllers/user");
const { verify } = require("../middleware/auth");
const router = express.Router();

//create a new user
router.post("/", userController.create);

//retrieve all users
router.get("/", verify,  userController.findAll);

//retrieve users added today
router.get("/today", verify,  userController.findAllToday);

//retrieve a single user
router.get("/:id", verify,  userController.findOne);

// update an user with id
router.put("/:id", verify,  userController.update);

//delete a single user
router.delete("/:id", verify,  userController.delete);

//delete all users
router.delete("/", verify, userController.deleteAll);

module.exports = router;
