const express = require("express");
const churchController = require("../controllers/church");

const router = express.Router();

//create a new church
router.post("/", churchController.create);

//retrieve all churches
router.get("/", churchController.findAll);

//retrieve a single church
router.get("/:id", churchController.findOne);

// update an church with id
router.put("/:id", churchController.update);

//delete a single church
router.delete("/:id", churchController.delete);

//delete all churches
router.delete("/", churchController.deleteAll);

module.exports = router;
