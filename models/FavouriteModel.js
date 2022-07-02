const mongoose = require('mongoose')
const FavouriteSchema = new mongoose.Schema(
    {
        owner : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "UserModel"
        },
        items: [{
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ProductModel",
                required: true
            }
        }]
    }, 
    { timestamps: true}
)

module.exports = mongoose.model("FavouriteModel", FavouriteSchema)