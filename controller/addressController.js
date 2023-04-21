const Address = require("../models/Address");
const User = require("../models/User");

const createAddress = async (req, res) => {
    console.log(req.body);
    try {
        const newAddress = new Address(req.body)
        const result = await newAddress.save()
        console.log(result);
        if (result) {
            res.status(200).json({
                status: "success",
                message: "New Address Created",
                data: req.body,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't insert z",
            error: error.message,
        });
    }
}

// get address by userId
const getAddressById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Address.find({ userId: id })
        res.status(200).json({
            status: "success",
            message: "get all Address Successfull",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't find",
            error: error.message,
        });
    }
}


// update address data
const updateAddress = async (req, res) => {
    console.log(req.body);
    try {
        const id = req.params.id;
        const updateData = req.body;
        const user = await User.findById({ _id: id })
        if (user) {
            console.log(req.body, id);
            const result = await Address.updateOne(
                { _id: id },
                { $set: updateData },
                { runValidators: true }
            );
            res.status(200).json({
                update: true,
                status: "success",
                message: "Address Updated",
                data: result,
            });
        }
        else {
            return res.status(400).json({
                update: false,
                status: "error",
                message: "Data couldn't Updated",
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
}



// delete address data
const deleteAddress = async (req, res) => {
    try {
        const id = req.params.id;
        if (id) {
            const result = await Address.deleteOne({ _id: id })
            res.status(200).json({
                delete: true,
                status: "success",
                message: "Address Deleted",
                data: result,
            });
        }
        else {
            return res.status(400).json({
                delete: false,
                status: "error",
                message: "Data couldn't deleted",
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
}


module.exports = {
    createAddress,
    getAddressById,
    updateAddress,
    deleteAddress
}