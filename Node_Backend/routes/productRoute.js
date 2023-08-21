const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../controllers/product");
const { getOrder, createOrder } = require("../controllers/Order");
const { authenticate } = require("../middleware/authOrder");

router.get("/products", getAllProducts);
router.get("/getOrder", getOrder);
router.post("/createOrder", authenticate, createOrder);

module.exports = router;
