const { tokenVerify, tokenVerifyAuthorization } = require("../middleware/tokenVerify");
const { createCartController, updateCartController, deleteCartController, getUserCartController, deleteOneItemInCartController } = require("../controllers/Cart");
const router = require("express").Router();
const validate = require("../middleware/validate");
const cartJoi = require("../validations/Cart");

// ROUTES
router.post("/", validate(cartJoi.createCartValidation), tokenVerify, createCartController);
router.put("/update/cartId/:id", tokenVerify, updateCartController);
router.delete("/delete-all/cartId/:id", tokenVerify, deleteCartController);
router.get("/user-id/:id", tokenVerifyAuthorization, getUserCartController);
router.delete("/delete-product/", tokenVerify, deleteOneItemInCartController);

module.exports = router;
