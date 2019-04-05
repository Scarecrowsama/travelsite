const mongoose = require('mongoose');

const article = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { 
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true }
  },
  date: { type: Date, default: Date.now},
  rating: { 
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' },
    totalVotes: { type: Number, default: 0 }, average: { type: Number, default: 0 } 
}
});

module.exports = mongoose.model('Article', article);