const CartModel = require("../models/CartModel")
const ProductModel = require("../models/ProductModel")
const { tokenVerify, tokenVerifyAuthorization } = require("../middleware/tokenVerify")
const router = require("express").Router()

// CART CREATE
router.post("/", tokenVerify, async (req, res) => {
    const { products } = req.body
    //const thisProduct = await ProductModel.findOne({products}) // Maybe You can use later
    const newPost = new CartModel(req.body)
     //newPost.products = thisProduct  // Maybe You can use later
    try {
        const saveCart = await newPost.save()
        res.status(200).json(saveCart)
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE CART
router.put("/update/:id", tokenVerifyAuthorization, async (req, res) => {
    try {
        const updateCart = await CartModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }
        )
        res.status(200).json(updateCart)
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE CART
router.delete("/delete/:id", tokenVerifyAuthorization, async (req, res) => {
    try {
        await CartModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Card successfully deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

// GET USER CART
router.get("/user-id/:id", tokenVerifyAuthorization, async (req,res) => {
    try {
        const cart = await (await CartModel.findOne({ userId: req.params.id })).populate({
            path : "products",
            select: "title description"
        })
        res.status(200).json(cart)
    } catch(err) {
        res.status(500).json(err)
    }
})



module.exports = router