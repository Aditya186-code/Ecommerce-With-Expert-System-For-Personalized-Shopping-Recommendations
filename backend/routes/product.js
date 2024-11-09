const Products = require("../models/Product.js");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken.js");

const router = require("express").Router();


router.post("/createproduct", async (req, res) => {
  x = req.body.category;
  x = x.replace("]", "");
  x = x.replace("[", "");
  x = x.replace("'", "");
  x = x.replace(" ", "");
  z = x.split(",");
  req.body.category = z;

  const newProduct = new Products(req.body);

  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.put(
  "/:id",
  verifyTokenAndAdmin,

  async (req, res) => {
    try {
      const updatedProduct = await Products.Ecommerce.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedProduct);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    return res.status(200).json("The product has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
   
    console.log(`'${req.params.id}'`);
    const product = await Products.find({ product_id: req.params.id });
    
    res.status(200).json(product[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/getcategory", async (req, res) => {
  const qCategory = req.query.category;
 
  

  try {
    let products;
    if (qCategory) {
      products = await Products.find({
        categories: qCategory
      });
    } else {
      products = await Products.find();
    }
    
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/getpopular",async(req,res)=>{
  const list=await Products.find({})

  list.sort((a, b) => b["ratings"] - a["ratings"]);
  return  res.status(200).json({'popular':list.slice(0, 15)});
})

router.get("/getallproduct",async(req,res)=>{
  const originalArray=await Products.find({})
  let newArray = originalArray.slice(500, 1000)
    .concat(originalArray.slice(16000, 16500))
    .concat(originalArray.slice(26500, 27000))
    .concat(originalArray.slice(38000, 38500));
  return res.status(200).json(newArray)
})
module.exports = router;
