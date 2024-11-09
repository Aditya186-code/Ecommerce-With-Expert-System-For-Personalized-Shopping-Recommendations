const mongoose=require('mongoose')

const transactionSchema=new mongoose.Schema({
    
    user_id:{type:Number,required:true,unique:false},
    product_id:{type:String,required:true,unique:false},
    rating:{type:Number,required:true,unique:false},
    timestamp:{type:String,required:true,unique:false},
},{collection:"transaction"})

module.exports=mongoose.model("Transaction",transactionSchema)