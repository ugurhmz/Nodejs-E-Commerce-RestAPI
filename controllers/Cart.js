const CartModel = require("../models/CartModel");
const httpStatus = require("http-status");
const ProductModel = require("../models/ProductModel");

// CREATE CART
exports.createCartController = async (req, res) => {
  const owner = req.body.owner;
  const { itemId, quantity } = req.body;
  console.log(typeof quantity);
  if (typeof quantity === "string") {
    res.status(httpStatus.BAD_REQUEST).send({ error: "Quantity must be number" });
    return;
  }

  try {
    const cart = await CartModel.findOne({ owner });
    const item = await ProductModel.findOne({ _id: itemId });

    if (!item) {
      res.status(httpStatus.NOT_FOUND).send({ error: "item not found" });
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

        if (product.quantity < 1) {
          return res.status(httpStatus.BAD_REQUEST).json("Product quantity can not be 0!");
        }

        product.quantity += quantity;
        //console.log("PRD", product.quantity);

        cart.items[itemIndex] = product;
        await cart.save();
        res.status(httpStatus.OK).send(cart);
      } else {
        cart.items.push({ itemId, quantity });

        await cart.save();
        res.status(httpStatus.OK).send(cart);
      }
    } else {
      //no cart exists, create one
      const newCart = await CartModel.create({
        owner,
        items: [{ itemId, quantity }],
      });
      return res.status(httpStatus.OK).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("something went wrong");
  }
};

// UPDATE CART
exports.updateCartController = async (req, res) => {
  try {
    const updateCart = await CartModel.findOneAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(httpStatus.OK).json(updateCart);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
};

// DELETE CART
exports.deleteCartController = async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.status(httpStatus.OK).json("Card successfully deleted");
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
};

// GET USER CART
exports.getUserCartController = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ owner: req.params.id }).populate([
      {
        path: "items.itemId",
        model: "ProductModel",
        populate: {
          path: "categories",
          model: "CategorModel",
          select: "_id name  categoryImg createdAt",
        },
      },
      {
        path: "owner",
        model: "UserModel",
        select: "_id username email isAdmin userImg createdAt",
      },
    ]);
    // USER CART ITEMS == 0  , DELETE WHOLE CART FOR USER
    if (cart.items.length == 0) {
      // CARTIN TAMAMINI SİL o user için.
      try {
        await CartModel.findByIdAndDelete(cart.id);
      } catch {}
    }

    res.status(httpStatus.OK).json(cart);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
};

// DELETE PRODUCT
exports.deleteOneItemInCartController = async (req, res) => {
  const owner = req.body.owner;
  console.log("itemId", req.query.itemId);
  const itemId = req.query.itemId;
  try {
    let cart = await CartModel.findOne({ owner });

    const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

    if (itemIndex > -1) {
      let item = cart.items[itemIndex];
      cart.items.splice(itemIndex, 1);

      cart = await cart.save();

      res.status(httpStatus.OK).send(cart);
    } else {
      res.status(httpStatus.NOT_FOUND).send("item not found");
    }
  } catch (error) {
    console.log(error);
    res.status(httpStatus.BAD_REQUEST).send();
  }
};
