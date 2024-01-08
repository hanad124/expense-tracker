const Transaction = require("../models/transactionModel");
const moment = require("moment");

const addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      user: req.body.userid,
      amount: Number(req.body.amount),
      type: req.body.type,
      category: req.body.category,
      date: req.body.date,
      reference: req.body.reference,
      description: req.body.description,
    });
    await transaction.save();
    res.send({
      data: null,
      message: "New Transaction Added Successfully",
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

const getAllTransactionsOfUser = async (req, res) => {
  try {
    const { userid, frequency, selectedRange, type } = req.body;
    let freq;
    let end1, end2;
    if (frequency !== "custom") {
      freq = Number(frequency);
    }
    if (selectedRange) {
      end1 = selectedRange[0];
      end2 = selectedRange[1];
    }
    const transactions = await Transaction.find({
      ...(freq && { date: { $gt: moment().subtract(freq, "d").toDate() } }),
      ...(selectedRange && { date: { $gte: end1, $lte: end2 } }),
      user: userid,
      ...(type !== "all" && { type }),
    }).sort({ createdAt: -1 });
    if (transactions) {
      res.send({
        data: transactions,
        message: "All Your Transactions fetched Successfully",
        success: true,
      });
    } else {
      // No Transactions to display
      res.send({
        data: null,
        message: "No Transactions to display",
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

const getAllTransactions = async (req, res) => {
  try {
    const { userid } = req.body;
    const transactions = await Transaction.find({
      user: userid,
    }).sort({ createdAt: -1 });
    if (transactions) {
      res.send({
        data: transactions,
        message: "All Your Transactions fetched Successfully",
        success: true,
      });
    } else {
      // No Transactions to display
      res.send({
        data: null,
        message: "No Transactions to display",
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

const editTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.body._id,
      user: req.body.userid,
    });
    if (transaction) {
      transaction.amount = req.body.amount;
      transaction.type = req.body.type;
      transaction.category = req.body.category;
      transaction.date = req.body.date;
      transaction.reference = req.body.reference;
      transaction.description = req.body.description;
      await transaction.save();
      res.send({
        data: null,
        message: "Selected Transaction Updated Successfully",
        success: true,
      });
    } else {
      res.send({
        data: null,
        message: "Trying to update some other user transaction, revoked",
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

const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.body._id,
      user: req.body.userid,
    });
    if (transaction) {
      await Transaction.deleteOne({ _id: transaction._id });
      res.send({
        data: null,
        message: "Selected Transaction Deleted Successfully",
        success: true,
      });
    } else {
      res.send({
        data: null,
        message: "Trying to delete some other user transaction, revoked",
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
  addTransaction,
  getAllTransactionsOfUser,
  editTransaction,
  deleteTransaction,
  getAllTransactions,
};
