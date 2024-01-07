const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  addCategory,
  getCategories,
  editCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

router.post("/addCategory", authMiddleware, addCategory);
router.post("/getAllcategoriesOfUser", authMiddleware, getCategories);
router.put("/editCategory", authMiddleware, editCategory);
router.post("/deleteCategory", authMiddleware, deleteCategory);
// getCategories

module.exports = router;
