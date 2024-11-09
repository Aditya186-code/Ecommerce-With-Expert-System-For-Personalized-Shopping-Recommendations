const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/product.js");
const userRoute = require("./routes/user.js");
const paymentRoute = require("./routes/payment.js");
const cartRoute=require("./routes/cart.js");
const cors = require("cors");
const bp = require("body-parser");
const path = require("path");
const app = express();
const transactionRoute= require('./routes/transaction.js');
const recRoute=require('./routes/recs.js')

dotenv.config();

mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => {
    console.log("Connection To DB successful");
    // loading_into_db();
  })
  .catch((error) => {
    console.log("Error Connecting To DB");
    console.log(error);
  });
  
app.use("../uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/payment", paymentRoute);
app.use('/api/cart',cartRoute);
app.use('/api/transaction', transactionRoute);
app.use('/api/recs', recRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening to port 8000");
});
