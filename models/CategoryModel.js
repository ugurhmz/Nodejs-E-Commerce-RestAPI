const mongoose  = require('mongoose')

const CategorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 50, unique : true },
        categoryImg: { type: String, default: "categorydefault.jpg" }
    },
    { timestamps: true }
)

module.exports = mongoose.model("CategorModel",CategorySchema)