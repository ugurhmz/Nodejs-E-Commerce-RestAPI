const { tokenVerify, tokenVerifyAuthorization } = require("../middleware/tokenVerify.js");
const router = require("express").Router();
const { createFavouriteController, getUserFavouritesController, deleteFavItemsController } = require("../controllers/Favourites");

router.post("/", tokenVerify, createFavouriteController);
router.get("/user-id/:id", tokenVerifyAuthorization, getUserFavouritesController);
router.delete("/delete-favproduct/", tokenVerify, deleteFavItemsController);
module.exports = router;
