const CartModel = require("../models/CartModel")
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
router.put("/update/cartId/:id", tokenVerify, async (req, res) => {
    let findCart;
   try {
     findCart  = await CartModel.findOne({
        _id : req.params.id
    })

    let allItems = req.body.products
    let fromBodyProducts =  allItems.map( (item) => {
            return item
    })
    findCart.products = fromBodyProducts
    const updateCart = await findCart.save()
    res.status(200).json(updateCart)

   } catch(err) {
       res.status(500).json("No such record found!")
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
        const cart = await  CartModel.findOne({ userId: req.params.id }).populate(
          [
            {
                path: "products.prd",
                model : "ProductModel",
                populate: {
                    path: "categories",
                    model : "CategorModel",
                    select: "_id name  categoryImg createdAt"
                }
            },
             {
                path: "userId",
                model : "UserModel",
                select: "_id username email isAdmin userImg createdAt"
            }
          ]
           
        )
        res.status(200).json(cart)
    } catch(err) {
        res.status(500).json(err)
    }
})



module.exports = router