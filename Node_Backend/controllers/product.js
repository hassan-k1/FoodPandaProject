const Product = require("../Model/product");

const getAllProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const query = { restaurant: id };
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};
const specific_product = async (req, res) => {
  try {
    const { id } = req.body;
    const query = { _id: id };
    const specificproduct = await Product.findOne(query);
    if (specificproduct) {
      return res.status(201).json({
        status: 201,
        data: specificproduct,
      });
    } else {
      res.status(400).json({
        message: "not find data",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: err,
    });
  }
};

module.exports = { getAllProducts, specific_product };
