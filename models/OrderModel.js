const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductModel",
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
  },

  { timestamps: true }
);

module.exports = mongoose.model("OrderModel", OrderSchema);
