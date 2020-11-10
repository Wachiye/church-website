const express = require("express");
const messageController = require("../controllers/message");

const router = express.Router();

//create a new message
router.post("/", messageController.create);

//retrieve all testimonies
router.get("/", messageController.findAll);

//retrieve a single message
router.get("/:id", messageController.findOne);

// update a message with id
router.put("/:id", messageController.update);

//delete a single message
router.delete("/:id", messageController.delete);

//delete all testimonies
router.delete("/", messageController.deleteAll);

module.exports = router;
