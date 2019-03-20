const mongoose = require('mongoose');

const destination = new mongoose.Schema({
  name: { type: String, required: true }, 
  flag: String,
  creationDate: { type: Date, default: Date.now },
  region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' },
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
  rating: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }
}, {strict: true});

module.exports = mongoose.model('Destination', destination);

// Use field: value, required: true to require a field or default: quantity for a default amount.