const Message = require("../../models/ConversationModels/MessageModel");

const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body
    console.log(req.body)
    try {
        const newMessage = new Message({
            chatId,
            senderId,
            text
        })
        const result = await newMessage.save()
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


const getMessage = async (req, res) => {
    const { chatId } = req.params

    try {
        const result = await Message.find({ chatId })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createMessage,
    getMessage,
}