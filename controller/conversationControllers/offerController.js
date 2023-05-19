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
    const { storeId, buyerId, request, show } = req.params
    console.log(storeId);
    try {
        const result = await Offer.find({ $and: [{ storeId: storeId }, { buyerId: buyerId }, { requestType: request }, { show: show }] }).sort({ _id: -1 })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteOffer = async (req, res) => {
    const { id } = req.params
    try {
        const result = await Offer.deleteOne({ _id: id })
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}


const updateOfferById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (updateData) {
            const result = await Offer.updateOne(
                { _id: id },
                { $set: updateData },
                { runValidators: true }
            );
            res.status(200).json({
                status: "success",
                message: "Update successfully",
                data: result,
            });
        }
        else {
            res.status(400).json({
                status: "error",
                message: "upadate couldn't success",
                error: "No Update Data",
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "upadate couldn't success",
            error: error.message,
        });
    }
};



// const getOffersByStore = async (req, res) => {
//     const { storeId, buyerId } = req.params
//     try {
//         const result = await Offer.find({ $and: [{ storeId: storeId }, { buyerId: buyerId }] })
//         res.status(200).send(result)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }


// const getOffersByBuyer = async (req, res) => {
//     const { storeId } = req.params
//     try {
//         const result = await Offer.find({ storeId: storeId })
//         res.status(200).send(result)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// }

module.exports = {
    createOffer,
    getOfferRequest,
    deleteOffer,
    updateOfferById,
}