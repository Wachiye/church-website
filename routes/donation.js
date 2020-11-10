const express = require("express");
const donationController = require("../controllers/donation");

const router = express.Router();

//create a new donation
router.post("/", donationController.create);

//retrieve all donations
router.get("/", donationController.findAll);

//retrieve today's donations
router.get("/today", donationController.findAllToday);

//retrieve a single donation
router.get("/:id", donationController.findOne);

// update a donation with id
router.put("/:id", donationController.update);

//delete a single donation
router.delete("/:id", donationController.delete);

//delete all donations
router.delete("/", donationController.deleteAll);

module.exports = router;
