require("dotenv").config(); // loads environment variables from .env file into process.env

const mongoose = require("mongoose");
const app = require("./index");
const { PORT, MONGO_URI } = require("./config");

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
