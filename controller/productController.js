const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const stripe = require("stripe")(
  "sk_test_51L2pj4JsstQNEHZrVKGXwGV2lLAGBGUMmkDla3oHx1oWqgLPW7CmUEtShbiBpAzRquDoMHlHRQmPrLjCetKrpzk000hIULFMI7"
);

const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
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

const addAllProducts = async (req, res) => {
  console.log(req.body);
  try {
    await Product.deleteMany();
    await Product.insertMany(req.body);
    res.status(200).send({
      message: "Product Added successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

// const Stripehandler = async (req, res) => {
//   const { product } = req.body;
//   console.log("Prdtfro notun stripe: ", product);

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: product?.name,
//             },
//             unit_amount: product?.price,
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: "https://name-flame.vercel.app/Thanks",
//       // success_url: 'https://name-flame.vercel.app/',
//       cancel_url: "https://name-flame.vercel.app/Cencle",
//     });

//     console.log(session);
//     console.log(session.url);
//     res.json({ url: session.url });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// };

const Stripehandler = async (req, res) => {
  const { product } = req.body;
  console.log("Prdt", product);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product?.name,
            },
            unit_amount: product?.price,
          },
          quantity: 1,
        },
      ],
      success_url: "https://name-flame.vercel.app/Thanks",
      // success_url: 'https://name-flame.vercel.app/',
      cancel_url: "https://name-flame.vercel.app/Cencle",
    });

    console.log(session);
    console.log(session.url);
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// demo stripe file
const StripehandlerNew = async (req, res) => {
  const domainUrl = "http://localhost:5055/";
  const { line_items, customer_email } = req.body;
  // check req body has line items and email
  if (!line_items || !customer_email) {
    return res
      .status(400)
      .json({ error: "missing required session parameters" });
  }

  let session;

  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      shipping_address_collection: { allowed_countries: ["GB", "US"] },
    });
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "an error occured, unable to create session" });
  }
};

const getShowingProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getDiscountedProducts = async (req, res) => {
  try {
    const products = await Product.find({ discount: { $gt: 5 } }).sort({
      _id: -1,
    });

    console.log("prod", products);
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getStockOutProducts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $lt: 1 } }).sort({
      _id: -1,
    });

    res.send(products);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.find({ parent: req.params.slug });
    res.send([product]);
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    });
  }
};


const getProductsByParent = async (req, res) => {
  console.log("Params for slug: ", req.params?.slug);
  try {
    const products = await Product.find({ slug: req.params?.slug });

    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({
      message: `Slug problem, ${err.message}`,
    });
  }
};

// const getProductByParent = async (req, res) => {
//   console.log("Params for parent: ", req.params.parent);
//   try {
//     const product = await Product.findOne({ parent: "Custome" });

//     res.status(200).send({ "all prpducts": "data" });
//   } catch (err) {
//     res.status(500).send({
//       message: `Slug problem, ${err.message}`,
//     });
//   }
// };

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.sku = req.body.sku;
      product.title = req.body.title;
      product.slug = req.body.slug;
      product.description = req.body.description;
      product.parent = req.body.parent;
      product.children = req.body.children;
      product.type = req.body.type;
      product.unit = req.body.unit;
      product.quantity = req.body.quantity;
      product.originalPrice = req.body.originalPrice;
      product.price = req.body.price;
      product.discount = req.body.discount;
      product.image = req.body.image;
      product.tag = req.body.tag;
      await product.save();
      res.send({ data: product, message: "Product updated successfully!" });
    }
    // handleProductStock(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review Added",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const updateStatus = (req, res) => {
  const newStatus = req.body.status;
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: newStatus,
      },
    },
    (err) => {
      if (err) {
        res.status(500).send({
          message: err.message,
        });
      } else {
        res.status(200).send({
          message: `Product ${newStatus} Successfully!`,
        });
      }
    }
  );
};

const deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: "Product Deleted Successfully!",
        status: 200,
      });
    }
  });
};


const getLatestProducts = async (req, res) => {
  try {
    const result = await Product.find().skip(0).limit(10).sort({ _id: -1 })
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

// @desc Fetch a single product
// @route GET /api/products/search/:search
// @access Public.
const getSearchProducts = async (req, res) => {
  const searchKey = req.params.searchtitle.toLowerCase();
  console.log(searchKey);
  const product = await Product.find({});

  // var text = "Airpods Wireless Bluetooth Headphones";
  // var resu = text.includes("Airpods");
  // console.log(resu);
  // const allSearchedProducts = product.filter((i) => console.log(typeof i.name));
  const allSearchedProducts = product.filter((i) => {
    const mainname = i.title.toLowerCase();
    return mainname.includes(searchKey) && i;
  });
  console.log(allSearchedProducts);

  if (product) {
    res.status(200).json({ total: product.length, allSearchedProducts });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

module.exports = {
  addProduct,
  addAllProducts,
  getAllProducts,
  getShowingProducts,
  getDiscountedProducts,
  getStockOutProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  updateStatus,
  deleteProduct,
  getProductsByParent,
  getSearchProducts,
  Stripehandler,
  createProductReview,
  getLatestProducts,
  // Stripehandlerold,
};
