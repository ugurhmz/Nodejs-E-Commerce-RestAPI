const router = require("express").Router();
const {
  tokenVerify,
  tokenVerifyAuthorization,
  verifyTokenAdmin,
} = require("../middleware/tokenVerify");

const {
  registerController,
  loginController,
  updateController,
  deleteController,
  getUserController,
} = require("../controllers/User");

const userJoi = require("../validations/User");
const validate = require("../middleware/validate");

// REGISTER
router.post(
  "/register",
  validate(userJoi.registerValidation),
  registerController
);

// LOGIN
router.post("/login", validate(userJoi.loginValidation), loginController);

// UPDATE
router.put(
  "/update-user/:id",
  validate(userJoi.updateValidation),
  tokenVerifyAuthorization,
  updateController
);

// DELETE
router.delete("/delete-user/:id", verifyTokenAdmin, deleteController);

// GET ONE
router.get("/:id", tokenVerifyAuthorization, getUserController);

module.exports = router;
