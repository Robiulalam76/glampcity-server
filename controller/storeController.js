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
  try {
    console.log(req.body);
    const store = new Store({
      name: req.body.name,
      logo: req.body.logo,
      images: req.body.images,
      username: req.body.username?.replaceAll(' ', '').toLowerCase(),
      userId: req.body.userId,
      street: req.body.street,
      city: req.body.city,
      country: req.body.country,
      postalCode: req.body.postalCode,
      email: req.body.email,
      description: req.body.description
    });
    const createdStore = await store.save();
    res.status(201).json({
      message: "Store Add Successfull",
      result: createdStore
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};


// update store info
const updateStoreByStoreId = async (req, res) => {
  try {
    const { storeId } = req.params;
    console.log(storeId);
    const result = await Store.updateOne(
      { _id: storeId },
      { $set: req.body },
      { runValidators: true }
    );
    res.status(200).json({
      status: "success",
      message: "Update successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "upadate couldn't success",
      error: error.message,
    });
  }
};

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getStore = async (req, res) => {
  const store = await Store.find({ status: "Show" });

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
  const store = await Store.findOne({ _id: req.params.id });
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
  const store = await Store.find({ verified: true, status: "Show" });

  if (!store) {
    res.status(200);
    throw new Error("Order list is empty..");
  }
  res.json(store);
};


const updateStatus = async (req, res) => {
  const newStatus = req.body.status;
  console.log(newStatus);

  try {

    const findCategory = await Store.findById({ _id: req.params.id })
    if (findCategory) {
      const result = await Store.updateOne(
        { _id: req.params.id },
        {
          $set: {
            status: newStatus,
          },
        },
      )
      res.status(200).send({
        message: `Category ${newStatus} Successfully!`,
      });
    }
    else {
      res.status(500).send({
        message: "Category Not Found",
      });
    }

  }
  catch (error) {
    res.status(500).send({
      message: err.message,
    });
  }
};


const getAllStoresByRole = async (req, res) => {
  try {
    const { _id } = req.user
    console.log(_id, "id");
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


// handle function call to updated property
async function addProperty() {
  try {
    const result = await Store.updateMany({}, { status: "Show" });
    console.log(`${result.nModified} products updated`);
  } catch (error) {
    console.error(error);
  } finally {
    // close the database connection
    await mongoose.connection.close();
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
  updateStoreByStoreId,

  updateStatus,
  getAllStoresByRole,
  addProperty
};
