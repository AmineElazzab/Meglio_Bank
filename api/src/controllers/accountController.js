const asyncHandler = require("express-async-handler");
const Account = require("../models/accountModel");
const User = require("../models/userModel");


const getAccount = asyncHandler(async (req, res) => {
  const accounts = await Account.find({ user: req.user.id });

  res.status(200).json(accounts);
});


const getAllAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find({});
  res.status(200).json(accounts);
});


const creatAccount = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("add a name");
  }
  const accountExists = await Account.findOne({
    user: req.user.id,
  });
  if (accountExists) {
    res.status(400);
    throw new Error("Account already exists");
  }

  const account = await Account.create({
    name: req.body.name,
    balance: req.body.balance,
    user: req.user.id, // this is the logged in user id from the token
  });
  res.status(201).json({ message: "Account created successfully", account });
});


const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.params.id);

  if (!account) {
    res.status(400);
    throw new Error("Account not found");
  }

  const user = await User.findById(req.user.id);

  //Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure the logged in user matches the Account User
  if (account.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await account.remove();

  res.status(200).json({ id: req.params.id, message: "Account deleted" });
});

module.exports = {
  getAccount,
  creatAccount,
  deleteAccount,
  getAllAccounts,
};
