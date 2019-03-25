const Attraction  = require('../models/attraction');
const City        = require('../models/city');

exports.attractions_new = async (req, res, next) => {

  try {
    const foundCity = await City.findById(req.params.cityId);
    res.render('attractions/new', { foundCity: foundCity, pageTitle: `Add new Attraction to ${foundCity.name}` });
  } catch(err) {
    next(err);
  }
  
}

exports.attractions_create = async (req, res, next) => {
  try {
    const foundCity = await City.findById(req.body.city.id).select('name attractions');
    req.body.attraction.city = { id: req.body.city.id, name: foundCity.name };
    const createdAttraction = await Attraction.create(req.body.attraction);
    foundCity.attractions.push(createdAttraction._id);
    foundCity.save();
    res.redirect('back');
  } catch(err) {
    next(err);
  }
}