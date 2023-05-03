// const asyncHandler = require("express-async-handler");
// const products = require("../data/products");
const Admin = require("../models/Admin");
const Product = require("../models/Product");
const Store = require("../models/storeModel");
const User = require("../models/User");

// @desc Create new order
// @route POST /api/orders
// @access Private
const addStore = async (req, res) => {
  const { user, name, image, description, address } = req.body;
  // console.log(req.body);
  const store = new Store({
    // owner: owner ? owner : req.user._id,
    // owner: "6341029b8e67f93114d8550a",
    name,
    image,
    username: name?.replaceAll(' ', '').toLowerCase(),
    description,
    address,
  });
  const createdStore = await store.save();
  res.status(201).json(createdStore);

  res.status(201).send({
    message: 'only seller and Admit can be added'
  })
};

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getStore = async (req, res) => {
  const store = await Store.find({});

  if (!store) {
    res.status(200);
    throw new Error("Order list is empty..");
  }
  res.json(store);
};

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getStoreById = async (req, res) => {
  const store = await Store.find({ userID: req.params.id });
  // console.log("Params: ", req.params.id);
  // const products = await Product.find({ store: `${req.params.id}` });
  // console.log("products: ", products);
  console.log(store);

  if (store) {
    res.send(store);
  } else {
    res.status(404);
  }
};


const getStoreByUsername = async (req, res) => {
  // console.log(req.params);
  const store = await Store.findOne({ username: req.params.username });

  try {
    if (store) {
      res.send(store);
    } else {
      res.status(404).json({ message: 'no data' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addStoreBySeller = async (req, res) => {
  const { name, description, address } = req.body;
  const user = await User.findOne({ _id: req.params.id })
  // console.log(user);
  if (user?.role === 'seller') {
    const store = new Store({
      // user,
      userId: req.params.body,
      name,
      // image,
      description,
      address,
    });
    const createdStore = await store.save();
    res.status(201).json(createdStore);
  }
  else {
    res.status(201).send({
      message: 'only seller and Admit can be added'
    })
  }
};

const deleteSingleStore = async (req, res) => {
  await Store.deleteOne({ _id: req.params.id });
  res.send({
    message: "Store Delete Succefully",
  });
};

const getVerifiedStores = async (req, res) => {
  const store = await Store.find({ verified: true });

  if (!store) {
    res.status(200);
    throw new Error("Order list is empty..");
  }
  res.json(store);
};


const getAllStoresByRole = async (req, res) => {
  try {
    const { _id } = req.user
    const isAdmin = await Admin.findById({ _id: _id })
    const isSeller = await User.findById({ _id: _id })

    if (isAdmin && isAdmin?.role === "admin") {
      const stores = await Store.find({});
      res.send(stores);
    }
    else if (isSeller && isSeller?.role === "seller") {
      const stores = await Store.find({ userId: _id })
      res.send(stores);
    }
    else {
      res.status(500).send({
        message: "User Not Valid",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}



module.exports = {
  addStore,
  getStoreByUsername,
  getStore,
  getStoreById,
  addStoreBySeller,
  deleteSingleStore,
  getVerifiedStores,

  getAllStoresByRole,
};
