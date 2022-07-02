const CartModel = require("../models/CartModel")
const ProductModel = require("../models/ProductModel")
const { tokenVerify, tokenVerifyAuthorization } = require("../middleware/tokenVerify")
const router = require("express").Router()



//add cart
router.post("/", tokenVerify, async (req, res) => {
  const owner = req.body.owner;
  const { itemId, quantity } = req.body;

  try {
    const cart = await CartModel.findOne({ owner });
    const item = await ProductModel.findOne({ _id: itemId });

    if (!item) {
      res.status(404).send({ message: "item not found" });
      return;
    }
    const price = item.price;
    const name = item.name;


    //If cart already exists for user,
    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
      //check if product exists or not

      if (itemIndex > -1) {
        let product = cart.items[itemIndex];

        if (  product.quantity < 1) {
          return res.status(401).json('Product quantity can not be 0!')
        }
      
        product.quantity += quantity;
        console.log(product.quantity);
        cart.items[itemIndex] = product;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.items.push({ itemId,  quantity});
       
        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      //no cart exists, create one
      const newCart = await CartModel.create({
        owner,
        items: [{ itemId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

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
router.delete("/delete-all/cartId/:id", tokenVerify, async (req, res) => {
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
        const cart = await  CartModel.findOne({ owner: req.params.id }).populate(
          [
            {
                path: "items.itemId",
                model : "ProductModel",
                populate: {
                    path: "categories",
                    model : "CategorModel",
                    select: "_id name  categoryImg createdAt"
                }
            },
             {
                path: "owner",
                model : "UserModel",
                select: "_id username email isAdmin userImg createdAt"
            }
          ]
           
        )
          // USER CART ITEMS == 0  , DELETE WHOLE CART FOR USER
          if (cart.items.length == 0) {
            // CARTIN TAMAMINI SİL o user için.
            try {
                await CartModel.findByIdAndDelete(cart.id)
            } catch {

            }
          }

        res.status(200).json(cart)
    } catch(err) {
        res.status(500).json(err)
    }
})


// DELETE ONE ITEM IN CART
router.delete("/delete-product/", tokenVerify, async (req, res) => {
  const owner = req.body.owner;
  console.log('itemId', req.query.itemId);
 const itemId = req.query.itemId;
  try {
    let cart = await CartModel.findOne({ owner });

    const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
    
    if (itemIndex > -1) {
      let item = cart.items[itemIndex];
      cart.items.splice(itemIndex, 1);
     
      cart = await cart.save();

      res.status(200).send(cart);
    } else {
    res.status(404).send("item not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});


module.exports = router