const express = require('express');
const router  = express.Router();

const menu_controller = require('../controllers/MENU_ITEM_CONTROLLER');

router
    .get('/', menu_controller.list)
    .get('/:id', menu_controller.show)
    .post('/', menu_controller.create)
    .put('/:id', menu_controller.update)
    .delete('/:id', menu_controller.remove);

module.exports = router;