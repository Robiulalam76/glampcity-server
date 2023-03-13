const asyncHandler = require("express-async-handler");
const NewArrivalProduct = require("../models/NewArrivalProduct");
const stripe = require("stripe")(
    "sk_test_51L2pj4JsstQNEHZrVKGXwGV2lLAGBGUMmkDla3oHx1oWqgLPW7CmUEtShbiBpAzRquDoMHlHRQmPrLjCetKrpzk000hIULFMI7"
);


const getAllNewArrivalProducts = async (req, res) => {
    try {
        const products = await NewArrivalProduct.find({}).sort({ _id: -1 });
        res.send(products);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};


const getNewArrivalProductById = async (req, res) => {
    try {
        const product = await NewArrivalProduct.findById(req.params.id);
        res.send(product);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

module.exports = {
    getAllNewArrivalProducts,
    getNewArrivalProductById,
};
