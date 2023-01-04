const express = require('express');
const router = express();
const { Register, Login, GetAllUsers, GetUserById, UpdateUser, DeleteUser } = require("../controllers/authController");

router.post("/register", Register);
router.post("/login", Login);
router.get("/users", GetAllUsers);
router.get("/user/:id", GetUserById);
router.put("/updateuser/:id", UpdateUser);
router.delete("/deleteuser/:id", DeleteUser);


module.exports = router;