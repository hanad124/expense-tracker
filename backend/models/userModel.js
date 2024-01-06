const mongoose = require("mongoose");
const Transaction = require("./transactionModel");
const Category = require("./categoryModel");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default:
        "https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=20&m=476085198&s=612x612&w=0&h=8J3VgOZab_OiYoIuZfiMIvucFYB8vWYlKnSjKuKeYQM=",
    },
    description: {
      type: String,
      default: "Student Description",
    },
  },
  {
    timestamps: true,
  }
);

// remove all the transactions associated with an user if that user is deleted
userSchema.post("remove", async function (res, next) {
  await Transaction.deleteMany({ user: this._id });
  next();
});

// remove all the categories associated with an user if that user is deleted
userSchema.post("remove", async function (res, next) {
  await Category.deleteMany({ user: this._id });
  next();
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
