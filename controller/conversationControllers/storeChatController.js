const StoreChat = require("../../models/ConversationModels/StoreChatModel");

const createStoreChat = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body
        const isAdded = await StoreChat.findOne({
            members: { $all: [senderId, receiverId] }
        })

        if (isAdded) {
            return res.status(200).send(isAdded)
        }
        else {
            const newStoreChat = new StoreChat({
                members: [senderId, receiverId]
            })
            const result = await newStoreChat.save()
            res.status(200).send(result)
        }
    } catch (error) {
        res.status(500).send(error)
    }
};


const userStoreChats = async (req, res) => {
    try {
        const result = await StoreChat.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};

const findStoreChat = async (req, res) => {
    // console.log(req.params);
    try {
        const result = await StoreChat.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] }
        })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


module.exports = {
    createStoreChat,
    userStoreChats,
    findStoreChat
}