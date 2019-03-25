const mongoose = require('mongoose');

const city = new mongoose.Schema({
  name: String,
  creationDate: {
    type: Date,
    default: Date.now
  },
  country: {
    id: { type: mongoose.Schema.Types.ObjectId, name: 'Destination' }, 
    name: String
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
}, {strict: true});

module.exports = mongoose.model('City', city);
