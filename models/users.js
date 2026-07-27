// userrs schema when new user register or already registered user loggedIn
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName:{
    type: String,
    required: [true, "last name is required"],
  },
  email:{
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password:{
    type: String,
    required: [true, "password is required"],

  },
  role:{
    type: String,
    enum: ['guest', 'admin'],
    default: 'guest',
  }
});

module.exports = mongoose.model("Users", userSchema);
