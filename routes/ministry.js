const express = require("express");
const ministryController = require("../controllers/ministry");
const { verify } = require("../middleware/auth");
const router = express.Router();
const upload = require("../utils/multer");
//create a new ministry
router.post("/", upload.single("file"), ministryController.create);

//retrieve all ministries
router.get("/", ministryController.findAll);

//retrieve a single ministry
router.get("/:id", ministryController.findOne);

// update a ministry with id
router.put("/:id", upload.single("file"),  ministryController.update);

//delete a single ministry
router.delete("/:id", verify, ministryController.delete);

//delete all ministries
router.delete("/", verify, ministryController.deleteAll);

module.exports = router;
