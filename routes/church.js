const express = require("express");
const churchController = require("../controllers/church");
const upload = require("../utils/multer");
const router = express.Router();

//create a new church
router.post("/", upload.single("file"), churchController.create);

//retrieve all churches
router.get("/", churchController.findAll);

//retrieve a single church
router.get("/:id", churchController.findOne);

// update an church with id
router.put("/:id", upload.single("file"), churchController.update);

//delete a single church
router.delete("/:id", churchController.delete);

//delete all churches
router.delete("/", churchController.deleteAll);

module.exports = router;
