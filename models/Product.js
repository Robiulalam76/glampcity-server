const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    children: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      required: false,
    },
    store: {
      type: String,
      required: false,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    tag: [String],

    flashSale: {
      type: Boolean,
      required: false,
      default: false,
    },

    status: {
      type: String,
      default: "Show",
      enum: ["Show", "Hide"],
    },
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;