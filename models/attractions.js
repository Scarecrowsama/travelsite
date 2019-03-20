const mongoose = require('mongoose');

const attraction = new mongoose.Schema({
  name: String
}, {strict: true});

module.exports = mongoose.model('Attraction', attraction);
