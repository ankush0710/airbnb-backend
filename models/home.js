const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  description: String,
});

module.exports = mongoose.model('Home', homeSchema);