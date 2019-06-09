const mongoose = require('mongoose');

const eatery = new mongoose.Schema({
  name: String,
  cuisine: { type: String, required: true },
  typeOfPlace: { type: String, required: true },
  priceRange: { type: String },
  website: { type: String },
  location: {
    latitude: String,
    longitude: String,
    address: String
  },
  openingTimes: {
    mon: String,
    tue: String,
    wed: String,
    thu: String,
    fri: String,
    sat: String,
    sun: String
  },
  city: { 
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true }
  },
  rating: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' }
}, {strict: true});

module.exports = mongoose.model('Eatery', eatery);