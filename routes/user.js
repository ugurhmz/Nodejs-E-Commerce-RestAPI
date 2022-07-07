const router = require("express").Router();
const { tokenVerify, tokenVerifyAuthorization, verifyTokenAdmin } = require("../middleware/tokenVerify");
const { registerController, loginController, updateController, deleteController, getUserController } = require("../controllers/User");

const userJoi = require("../validations/User");
const validate = require("../middleware/validate");

// ROUTES
router.post("/register", validate(userJoi.registerValidation), registerController);
router.post("/login", validate(userJoi.loginValidation), loginController);
router.put("/update-user/:id", validate(userJoi.updateValidation), tokenVerifyAuthorization, updateController);
router.delete("/delete-user/:id", verifyTokenAdmin, deleteController);
router.get("/:id", tokenVerifyAuthorization, getUserController);

module.exports = router;
