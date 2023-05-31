const express = require("express");
const { createOffer, getOfferRequest, deleteOffer, updateOfferById, getOfferRequestWtihStore } = require("../../controller/conversationControllers/offerController");
const router = express.Router();



router.post("/", createOffer);
router.get("/myrequest/:storeId/:buyerId/:request/:show", getOfferRequest);
router.get("/:storeId/:buyerId/store", getOfferRequestWtihStore);
router.delete("/:id", deleteOffer);
router.patch("/:id", updateOfferById);


module.exports = router