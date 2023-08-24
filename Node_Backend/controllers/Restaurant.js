const Restaurant = require("../Model/Restaurant");

const getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: err,
    });
  }
};

module.exports = { getAllRestaurant };
