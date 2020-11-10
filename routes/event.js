const express = require("express");
const eventController = require("../controllers/event");

const router = express.Router();

//create a new event
router.post("/", eventController.create);

//retrieve all events
router.get("/", eventController.findAll);

//retrieve todays events
router.get("/today", eventController.findAllToday);

//retrieve upcoming events
router.get("/upcoming", eventController.findAllUpcoming);

//retrieve finished events
router.get("/finished", eventController.findAllFinished);

//retrieve a single event
router.get("/:id", eventController.findOne);

// update an event with id
router.put("/:id", eventController.update);

//delete a single event
router.delete("/:id", eventController.delete);

//delete all events
router.delete("/", eventController.deleteAll);

module.exports = router;
