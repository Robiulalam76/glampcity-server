const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: false,
      default: bcrypt.hashSync("12345678"),
    },
    role: {
      type: String,
      required: false,
      enum: ["buyer", "admin", "seller"],
      default: "buyer",
    },
    joiningData: {
      type: Date,
      required: false,
    },
    wallet: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

module.exports = Admin;
