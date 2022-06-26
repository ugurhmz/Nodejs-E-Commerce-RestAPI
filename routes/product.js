const ProductModel = require("../models/ProductModel")
const { verifyTokenAdmin, tokenVerify} = require("../middleware/tokenVerify")
const { route } = require("./user")
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

// GET ALL PRODUCTS, Filter by Query
router.get("/all", async (req,res) => {
    const qCategory = req.query.category

    try {
        let products;
        if (qCategory) {
            products = await ProductModel.find({
                categories : {
                    $in: [qCategory]
                }
            })
        } else {
            products = await ProductModel.find()
        }

        res.status(200).json(products)
    } catch(err) {
        res.status(500).json(err)
    }
})


// GET PRODUCT
router.get("/:id", async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id)
        res.status(200).json(product)
    } catch(err) {
        res.status(500).json({
            err,
            msg:"Product Not Found"
        })
    }
})

module.exports = router