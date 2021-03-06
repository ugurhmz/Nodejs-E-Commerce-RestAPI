const mongoose = require("mongoose")
const { Schema } = mongoose;

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true},
        description: { type: String, required: true },
        prdImg: { type: String, required: true },
        categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "CategorModel", required: true }],
        size: { type: String },
        voting: { type: Number, min: 0, max: 5 },
        price: { type: Number, required: true},
    },
    { timestamps: true}
)

module.exports = mongoose.model("ProductModel", ProductSchema)