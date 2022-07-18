const express = require("express");
const validate = require("../middleware/validate");
const router = express.Router();
const schemas = require("../validations/Users");
const { verifyEmail, tokenVerify } = require("../middleware/verifyEmailAndToken");
const { tokenVerifyAuthorization } = require("../middleware/tokenVerify");
const { registerController, getUserController, userActivationController, updateController, loginController, resetPasswordController, logOutController } = require("../controllers/User");

router.post("/register", validate(schemas.createValidation), registerController);
router.get("/activation/:token", userActivationController);
router.post("/login", validate(schemas.loginValidation), verifyEmail, loginController);
router.post("/reset-password", validate(schemas.resetPasswordValidation), resetPasswordController);
router.post("/logout", tokenVerify, logOutController);
router.get("/:id", tokenVerifyAuthorization, getUserController);
router.put("/update-user/:id", validate(schemas.updateValidation), tokenVerifyAuthorization, updateController);
module.exports = router;
