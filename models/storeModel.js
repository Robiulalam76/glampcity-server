const mongoose = require("mongoose");

const storeSchema = mongoose.Schema(
  {
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },

    owner: {
      type: String,
      required: true,
    },

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
