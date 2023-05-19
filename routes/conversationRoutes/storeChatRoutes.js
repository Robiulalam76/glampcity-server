const express = require('express');
const { findStoreChat, userStoreChats, createStoreChat } = require('../../controller/conversationControllers/storeChatController');
const router = express.Router();

router.post('/', createStoreChat);
router.get('/:userId', userStoreChats);
router.get('/find/:firstId/:secondId', findStoreChat);

module.exports = router