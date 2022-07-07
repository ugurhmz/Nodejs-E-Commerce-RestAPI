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

// REGISTER
router.post("/register", registerController);

// LOGIN
router.post("/login", loginController);

// UPDATE
router.put("/update-user/:id", tokenVerifyAuthorization, updateController);

// DELETE
router.delete("/delete-user/:id", verifyTokenAdmin, deleteController);

// GET ONE
router.get("/:id", tokenVerifyAuthorization, getUserController);

module.exports = router;
