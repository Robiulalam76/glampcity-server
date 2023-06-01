const express = require('express');
const router = express.Router();
const { createAddress, updateAddress, deleteAddress, getAddressById } = require('../controller/addressController');

// create new address
router.post("/", createAddress);

// get address by user id
router.get("/my-address/:userId", getAddressById);

// update address by id
router.patch("/:id", updateAddress);

// delete address by id
router.delete("/:id", deleteAddress);

module.exports = router;