var mongoose = require('mongoose');
const MENU_ITEM_SCHEMA = mongoose.model('MENU_ITEMS').schema;

var DINE_IN_ORDER_SCHEMA = new mongoose.Schema({
    TABLE_IDENTIFIER : {
        type: String,
        trim: true,
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
    },
    WAITER: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "USERS"
    }
});

DINE_IN_ORDER_SCHEMA.post('save', function() {
    try {
        for (var item in this.ORDER_ITEMS) {
            KITCHEN_DEPARTMENT.findOneAndUpdate(
                {DEPARTMENT_NAME: item.MENU_ITEM.ITEM_CATEGORY},
                {$push: {CURRENT_DINE_ORDERS: item}},
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

module.exports = mongoose.model('DINE_IN', DINE_IN_ORDER_SCHEMA);