// user controller

const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register user
const Register = async (req, res) => {
  const { firstName, lastName, email, password, address, state, city, zip } =
    req.body;

  if (!firstName
    || !lastName
    || !email
    || !password
    || !address
    || !state
    || !city
    || !zip) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //check if user already exists
  const UserExists = await User.findOne({ email });
  if (UserExists) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  // password hach
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hash,
    address,
    state,
    city,
    zip,
  });
      if(newUser) {
        res.status(201).json({
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          address: newUser.address,
          state: newUser.state,
          city: newUser.city,
          zip: newUser.zip,
          token: generateToken(newUser._id),
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
};


// login user
const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //check if user already exists
  const newUser = await User.findOne({email});
  if (!newUser) {
    return res.status(400).json({ msg: 'User does not exist' });
  }

  // password hach
  const isMatch = await bcrypt.compare(password, newUser.password); 
  if (!isMatch) {
    return res.status(400).json({ msg: 'Password Not Corect' });
  }

  
  if(newUser && isMatch) {
    res.status(201).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      address: newUser.address,
      state: newUser.state,
      city: newUser.city,
      zip: newUser.zip,
      token: generateToken(newUser._id),
    });
  }

};

// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

module.exports = {
  Register,
  Login,
};
     