const User = require('../models/USERS')
const jwt  = require('jsonwebtoken')
const TOKEN_MODEL = require('../models/REFRESH_TOKEN');

function generateAccessToken(user) {
    jwt.sign(user,
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.TOKEN_DURATION});
}

module.exports = {
    token: async function(req, res) {
        var refresh_token = req.body.token_id;
        var valid_token = await TOKEN_MODEL.findOne({_id: refresh_token});
        if (refresh_token == null) return res.sendStatus(401);
        if(!valid_token) return res.sendStatus(401);
        jwt.verify(valid_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.sendStatus(403);
            const access_token = generateAccessToken(user);
            res.json({ accessToken: access_token});
        });
    },
    logout: async function(req, res) {
        await TOKEN_MODEL.findOneAndDelete({_id: req.body.token_id});
        res.sendStatus(201);
    },
    login: async function(req, res){
        if (req.body.email && req.body.password) {
            var user = await User.findOne({EMAIL: req.body.email});
            var isMatch = await user.comparePassword(req.body.password);
            if (user && isMatch) {
                var access_token = generateAccessToken(user);
                const refresh_token = jwt.sign(user,
                    process.env.REFRESH_TOKEN_SECRET);
                await TOKEN_MODEL.create({ token: refresh_token });
                res.json({
                    accessToken: access_token,
                    refreshToken: refresh_token
                });
            }
        }
    }
}