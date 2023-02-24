require("dotenv").config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_SECREAT_KEY,
  region: process.env.AWS_S3_REGION,
});

const upload = () =>
  multer({
    storage: multerS3,
    s3: s3,
    bucket: "sami-dihan",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldName });
    },
    key: function (req, file, cb) {
      cb(null, "image.jpeg");
    },
  });
const uploadAwsAdmin = async (req, res) => {
  console.log("req file", req.body);
  const uploadSignle = upload().single("image-upload");

  uploadSignle(req, res, (err) => {
    if (err)
      return res.status(400).json({ success: false, message: err.message });

    console.log(req.files);
    res.status(200).json({ details: req.files });
  });
};

module.exports = {
  uploadAwsAdmin,
};
