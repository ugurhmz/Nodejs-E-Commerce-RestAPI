const mongoose = require('mongoose')
const { Schema } = mongoose;
const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
                {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "ProductModel" 
                }
            ]
    },
    { timestamps : true }
)

module.exports = mongoose.model("CartModel", CartSchema)