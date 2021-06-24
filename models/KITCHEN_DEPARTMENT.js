const mongoose = require('mongoose');

const KITCHEN_DEPARTMENT = new mongoose.Schema({
    DEPARTMENT_NAME: {
        type: String,
        required: true
    },
    CURRENT_DELIVERY_ORDERS: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DELIVERY'
    }],
    CURRENT_DINE_ORDERS: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DINE_IN'
    }]
});

module.exports = mongoose.model('KITCHEN_DEPARTMENTS', KITCHEN_DEPARTMENT);