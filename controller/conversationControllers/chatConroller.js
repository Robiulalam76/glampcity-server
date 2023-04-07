const Chat = require("../../models/ConversationModels/ChatModel");


const createChat = async (req, res) => {
    const { senderId, receiverId } = req.body
    const newChat = new Chat({
        members: [senderId, receiverId]
    })
    try {
        const result = await newChat.save()
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


const userChats = async (req, res) => {
    try {
        const result = await Chat.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};

const findChat = async (req, res) => {
    // console.log(req.params);
    try {
        const result = await Chat.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


module.exports = {
    createChat,
    userChats,
    findChat
}