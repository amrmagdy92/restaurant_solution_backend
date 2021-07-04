const User = require('../models/USERS')
const jwt  = require('jsonwebtoken')
const TOKEN_MODEL = require('../models/REFRESH_TOKEN');

module.exports = {
    token: async function(req, res) {  
        if (req.body.email && req.body.password) {
            var email = req.body.email;
            var password = req.body.password;
            var user = await User.findOne({ EMAIL: email });
            var isMatch = await user.comparePassword(password);
            var token_id;
            var token;
            var accessToken;
            var refreshToken;
            if (user && isMatch) {
                var payload = {
                    id: user.id
                };
                token_id = req.body.token_id;
                if (token_id == null) return res.sendStatus(401);
                token = await TOKEN_MODEL.findOne({_id : token_id})
                if(!token) return res.sendStatus(403);
                jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) return res.sendStatus(403);
                    accessToken = jwt.sign(payload,
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: process.env.TOKEN_DURATION});
                })
            } else {
                res.sendStatus(401);
            }
        } else {
            res.sendStatus(401);
        }
    }
}