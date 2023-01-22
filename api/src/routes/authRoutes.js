const express = require("express");
const router = express();
const {
  CreateUser,
  LoginUser,
  GetUserById,
} = require("../Controllers/authController");
const { verify } = require("../middleware/authMiddleware");

router.post("/create-user", CreateUser);
router.post("/login", LoginUser);
router.get("/get-user-by-id", verify, GetUserById);

module.exports = router;
