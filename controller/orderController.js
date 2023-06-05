const CartProduct = require("../models/CartProductModel");
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
        const result = await newOrder.save()
        if (result) {
            const removeProducts = await CartProduct.deleteMany({
                $and: [
                    { user: req.body.customer },
                    { store: req.body.store },
                ]
            });
            if (removeProducts) {
                res.status(200).json({
                    status: "success",
                    message: "New Order is Success"
                });
            }

        }
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't be retrieved",
            error: error.message,
        });
    }
}


// get orders by userId
// const getOrdersByUserId = async (req, res) => {
//     try {
//         const orders = await Order.find({ customer: req.params.userId }).sort({ _id: -1 })
//         res.status(200).send(orders);
//     } catch (error) {
//         res.status(400).json({
//             status: "error",
//             message: "Data couldn't be retrieved",
//             error: error.message,
//         });
//     }
// }

const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters (default: 1)
        const limit = 10; // Number of orders per page
        const startIndex = (page - 1) * limit; // Calculate the starting index for the page

        const totalOrders = await Order.countDocuments({ customer: userId }); // Get the total number of orders for the user
        const totalPages = Math.ceil(totalOrders / limit); // Calculate the total number of pages

        const orders = await Order.find({ customer: userId })
            .sort({ _id: -1 })
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            orders,
            page,
            totalPages,
            totalOrders,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't be retrieved",
            error: error.message,
        });
    }
};



// get orders by userId
const getOrdersByStoreId = async (req, res) => {
    try {
        console.log(req.params.storeId);
        const orders = await Order.find({ store: req.params.storeId }).populate("address").sort({ _id: -1 })
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't be retrieved",
            error: error.message,
        });
    }
}

// get orders by userId
const getOrderByOrderId = async (req, res) => {
    try {
        console.log(req.params.orderId);
        const order = await Order.findOne({ _id: req.params.orderId }).populate("address")
        res.status(200).send(order);
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't be retrieved",
            error: error.message,
        });
    }
}

// get orders by userId
const updateShippingStatusByStoreAndOrderId = async (req, res) => {
    try {
        console.log(req.body);
        const result = await Order.findOneAndUpdate({
            $and: [
                { store: req.params.storeId },
                { _id: req.params.orderId }
            ]
        },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            message: "status update success",
            result: result
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
    getOrdersByUserId,
    getOrderByOrderId,
    getOrdersByStoreId,
    updateShippingStatusByStoreAndOrderId,
}