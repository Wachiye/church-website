const express = require("express");
const sermonController = require("../controllers/sermon");

const router = express.Router();

//create a new sermon
router.post("/", sermonController.create);

//retrieve all testimonies
router.get("/", sermonController.findAll);

//retrieve a single sermon
router.get("/:id", sermonController.findOne);

// update a sermon with id
router.put("/:id", sermonController.update);

//delete a single sermon
router.delete("/:id", sermonController.delete);

//delete all testimonies
router.delete("/", sermonController.deleteAll);

module.exports = router;