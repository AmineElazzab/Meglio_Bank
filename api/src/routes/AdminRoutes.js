const express = require('express');
const router = express();
const {RegisterAdmin, LoginAdmin, GetAllUsers} = require("../controllers/adminController");

router.post("/register", RegisterAdmin);
router.post("/login", LoginAdmin);
router.get("/users", GetAllUsers);

module.exports = router;