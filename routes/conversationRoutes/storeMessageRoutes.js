const express = require("express");
const { addMessage, getStoreMessage } = require("../../controller/conversationControllers/storeMessageController");
const router = express.Router();

// send message
router.post("/", addMessage);

// get message
router.get('/:chatId', getStoreMessage);

module.exports = router;