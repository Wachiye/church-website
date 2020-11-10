const express = require("express");
const donationController = require("../controllers/donation");
const {verify} = require("../middleware/auth");
const router = express.Router();

//create a new donation
router.post("/", donationController.create);

//retrieve all donations
router.get("/", verify, donationController.findAll);

//retrieve today's donations
router.get("/today", verify, donationController.findAllToday);

//retrieve a single donation
router.get("/:id", verify, donationController.findOne);

// update a donation with id
router.put("/:id", verify, donationController.update);

//delete a single donation
router.delete("/:id", verify, donationController.delete);

//delete all donations
router.delete("/", verify, donationController.deleteAll);

module.exports = router;
