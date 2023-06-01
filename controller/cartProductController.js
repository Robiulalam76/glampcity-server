const CartProduct = require("../models/CartProductModel");
const Offer = require("../models/ConversationModels/OfferModel");



const addToCart = async (req, res) => {
    try {
        const newCartItem = new CartProduct({
            product: req.body.product,
            user: req.body.user,
            price: req.body.price,
            quantity: req.body.quantity,
        });
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


// add to cart by offer
const addToCartWithOffer = async (req, res) => {
    try {
        const newCartItem = new CartProduct({
            product: req.body.product,
            user: req.body.user,
            store: req.body.store,
            price: req.body.price,
            quantity: req.body.quantity,
        });
        const result = await newCartItem.save();
        if (result) {
            const updateStatus = await Offer.findByIdAndUpdate(
                { _id: req.body.offerId },
                { $set: { status: "true" } },
                { new: true }
            );
            res.status(200).send({
                status: "success",
                message: "Product Added Successfully!",
            });
        }

    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};


const getCartProducts = async (req, res) => {
    try {
        const products = await CartProduct.find({ user: req.params.userId }).populate("user", "name image").populate("product");
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
    addToCartWithOffer,
    getCartProducts,
    deleteCartProduct,
};
