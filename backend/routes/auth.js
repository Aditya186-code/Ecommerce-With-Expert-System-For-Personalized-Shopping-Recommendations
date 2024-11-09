const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const router = require("express").Router();

router.post("/register", async (req, res) => {


  latest_doc=await User.find().sort({ createdAt: -1 }).limit(1).exec();
  console.log(latest_doc[0])
  const newUser = new User({
    usr_id:latest_doc[0].usr_id+1,
    fullName: req.body.full_name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, "aditya").toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).json("Wrong email");
    }
    const hashedPassword = CryptoJS.AES.decrypt(user.password, "aditya");

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    // console.log(originalPassword)

    const inputPassword = req.body.password;

    // console.log(inputPassword)

    if (originalPassword != inputPassword) {
      return res.status(401).json("Wrong Password");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      "aditya",
      { expiresIn: "1d" }
    );

    // console.log(accessToken)
    // console.log(user._doc)

    const { password, ...others } = user._doc;
    res.setHeader("token", accessToken);
    return res.status(200).json({ accessToken, user });
  } catch (err) {
    
    return res.status(500).json(err);
  }
});

module.exports = router;
