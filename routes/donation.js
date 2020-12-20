const express = require("express");
const donationController = require("../controllers/donation");
const paymentController = require("../controllers/payment");
const {verify} = require("../middleware/auth");
const {access} = require("../middleware/mpesa");
const router = express.Router();

//initiate a new mpesa donation
router.post("/pay", access, paymentController.processPayment);

//confirm mpesa donation
router.post("/confirm", paymentController.confirmPayment);

//save a donation to db
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
