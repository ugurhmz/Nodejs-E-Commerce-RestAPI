const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 3, max: 50 },
    email: { type: String, required: true, unique: true, min: 8 },
    password: { type: String, required: true, min: 6 },
    name: { type: String, required: true },
    activationToken: { type: String },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    userImg: { type: String, default: "default.png" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserModel", UserSchema);
