// const asyncHandler = require("express-async-handler");
// const products = require("../data/products");
const Product = require("../models/Product");
const Address = require("../models/Address");

// @desc Create new order
// @route POST /api/orders
// @access Private
const addAddress = async (req, res) => {
  const { title, user, address } = req.body;

  const newAddress = new Address({
    // owner: owner ? owner : req.user._id,
    user: "6341029b8e67f93114d8550a",
    title,

    address,
  });

  const createdStore = await newAddress.save();
  res.status(201).json(createdStore);
};

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getAddress = async (req, res) => {
  const address = await Address.find({});

  if (!address) {
    res.status(200);
    throw new Error("Order list is empty..");
  }
  res.json(address);
};

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getAddressById = async (req, res) => {
  const address = await Address.findById(req.params.id);
  console.log("Params: ", req.params.id);

  if (address) {
    res.status(200).json({ address });
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
};

module.exports = {
  getAddressById,
  addAddress,
  getAddress,
};
