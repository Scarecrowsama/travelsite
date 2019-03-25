const express         = require('express');
const router          = express.Router();
const cityController  = require('../controllers/cities');

router.get('/:id/cities', cityController.cities_view_all);

router.get('/:id/cities/new', cityController.cities_new);

router.post('/:id/cities', cityController.cities_create);

router.get('/:id/cities/:cityId', cityController.cities_show_one);

module.exports = router;