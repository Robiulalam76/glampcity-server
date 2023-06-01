const Order = require("../models/OrderModel");

const createOrder = async (req, res) => {
    try {
        const newOrder = await Order({
            orderNumber: req.body.orderNumber,
            totalPrice: req.body.totalPrice,
            totalPayment: req.body.totalPayment,
            toalDiscount: req.body.toalDiscount,
            deliveryCharge: req.body.deliveryCharge,
            store: req.body.store,
            paymentMethod: req.body.paymentMethod,
            address: req.body.address,
            customer: req.body.customer,
            products: req.body.products
        })
        await newOrder.save()
        res.status(200).json({
            status: "success",
            message: "New Order is Success"
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't be retrieved",
            error: error.message,
        });
    }
}


module.exports = {
    createOrder,
}