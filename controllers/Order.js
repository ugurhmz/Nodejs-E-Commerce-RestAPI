const httpStatus = require("http-status");
const OrderModel = require("../models/OrderModel");

// CREATE
exports.createOrderController = async (req, res) => {
  const newOrder = new OrderModel(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(httpStatus.OK).json(savedOrder);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
};

// GET USER ORDERS
exports.getUserOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.params.userId });
    res.status(httpStatus.OK).json(orders);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
};
