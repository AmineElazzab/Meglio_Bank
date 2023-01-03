const express = require('express');
const router = express();
const { Register, Login} = require("../controllers/authController");

router.post("/register", Register);
router.post("/login", Login);

module.exports = router;