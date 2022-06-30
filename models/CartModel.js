const mongoose = require('mongoose')
const CartSchema = new mongoose.Schema(
    {
        userId: {   type: mongoose.Schema.Types.ObjectId, 
                    ref: "UserModel",
                    required: true 
                },
        products: [
               {
                prd: {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: "ProductModel" 
                },
                quantity: {
                    type: Number,
                    default: 1
                }
               }
            ] 
    },
    { timestamps : true }
)

module.exports = mongoose.model("CartModel", CartSchema)