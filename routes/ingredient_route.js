const express = require('express');
const router  = express.Router();

const ingredient_controller = require('../controllers/INGREDIENT_CONTROLLER');

router
    .get('/', ingredient_controller.list)
    .get('/:id', ingredient_controller.show)
    .post('/', ingredient_controller.create)
    .put('/:id', ingredient_controller.update)
    .delete('/:id', ingredient_controller.remove);

module.exports = router;