const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/FoodPandaSite";
// "mongodb+srv://hassanqadir:opJNTbsxAEnoZ0hO@cluster0.bohirhe.mongodb.net/FoodPandaSite?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listeners for successful connection and connection errors
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});
