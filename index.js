const express = require("express");
const mongoose = require("mongoose");
const animalRoutes = require("./routes/animalRoutes");

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/animalsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Use the routes
app.use("/animals", animalRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
