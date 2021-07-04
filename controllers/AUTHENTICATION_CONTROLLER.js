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
                var accessToken = jwt.sign(payload,
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: process.env.TOKEN_DURATION});
                var refreshToken = jwt.sign(payload,
                    process.env.REFRESH_TOKEN_SECRET);
                res.json({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                });
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    }
}