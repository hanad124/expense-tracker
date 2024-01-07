const Category = require("../models/categoryModel");
const moment = require("moment");

const addCategory = async (req, res) => {
  try {
    const { userid } = req.body;
    console.log(userid);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      user: userid,
    });
    await category.save();
    res.send({
      data: req.body,
      message: "New Category Added Successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const { userid } = req.body;
    const categories = await Category.find({ user: userid });
    res.send({
      data: categories,
      message: "Categories Fetched Successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
};

// edit category
const editCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.body._id,
      user: req.body.userid,
    });

    console.log(category);
    if (category) {
      category.name = req.body.name;
      category.description = req.body.description;
      await category.save();
      res.send({
        data: null,
        message: "Category Updated Successfully",
        success: true,
      });
    } else {
      res.send({
        data: null,
        message: "Trying to update some other user category, revoked",
        success: false,
      });
    }
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.body._id,
      user: req.body.user,
    });

    if (category) {
      await Category.deleteOne({ _id: category._id });
      res.send({
        data: null,
        message: "Category Deleted Successfully",
        success: true,
      });
    } else {
      res.send({
        data: null,
        message: "Trying to delete some other user category, revoked",
        success: false,
      });
    }
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  addCategory,
  getCategories,
  editCategory,
  deleteCategory,
};
