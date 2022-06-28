const CartModel = require("../models/CartModel")
const { tokenVerify, tokenVerifyAuthorization } = require("../middleware/tokenVerify")
const router = require("express").Router()

// CART CREATE
router.post("/", tokenVerify, async (req, res) => {
    const newCart  = new CartModel(req.body)
    try {
        const saveCart = await newCart.save()
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
router.get("/user-cart/:id", tokenVerifyAuthorization, async (req,res) => {
    try {
        const cart = await CartModel.findOne({ userId: req.params.id })
        res.status(200).json(cart)
    } catch(err) {
        res.status(500).json(err)
    }
})



module.exports = router