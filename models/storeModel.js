const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // }

    // user: {
    //   type: String,
    //   required: true,
    // }

    verified: {
      type: String,
      enum: ['true', 'false'],
      default: false
    },
    username: {
      type: String,
      required: true
    },
    userID: { type: String, required: false },

    name: { type: String, required: false },
    // image: { type: String, required: false },
    description: { type: String, required: false },
    address: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
