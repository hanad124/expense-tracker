const router = require("express").Router();
const {
  addTransaction,
  getAllTransactionsOfUser,
  editTransaction,
  deleteTransaction,
  getAllTransactions,
} = require("../controllers/transactionControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/addTransaction", authMiddleware, addTransaction);
router.post(
  "/getAllTransactionsOfUser",
  authMiddleware,
  getAllTransactionsOfUser
);
router.post("/getAllTransactions", authMiddleware, getAllTransactions);
router.put("/editTransaction", authMiddleware, editTransaction);
router.post("/deleteTransaction", authMiddleware, deleteTransaction);

module.exports = router;
