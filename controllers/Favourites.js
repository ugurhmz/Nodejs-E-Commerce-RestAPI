const FavouriteModel = require("../models/FavouriteModel");
const ProductModel = require("../models/ProductModel");

// CREATE
exports.createFavouriteController = async (req, res) => {
  const owner = req.body.owner;
  const { itemId } = req.body;
  console.log("owner", owner);

  try {
    const fav = await FavouriteModel.findOne({ owner });
    const item = await ProductModel.findOne({ _id: itemId });

    console.log(fav);

    if (fav) {
      const itemIndex = fav.items.findIndex((item) => item.itemId == itemId);

      if (itemIndex > -1) {
        let favItem = fav.items[itemIndex];

        fav.items[itemIndex] = favItem;
        await fav.save();
        res.status(200).json(fav);
      } else {
        fav.items.push({ itemId });
        await fav.save();
        res.status(200).json(fav);
      }
    } else {
      const newFav = await FavouriteModel.create({
        owner,
        items: [{ itemId }],
      });

      return res.status(201).send(newFav);
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};
