const router = require("express").Router();
const { addTransaction, getAllTransactionsOfUser, editTransaction, deleteTransaction } = require("../controllers/transactionControllers");
const authMiddleware = require("../middlewares/authMiddleware")


router.post("/addTransaction",authMiddleware,addTransaction);
router.post("/getAllTransactionsOfUser",authMiddleware,getAllTransactionsOfUser);
router.put("/editTransaction",authMiddleware,editTransaction);
router.post("/deleteTransaction",authMiddleware,deleteTransaction);


module.exports = router;