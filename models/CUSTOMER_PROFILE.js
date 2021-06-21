var mongoose = require('mongoose');

var CUSTOMER_PROFILE_SCHEMA = new mongoose.Schema({
    CUSTOMER_NAME: {
        type: String,
        required: true
    },
    CUSTOMER_PHONE_NUMBER: {
        type: String,
        trim: true,
        required: true,
    },
    CUSTOMER_ADDRESSES: [{
        type: String,
        required: true
    }],
    CUSTOMER_ORDERS: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DELIVERY_ORDERS"
    }],
    CUSTOMER_CLASS: {
        // MARK: This only indicates the customer standing with the restaurant
        type: String,
        require: true,
        default: "Average"
    }
});

module.exports = mongoose.model('CUSTOMERS', CUSTOMER_PROFILE_SCHEMA);