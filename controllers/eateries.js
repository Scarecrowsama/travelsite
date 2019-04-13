const Eatery  = require('../models/eatery');
const City    = require('../models/city');

exports.eateries_new = async (req, res, next) => {

  try {
    const foundCity = await City.findById(req.params.cityId);
    res.render('eateries/new', { foundCity: foundCity, pageTitle: `Add new Eatery to ${foundCity.name}` });
  } catch(err) {
    next(err);
  }
}

exports.eateries_create = async (req, res, next) => {
  try {
    const foundCity = await City.findById(req.body.city.id).select('name eateries');
    req.body.eatery.city = { id: req.body.city.id, name: foundCity.name };
    const createdEatery = await Eatery.create(req.body.eatery);
    foundCity.eateries.push(createdEatery._id);
    foundCity.save();
    return res.redirect('back');
  } catch(err) {
    return next(err);
  }
}