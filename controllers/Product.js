const ProductModel = require("../models/ProductModel");
const httpStatus = require("http-status");

// CREATE
exports.createProductController = async (req, res) => {
  const newPrd = new ProductModel(req.body);

  try {
    const savedPrd = await newPrd.save();
    res.status(httpStatus.OK).json(savedPrd);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
};

// GET ALL
exports.getAllProductsController = async (req, res) => {
  const qCategory = req.query.category;
  try {
    let products;
    if (qCategory) {
      products = await ProductModel.aggregate([
        {
          $lookup: {
            from: "categormodels",
            localField: "categories",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $match: {
            $or: [{ "categories.name": { $regex: new RegExp(`^${qCategory}$`), $options: "i" } }, { "categories.name": { $regex: new RegExp(`${qCategory}`), $options: "i" } }],
          },
        },
      ]);
    } else {
      products = await ProductModel.find().populate("categories");
    }

    if (products.length <= 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        msg: "There are no products to show in the database!",
      });
    }

    res.status(httpStatus.OK).json(products);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
};

// GET ONE PRODUCT
exports.getOneProductController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(httpStatus.OK).json(product);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      err,
      msg: "Product Not Found",
    });
  }
};
