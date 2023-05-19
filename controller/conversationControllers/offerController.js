const Offer = require("../../models/ConversationModels/OfferModel")

const createOffer = async (req, res) => {
    console.log(req.body);
    try {
        const newMessage = new Offer(req.body)
        const result = await newMessage.save()
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}



const getOfferRequest = async (req, res) => {
    const { storeId, buyerId, request } = req.params
    console.log(storeId);
    try {
        const result = await Offer.find({ $and: [{ storeId: storeId }, { buyerId: buyerId }, { requestType: request }] })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getOffersByStore = async (req, res) => {
    const { storeId, buyerId } = req.params
    try {
        const result = await Offer.find({ $and: [{ storeId: storeId }, { buyerId: buyerId }] })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}


const getOffersByBuyer = async (req, res) => {
    const { storeId } = req.params
    try {
        const result = await Offer.find({ storeId: storeId })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createOffer,
    getOfferRequest,
    getOffersByStore,
}