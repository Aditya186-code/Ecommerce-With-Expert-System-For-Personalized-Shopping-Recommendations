const mongoose = require("mongoose");

const userSchema = mongoose.Schema(

  {
    
    usr_id:{type:Number,required:true,unique:true},
    username:{type:String,required:false,unique:false},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, default: "" },
    phone: { type: Number,default:0,required:false },
    country: { type: String, default: "",required:false },
    state: { type: String, default: "",required:false },
    city: { type: String, default: "",required:false },
    address: { type: String, default: "",required:false },
    zip: { type: Number, default: 0,required:false },
    about: { type: String, default: "",required:false },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "buyer",
      required: false,
    },
    image: {
      type: Object,
      required: false,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
