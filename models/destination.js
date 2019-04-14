const mongoose = require('mongoose');

const destination = new mongoose.Schema({
  name: { type: String, required: true }, 
  flag: String,
  language: { type: String },
  currency: { 
    name: { type: String },
    acronym: { type: String },
  },
  electrics: {
    voltage: { type: Number },
    frequency: { type: Number },
    plug: { type: String },
  },
  emergency: [{ description: { type: String }, number: { type: Number } }],
  region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' },
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
  rating: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }
}, { strict: true,  timestamps: true });

module.exports = mongoose.model('Destination', destination);

// Use field: value, required: true to require a field or default: quantity for a default amount.