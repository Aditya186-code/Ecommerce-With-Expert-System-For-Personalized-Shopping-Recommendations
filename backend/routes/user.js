const User = require("../models/User.js");
const { upload } = require("../utils/file_upload.js");
const { getFileSize } = require("../utils/file_upload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "decm4dhbo",
  api_key: "421742784788333",
  api_secret: "r_WswHNjhYYVcjwovnWBfBeCwDU",
});
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken.js");
const CryptoJS = require("crypto-js");

const router = require("express").Router();

router.put(
  "/:id",
  upload.single("image"),
  verifyTokenAndAuthorization,
  async (req, res) => {
    // if (req.body.password) {
    //   req.body.password = CryptoJS.AES.encrypt(
    //     req.body.password,
    //     process.env.PASS_SEC
    //   ).toString();
    // }
    console.log("editing");
    const this_user = await User.findById(req.params.id);
    let fileData = {};
    if (req.file) {
      console.log("file");
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Inventory",
          resource_type: "image",
        });
        console.log("file uploaded to cloudinary");
      } catch (error) {
        res.status(500);
        console.log(error);
        throw new Error("File not uploaded to cloudinary");
      }
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: getFileSize(req.file.size),
      };
    }
    if (!req.file) {
      console.log("Nofile");
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          image: this_user.image,
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          image:
            Object.keys(fileData).length == 0 ? updatedUser.image : fileData,
        },
        { new: true }
      );

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("User has been deleted");
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (error) {
    return res.status(500).json(error);
  }
});
router.get("/me/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  return res.status(200).json({ user });
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;
