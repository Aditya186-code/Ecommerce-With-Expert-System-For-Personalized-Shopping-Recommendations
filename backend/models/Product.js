const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_id: { type: String },
    product_name: { type: String, default: "" },
    brand: { type: String, default: "" },
    categories: { type: Array, default: [] },
    discounted_price: { type: String, default: "" },
    
    ratings: { type: Number, default: 0 },
    
    about_product: { type: String, default: "" },
    img_link: { type: String, default: "0" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
