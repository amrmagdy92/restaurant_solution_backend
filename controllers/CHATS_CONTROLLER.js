const CHAT = require('../models/CHAT');
const CHAT_MESSAGE = require('../models/CHAT_MESSAGE');

var message_count = 0;

module.exports = {
    fetchLatestMessages: async (req, res) => {
        try{
            var chat = await CHAT.find({_id: req.body.chat_id}).limit(20);
            message_count += 20;
            res.setStatus(200).json({
                messages: chat.MESSAGES.MESSAGE_CONTENT,
                sender: chat.MESSAGES.MESSAGE_SENDER.FULL_NAME,
                message_time: chat.MESSAGES.MESSAGE_TIME
            });
        } catch {
            res.setStatus(400).json({
                code: 1003,
                message: "Couldn't find the required chat."
            });
        }
    },
    fetchOlderMessages: async (req, res) => {
        try{
            var chat = await CHAT.find({_id: req.body.chat_id})
            .skip(message_count)
            .limit(20);
            message_count += 20;
            res.setStatus(200).json({
                messages: chat.MESSAGES.MESSAGE_CONTENT,
                sender: chat.MESSAGES.MESSAGE_SENDER.FULL_NAME,
                message_time: chat.MESSAGES.MESSAGE_TIME
            });
        } catch {
            res.setStatus(400).json({
                code: 1003,
                message: "Couldn't find the required chat."
            });
        }
    },
    sendMessage: async (req,res) => {
        try {
            await CHAT.find({_id: req.body.chat_id});
            await CHAT_MESSAGE.create({
                MESSAGE_CONTENT: req.body.message_content,
                MESSAGE_SENDER: req.body.sender_id
            }, (err, message) => {
                if(err) return err
                CHAT.findOneAndUpdate(
                    {_id: req.body.chat_id},
                    {$push: {MESSAGES: message._id}});
            });
        } catch {
            res.setStatus(400).json({
                code: 1003,
                message: "couldn't send the message"
            });
        }
    },
    deleteMessage: async (req, res) => {
        try{
            await CHAT_MESSAGE.deleteOne({_id: req.body.message_id});
        } catch {
            res.setStatus(400).json({
                code: 1003,
                message: "couldn't delete the message"
            });
        }
    },
    editMessage: async (req,res) => {
        try{
            await CHAT_MESSAGE.findOneAndUpdate({_id: req.body.message_id},
                {MESSAGE_CONTENT: req.body.message_content});
        } catch {
            res.setStatus(400).json({
                code: 1003,
                message: "couldn't edit the message"
            });
        }
    }
}