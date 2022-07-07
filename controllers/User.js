const UserModel = require("../models/UserModel");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
// REGISTER
exports.registerController = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(401).json({
      msg: "Fields cannot be left blank!",
    });
  }
  if (req.body.password.length < 6) {
    return res.status(401).json({
      msg: "Password must be 6 characters or larger!",
    });
  }

  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  if (!regex.test(req.body.email)) {
    return res.status(401).json({
      msg: "Please enter valid e-mail!",
    });
  }

  const isEmail = await UserModel.find({
    email: req.body.email,
  });

  if (isEmail[0]) {
    return res.status(401).json({
      msg: "E-mail already exist!",
    });
  }

  const newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(req.body.password, process.env.PAS_SECURITY),
    userImg: req.body.userImg,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// LOGIN
exports.loginController = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({
      msg: "Fields cannot be left blank!",
    });
  }

  try {
    const hasUser = await UserModel.findOne({ email: req.body.email });

    if (!hasUser) {
      return res.status(401).json({
        msg: "User not found, try again!",
      });
    }
    const hashedPassword = CryptoJs.AES.decrypt(
      hasUser.password,
      process.env.PAS_SECURITY
    );
    const dbPassword = hashedPassword.toString(CryptoJs.enc.Utf8);
    if (dbPassword !== req.body.password) {
      return res.status(401).json({
        msg: "Your password is wrong please fix it!",
      });
    }
    const accessToken = jwt.sign(
      {
        id: hasUser._id,
        isAdmin: hasUser.isAdmin,
      },
      process.env.JWT_SECURITY,
      {
        expiresIn: "7d",
      }
    );

    const { password, ...exceptThePassword } = hasUser._doc;

    // response
    const loginMsg = "Login success.";
    res.status(200).json({
      ...exceptThePassword,
      accessToken,
      loginMsg,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE USER
exports.updateController = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PAS_SECURITY
    ).toString();
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE USER
exports.deleteController = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET
exports.getUserController = async (req, res) => {
  try {
    let currentUser = await UserModel.findById(req.params.id);
    res.status(200).json(currentUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
