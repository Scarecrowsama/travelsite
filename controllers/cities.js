const Destination = require('../models/destination');
const City        = require('../models/city');

exports.cities_view_all = (req, res) => {
  res.redirect('back');
}

exports.cities_new = (req, res) => {
  Destination.findById(req.params.id)
  .select('_id name')
  .then(foundDestination => res.render('cities/new', {foundDestination: foundDestination, pageTitle: 'Add New City'}))
  .catch(err => res.redirect('back'));
}

exports.cities_create = (req, res) => {
  City.create(req.body.city)
  .then(newCity => {
    Destination.findById(newCity.country)
    .then(foundDestination => {
      foundDestination.cities.push(newCity._id);
      foundDestination.save();
    });
    res.redirect(`/destinations/${newCity.country}`);
  })
  .catch(err => res.redirect(`/destinations/${req.body.city.country}`));
}