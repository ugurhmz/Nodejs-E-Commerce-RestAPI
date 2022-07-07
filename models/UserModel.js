const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, min: 3, max: 50 },
    email: { type: String, required: true, unique: true, min: 8 },
    password: { type: String, required: true, min: 6 },
    isAdmin: { type: Boolean, default: false },
    userImg: { type: String, default: "default.png" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserModel", UserSchema);
