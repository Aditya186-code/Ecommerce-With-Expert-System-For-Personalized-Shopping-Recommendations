const Product = require('../models/Product.js')
const data = require('../data/data.js')

const loading_into_db = async() => {
    const product = await Product.findOne();
    if(!product){
        for(let i = 0; i < 30; i++){
            const newProduct = new Product({
                title : data[i]["Product Name"],
                desc : data[i]["Product Specification"],
                img : data[i]["Image"],
                categories: data[i]["Category"],
                // size: data[i]["About Product"],
                color: data[i]["Color"],
                price:  data[i]["Selling Price"]
            })
            try{
                await newProduct.save()
            }
            catch(error){
                console.log(error)
            }
        }
    }
    else{
        console.log("Data has already been added")
    }
}

module.exports = loading_into_db