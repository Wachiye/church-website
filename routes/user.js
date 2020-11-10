const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

//create a new user
router.post("/", userController.create);

//retrieve all users
router.get("/", userController.findAll);

//retrieve users added today
router.get("/today", userController.findAllToday);

//retrieve a single user
router.get("/:id", userController.findOne);

// update an user with id
router.put("/:id", userController.update);

//delete a single user
router.delete("/:id", userController.delete);

//delete all users
router.delete("/", userController.deleteAll);

module.exports = router;
