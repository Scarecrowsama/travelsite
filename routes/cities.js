const express         = require('express');
const router          = express.Router();
const cityController  = require('../controllers/cities');
const isAuth          = require('../middlewares/is-auth');

router.get('/:id/cities', cityController.cities_view_all);

router.get('/:id/cities/new', isAuth, cityController.cities_new);

router.post('/:id/cities', isAuth, cityController.cities_create);

router.get('/:id/cities/:cityId', cityController.cities_show_one);

module.exports = router;