const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectionDb = mongoose.connection;

connectionDb.on("connected", () => {
  console.log("Connected to database successfully.");
});

connectionDb.on("error", (e) => {
  console.log(e);
});

module.exports = connectionDb;
