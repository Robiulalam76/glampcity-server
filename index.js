require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5055;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const cartProductRoutes = require("./routes/cartProductRoutes");
const addressRoutes = require("./routes/addressRoutes");
const voucherRoutes = require("./routes/voucherRoutes");
const couponRoutes = require("./routes/couponRoutes");


const categoryRoutes = require("./routes/categoryRoutes");
const popularProductRoutes = require("./routes/popularProductRoutes");
const topRaningProductRoutes = require("./routes/topRankingProductRoutes");
const storeRoutes = require("./routes/storeRoutes");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Conversation Routes
const chatRoutes = require("./routes/conversationRoutes/chatRoutes");
const messageRoutes = require("./routes/conversationRoutes/messageRoutes");
const storeChatRoutes = require("./routes/conversationRoutes/storeChatRoutes");
const storeMessageRoutes = require("./routes/conversationRoutes/storeMessageRoutes");
const offerRoutes = require("./routes/conversationRoutes/offerRoutes");

connectDB();
app.use(cors());
app.use(express.json())

//root route
app.get("/", (req, res) => {
    res.send("App works properly!");
});


// Conversations Routes
app.use("/api/chat/", chatRoutes);
app.use("/api/message/", messageRoutes);
app.use("/api/storechat/", storeChatRoutes);
app.use("/api/storemessage/", storeMessageRoutes);
app.use("/api/offer/", offerRoutes);

//this for route will need for store front, also for admin dashboard
app.use("/api/products/", productRoutes);
app.use("/api/wishlist/", wishlistRoutes);
app.use("/api/cartProduct/", cartProductRoutes);
app.use("/api/address/", addressRoutes);
app.use("/api/voucher/", voucherRoutes);
app.use("/api/coupon/", couponRoutes);

app.use("/api/popular-product", popularProductRoutes);
app.use("/api/top-ranking-product", topRaningProductRoutes);

app.use("/api/category/", categoryRoutes);
app.use("/api/store/", storeRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/admin/", adminRoutes);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(400).json({ message: err.message });
});



// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
