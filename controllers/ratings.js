const Rating = require('../models/rating');

exports.postRating = async (req, res, next) => {
  try {
    const createdRating = await Rating.call(req.body.rating);
    res.redirect('back');
  } catch(err) {
    console.log(err);
    return next(err);
  }
}