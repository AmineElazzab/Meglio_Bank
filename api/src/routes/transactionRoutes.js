const express = require("express");
const router = express.Router();
const {
  createTransaction,
  getTransactions,
} = require("../controllers/transactionController");
const { verify } = require("../middleware/authMiddleware");

router.post("/create-transaction", verify, createTransaction);
router.get("/get-transactions", verify, getTransactions);

module.exports = router;
