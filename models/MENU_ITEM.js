const mongoose   = require('mongoose');

const MENU_ITEM_SCHEMA = new mongoose.Schema({
	ITEM_NAME: {
		type: String,
		required: true
	},
	ITEM_PRICE: {
		type: Number,
		required: true,
		default: 0
	},
	ITEM_INGREDIENTS: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ITEM_INGREDIENT'
	}],
	ITEM_CATEGORY: {
		type: String,
		enum: ['Beverage', 'Grilled', 'Seafood', 'Healthy', 'Dessert'],
		default: 'Grilled'
	}
});

module.exports = mongoose.model('MENU_ITEMS', MENU_ITEM_SCHEMA);