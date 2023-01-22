const express = require("express");
const router = express.Router();
const {
  getAccount,
  creatAccount,
  deleteAccount,
  getAllAccounts,
} = require("../controllers/accountController");
const { verify } = require("../middleware/authMiddleware");

router.post("/create-account", verify, creatAccount);
router.get("/get-accounts", verify, getAccount);
router.get("/get-all-accounts", getAllAccounts);
router.delete("/delete-account/:id", verify, deleteAccount);

module.exports = router;
