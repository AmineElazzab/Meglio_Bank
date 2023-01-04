const Admin = require("../models/AdminModel");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register admin
const RegisterAdmin = async (req, res) => {
  const { FullName, email, password } = req.body;

  if (!FullName || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //check if admin already exists
  const AdminExists = await Admin.findOne({ email });
  if (AdminExists) {
    return res.status(400).json({ msg: 'Admin already exists' });
  }

  // password hach
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create new admin
  const newAdmin = new Admin({
    FullName,
    email,
    password: hash,
  });
  if (newAdmin) {
    res.status(201).json({
      _id: newAdmin._id,
      FullName: newAdmin.FullName,
      email: newAdmin.email,
      token: generateToken(newAdmin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
};

// login admin
const LoginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ msg: 'Admin does not exist' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  res.json({
    _id: admin._id,
    FullName: admin.FullName,
    email: admin.email,
    token: generateToken(admin._id),
  });
};

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET_ADMIN, { expiresIn: '1h' });
}


//get all users
const GetAllUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

//get user by id
const GetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User Not Found.' });
  }
};

//delete user by id
const DeleteUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.send({ message: 'User Deleted' });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
};




module.exports = {
  RegisterAdmin,
  LoginAdmin,
  GetAllUsers,
  GetUserById,
  DeleteUserById,
};