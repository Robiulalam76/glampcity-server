require("dotenv").config();
const express = require("express");
const cors = require("cors");
const expressFileUploader = require("express-fileupload");
const helmet = require("helmet");

const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const userRoutes = require("../routes/userRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const userOrderRoutes = require("../routes/userOrderRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const storeRoutes = require("../routes/storeRoutes");
const addressRoutes = require("../routes/addressRoutes");
const couponRoutes = require("../routes/couponRoutes");
const uploadAWSRoutes = require("../routes/uploadAWSRoutes");
const { isAuth, isAdmin } = require("../config/auth");

connectDB();
const app = express();

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');
app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }), expressFileUploader());
app.use(helmet());
app.use(cors());

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});

//this for route will need for store front, also for admin dashboard
app.use("/api/products/", productRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/coupon/", couponRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/order/", isAuth, userOrderRoutes);

//if you not use admin dashboard then these two route will not needed.
app.use("/api/admin/", adminRoutes);
app.use("/api/orders/", isAuth, orderRoutes);
app.use("/api/store/", storeRoutes);
app.use("/api/address/", addressRoutes);

app.use("/api/uploadaws/", uploadAWSRoutes);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 5055;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
