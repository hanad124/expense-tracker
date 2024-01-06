const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

const categoryModel = mongoose.model("categories", categorySchema);

module.exports = categoryModel;
