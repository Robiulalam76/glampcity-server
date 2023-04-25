const CartProduct = require("../models/CartProductModel");
const Wishlist = require("../models/WishlistModel");

const addToCart = async (req, res) => {
    console.log(req.body);
    try {
        const newCartItem = new CartProduct({
            productId: req.body.productId,
            userId: req.body.userId,
            sku: req.body.sku,
            title: req.body.title,
            unit: req.body.unit,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
        });
        // console.log(req.body);
        await newCartItem.save();
        res.status(200).send({
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
