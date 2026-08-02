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
  },
  favourite:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
  }]
});

module.exports = mongoose.models.Users || mongoose.model("Users", userSchema);
