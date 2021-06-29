var mongoose = require('mongoose');
var KITCHEN_DEPARTMENT = require('./KITCHEN_DEPARTMENT');

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
        MENU_ITEM: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MENU_ITEMS'
        },
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

DELIVERY_ORDER_SCHEMA.post('save', function() {
    try {
        for (var item in this.ORDER_ITEMS) {
            KITCHEN_DEPARTMENT.findOneAndUpdate(
                {DEPARTMENT_NAME: item.MENU_ITEM.ITEM_CATEGORY},
                {$push: {CURRENT_DELIVERY_ORDERS: item}},
                function(err, success) {
                    if (err) {
                        return err
                    }
                    if (success) {
                        return success
                    }
            })
        }
    }
    catch (err) {
        return Promise.reject(err);
    }
});

module.exports = mongoose.model('DELIVERY', DELIVERY_ORDER_SCHEMA);