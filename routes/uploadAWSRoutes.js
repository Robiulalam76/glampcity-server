const express = require("express");
const router = express.Router();
const { uploadAwsAdmin } = require("../controller/uploadAwsController");

//register a staff
router.post("/upload", uploadAwsAdmin);

module.exports = router;
