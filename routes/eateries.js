const express = require('express');
const router = express.Router();
const eateriesController  = require('../controllers/eateries');
const isAuth = require('../middlewares/is-auth');

router.route('/:id/cities/:cityId/eateries/new')
  .get(isAuth, eateriesController.eateries_new)
  .post(isAuth, eateriesController.eateries_create);

module.exports = router;