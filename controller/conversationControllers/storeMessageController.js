const StoreMessage = require("../../models/ConversationModels/StoreMessageModel");

const addMessage = async (req, res) => {
    try {
        const newMessage = new StoreMessage({
            storeId: req.body.storeId,
            senderId: req.body.senderId,
            chatId: req.body.chatId,
            members: req.body.members,
            productId: req.body.productId && req.body.productId,
            text: req.body.text,
            // attachment: req.body.attachment && req.body.attachment,
            questions: req.body.questions && req.body.questions
        })
        console.log(newMessage);
        await newMessage.save();
        res.status(200).send({
            status: true,
            message: "Message Send Successfull",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
            status: 500,
        });
    }
}


const getStoreMessage = async (req, res) => {
    try {
        const { chatId } = req.params
        const result = await StoreMessage.find({ chatId: chatId })
        res.status(200).send({
            status: true,
            message: "Message get Successfull",
            data: result
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
            status: 500,
        });
    }
}



module.exports = {
    addMessage,
    getStoreMessage
}