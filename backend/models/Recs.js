const mongoose=require("mongoose")
const recSchema=new mongoose.Schema({
    user_id:{type:Number,required:true},
    recs:[{
        product_id: { type: String },
    product_name: { type: String, default: "" },
    brand: { type: String, default: "" },
    categories: { type: Array, default: [] },
    discounted_price: { type: String, default: "" },
    
    ratings: { type: Number, default: 0 },
    
    about_product: { type: String, default: "" },
    img_link: { type: String, default: "0" },
    }]
},{collection:'recs'})

module.exports=mongoose.model("Recs",recSchema)