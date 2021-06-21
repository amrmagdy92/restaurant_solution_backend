const express = require('express');
const router = express.Router();
const auth    = require('../utility/AUTH')();

const customer_controller = require('../controllers/CUSTOMER_CONTROLLER');

const isDev = process.env.NODE_ENV === 'development';
const noop  = (req,res,next) => next();

router
    .get('/', isDev ? noop : auth.authenticate(), customer_controller.list)
    .get('/:id', auth.authenticate(), customer_controller.show)
    .post('/', auth.authenticate(), customer_controller.create)
    .put('/:id', auth.authenticate(), customer_controller.update)
    .delete('/:id', auth.authenticate(), customer_controller.remove);

module.exports = router;