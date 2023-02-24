const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const uploadAWSSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const UploadAWSModel =
  mongoose.models.UploadAWS || mongoose.model("UploadAWS", uploadAWSSchema);

module.exports = UploadAWSModel;
