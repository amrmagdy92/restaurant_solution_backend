const express = require('express');
const router  = express.Router();

const dine_in_controller = require('../controllers/DINE_IN_CONTROLLER');

router
    .get('/', dine_in_controller.list)
    .get('/:id', dine_in_controller.show)
    .post('/', dine_in_controller.create)
    .put('/:id', dine_in_controller.update)
    .delete('/:id', dine_in_controller.remove);

module.exports = router;