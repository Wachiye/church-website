const express = require("express");
const messageController = require("../controllers/message");
const { verify } = require("../middleware/auth");
const router = express.Router();

//create a new message
router.post("/", messageController.create);

//retrieve all messages
router.get("/", verify, messageController.findAll);

//retrieve a single message
router.get("/:id", verify, messageController.findOne);

// update a message with id
router.put("/:id", verify, messageController.update);

//delete a single message
router.delete("/:id", verify, messageController.delete);

//delete all messages
router.delete("/", verify, messageController.deleteAll);

module.exports = router;
