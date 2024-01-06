const express = require("express");
const app = express();
// const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("./config/db");
const port = process.env.PORT || 5000;
const userRoute = require("./routes/userRoutes");
const transactionRoute = require("./routes/transactionRoutes");
const categoryRoute = require("./routes/categoryRoutes");

// app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoute);
app.use("/api/transactions", transactionRoute);
app.use("/api/categories", categoryRoute);

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "/frontend/build/index.html"));
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
