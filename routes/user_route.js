const express = require('express');
const router  = express.Router();
const auth    = require('../utility/AUTH')();
const user_controller = require('../controllers/USERS_CONTROLLER');

const isDev = process.env.NODE_ENV === 'development';
const noop  = (req,res,next) => next();

router
    .get('/', isDev ? noop : auth.authenticate(), user_controller.list)
    .get('/:id', auth.authenticate(), user_controller.show)
    .post('/', auth.authenticate(), user_controller.create)
    .put('/:id', auth.authenticate(), user_controller.update)
    .delete('/:id', auth.authenticate(), user_controller.remove);

module.exports = router;