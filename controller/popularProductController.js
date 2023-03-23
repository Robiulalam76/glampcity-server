const asyncHandler = require("express-async-handler");
const PopularProduct = require("../models/PopularProduct");
const stripe = require("stripe")(
    "sk_test_51L2pj4JsstQNEHZrVKGXwGV2lLAGBGUMmkDla3oHx1oWqgLPW7CmUEtShbiBpAzRquDoMHlHRQmPrLjCetKrpzk000hIULFMI7"
);

const addPopularProduct = async (req, res) => {
    try {
        const newProduct = new PopularProduct(req.body);
        // console.log(req.body);
        await newProduct.save();
        res.status(200).send({
            message: "Product Added Successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};


const getPopularProducts = async (req, res) => {
    console.log('gt produc');
    try {
        const products = await PopularProduct.find({}).sort({ _id: -1 });
        res.send(products);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};


const getPopularProductById = async (req, res) => {
    try {
        const product = await PopularProduct.findById(req.params.id);
        res.send(product);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

module.exports = {
    addPopularProduct,
    getPopularProducts,
    getPopularProductById,
};
