const express = require('express');
const router  = express.Router();

const restaurant_controller = require('../controllers/RESTAURANT_CONTROLLER');

router
    .get('/', restaurant_controller.list)
    .get('/:id', restaurant_controller.show)
    .post('/', restaurant_controller.create)
    .put('/:id', restaurant_controller.update)
    .delete('/:id', restaurant_controller.remove);

module.exports = router;