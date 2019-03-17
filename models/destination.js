const mongoose = require('mongoose');

const destination = new mongoose.Schema({
  name: String,
  flag: String,
  creationDate: {
    type: Date,
    default: Date.now
  },
  region: String,
  cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City'
    }
  ],
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  }
});

module.exports = mongoose.model('Destination', destination);

// Use field: value, required: true to require a field or default: quantity for a default amount.
