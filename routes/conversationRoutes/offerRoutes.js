const express = require("express");
const { createOffer, getOfferRequest } = require("../../controller/conversationControllers/offerController");
const router = express.Router();



router.post("/", createOffer);
router.get("/myrequest/:storeId/:buyerId/:request", getOfferRequest);


module.exports = router