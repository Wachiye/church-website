const express = require("express");
const ministryController = require("../controllers/ministry");

const router = express.Router();

//create a new ministry
router.post("/", ministryController.create);

//retrieve all ministries
router.get("/", ministryController.findAll);

//retrieve a single ministry
router.get("/:id", ministryController.findOne);

// update a ministry with id
router.put("/:id", ministryController.update);

//delete a single ministry
router.delete("/:id", ministryController.delete);

//delete all ministries
router.delete("/", ministryController.deleteAll);

module.exports = router;
