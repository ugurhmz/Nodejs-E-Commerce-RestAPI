const ProductModel = require("../models/ProductModel");
const { verifyTokenAdmin, tokenVerify } = require("../middleware/tokenVerify");
const router = require("express").Router();
const { createProductController, getAllProductsController, getOneProductController } = require("../controllers/Product");

router.post("/add-product", verifyTokenAdmin, createProductController); // CREATE PRD
router.get("/all", getAllProductsController); // GET ALL PRODUCTS, Filter by Query
router.get("/:id", getOneProductController); // GET PRODUCT

module.exports = router;
