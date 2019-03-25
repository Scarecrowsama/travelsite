const mongoose = require('mongoose');

const article = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now},
  rating: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }
});

module.exports = mongoose.model('Article', article);