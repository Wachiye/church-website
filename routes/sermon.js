const express = require("express");
const sermonController = require("../controllers/sermon");
const { verify } = require("../middleware/auth");
const router = express.Router();

//create a new sermon
router.post("/", verify,  sermonController.create);

//retrieve all sermons
router.get("/", sermonController.findAll);

//retrieve a single sermon
router.get("/:id", sermonController.findOne);

// update a sermon with id
router.put("/:id", verify,  sermonController.update);

//delete a single sermon
router.delete("/:id", verify, sermonController.delete);

//delete all sermons
router.delete("/", verify, sermonController.deleteAll);

module.exports = router;