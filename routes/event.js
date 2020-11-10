const express = require("express");
const eventController = require("../controllers/event");
const {verify} = require("../middleware/auth");
const router = express.Router();

//create a new event
router.post("/", verify, eventController.create);

//retrieve all events
router.get("/", eventController.findAll);

//retrieve todays events
router.get("/today", eventController.findAllToday);

//retrieve upcoming events
router.get("/upcoming", eventController.findAllUpcoming);

//retrieve finished events
router.get("/finished", verify, eventController.findAllFinished);

//retrieve a single event
router.get("/:id", eventController.findOne);

// update an event with id
router.put("/:id", verify, eventController.update);

//delete a single event
router.delete("/:id", verify, eventController.delete);

//delete all events
router.delete("/", verify, eventController.deleteAll);

module.exports = router;
