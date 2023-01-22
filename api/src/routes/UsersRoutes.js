const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/usersController");
const { verify } = require("../middleware/authMiddleware");

router.get("/get-all-users", verify, getUsers);

module.exports = router;
