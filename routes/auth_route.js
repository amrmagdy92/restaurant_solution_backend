const express = require('express');
const router  = express.Router();

const authentication_controller = require('../controllers/AUTHENTICATION_CONTROLLER');

router.post('/token', authentication_controller.token);
router.post('login', authentication_controller.login);
router.post('/logout', authentication_controller.logout);

module.exports = router;