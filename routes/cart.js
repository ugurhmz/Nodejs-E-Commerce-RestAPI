const CartModel = require("../models/CartModel")
const ProductModel = require("../models/ProductModel")
const { tokenVerify, tokenVerifyAuthorization } = require("../middleware/tokenVerify")
const router = require("express").Router()

// CART CREATE
router.post("/", tokenVerify, async (req, res) => {
 
   const foundCart = await CartModel.findOne({
     userId: req.body.userId
   })
   

   console.log(foundCart);

 
   if (foundCart) {
  
    try {

      const updateCart = await CartModel.findOneAndUpdate({
          userId: req.body.userId
        },
        {
        $set: req.body,
        },
        { new: true })

        res.status(200).json(updateCart)

    } catch(err) {
      res.status(500).json(err)
    }


   }  else { // KART YOKSA YENİ OLUŞTUR
        const newPost = new CartModel(req.body)

        try {
            const saveCart = await newPost.save()
            res.status(200).json(saveCart)
        } catch(err) {
            res.status(500).json(err)
        }
   }
})

// UPDATE CART
router.put("/update/cartId/:id", tokenVerify, async (req, res) => {
  try {

    const updateCart =  await CartModel.findOneAndUpdate(
        req.params.id
      ,
      {
      $set: req.body,
      },
      { new: true })

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