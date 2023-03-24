const TopRankingProduct = require("../models/TopRankingProduct");

const addTopRankingProduct = async (req, res) => {
    try {
        const newProduct = new TopRankingProduct(req.body);
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


const getTopRankingProducts = async (req, res) => {
    // console.log('gt produc');
    try {
        const products = await TopRankingProduct.find({}).sort({ _id: -1 });
        res.send(products);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};


const getTopRankingProductById = async (req, res) => {
    try {
        const product = await TopRankingProduct.findById(req.params.id);
        res.send(product);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};

module.exports = {
    addTopRankingProduct,
    getTopRankingProducts,
    getTopRankingProductById,
};
