var mongoose = require('mongoose');

const CHAT_SCHEMA = new mongoose.Schema({
    CATEGORY: {
        type: String,
        enum: ['Group', 'one_on_one']
    },
    PARTICIPANTS: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USERS"
    },
    MESSAGES: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CHAT_MESSAGES"
    }
});

module.exports = mongoose.model("CHATS", CHAT_SCHEMA);