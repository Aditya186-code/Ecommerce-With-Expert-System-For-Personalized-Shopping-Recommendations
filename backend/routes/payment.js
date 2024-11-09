var CryptoJS=require('crypto-js')
var axios=require('axios')
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken.js");
const { request } = require('express');
  
const router = require("express").Router();
router.post("/initiate", async (req, res) => {
const message=`total_amount=${req.body['total_amount']},transaction_uuid=${req.body['transaction_uuid']},product_code=${req.body['product_code']}`

const secret='8gBm/:&EnhH.1/q'
var hash = CryptoJS.HmacSHA256(message, secret);
var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);



 var params={
  "amount": req.body['amount'],
  "failure_url": 'https://google.com',
  "product_delivery_charge": 0,
  "product_service_charge": 0,
  "product_code": "EPAYTEST",
  "signature":hashInBase64,
  "signed_field_names": "total_amount,transaction_uuid,product_code",
  "success_url": req.body['success_url'],
  "tax_amount": 0,
  "total_amount": req.body['total_amount'],
  "transaction_uuid": req.body['transaction_uuid']
  }
 
 return res.json(params)

  })
module.exports=router