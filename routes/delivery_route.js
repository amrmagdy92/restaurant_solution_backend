const express = require('express');
const router  = express.Router();

const delivery_controller = require('../controllers/DELIVERY_CONTROLLER');

router
    .get('/', delivery_controller.list)
    .get('/:id', delivery_controller.show)
    .post('/', delivery_controller.create)
    .put('/:id', delivery_controller.update)
    .delete('/:id', delivery_controller.remove);

module.exports = router;