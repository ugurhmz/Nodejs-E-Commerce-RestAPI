const { tokenVerify, tokenVerifyAuthorization } = require("../middleware/tokenVerify");
const router = require("express").Router();
const { createOrderController, getUserOrdersController } = require("../controllers/Order");

router.post("/", tokenVerify, createOrderController); //CREATE ORDER
router.get("/find/:userId", tokenVerifyAuthorization, getUserOrdersController); //GET USER ORDERS

module.exports = router;
