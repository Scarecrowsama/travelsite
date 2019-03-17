// Destination = require('../../models/destionation');
// Regions      = require('../../models/regions');
// let allDestinations;
//
// Regions.find({})
// .select('name cities')
// .populate('cities')
// .then(allRegions => {
//   allRegions.cities.forEach(city => {
//     console.log(allRegions.cities);
//     Destinatination.find({_id: city._id})
//     .select('_id name')
//     .then(destination => allDestinations.push(destination));
//   });
// })
// .catch(err => console.log(err));
