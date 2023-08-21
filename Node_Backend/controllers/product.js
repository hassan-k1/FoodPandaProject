const Product = require("../Model/product");

const getAllProducts = async (req, res) => {
  Product.find()
    .then((r) => {
      res.status(200).json(r);
    })
    .catch((err) => {
      res.status(400).send("error=>", err);
    });
};

module.exports = { getAllProducts };
