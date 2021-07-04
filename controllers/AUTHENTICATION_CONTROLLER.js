const User = require('../models/USERS')
const jwt  = require('jsonwebtoken')

module.exports = {
    token: async function(req, res) {  
        if (req.body.email && req.body.password) {
            var email = req.body.email;
            var password = req.body.password;
            var user = await User.findOne({ EMAIL: email });
            var isMatch = await user.comparePassword(password);
            if (user && isMatch) {
                var payload = {
                    id: user.id
                };
                var token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
                res.json({
                    token: token
                });
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    }
}