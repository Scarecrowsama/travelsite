const express                 = require('express');
const router                  = express.Router();
const destinationsController  = require('../controllers/destination');

router.route('/')
  .get(destinationsController.destinations_get_all)
  .post(destinationsController.destinations_create);

router.get('/new', destinationsController.destinations_new);

router.route('/:id')
  .get(destinationsController.destinations_show)
  .put(destinationsController.destinations_update) 
  .delete(destinationsController.destinations_delete);

router.get('/:id/edit', destinationsController.destinations_edit);

module.exports = router;