const express = require("express");
const router = express.Router();
const { getAllProducts, specific_product } = require("../controllers/product");
const { getOrder, createOrder } = require("../controllers/Order");
const { authenticate } = require("../middleware/authOrder");

router.get("/products", getAllProducts);
router.post("/specific_product", specific_product);
router.get("/getOrder", getOrder);
router.post("/createOrder", authenticate, createOrder);

module.exports = router;
