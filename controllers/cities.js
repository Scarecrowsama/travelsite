const Destination = require('../models/destination');
const City        = require('../models/city');
// const Attraction  = require('../models/attraction');

exports.cities_view_all = (req, res, next) => {
  res.redirect('back');
}

exports.cities_new = (req, res, next) => {
  Destination.findById(req.params.id)
  .select('_id name')
  .then(foundDestination => res.render('cities/new', {foundDestination: foundDestination, pageTitle: 'Add New City'}))
  .catch(err => res.redirect('back'));
}

exports.cities_create = async (req, res, next) => {
  try {
    const newCity = await City.create(req.body.city);
    const foundDestination = await Destination.findById(req.body.country.id);
    foundDestination.cities.push(newCity._id);
    foundDestination.save();
    newCity.country.id = req.body.country.id;
    newCity.country.name = foundDestination.name;
    newCity.save();
    res.redirect(`/destinations/${newCity.country.id}`);
  } catch(err) {
    next(err);
  } 
}

exports.cities_show_one = async (req, res, next) => {
  try {
    const foundCity = await City.findById(req.params.cityId)
    .select('name country')
    // .populate('attractions');
    res.render(`cities/show`, { foundCity: foundCity, pageTitle: `${foundCity.name} City Guide - Travel Guides` });

  } catch(err) {
    next(err);
  }
}