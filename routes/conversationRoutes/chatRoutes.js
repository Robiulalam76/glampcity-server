const express = require('express');
const router = express.Router();
const {
    userChats, createChat, findChat
} = require("../../controller/conversationControllers/chatConroller");


router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);

module.exports = router