var mongoose = require('mongoose');
const MENU_ITEM_SCHEMA = mongoose.model('MENU_ITEMS').schema;

var DELIVERY_ORDER_SCHEMA = new mongoose.Schema({
    DELIVERY_PERSON: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    },
    ORDER_ITEMS: [{
        MENU_ITEM: MENU_ITEM_SCHEMA,
        ITEM_QUANTITY: {
            type: Number,
            required: true,
            default: 1
        },
        ITEM_PRICE: {
            type: Number,
            required: true,
            default: 0
        }
    }],
    ORDER_VALUE: {
        type: Number,
        required: true,
        default: 0
    },
    PAID: {
        type: Boolean,
        required: true,
        default: false
    },
    STATUS: {
        type: String,
        required: true,
        default: "Preparing"
    }
});

module.exports = mongoose.model('DELIVERY', DELIVERY_ORDER_SCHEMA);