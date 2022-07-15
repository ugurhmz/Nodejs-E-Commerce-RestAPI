const CategoryModel = require("../models/CategoryModel");
const httpStatus = require("http-status");

// CREATE
exports.createCategoryController = async (req, res) => {
  const { name } = req.body;

  try {
    let dbCategory = await CategoryModel.findOne({ name });

    if (dbCategory) {
      return res.status(httpStatus.ALREADY_REPORTED).json({ error: "Category already exist!" });
    }

    const newCategory = new CategoryModel(req.body);
    const saveCategory = await newCategory.save();
    res.status(httpStatus.OK).json(saveCategory);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

// GET ALL
exports.getAllCategoriesController = async (req, res) => {
  try {
    let allCategories = await CategoryModel.find();

    //* Search Category
    /*
           let allCategories =  await CategoryModel.find({
               "name" : req.query.category
           })*/
    res.status(httpStatus.OK).json(allCategories);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
};

// GET ONE
exports.getOneCategoryController = async (req, res) => {
  if (req.params.id < 0) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Id number cannot be less than zero" });
  }
  try {
    const category = await CategoryModel.findById(req.params.id);
    res.status(httpStatus.OK).json(category);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      err,
      msg: "Category Not Found",
    });
  }
};
