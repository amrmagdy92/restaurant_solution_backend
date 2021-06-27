var mongoose = require('mongoose');

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
        // TODO: try finding kitchen department then if found assign else throw error
        for (var item in this.ORDER_ITEMS.MENU_ITEM) {
            if (item.ITEM_CATEGORY == 'Beverage') {
                // assign to beverage kitchen
            } else if (item.ITEM_CATEGORY == 'Grilled') {
                // assign to grilled kitchen
            } else if (item.ITEM_CATEGORY == 'Seafood') {
                // assign to seafood kitchen
            } else if (item.ITEM_CATEGORY == 'Healthy') {
                // assign to healthy kitchen
            } else if (item.ITEM_CATEGORY == 'Dessert') {
                // assign to dessert kitchen
            }
        }
    }
    catch (err) {
        return Promise.reject(err);
    }
})

module.exports = mongoose.model('DELIVERY', DELIVERY_ORDER_SCHEMA);