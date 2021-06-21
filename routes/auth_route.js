const express = require('express');
const router  = express.Router();

const authentication_controller = require('../controllers/AUTHENTICATION_CONTROLLER');

router.post('/token', authentication_controller.token);

module.exports = router;