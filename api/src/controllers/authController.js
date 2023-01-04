const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register user
// const Register = async (req, res) => {
//   const { firstName, lastName, email, password, address, state, city, zip } =
//     req.body;
//   // console.log(req.body);
//   if (!firstName
//     || !lastName
//     || !email
//     || !password
//     || !address
//     || !state
//     || !city
//     || !zip) {
//     return res.status(400).json({ msg: 'Please enter all fields' });
//   }

//   //check if user already exists
//   const UserExists = await User.findOne({ email });
//   if (UserExists) {
//     return res.status(400).json({ msg: 'User already exists' });
//   }
//   // console.log(UserExists);
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);

//   // create new user
//   const newUser = new User({
//     firstName,
//     lastName,
//     email,
//     password: hash,
//     address,
//     state,
//     city,
//     zip,
//   });
//   console.log(newUser)
//   if (newUser) {
//     res.status(201).json({
//       _id: newUser._id,
//       firstName: newUser.firstName,
//       lastName: newUser.lastName,
//       email: newUser.email,
//       address: newUser.address,
//       state: newUser.state,
//       city: newUser.city,
//       zip: newUser.zip,
//       token: generateToken(newUser._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// };

// Create User
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
  const UserExists = await User.findOne
    ({
      email
    });
  if (UserExists) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create new user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hash,
    address,
    state,
    city,
    zip,
  });

  if (newUser) {
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
  const newUser = await User.findOne({ email });
  if (!newUser) {
    return res.status(400).json({ msg: 'User does not exist' });
  }
  const isMatch = await bcrypt.compare(password, newUser.password);
  if (!isMatch) {
    return res.status(400).json({ msg: 'Password Not Corect' });
  }


  if (newUser && isMatch) {
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

// Get All Users
const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      message: 'All Users',
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
}


// Get User by ID
const GetUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'User found',
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
}

//Update User by ID
const UpdateUser = async (req, res) => {
  try {
    const { email, address, state, city, zip } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id,{
        email,
        address,
        state,
        city,
        zip,
      },
      { new: true }
      );
      console.log(user)
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};


//Delete User by ID
const DeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
    res.status(200).send({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};



module.exports = {
  Register,
  Login,
  GetAllUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
};
