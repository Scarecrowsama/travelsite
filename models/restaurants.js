const mongoose = require('mongoose');

const restaurant = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Restaurant', restaurant);
