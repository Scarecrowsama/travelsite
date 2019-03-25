const Destination = require('../models/destination');
const City        = require('../models/city');

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
    console.log(newCity);
    foundDestination.cities.push(newCity._id);
    foundDestination.save();
    newCity.country.id = req.body.country.id;
    newCity.country.name = foundDestination.name;
    newCity.save();
    console.log(newCity);
    res.redirect(`/destinations/${newCity.country.id}`);
  } catch(err) {
    next(err);
  } 
  // .then(newCity => {
  //   Destination.findById(newCity.country)
  //   .then(foundDestination => {
  //     foundDestination.cities.push(newCity._id);
  //     foundDestination.save();
  //   });
  //   res.redirect(`/destinations/${newCity.country}`);
  // })
  // .catch(err => res.redirect(`/destinations/${req.body.city.country}`));
}