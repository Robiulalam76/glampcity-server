const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  subCategory: [
    {
      name: { type: String },
      status: { type: String, enum: ["Show", "Hide"], default: "Show", },
    }
  ],

  slug: {
    type: String,
    required: false,
  },

  // image: {
  //   type: String,
  //   required: true,
  // },

  approved: {
    type: String,
    enum: ['false', 'true'],
    default: false
  },

  status: {
    type: String,
    enum: ["Show", "Hide"],
    default: "Hide",
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
