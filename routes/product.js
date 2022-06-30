const ProductModel = require("../models/ProductModel")
const { verifyTokenAdmin, tokenVerify} = require("../middleware/tokenVerify")
const { route } = require("./user")
const router = require("express").Router()
const joinQuery = require("mongo-join-query");
const CategoryModel = require("../models/CategoryModel");

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

            //! SONRA BAKILACAK, QUERY'e göre getir.
            // console.log(qCategory);
            // products = await ProductModel.aggregate([
            //     { "$match": { "categories.name" : "Computer"}},
            //     {
            //         "$lookup": {
            //             "from": "categormodels",
            //             "localField": "categories",
            //             "foreignField": "_id",
            //             "as": "categormodels"
            //         }
            //     },
            //     { "$unwind": "$categormodels" }
            // ])
        } else {
            products = await ProductModel.find().populate("categories")
        }

        if (products.length <= 0 ) {
            res.status(401).json({
                msg: "There are no products to show in the database!"
            })
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