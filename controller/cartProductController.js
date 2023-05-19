const CartProduct = require("../models/CartProductModel");



const addToCart = async (req, res) => {
    console.log(req.body);
    try {
        const newCartItem = new CartProduct({
            productId: req.body.productId,
            userId: req.body.userId,
            title: req.body.title,
            price: req.body.price,
        });
        // console.log(req.body);
        await newCartItem.save();
        res.status(200).send({
            status: "success",
            message: "Product Added Successfully!",
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};


const getCartProducts = async (req, res) => {
    console.log(req.params.userId);
    try {
        const products = await CartProduct.find({ userId: req.params.userId });
        res.send(products);
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};


const deleteCartProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const result = await CartProduct.deleteOne({ _id: id })
            res.status(200).json({
                delete: true,
                status: "success",
                message: "Product Remove Successfully!",
                data: result,
            });
        }
        else {
            return res.status(400).json({
                delete: false,
                status: "error",
                message: "Product Remove not Successfully!",
                error: "User unauthorized"
            });
        }
    }
    catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't insert z",
            error: error.message,
        });
    }
};


module.exports = {
    addToCart,
    getCartProducts,
    deleteCartProduct,
};
