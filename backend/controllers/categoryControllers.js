const Category = require("../models/categoryModel");
const moment = require("moment");

const addCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    await category.save();
    res.send({
      data: null,
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
    const categories = await Category.find({});
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
    const category = await Category.findById(req.params.id);
    if (category) {
      category.name = req.body.name || category.name;
      category.description = req.body.description || category.description;
      const updatedCategory = await category.save();
      res.send({
        data: updatedCategory,
        message: "Category Updated Successfully",
        success: true,
      });
    } else {
      res.send({
        data: null,
        message: "Category Not Found",
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
    const category = await Category.findById(req.params.id);
    if (category) {
      await category.remove();
      res.send({
        data: null,
        message: "Category Deleted Successfully",
        success: true,
      });
    } else {
      res.send({
        data: null,
        message: "Category Not Found",
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
