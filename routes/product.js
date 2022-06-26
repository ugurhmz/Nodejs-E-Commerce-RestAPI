const ProductModel = require("../models/ProductModel")
const { verifyTokenAdmin, tokenVerify} = require("../middleware/tokenVerify")
const router = require("express").Router()

// CREATE PRODUCT
router.post("/add-product", verifyTokenAdmin, async (req, res) => {
    const newPrd = new ProductModel(req.body)

    try {
        const savedPrd = await newPrd.save()
        res.status(200).json(savedPrd)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router