const { tokenVerify, tokenVerifyAuthorization } = require("../middleware/tokenVerify.js");
const router = require("express").Router();
const { createFavouriteController, getUserFavouritesController } = require("../controllers/Favourites");

router.post("/", tokenVerify, createFavouriteController);
router.get("/user-id/:id", tokenVerifyAuthorization, getUserFavouritesController);

module.exports = router;
