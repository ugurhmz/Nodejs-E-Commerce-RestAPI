const CategoryModel = require("../models/CategoryModel");
const { verifyTokenAdmin } = require("../middleware/tokenVerify");
const router = require("express").Router();
const { createCategoryController, getAllCategoriesController, getOneCategoryController } = require("../controllers/Category");

router.post("/create", verifyTokenAdmin, createCategoryController); // CREATE CATEGORY
router.get("/get-all", getAllCategoriesController); // GET ALL CATEGORIES
router.get("/:id", getOneCategoryController); // GET ONE CATEGORY

module.exports = router;
