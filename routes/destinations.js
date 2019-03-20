const express                 = require('express');
const router                  = express.Router();
const destinationsController  = require('../controllers/destination');

router.route('/')
  .get(destinationsController.destinations_get_all)
  .post(destinationsController.destinations_create);

router.get('/new', destinationsController.destinations_new);

router.get('/:id', destinationsController.destinations_show);

router.get('/:id/edit', destinationsController.destinations_edit);

router.put('/:id', destinationsController.destinations_update);

router.delete('/:id', destinationsController.destinations_delete);

module.exports = router;