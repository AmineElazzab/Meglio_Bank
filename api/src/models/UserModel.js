const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    confirmPassword: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    city: {
      type: String,
      required: [true, "Please add a city"],
    },
    postalCode: {
      type: String,
      required: [true, "Please add a postal code"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    birthday: {
      type: Date,
      required: [true, "Please add a birthday"],
    },
    gender: {
      type: String,
      enum: ["Male" , "Female"],
      required: [true, "Please add a Gender"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
