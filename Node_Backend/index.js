const express = require("express");
const cors = require("cors");
require("./Model/config");
const app = express();
require("dotenv").config();
const product_routes = require("./routes/productRoute");
const user_routes = require("./routes/userRoute");

const Port = 4000;

app.use(cors());
app.use(express.json());

app.use("/api", product_routes);
app.use("/api", user_routes);

app.listen(Port, () => {
  console.log("I am live");
});
