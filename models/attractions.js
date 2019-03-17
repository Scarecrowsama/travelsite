const mongoose = require('mongoose');

const attraction = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Attraction', attraction);
