const OrderModel = require("../models/OrderModel")
const { tokenVerify, tokenVerifyAuthorization } = require("../middleware/tokenVerify")
const router = require("express").Router()


//CREATE ORDER
router.post("/", tokenVerify, async (req, res) => {
    const newOrder = new OrderModel(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
});

//GET USER ORDERS
router.get("/find/:userId", tokenVerifyAuthorization, async (req, res) => {
    try {
      const orders = await OrderModel.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router