const mongoose      = require('mongoose');
const MENU_ITEM_SCHEMA = mongoose.model('MENU_ITEMS').schema;
const DINE_IN_ORDER_SCHEMA   = mongoose.model('DINE_IN').schema;
const DELIVERY_ORDER_SCHEMA   = mongoose.model('DELIVERY').schema;

const RESTAURANT_SCHEMA = new mongoose.Schema({
	RESTAURANT_NAME: {
		type: String,
		required: true,
		unique: true,
	},
	RESTAURANT_ADDRESS: {
		city: {
			type: String,
			required: true
		},
		cap: {
			type: String,
			required: true
		},
		street: {
			type: String,
			required: true
		}
	},
	DINE_IN_ORDERS: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'DINE_IN'
	}],
    DELIVERY_ORDERS: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'DELIVERY'
	}],
	RESTAURANT_MENU: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'MENU_ITEMS'
	}],
	RESTAURANT_MANAGER: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'USERS',
		required: true
	},
	RESTAURANT_WAITERS: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'USERS'
	},
	RESTAURANT_CHEFS: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'USERS'
	}
});

module.exports = mongoose.model('RESTAURANT', RESTAURANT_SCHEMA);