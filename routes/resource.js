const express = require("express");
const resourceController = require("../controllers/resource");
const { verify } = require("../middleware/auth");

const router = express.Router();

//create a new resource
router.post("/", verify, resourceController.create);

//retrieve all resources
router.get("/", resourceController.findAll);

//retrieve a single resource
router.get("/:id", resourceController.findOne);

// update a resource with id
router.put("/:id", verify,  resourceController.update);

//delete a single resource
router.delete("/:id", verify,  resourceController.delete);

//delete all resources
router.delete("/", verify, resourceController.deleteAll);

module.exports = router;