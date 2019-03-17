const express         = require('express');
const router          = express.Router();
const cityController  = require('../controllers/cities');

router.get('/destinations/:id/cities', cityController.cities_view_all);

router.get('/destinations/:id/cities/new', cityController.cities_new);

router.post('/destinations/:id/cities', cityController.cities_create);

module.exports = router;