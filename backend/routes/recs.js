const Recs=require("../models/Recs.js")
const router=require("express").Router()

router.get('/get/:id',async(req,res)=>{
    const usr_id=Number(req.params.id)
    // console.log(typeof(user_id))
    // const x=await Recs.find({})
    // console.log(typeof(x[1]['user_id']))
    const recommended= await Recs.findOne({user_id:usr_id})
    
    return res.status(200).json(recommended)
})

module.exports=router