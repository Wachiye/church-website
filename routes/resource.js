const express = require("express");
const resourceController = require("../controllers/resource");

const router = express.Router();

//create a new resource
router.post("/", resourceController.create);

//retrieve all testimonies
router.get("/", resourceController.findAll);

//retrieve a single resource
router.get("/:id", resourceController.findOne);

// update a resource with id
router.put("/:id", resourceController.update);

//delete a single resource
router.delete("/:id", resourceController.delete);

//delete all testimonies
router.delete("/", resourceController.deleteAll);

module.exports = router;