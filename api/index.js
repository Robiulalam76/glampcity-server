require("dotenv").config();
const express = require("express");
const cors = require("cors");
const expressFileUploader = require("express-fileupload");
const helmet = require("helmet");
const passport = require("passport");
const passportStrategy = require("../config/passport");
const authRoute = require("../routes/addressRoutes");

const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const wishlistRoutes = require("../routes/wishlistRoutes");
const cartProductRoutes = require("../routes/cartProductRoutes");


const userRoutes = require("../routes/userRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const userOrderRoutes = require("../routes/userOrderRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const popularProductRoutes = require("../routes/popularProductRoutes");
const topRaningProductRoutes = require("../routes/topRankingProductRoutes");
const storeRoutes = require("../routes/storeRoutes");

const addressRoutes = require("../routes/addressRoutes");
const couponRoutes = require("../routes/couponRoutes");
const uploadAWSRoutes = require("../routes/uploadAWSRoutes");
const { isAuth, isAdmin } = require("../config/auth");
const blogRoutes = require("../routes/blogRoutes");
const ticketRoutes = require("../routes/ticketRoutes");
const historyRoutes = require("../routes/historyRoutes");
const cookieSession = require("cookie-session");

// Conversation Routes
const chatRoutes = require("../routes/conversationRoutes/chatRoutes");
const messageRoutes = require("../routes/conversationRoutes/messageRoutes");


const withDrawRoutes = require("../routes/withDrawRoutes");

connectDB();
const app = express();

// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');
app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }), expressFileUploader());
app.use(helmet());
app.use(cors());

app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});


// Conversations Routes
app.use("/api/chat/", chatRoutes);
app.use("/api/message/", messageRoutes);

//this for route will need for store front, also for admin dashboard
app.use("/api/products/", productRoutes);
app.use("/api/wishlist/", wishlistRoutes);
app.use("/api/cartProduct/", cartProductRoutes);

app.use("/api/popular-product", popularProductRoutes);
app.use("/api/top-ranking-product", topRaningProductRoutes);

app.use("/api/category/", categoryRoutes);
app.use("/api/coupon/", couponRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/order/", isAuth, userOrderRoutes);

//if you not use admin dashboard then these two route will not needed.
app.use("/api/admin/", adminRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/store/", storeRoutes);
app.use("/api/address/", addressRoutes);

app.use("/api/uploadaws/", uploadAWSRoutes);

app.use("/api/blogs/", blogRoutes);

app.use("/api/ticket/", ticketRoutes);

app.use("/api/history/", historyRoutes);

// app.use("/api/wallet/",);

app.use("/api/withdraw/", withDrawRoutes);

app.use("/auth/google", authRoute);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 5055;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
