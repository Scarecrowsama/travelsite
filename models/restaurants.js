const mongoose = require('mongoose');

const restaurant = new mongoose.Schema({
  name: String
}, {strict: true});

module.exports = mongoose.model('Restaurant', restaurant);
