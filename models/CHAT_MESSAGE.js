var mongoose = require('mongoose');

const CHAT_MESSAGE_SCHEMA = new mongoose.Schema({
    MESSAGE_TIME: {
        type: String,
        required: true
    },
    MESSAGE_CONTENT: {
        type: String,
        required: true
    },
    MESSAGE_SENDER: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USERS"
    }
});

module.exports = mongoose.model('CHAT_MESSAGES', CHAT_MESSAGE_SCHEMA);