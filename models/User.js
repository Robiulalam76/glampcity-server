const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer', 'both'],
      default: 'seller'
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: String,
      enum: ['true', 'false'],
      default: false
    },
    describeYourBusiness: {
      type: []
    },
    reverentSubCategories: {
      electronics: { type: String },
      tents: { type: String },
      autoAndTransportation: { type: String },
    },
    supplier: {
      type: []
    },
    wallet: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
