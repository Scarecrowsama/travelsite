const mongoose = require('mongoose');

const city = new mongoose.Schema({
  name: String,
  creationDate: {
    type: Date,
    default: Date.now
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  },
  attractions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attraction'
    }
  ],
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant'
    }
  ],
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rating'
  }
});

module.exports = mongoose.model('City', city);
