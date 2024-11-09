const Transaction=require('../models/Transaction.js')
const Product=require('../models/Product.js')
const router=require("express").Router()

router.get(`/history/:id`,async(req,res)=>{
var productids=[]
var products=[]
var ratings=[]
userId=Number(req.params.id)

const history=await Transaction.find({user_id:userId})
history.forEach((item,index)=>{
    productids.push(item.product_id)
})

var products=[]
for(const item of productids ){
    const product=await Product.findOne({product_id:item})
    
    products.push(product)
}
 
  return res.status(200).json(products)
})
router.get(`/purehistory/:id`,async(req,res)=>{
    userId=Number(req.params.id)
    const history=await Transaction.find({user_id:userId})
    res.status(200).json(history)
})


router.delete('/clear/:id',async(req,res)=>{
    try{
    id=req.params.id

    await Transaction.deleteMany({user_id:id})

    return res.status(200)
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})
router.post('/add',async(req,res)=>{
    console.log("Fello")
    order=req.body
    console.log(order)
    const newTransaction = new Transaction({
        user_id:order.user_id,
        product_id: order.product_id,
        rating: order.rating,
        timestamp:order.timestamp,
       
      });
      try {
        const savedTrans = await newTransaction.save();
        res.status(201).json(savedTrans);
        console.log(savedTrans)
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
})

router.put('/rate/:id',async(req,res)=>{
    
    const user_id=Number(req.params.id)
    const {product_id,rating}=req.body
    console.log(user_id)
    console.log(product_id,rating)
    const result=await Transaction.findOneAndUpdate({user_id:user_id,product_id:String(product_id)},{ $set: { rating:rating } },{new:true})
    
   
    return res.status(200)
})
module.exports=router