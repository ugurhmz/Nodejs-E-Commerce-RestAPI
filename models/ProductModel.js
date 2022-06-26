const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true},
        description: { type: String, required: true },
        prdImg: { type: String, required: true },
        categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CategoryModel', required: true }],
        size: { type: String },
        voting: { type: Number },
        price: { type: Number, required: true}
    },
    { timestamps: true}
)

module.exports = mongoose.model("ProductModel", ProductSchema)