var mongoose = require('mongoose');

const TOKEN_SCHEMA = new mongoose.Schema({
    token: String
});

module.exports = mongoose.model("REFRESH_TOKENS", TOKEN_SCHEMA);