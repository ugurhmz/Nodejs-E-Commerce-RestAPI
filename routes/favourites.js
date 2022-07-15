const { tokenVerify } = require("../middleware/tokenVerify.js");
const router = require("express").Router();
const { createFavouriteController } = require("../controllers/Favourites");

router.post("/", tokenVerify, createFavouriteController);

module.exports = router;
