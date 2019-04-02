const mongoose = require('mongoose');

const user = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: String,
  tokenExpiry: Date
}, { strict: true });

module.exports = mongoose.model('User', user);