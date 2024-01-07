const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
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
